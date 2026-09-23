'use client';

import { Backdrop, cn } from '@/kit/shared';
import { Fragment, type ReactNode } from 'react';
import { TOOL_SHELL_CHROME_BLOCKS, type ToolShellChromeBlockId } from '@/lib/cms';
import { embedChromeFlags, type EmbedChromeVariant } from '@/lib/lookup';
import type { ToolSlug } from '@/lib/cms';
import { chromeKinds } from '@/lib/site/kinds/chrome';
import { getSiteRegistry } from '@/lib/site/registries';

function toolShellRootClassName({
	isStandalone,
	isEmbed,
	bgImage,
	chrome,
}: {
	isStandalone: boolean;
	isEmbed: boolean;
	bgImage?: string;
	chrome: EmbedChromeVariant;
}) {
	const flags = embedChromeFlags(chrome);
	return cn(
		'tool-shell flex flex-col',
		isStandalone && 'tool-shell--standalone',
		flags.cardOnly && 'tool-shell--chrome-card',
		flags.hideHeader && 'tool-shell--chrome-no-header',
		flags.hideBg && 'tool-shell--chrome-no-bg',
		flags.cardOnly
			? 'bg-transparent'
			: !bgImage || flags.hideBg
				? 'bg-base'
				: 'has-tool-bg tool-shell--surface',
	);
}

function toolPageMainClassName() {
	return cn('tool-page tool-page--workbench flex flex-col');
}

function renderToolShellChromeBlock(
	blockId: ToolShellChromeBlockId,
	slimFooter: boolean,
): ReactNode {
	if (blockId === 'footer') {
		return chromeKinds['chrome.toolFooter']({ slimFooter }) as ReactNode;
	}
	const toolShellChromeBlocks = getSiteRegistry('tool-shell').chrome!;
	return toolShellChromeBlocks[blockId]?.() as ReactNode;
}

export function ToolShell({
	children,
	isEmbed = false,
	isStandalone = false,
	welcome = false,
	compactFooter,
	slug,
	bgImage,
	chrome = 'full',
}: {
	children: ReactNode;
	isEmbed?: boolean;
	isStandalone?: boolean;
	/** Welcome / transition — hides scroll marker until workbench chrome is ready. */
	welcome?: boolean;
	/** Compact legal footer (defaults to welcome). */
	compactFooter?: boolean;
	slug?: ToolSlug;
	bgImage?: string;
	chrome?: EmbedChromeVariant;
}) {
	const shellWelcome = welcome;
	const slimFooter = isEmbed || (compactFooter ?? welcome);
	const flags = embedChromeFlags(chrome);
	const chromeCtx = {
		isEmbed,
		isStandalone,
		welcome,
		hideHeader: flags.hideHeader,
		hideBg: flags.hideBg,
		cardOnly: flags.cardOnly,
	};
	const showBackdrop = Boolean(slug && bgImage && !flags.hideBg);

	const renderChrome = (region: 'head' | 'tail') =>
		TOOL_SHELL_CHROME_BLOCKS.flatMap((block) => {
			if (block.region !== region || !block.when(chromeCtx)) return [];
			return [
				<Fragment key={block.id}>{renderToolShellChromeBlock(block.id, slimFooter)}</Fragment>,
			];
		});

	return (
		<div
			className={toolShellRootClassName({
				isStandalone,
				isEmbed,
				bgImage,
				chrome,
			})}
		>
			{showBackdrop ? <Backdrop bgImage={bgImage!} standalone={isStandalone} /> : null}

			{renderChrome('head')}

			<main id="main" className={toolPageMainClassName()}>
				{children}
			</main>

			{renderChrome('tail')}
		</div>
	);
}
