'use client';

import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from '@/kit/ui';
import { TOOL_SUPPLEMENT_COPY, type Tool, embedAwareToolHref, isOffSiteHref } from '@/lib/cms';
import { TOOL_ICONS } from '@/lib/icons';

type ToolSearchParams = Pick<URLSearchParams, 'get' | 'has'>;

export function ToolIntroSupplement({
	otherTools,
	params,
	onAboutTool,
	onAttorneyPrompt,
}: {
	otherTools: readonly Tool[];
	params: ToolSearchParams;
	onAboutTool: () => void;
	onAttorneyPrompt: () => void;
}) {
	return (
		<div className="tool-supplement tool-supplement--visible container-x">
			<div className="tool-supplement__inner">
				<div className="tool-supplement__prompts">
					<button
						type="button"
						onClick={onAboutTool}
						className="group inline-flex min-h-[44px] items-center gap-1.5 px-2 text-[13px] text-muted transition hover:text-fg"
					>
						<BookOpen size={14} className="text-gold" aria-hidden="true" />
						{TOOL_SUPPLEMENT_COPY.aboutTool}
					</button>
					<button
						type="button"
						onClick={onAttorneyPrompt}
						className="tool-supplement__attorney group"
					>
						<span className="tool-supplement__attorney-label">
							{TOOL_SUPPLEMENT_COPY.attorneyPrompt}
						</span>
						<ArrowRight
							size={14}
							className="tool-supplement__attorney-arrow transition group-hover:translate-x-0.5"
							aria-hidden="true"
						/>
					</button>
				</div>

				<div className="tool-supplement__next">
					<div className="eyebrow mb-5">{TOOL_SUPPLEMENT_COPY.nextStepEyebrow}</div>
					<div className="grid min-w-0 gap-4 sm:grid-cols-2">
						{otherTools.map((t) => {
							const Icon = TOOL_ICONS[t.icon];
							const href = embedAwareToolHref(`/tool/${t.slug}`, params);
							const outbound = isOffSiteHref(href);
							return (
								<Link
									key={t.slug}
									href={href}
									target={outbound ? '_blank' : undefined}
									rel={outbound ? 'noopener noreferrer' : undefined}
									className="card group flex min-h-[5.5rem] min-w-0 w-full max-w-full items-center gap-3 p-4 transition hover:border-gold/30 sm:gap-4 sm:p-5"
								>
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-ink group-hover:border-gold/30">
										<Icon size={22} className="text-gold" />
									</div>
									<div className="min-w-0 flex-1">
										<div className="text-[15px] font-semibold text-fg tracking-tight">
											{t.title}
										</div>
										<div className="truncate text-[13px] text-muted">{t.short}</div>
									</div>
									<ChevronRight
										size={19}
										className="shrink-0 text-subtle transition group-hover:translate-x-0.5 group-hover:text-gold"
									/>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
