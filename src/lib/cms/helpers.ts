import { formatNumber } from '@/lib/numbers';
import type {
	BuybackSliderField,
	BuybackState,
	EligibilityAnswerSummaryKey,
	EligibilityFlowStep,
	EligibilityQualifyingFactor,
	EligibilityRailContext,
	EligibilityResultPoint,
	EligibilityResultsViewContext,
	EligibilitySummaryContext,
} from './types';

function yn(v: boolean | null): string {
	return v === null ? 'Not set' : v ? 'Yes' : 'No';
}

export function buildEligibilitySummaryValueByKey(): Record<
	EligibilityAnswerSummaryKey,
	(ctx: EligibilitySummaryContext) => string
> {
	return {
		vehicleType: (ctx) => ctx.vehicleType,
		attempts: (ctx) => String(ctx.attempts),
		daysOut: (ctx) => String(ctx.daysOut),
		withinWindow: (ctx) => yn(ctx.withinWindow),
		impairs: (ctx) => yn(ctx.impairs),
		safety: (ctx) => yn(ctx.safety),
	};
}

const RESULT_POINT_SHOW: Record<string, (ctx: EligibilityResultsViewContext) => boolean> = {
	safety: (ctx) => ctx.result.meetsSafety,
	repair: (ctx) => ctx.result.meetsRepair,
	days: (ctx) => ctx.result.meetsDays,
	impairs: (ctx) => Boolean(ctx.impairs),
	'within-window': (ctx) => ctx.withinWindow === true,
	'outside-window': (ctx) => ctx.withinWindow === false,
	'not-qualified': (ctx) => !ctx.result.qualifies,
};

function requireResultPointShow(id: string) {
	const show = RESULT_POINT_SHOW[id];
	if (!show) {
		throw new Error(`Unknown eligibility result point id: ${id}`);
	}
	return show;
}

export function hydrateEligibilityResultPoints(
	rows: readonly { id: string; good?: boolean; text: string }[],
): readonly EligibilityResultPoint[] {
	return rows.map((row) => ({
		id: row.id,
		good: row.good,
		show: requireResultPointShow(row.id),
		text: row.text,
	}));
}

const RAIL_RESOLVE: Record<string, (ctx: EligibilityRailContext) => boolean> = {
	repair: ({ result }) => result.meetsRepair,
	safety: ({ result }) => result.meetsSafety,
	days: ({ result }) => result.meetsDays,
	window: ({ withinWindow }) => withinWindow === true,
	impairment: ({ impairs }) => impairs === true,
};

function requireRailResolve(id: string) {
	const resolve = RAIL_RESOLVE[id];
	if (!resolve) {
		throw new Error(`Unknown eligibility rail factor id: ${id}`);
	}
	return resolve;
}

export function hydrateEligibilityRailFactors(
	rows: readonly { id: string; label: string }[],
): EligibilityQualifyingFactor[] {
	return rows.map((row) => ({
		id: row.id,
		label: row.label,
		resolveMet: requireRailResolve(row.id),
	}));
}

export function flowByIndexFromSteps(
	steps: EligibilityFlowStep[],
): Record<number, EligibilityFlowStep> {
	return Object.fromEntries(steps.map((s) => [s.index, s])) as Record<number, EligibilityFlowStep>;
}

export function hydrateBuybackSliderFields(
	rows: Omit<BuybackSliderField, 'display' | 'hint'>[],
): BuybackSliderField[] {
	return rows.map((row) => {
		const base = { ...row } as BuybackSliderField;
		switch (row.key) {
			case 'price':
				base.display = (value) => `$${formatNumber(value)}`;
				break;
			case 'months':
				base.display = (value) => `${value} mo`;
				break;
			case 'miles':
				base.display = (value) => `${formatNumber(value)} mi`;
				base.hint = () => 'Used for the statutory mileage offset (÷ 120,000).';
				break;
			case 'attempts':
				base.display = (value) => `${value}`;
				break;
			case 'days':
				base.display = (value) => `${value} days`;
				break;
			default:
				base.display = (value) => String(value);
		}
		return base;
	});
}

export function buybackStatesEqual(a: BuybackState, b: BuybackState) {
	return (
		a.price === b.price &&
		a.months === b.months &&
		a.miles === b.miles &&
		a.attempts === b.attempts &&
		a.days === b.days
	);
}

type GuidebookGlanceCopy = {
	chaptersLabel: string;
	readingTimeLabel: string;
	bestForLabel: string;
	bestForValue: string;
};

export function buildGuidebookHubGlanceFacts(
	chapters: readonly { estimatedReadMinutes: number }[],
	copy: GuidebookGlanceCopy,
): { label: string; value: string }[] {
	const totalMinutes = chapters.reduce((sum, chapter) => sum + chapter.estimatedReadMinutes, 0);
	return [
		{ label: copy.chaptersLabel, value: String(chapters.length) },
		{
			label: copy.readingTimeLabel,
			value: `~${totalMinutes} min`,
		},
		{ label: copy.bestForLabel, value: copy.bestForValue },
	];
}
