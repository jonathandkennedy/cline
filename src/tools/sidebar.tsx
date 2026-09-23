'use client';

import { ArrowRight, Scale } from 'lucide-react';
import { CountUp, type LeadPrefill } from '@/components';
import type { BuybackCalcResult } from '@/lib/arithmetic';
import { formatNumber } from '@/lib/numbers';
import {
	BUYBACK_COMPOSITION_SEGMENTS,
	BUYBACK_PRESUMPTION_ITEMS,
	BUYBACK_RAIL_CHROME,
} from '@/lib/cms';
import { CompositionBar, type OpenLead, PresumptionChip, useOpenLeadPrefill } from '@/tools/shared';
import { TOOL_SECTION_LABEL_CLASS } from '@/tools/tokens';

export function BuybackCalculatorRail({
	calc,
	prefill,
	onOpenLead,
}: {
	calc: BuybackCalcResult;
	prefill: LeadPrefill;
	onOpenLead: OpenLead;
}) {
	const handleOpenLead = useOpenLeadPrefill(onOpenLead, prefill);

	return (
		<div className="space-y-5">
			<div className="relative isolate overflow-hidden">
				<div
					aria-hidden
					className="glow pointer-events-none -right-8 -top-16 h-32 w-32 bg-recovery/15 sm:-right-16 sm:-top-20 sm:h-40 sm:w-40"
				/>
				<div className="relative">
					<div className="min-h-[18px]">
						<div className="eyebrow">{BUYBACK_RAIL_CHROME.estimatedRecoveryEyebrow}</div>
					</div>
					<div
						className="tabular mt-2 text-[clamp(2.4rem,6vw,3.1rem)] font-bold leading-none text-recovery"
						aria-hidden="true"
					>
						<CountUp to={calc.total} prefix="$" animateOnChange duration={650} />
					</div>
					<span className="sr-only" aria-live="polite">
						Estimated recovery ${formatNumber(calc.total)}.{' '}
						{calc.strong ? 'Strong indicators.' : 'Keep documenting.'}
					</span>
					<div className="mt-3 flex flex-wrap items-center gap-2 text-[12.5px] text-subtle">
						<span className={`badge ${calc.strong ? 'badge-recovery' : 'badge-gold'}`}>
							{calc.strong
								? BUYBACK_RAIL_CHROME.strongIndicators
								: BUYBACK_RAIL_CHROME.keepDocumenting}
						</span>
						<span>{BUYBACK_RAIL_CHROME.directionalOnly}</span>
					</div>

					<div className="mt-5">
						<CompositionBar
							segments={BUYBACK_COMPOSITION_SEGMENTS.map((seg) => ({
								label: seg.label,
								value: calc.breakdown[seg.key],
								color: seg.color,
							}))}
						/>
						<div className="mt-2 flex items-center justify-between text-[11.5px] text-faint">
							<span>
								{BUYBACK_RAIL_CHROME.grossLabel} ${formatNumber(calc.gross)}
							</span>
							<span>
								{BUYBACK_RAIL_CHROME.offsetLabel} ${formatNumber(calc.offset)}
							</span>
						</div>
					</div>

					<button
						type="button"
						onClick={handleOpenLead}
						className="btn btn-primary btn-lg mt-5 w-full"
					>
						<span className="sm:hidden">Get Evaluation</span>
						<span className="hidden sm:inline">Get My Exact Evaluation</span>{' '}
						<ArrowRight size={17} />
					</button>
					<p className="mt-3 text-center text-[11.5px] text-faint">
						Free • No upfront fees • Attorney response in 1 business day
					</p>
				</div>
			</div>

			<div className="card-inset flex items-start gap-2 p-3.5 text-[11.5px] leading-relaxed text-subtle">
				<Scale size={13} className="mt-0.5 shrink-0 text-gold" />
				<span>
					A willful violation can add a civil penalty of up to 2× your damages, potentially{' '}
					<span className="font-semibold text-fg">${formatNumber(calc.civilPenaltyMax)}</span> on
					top.
				</span>
			</div>

			<hr className="tool-divider tool-divider-rail" />

			<span className={TOOL_SECTION_LABEL_CLASS}>
				{BUYBACK_RAIL_CHROME.statutoryPresumptionLabel}
			</span>

			<div className="mt-4 flex flex-wrap gap-2.5">
				{BUYBACK_PRESUMPTION_ITEMS.map((item) => (
					<PresumptionChip key={item.metKey} met={calc[item.metKey]} label={item.label} />
				))}
			</div>
		</div>
	);
}
