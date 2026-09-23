'use client';

import { ArrowRight, Calculator } from 'lucide-react';
import { Link } from '@/kit/ui';
import {
	ELIGIBILITY_RESULT_POINTS,
	ELIGIBILITY_RESULTS_CHROME,
	ELIGIBILITY_STRENGTH_CHROME,
	isOffSiteHref,
} from '@/lib/cms';
import type { EligResult } from '@/lib/scoring';
import { ResultPoint } from '@/tools/facade';

export function EligibilityCheckerResults({
	result,
	strengthColor,
	calcHref,
	withinWindow,
	impairs,
	onOpenEval,
}: {
	result: EligResult;
	strengthColor: string;
	calcHref: string;
	withinWindow: boolean | null;
	impairs: boolean | null;
	onOpenEval: () => void;
}) {
	const strengthLabel = ELIGIBILITY_STRENGTH_CHROME[result.strength].displayLabel;
	const viewContext = { result, withinWindow, impairs };
	const strongIndicators = ELIGIBILITY_RESULT_POINTS.filter(
		(point) => point.good && point.show(viewContext),
	);

	return (
		<div className="min-w-0">
			<div className="eyebrow">{ELIGIBILITY_RESULTS_CHROME.assessmentResultEyebrow}</div>

			<h2
				className={`display mt-3 text-balance text-[clamp(1.85rem,4.8vw,2.55rem)] leading-[1.08] tracking-[-0.02em] ${strengthColor}`}
			>
				{strengthLabel}
			</h2>

			{!result.qualifies ? (
				<p className="mt-3 max-w-prose text-[14.5px] leading-relaxed text-muted">
					{ELIGIBILITY_RESULTS_CHROME.notQualifiesShort}
				</p>
			) : null}

			{strongIndicators.length > 0 ? (
				<ul className="mt-6 space-y-2.5 text-[14px] leading-relaxed">
					{strongIndicators.map((point) => (
						<ResultPoint key={point.id} good>
							{typeof point.text === 'function' ? point.text(viewContext) : point.text}
						</ResultPoint>
					))}
				</ul>
			) : null}

			<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
				<button
					type="button"
					onClick={onOpenEval}
					className="btn btn-primary btn-lg min-h-[48px] flex-1"
				>
					<span className="text-balance">
						<span className="sm:hidden">{ELIGIBILITY_RESULTS_CHROME.evaluationCtaShort}</span>
						<span className="hidden sm:inline">{ELIGIBILITY_RESULTS_CHROME.evaluationCtaLong}</span>
					</span>{' '}
					<ArrowRight size={17} className="shrink-0" />
				</button>
				<Link
					href={calcHref}
					className="btn btn-secondary btn-lg min-h-[48px] shrink-0"
					target={isOffSiteHref(calcHref) ? '_blank' : undefined}
					rel={isOffSiteHref(calcHref) ? 'noopener noreferrer' : undefined}
				>
					<Calculator size={16} className="text-gold" /> {ELIGIBILITY_RESULTS_CHROME.recoveryCta}
				</Link>
			</div>
		</div>
	);
}
