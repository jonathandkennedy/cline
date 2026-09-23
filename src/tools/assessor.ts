import { eligibilityCheckerApp, interactiveStepCount } from '@/kit/pipeline';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { VehicleType } from '@/lib/cms';
import {
	ELIGIBILITY_ANSWER_SUMMARY_FIELDS,
	ELIGIBILITY_RANGE_STEP_INDICES,
	ELIGIBILITY_RESULTS_STEP,
	ELIGIBILITY_STRENGTH_CHROME,
	ELIGIBILITY_SUMMARY_VALUE_BY_KEY,
} from '@/lib/cms';
import { STORAGE_KEYS } from '@/lib/constants';
import { embedAwareToolHref } from '@/lib/lookup';
import { eligibilityHasProgress } from '@/lib/milestone';
import { computeEligibilityResult } from '@/lib/scoring';
import { clearStore, loadStore, saveStore } from '@/lib/storage';
import type { EligibilityPersistedState } from '@/lib/vault';
import type { OpenLead } from '@/tools/shared';

const TOTAL_STEPS = interactiveStepCount(eligibilityCheckerApp);
const RANGE_STEPS = new Set(ELIGIBILITY_RANGE_STEP_INDICES);

export function useEligibilityChecker(onOpenLead: OpenLead, onRestart: () => void) {
	const searchParams = useSearchParams();
	const [initialState] = useState(() =>
		loadStore<EligibilityPersistedState>(STORAGE_KEYS.eligibility),
	);
	const [showResume, setShowResume] = useState(() => eligibilityHasProgress(initialState));

	const [step, setStep] = useState(() => initialState?.step ?? 1);
	const [vehicleType, setVehicleType] = useState<VehicleType>(
		() => initialState?.vehicleType ?? 'New',
	);
	const [withinWindow, setWithinWindow] = useState<boolean | null>(
		() => initialState?.withinWindow ?? null,
	);
	const [attempts, setAttempts] = useState(() => initialState?.attempts ?? 1);
	const [daysOut, setDaysOut] = useState(() => initialState?.daysOut ?? 10);
	const [impairs, setImpairs] = useState<boolean | null>(() => initialState?.impairs ?? null);
	const [safety, setSafety] = useState<boolean | null>(() => initialState?.safety ?? null);

	const editing = useRef(false);

	const result = useMemo(
		() =>
			computeEligibilityResult({
				attempts,
				daysOut,
				impairs,
				safety,
				withinWindow,
			}),
		[attempts, daysOut, impairs, safety, withinWindow],
	);

	useEffect(() => {
		saveStore(STORAGE_KEYS.eligibility, {
			step,
			vehicleType,
			withinWindow,
			attempts,
			daysOut,
			impairs,
			safety,
		});
	}, [step, vehicleType, withinWindow, attempts, daysOut, impairs, safety]);

	const reset = useCallback(() => {
		setStep(1);
		setVehicleType('New');
		setWithinWindow(null);
		setAttempts(1);
		setDaysOut(10);
		setImpairs(null);
		setSafety(null);
		editing.current = false;
		clearStore(STORAGE_KEYS.eligibility);
		setShowResume(false);
	}, []);

	const startOver = useCallback(() => {
		reset();
		onRestart();
	}, [reset, onRestart]);

	const advance = useCallback(() => {
		if (editing.current) {
			editing.current = false;
			setStep(ELIGIBILITY_RESULTS_STEP);
		} else {
			setStep((s) => Math.min(ELIGIBILITY_RESULTS_STEP, s + 1));
		}
	}, []);

	const back = useCallback(() => {
		editing.current = false;
		setStep((s) => Math.max(1, s - 1));
	}, []);

	const goEdit = useCallback((n: number) => {
		editing.current = true;
		setStep(n);
	}, []);

	const openEval = useCallback(
		() =>
			onOpenLead({
				vehicleType,
				issue: safety ? 'Safety-related defect.' : undefined,
			}),
		[onOpenLead, vehicleType, safety],
	);

	const dismissResume = useCallback(() => setShowResume(false), []);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key !== 'Enter') return;
			const el = document.activeElement as HTMLElement | null;
			const tag = (el?.tagName ?? '').toLowerCase();
			const isText =
				tag === 'textarea' || (tag === 'input' && (el as HTMLInputElement).type !== 'range');
			if (isText) return;
			if (RANGE_STEPS.has(step)) {
				e.preventDefault();
				advance();
			} else if (step === ELIGIBILITY_RESULTS_STEP) {
				e.preventDefault();
				openEval();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [step, advance, openEval]);

	const progress = Math.min(100, Math.round(((step - 1) / TOTAL_STEPS) * 100));

	const strengthChrome = ELIGIBILITY_STRENGTH_CHROME[result.strength];
	const strengthColor = strengthChrome.strengthColor;
	const meterColor = strengthChrome.meterColor;
	const stickyTone = strengthChrome.stickyTone;

	const calcHref = embedAwareToolHref(
		`/tool/buyback-calculator?attempts=${attempts}&days=${daysOut}&type=${encodeURIComponent(
			vehicleType,
		)}`,
		searchParams,
	);

	const answered =
		step > 1 || withinWindow !== null || (step >= 3 && attempts > 0) || (step >= 4 && daysOut > 0);

	const summaryCtx = {
		vehicleType,
		withinWindow,
		attempts,
		daysOut,
		impairs,
		safety,
	};

	const answersSummary = useMemo(
		() =>
			ELIGIBILITY_ANSWER_SUMMARY_FIELDS.map((field) => ({
				label: field.label,
				value: ELIGIBILITY_SUMMARY_VALUE_BY_KEY[field.key](summaryCtx),
				step: field.step,
			})),
		[vehicleType, withinWindow, attempts, daysOut, impairs, safety],
	);

	return {
		showResume,
		step,
		vehicleType,
		setVehicleType,
		withinWindow,
		setWithinWindow,
		attempts,
		setAttempts,
		daysOut,
		setDaysOut,
		impairs,
		setImpairs,
		safety,
		setSafety,
		result,
		reset,
		startOver,
		advance,
		back,
		goEdit,
		openEval,
		dismissResume,
		progress,
		strengthColor,
		meterColor,
		stickyTone,
		calcHref,
		answered,
		answersSummary,
		totalSteps: TOTAL_STEPS,
	};
}
