'use client';

import type { ReactNode } from 'react';

import { Progress } from '@/components';

import type { DataRef } from '@/kit/catalog';
import { isPageDocument } from '@/kit/catalog';

import type { HomeBlockId, HomeFooterBlockId } from '@/lib/cms';
import { getSitePageDefinition, type SitePageId } from '@/lib/cms/catalog';
import { resolveSiteDataRef } from '@/lib/cms/refs';
import { renderHomePageNode, type ResourceTreeNode } from '@/lib/site/branches';
import { SiteResourcePage } from '@/lib/site/page';
import { getSiteRegistry } from '@/lib/site/registries';
import { renderPageDocument } from '@/lib/site/sections';

export function SiteHomePage({ pageId = 'home' }: { pageId?: SitePageId }) {
	const page = getSitePageDefinition(pageId);
	if (!page.main) {
		throw new Error(`[site] page "${pageId}" has no main tree ref`);
	}
	const registryBundle = getSiteRegistry(page.registry);
	const mainPayload = resolveSiteDataRef<unknown>(page.main as DataRef);
	const footerIds = page.footer
		? resolveSiteDataRef<readonly HomeFooterBlockId[]>(page.footer as DataRef)
		: [];

	const mainBlocks = registryBundle.main as Record<HomeBlockId, () => ReactNode>;

	return (
		<div className="flex min-h-screen flex-col mobile-dock-pad lg:pb-0">
			<Progress />
			<main id="main" className="flex-1">
				{isPageDocument(mainPayload)
					? renderPageDocument(mainPayload, page.registry, mainBlocks)
					: (mainPayload as readonly ResourceTreeNode<HomeBlockId>[]).map((node, i) =>
							renderHomePageNode(node, `main-${i}`, mainBlocks),
						)}
			</main>
			{footerIds.map((id) => {
				const Block = registryBundle.footer?.[id];
				if (!Block) return null;
				return <Block key={id} />;
			})}
		</div>
	);
}

export function HomePage(props: { pageId?: SitePageId }) {
	return <SiteHomePage {...props} />;
}

export function renderSitePage(pageId: SitePageId) {
	const page = getSitePageDefinition(pageId);
	if (page.shell === 'home') {
		return <SiteHomePage pageId={pageId} />;
	}
	if (page.shell === 'resource') {
		return <SiteResourcePage pageId={pageId} />;
	}
	throw new Error(`[site] unsupported shell "${page.shell}" for page "${pageId}"`);
}
