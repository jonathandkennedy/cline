'use client';

import { Pencil, RotateCcw } from 'lucide-react';
import { useCallback } from 'react';
import {
	ELIGIBILITY_RAIL_COPY,
	ELIGIBILITY_RAIL_FACTOR_ITEMS,
	ELIGIBILITY_RESULTS_CHROME,
	ELIGIBILITY_STRENGTH_CHROME,
	TOOL_SECTION_LABELS,
	UI_COPY,
} from '@/lib/cms';
import type { EligResult } from '@/lib/scoring';
import { PresumptionChip } from '@/tools/shared';
import { TOOL_SECTION_LABEL_CLASS } from '@/tools/tokens';

type AnswerSummary = { label: string; value: string; step: number };

export function EligibilityAnswersRail({
	answersSummary,
	onGoEdit,
	onStartOver,
}: {
	answersSummary: AnswerSummary[];
	onGoEdit: (n: number) => void;
	onStartOver: () => void;
}) {
	const handleGoEdit = useCallback((n: number) => () => onGoEdit(n), [onGoEdit]);

	return (
		<div>
			<span className={TOOL_SECTION_LABEL_CLASS}>
				{ELIGIBILITY_RESULTS_CHROME.yourAnswersLabel}
			</span>
			<div className="mt-3">
				{answersSummary.map((a, idx) => (
					<div key={a.label} className={`py-3 ${idx > 0 ? 'border-t border-line' : 'pt-0'}`}>
						<div className="text-[12.5px] text-subtle">{a.label}</div>
						<div className="mt-1.5 flex items-center justify-between gap-2">
							<span className="min-w-0 text-[14px] font-semibold text-fg tabular">{a.value}</span>
							<button
								type="button"
								onClick={handleGoEdit(a.step)}
								className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full border border-line/70 px-3 text-[11.5px] font-medium text-cta transition hover:border-gold/40 hover:text-gold"
								aria-label={`Edit ${a.label}`}
							>
								<Pencil size={11} />
								<span className="hidden sm:inline">{ELIGIBILITY_RESULTS_CHROME.editLabel}</span>
							</button>
						</div>
					</div>
				))}
				<div className="border-t border-line pt-3">
					<button
						type="button"
						onClick={onStartOver}
						className="inline-flex min-h-11 items-center gap-1.5 text-[12.5px] font-medium text-subtle hover:text-fg"
					>
						<RotateCcw size={13} /> {ELIGIBILITY_RESULTS_CHROME.startOverLabel}
					</button>
				</div>
			</div>
		</div>
	);
}

export function EligibilityCheckerRail({
	answered,
	result,
	strengthColor,
	meterColor,
	withinWindow,
	impairs,
}: {
	answered: boolean;
	result: EligResult;
	strengthColor: string;
	meterColor: string;
	withinWindow: boolean | null;
	impairs: boolean | null;
}) {
	const railContext = { result, withinWindow, impairs };
	const strengthLabel = ELIGIBILITY_STRENGTH_CHROME[result.strength].displayLabel;
	const activeFactors = ELIGIBILITY_RAIL_FACTOR_ITEMS.filter((factor) =>
		factor.resolveMet(railContext),
	);

	return (
		<div className="space-y-5">
			<div>
				<div className="eyebrow">{TOOL_SECTION_LABELS.eligibilityLiveAssessment}</div>
				<div
					className={`mt-2 text-[20px] font-semibold leading-snug sm:text-[22px] ${
						answered ? `font-display font-extrabold leading-none ${strengthColor}` : 'text-muted'
					}`}
					aria-hidden="true"
				>
					{answered ? strengthLabel : TOOL_SECTION_LABELS.eligibilityNotYet}
				</div>
				<div
					className="mt-3 flex gap-1"
					role="progressbar"
					aria-label={ELIGIBILITY_RAIL_COPY.scoreAriaLabel}
					aria-valuenow={answered ? result.score : 0}
					aria-valuemin={0}
					aria-valuemax={100}
				>
					{Array.from({ length: 10 }, (_, i) => i).map((i) => {
						const filled = answered && i < Math.round(result.score / 10);
						const segmentClass = filled ? meterColor : 'bg-line';
						return (
							<span
								key={i}
								aria-hidden="true"
								className={`h-2 flex-1 rounded-full ${segmentClass}`}
							/>
						);
					})}
				</div>
				<div className="tabular mt-2 text-[12px] text-subtle" aria-hidden="true">
					{answered ? `Score ${result.score} / 100` : UI_COPY.tools.eligibilityRailEmpty}
				</div>
				<span className="sr-only" aria-live="polite">
					{answered
						? `${ELIGIBILITY_RAIL_COPY.scoreLivePrefix}: ${strengthLabel}. Score ${result.score} of 100.`
						: ''}
				</span>
			</div>

			{activeFactors.length > 0 ? (
				<>
					<hr className="tool-divider tool-divider-rail" />

					<div>
						<span className={TOOL_SECTION_LABEL_CLASS}>
							{TOOL_SECTION_LABELS.eligibilityQualifyingFactors}
						</span>
						<div className="mt-3 flex flex-col items-start gap-2">
							{activeFactors.map((factor) => (
								<PresumptionChip key={factor.id} met label={factor.label} />
							))}
						</div>
					</div>
				</>
			) : null}
		</div>
	);
}
