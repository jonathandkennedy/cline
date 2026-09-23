export const LAW = {
	repairAttempts: 4,
	safetyRepairAttempts: 2,
	daysOutOfService: 30,
	presumptionMonths: 18,
	presumptionMiles: 18000,
	mileageOffsetDenominator: 120_000,
	civilPenaltyMultiple: 2,
} as const;

export const PRESUMPTION_WINDOW_LABEL = `Within ${LAW.presumptionMonths} Mo / ${LAW.presumptionMiles / 1000}k Mi`;
