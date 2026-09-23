'use client';

import { cn, Link } from '@/kit/ui';
import { ArrowRight } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { LeadCaptureModal, ToolShell } from '@/components';
import {
	INTRO_STEPS,
	INTRO_TRUST_ITEMS,
	TOOL_INTRO_KEYBOARD_HINT,
	type Tool,
	type ToolQueryMode,
	type ToolSlug,
} from '@/lib/cms';
import { TOOL_ICONS } from '@/lib/icons';
import { useToolInner } from '@/tools/stage';
import { ToolIntroSupplement } from '@/tools/supplement';
import { ToolViewProvider } from '@/tools/viewport';

function ToolIntro({
	tool,
	onStart,
	startHref,
}: {
	tool: Tool;
	onStart: () => void;
	/** Progressive-enhancement workbench URL when client JS is slow/unavailable. */
	startHref: string;
}) {
	const Icon = TOOL_ICONS[tool.icon];
	const steps = INTRO_STEPS[tool.slug];

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key !== 'Enter') return;
			const active = document.activeElement;
			if (!(active instanceof HTMLElement)) return;
			const intro = active.closest('.tool-intro');
			const tag = active.tagName.toLowerCase();
			if (
				tag === 'a' ||
				tag === 'button' ||
				tag === 'input' ||
				tag === 'textarea' ||
				tag === 'select'
			)
				return;
			if (!intro && active !== document.body) return;
			e.preventDefault();
			onStart();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onStart]);

	const handleStartClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			if (typeof window !== 'undefined') {
				e.preventDefault();
				onStart();
			}
		},
		[onStart],
	);

	return (
		<section className="tool-intro" aria-label={tool.title}>
			<div className="tool-intro__hero">
				<span
					aria-hidden="true"
					className="tool-intro__icon flex items-center justify-center rounded-2xl border border-gold/25 bg-gradient-to-b from-gold/10 to-transparent sm:rounded-3xl"
				>
					<Icon className="text-gold" aria-hidden="true" />
				</span>

				<span className="pill tool-intro__eyebrow my-2">{tool.eyebrow}</span>

				<h1 className="display tool-intro__title tracking-[-0.015em]">{tool.title}</h1>

				<p className="tool-intro__subtitle max-w-[46ch] text-muted">{tool.subtitle}</p>
			</div>

			<ol className="tool-intro__steps w-full max-w-md text-left">
				{steps.map((s, i) => (
					<li
						key={s}
						className="tool-intro__step flex min-h-[44px] items-center gap-3 rounded-xl border border-line bg-ink/70 px-3.5 py-2.5 text-[12.5px] sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-[13.5px]"
					>
						<span className="tabular flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/5 text-[12px] font-semibold text-gold sm:h-7 sm:w-7 sm:text-[13px]">
							{i + 1}
						</span>
						<span className="text-fg/90">{s}</span>
					</li>
				))}
			</ol>

			<div className="tool-intro__cta">
				<Link
					href={startHref}
					onClick={handleStartClick}
					className="btn btn-primary btn-lg w-full max-w-sm px-8 sm:w-auto sm:max-w-none sm:px-10"
				>
					Tap to Start <ArrowRight size={19} />
				</Link>

				<div className="tool-intro__trust">
					{INTRO_TRUST_ITEMS.map((item) => {
						const Icon = item.icon;
						const label = typeof item.label === 'function' ? item.label(tool.minutes) : item.label;
						return (
							<span key={label} className="tool-intro__trust-item">
								<Icon size={14} className={item.iconClass} aria-hidden="true" /> {label}
							</span>
						);
					})}
				</div>
				<p className="tool-intro__hint text-[11px] text-faint">
					{TOOL_INTRO_KEYBOARD_HINT.prefix}{' '}
					<kbd className="rounded border border-line bg-ink px-1.5 py-px font-sans text-[10px]">
						{TOOL_INTRO_KEYBOARD_HINT.key}
					</kbd>{' '}
					{TOOL_INTRO_KEYBOARD_HINT.suffix}
				</p>
			</div>
		</section>
	);
}

export function ToolInner({ slug, queryMode }: { slug: ToolSlug; queryMode: ToolQueryMode }) {
	const {
		tool,
		ToolPanel,
		params,
		isIntro,
		entryReady,
		workbenchMounted,
		workbenchFlow,
		reducedMotion,
		leadOpen,
		leadPrefill,
		isStandalone,
		isEmbed,
		chrome,
		startHref,
		handleStart,
		goToWelcome,
		restart,
		closeLead,
		openLeadGeneral,
		openLead,
		otherTools,
		chromeWelcome,
		compactFooter,
		supplementOpen,
	} = useToolInner(slug, queryMode);

	return (
		<ToolShell
			isEmbed={isEmbed}
			isStandalone={isStandalone}
			welcome={chromeWelcome}
			compactFooter={compactFooter}
			slug={slug}
			bgImage={tool.introBg}
			chrome={chrome}
		>
			<div
				className={cn(
					'tool-stage tool-stage--viewport container-x',
					workbenchFlow ? 'tool-stage--flow' : 'tool-stage--stacked flex min-h-0 flex-col',
				)}
				data-mode={isIntro ? 'intro' : 'tool'}
			>
				<div
					className={cn(
						'tool-stage__stack',
						!isIntro && 'tool-stage__stack--tool-active',
						reducedMotion && 'tool-stage__stack--instant',
					)}
				>
					{!entryReady ? (
						<div
							className="tool-stage__pane tool-stage__pane--intro tool-stage__pane--visible"
							aria-busy="true"
						/>
					) : (
						<>
							<div
								className={cn(
									'tool-stage__pane tool-stage__pane--intro',
									isIntro && 'tool-stage__pane--visible',
								)}
								aria-hidden={!isIntro}
							>
								<ToolIntro tool={tool} onStart={handleStart} startHref={startHref} />
							</div>
							{workbenchMounted ? (
								<div
									className={cn(
										'tool-stage__pane tool-stage__pane--workbench',
										!isIntro && 'tool-stage__pane--visible',
									)}
									aria-hidden={isIntro}
								>
									<ToolViewProvider onShowWelcome={goToWelcome}>
										<ToolPanel onOpenLead={openLead} onRestart={restart} />
									</ToolViewProvider>
								</div>
							) : null}
						</>
					)}
				</div>
			</div>

			{supplementOpen ? (
				<ToolIntroSupplement
					otherTools={otherTools}
					params={params}
					onAboutTool={goToWelcome}
					onAttorneyPrompt={openLeadGeneral}
				/>
			) : null}

			<LeadCaptureModal
				isOpen={leadOpen}
				onClose={closeLead}
				context={tool.title}
				prefill={leadPrefill}
				acceptAttachments={slug === 'documentation-checklist'}
			/>
		</ToolShell>
	);
}
