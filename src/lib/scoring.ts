import { LAW } from '@/kit/pipeline';

export type EligResult = {
	qualifies: boolean;
	score: number;
	strength: 'Strong' | 'Moderate' | 'Review';
	meetsRepair: boolean;
	meetsDays: boolean;
	meetsSafety: boolean;
	presumption: boolean;
	anyTrigger: boolean;
};

type EligibilityCalcInputs = {
	attempts: number;
	daysOut: number;
	impairs: boolean | null;
	safety: boolean | null;
	withinWindow: boolean | null;
};

export function computeEligibilityResult({
	attempts,
	daysOut,
	impairs,
	safety,
	withinWindow,
}: EligibilityCalcInputs): EligResult {
	const meetsRepair = attempts >= LAW.repairAttempts;
	const meetsSafety = safety === true && attempts >= LAW.safetyRepairAttempts;
	const meetsDays = daysOut > LAW.daysOutOfService;
	const anyTrigger = meetsRepair || meetsSafety || meetsDays;
	const qualifies = withinWindow === true;
	const presumption = qualifies;

	let score = 0;
	if (withinWindow === true) score += 45;
	if (impairs) score += 20;
	if (meetsSafety) score += 15;
	if (meetsRepair) score += 12;
	if (meetsDays) score += 12;
	if (!meetsRepair && !meetsSafety && attempts >= 2) score += 8;
	if (daysOut >= 45) score += 5;
	score = Math.min(100, score);

	let strength: EligResult['strength'] = 'Review';
	if (score >= 75) strength = 'Strong';
	else if (score >= 45) strength = 'Moderate';

	return {
		qualifies,
		score,
		strength,
		meetsRepair,
		meetsDays,
		meetsSafety,
		presumption,
		anyTrigger,
	};
}
