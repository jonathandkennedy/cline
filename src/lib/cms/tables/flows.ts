import buybackTable from '@/data/settings/buyback.json';
import checklistTable from '@/data/settings/checklist.json';
import eligibilityTable from '@/data/settings/eligibility.json';
import {
	buildEligibilitySummaryValueByKey,
	flowByIndexFromSteps,
	hydrateBuybackSliderFields,
	hydrateEligibilityRailFactors,
	hydrateEligibilityResultPoints,
} from '../helpers';
import { table } from '../parse';
import type {
	BuybackBreakdownRow,
	BuybackPresumptionItem,
	CompositionSegmentKey,
	EligibilityAnswerSummaryKey,
	EligibilityFlowStep,
	EligibilityStrength,
	VehicleType,
} from '../types';

export const ELIGIBILITY_ANSWER_SUMMARY_FIELDS = table(
	eligibilityTable.ELIGIBILITY_ANSWER_SUMMARY_FIELDS,
) as ReadonlyArray<{
	step: number;
	label: string;
	key: EligibilityAnswerSummaryKey;
}>;
export const ELIGIBILITY_FLOW_STEPS = table(
	eligibilityTable.ELIGIBILITY_FLOW_STEPS,
) as EligibilityFlowStep[];
export const ELIGIBILITY_FLOW_BY_INDEX = flowByIndexFromSteps(ELIGIBILITY_FLOW_STEPS);
export const ELIGIBILITY_RANGE_STEP_INDICES = table(
	eligibilityTable.ELIGIBILITY_RANGE_STEP_INDICES,
);
export const ELIGIBILITY_RESULTS_STEP = table(eligibilityTable.ELIGIBILITY_RESULTS_STEP);
export const VEHICLE_OPTIONS = table(eligibilityTable.VEHICLE_OPTIONS) as ReadonlyArray<{
	id: VehicleType;
	label: string;
	description: string;
}>;
export const ELIGIBILITY_RAIL_FACTOR_ITEMS = hydrateEligibilityRailFactors(
	eligibilityTable.ELIGIBILITY_RAIL_FACTOR_ITEMS,
);
export const ELIGIBILITY_DISCLAIMER_ITEMS = table(eligibilityTable.ELIGIBILITY_DISCLAIMER_ITEMS);
export const ELIGIBILITY_FOOT_LINK_ITEMS = table(eligibilityTable.ELIGIBILITY_FOOT_LINK_ITEMS);
export const ELIGIBILITY_STRENGTH_CHROME = table(
	eligibilityTable.ELIGIBILITY_STRENGTH_CHROME,
) as Record<
	EligibilityStrength,
	{
		displayLabel: string;
		strengthColor: string;
		meterColor: string;
		stickyTone: 'recovery' | 'cta' | 'gold';
	}
>;
export const ELIGIBILITY_STICKY_BAR = table(eligibilityTable.ELIGIBILITY_STICKY_BAR);
export const ELIGIBILITY_RAIL_COPY = table(eligibilityTable.ELIGIBILITY_RAIL_COPY);
export const ELIGIBILITY_SUMMARY_VALUE_BY_KEY = buildEligibilitySummaryValueByKey();
export const ELIGIBILITY_RESULT_POINTS = hydrateEligibilityResultPoints(
	eligibilityTable.ELIGIBILITY_RESULT_POINTS,
);
export const ELIGIBILITY_RESULTS_CHROME = table(eligibilityTable.ELIGIBILITY_RESULTS_CHROME);

export const BUYBACK_DEFAULTS = table(buybackTable.BUYBACK_DEFAULTS);
export const BUYBACK_PRESETS = table(buybackTable.BUYBACK_PRESETS);
export const BUYBACK_BREAKDOWN_ROWS = table(
	buybackTable.BUYBACK_BREAKDOWN_ROWS,
) as BuybackBreakdownRow[];
export const BUYBACK_COMPOSITION_SEGMENTS = table(buybackTable.BUYBACK_COMPOSITION_SEGMENTS) as {
	key: CompositionSegmentKey;
	label: string;
	color: string;
}[];
export const BUYBACK_PRESUMPTION_ITEMS = table(
	buybackTable.BUYBACK_PRESUMPTION_ITEMS,
) as BuybackPresumptionItem[];
export const BUYBACK_SLIDER_FIELDS = hydrateBuybackSliderFields(
	buybackTable.BUYBACK_SLIDER_FIELDS as Parameters<typeof hydrateBuybackSliderFields>[0],
);
export const BUYBACK_RAIL_CHROME = table(buybackTable.BUYBACK_RAIL_CHROME);

export const CHECKLIST_FOOT_DISCLAIMER_ITEMS = table(
	checklistTable.CHECKLIST_FOOT_DISCLAIMER_ITEMS,
);
export const CHECKLIST_FOOT_LINK_ITEMS = table(checklistTable.CHECKLIST_FOOT_LINK_ITEMS);
export const CHECKLIST_UI = table(checklistTable.CHECKLIST_UI);
