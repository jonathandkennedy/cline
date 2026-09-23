'use client';

import { type ChangeEvent, useCallback } from 'react';
import type { VehicleType } from '@/lib/cms';
import type { EligResult } from '@/lib/scoring';
import { ELIGIBILITY_FLOW_BY_INDEX, ELIGIBILITY_RESULTS_STEP } from '@/lib/cms';
import { EligibilityCheckerResults } from '@/tools/outcomes';
import { ELIGIBILITY_STEP_BY_KIND, type EligibilityFlowStepContext } from '@/tools/phases';

type AnswerSummary = { label: string; value: string; step: number };

export function EligibilityCheckerFlow({
	step,
	vehicleType,
	withinWindow,
	attempts,
	daysOut,
	impairs,
	safety,
	result,
	strengthColor,
	calcHref,
	answersSummary: _answersSummary,
	onVehicleType,
	onWithinWindow,
	onAttemptsChange,
	onDaysOutChange,
	onImpairs,
	onSafety,
	onAdvance,
	onBack,
	onGoEdit: _onGoEdit,
	onOpenEval,
	onStartOver: _onStartOver,
}: {
	step: number;
	vehicleType: VehicleType;
	withinWindow: boolean | null;
	attempts: number;
	daysOut: number;
	impairs: boolean | null;
	safety: boolean | null;
	result: EligResult;
	strengthColor: string;
	calcHref: string;
	answersSummary: AnswerSummary[];
	onVehicleType: (t: VehicleType) => void;
	onWithinWindow: (v: boolean) => void;
	onAttemptsChange: (v: number) => void;
	onDaysOutChange: (v: number) => void;
	onImpairs: (v: boolean) => void;
	onSafety: (v: boolean) => void;
	onAdvance: () => void;
	onBack: () => void;
	onGoEdit: (n: number) => void;
	onOpenEval: () => void;
	onStartOver: () => void;
}) {
	const handleVehicleType = useCallback(
		(t: VehicleType) => () => {
			onVehicleType(t);
			onAdvance();
		},
		[onVehicleType, onAdvance],
	);

	const handleWithinWindow = useCallback(
		(v: boolean) => {
			onWithinWindow(v);
			onAdvance();
		},
		[onWithinWindow, onAdvance],
	);

	const handleImpairs = useCallback(
		(v: boolean) => {
			onImpairs(v);
			onAdvance();
		},
		[onImpairs, onAdvance],
	);

	const handleSafety = useCallback(
		(v: boolean) => {
			onSafety(v);
			onAdvance();
		},
		[onSafety, onAdvance],
	);

	const handleAttemptsChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onAttemptsChange(Number.parseInt(e.target.value));
		},
		[onAttemptsChange],
	);

	const handleDaysOutChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onDaysOutChange(Number.parseInt(e.target.value));
		},
		[onDaysOutChange],
	);

	if (step === ELIGIBILITY_RESULTS_STEP) {
		return (
			<EligibilityCheckerResults
				result={result}
				strengthColor={strengthColor}
				calcHref={calcHref}
				withinWindow={withinWindow}
				impairs={impairs}
				onOpenEval={onOpenEval}
			/>
		);
	}

	const config = ELIGIBILITY_FLOW_BY_INDEX[step];
	if (!config) return null;

	const ctx: EligibilityFlowStepContext = {
		vehicleType,
		withinWindow,
		attempts,
		daysOut,
		impairs,
		safety,
		onBack,
		onAdvance,
		handleVehicleType,
		handleWithinWindow,
		handleImpairs,
		handleSafety,
		handleAttemptsChange,
		handleDaysOutChange,
	};

	const Step = ELIGIBILITY_STEP_BY_KIND[config.kind];
	return <Step config={config} ctx={ctx} />;
}
