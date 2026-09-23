import { LAW } from '@/kit/pipeline';
import { COLLATERAL_RATE, INCIDENTALS_CAP, RENTAL_PER_DAY, TOWING_BUFFER } from '@/lib/constants';

type BuybackCalcInputs = {
	price: number;
	months: number;
	milesAtFirstRepair: number;
	attempts: number;
	days: number;
};

export type BuybackCalcResult = {
	total: number;
	gross: number;
	offset: number;
	strong: boolean;
	meetsRepair: boolean;
	meetsDays: boolean;
	withinWindow: boolean;
	civilPenaltyMax: number;
	breakdown: {
		price: number;
		collateral: number;
		incidentals: number;
		offset: number;
	};
};

export function computeBuybackCalc({
	price,
	months: _months,
	milesAtFirstRepair,
	attempts,
	days,
}: BuybackCalcInputs): BuybackCalcResult {
	const offset = Math.round(price * (milesAtFirstRepair / LAW.mileageOffsetDenominator));
	const collateral = Math.round(price * COLLATERAL_RATE);
	const incidentals = Math.min(Math.round(days * RENTAL_PER_DAY + TOWING_BUFFER), INCIDENTALS_CAP);

	const gross = price + collateral + incidentals;
	const total = Math.max(0, gross - offset);

	const meetsRepair = attempts >= LAW.repairAttempts;
	const meetsDays = days > LAW.daysOutOfService;
	const withinWindow = false;
	const strong = meetsRepair || meetsDays;

	return {
		total,
		gross,
		offset,
		strong,
		meetsRepair,
		meetsDays,
		withinWindow,
		civilPenaltyMax: total * LAW.civilPenaltyMultiple,
		breakdown: { price, collateral, incidentals, offset },
	};
}
