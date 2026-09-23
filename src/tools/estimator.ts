import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { LeadPrefill } from '@/components';
import { computeBuybackCalc } from '@/lib/arithmetic';
import { STORAGE_KEYS } from '@/lib/constants';
import {
	embedMarketingToolUrl,
	parseEmbedSiteHome,
	parseVehicleTypeParam,
	withPreservedToolQuery,
} from '@/lib/lookup';
import { buybackHasProgress } from '@/lib/milestone';
import { BUYBACK_DEFAULTS, type BuybackState, buybackStatesEqual, UI_COPY } from '@/lib/cms';
import { clearStore, loadStore, saveStore } from '@/lib/storage';

export function useBuybackCalculator(onRestart?: () => void) {
	const params = useSearchParams();
	const qpNum = useCallback(
		(key: string, fallback: number) => {
			const raw = params.get(key);
			const n = raw === null ? Number.NaN : Number(raw);
			return Number.isFinite(n) ? n : fallback;
		},
		[params],
	);

	const prefilled =
		params.has('attempts') ||
		params.has('days') ||
		params.has('type') ||
		params.has('price') ||
		params.has('months') ||
		params.has('miles');

	const [linkCopied, setLinkCopied] = useState(false);
	const [initialState] = useState(() =>
		prefilled ? null : loadStore<BuybackState>(STORAGE_KEYS.buyback),
	);

	const [price, setPrice] = useState(
		() => initialState?.price ?? qpNum('price', BUYBACK_DEFAULTS.price),
	);
	const [months, setMonths] = useState(
		() => initialState?.months ?? qpNum('months', BUYBACK_DEFAULTS.months),
	);
	const [milesAtFirstRepair, setMilesAtFirstRepair] = useState(
		() => initialState?.miles ?? qpNum('miles', BUYBACK_DEFAULTS.miles),
	);
	const [attempts, setAttempts] = useState(
		() => initialState?.attempts ?? qpNum('attempts', BUYBACK_DEFAULTS.attempts),
	);
	const [days, setDays] = useState(
		() => initialState?.days ?? qpNum('days', BUYBACK_DEFAULTS.days),
	);
	const [showResume, setShowResume] = useState(() => buybackHasProgress(initialState));
	const vehicleType = parseVehicleTypeParam(params.get('type'));

	const calc = useMemo(
		() =>
			computeBuybackCalc({
				price,
				months,
				milesAtFirstRepair,
				attempts,
				days,
			}),
		[price, months, milesAtFirstRepair, attempts, days],
	);

	useEffect(() => {
		const current = {
			price,
			months,
			miles: milesAtFirstRepair,
			attempts,
			days,
		};
		if (buybackStatesEqual(current, BUYBACK_DEFAULTS)) {
			clearStore(STORAGE_KEYS.buyback);
		} else {
			saveStore(STORAGE_KEYS.buyback, current);
		}
	}, [price, months, milesAtFirstRepair, attempts, days]);

	const applyState = useCallback((s: BuybackState) => {
		setPrice(s.price);
		setMonths(s.months);
		setMilesAtFirstRepair(s.miles);
		setAttempts(s.attempts);
		setDays(s.days);
	}, []);

	const reset = useCallback(() => {
		applyState(BUYBACK_DEFAULTS);
		clearStore(STORAGE_KEYS.buyback);
		setShowResume(false);
	}, [applyState]);

	const startOver = useCallback(() => {
		reset();
		onRestart?.();
	}, [reset, onRestart]);

	const shareLink = useCallback(() => {
		const sp = new URLSearchParams({
			price: String(price),
			months: String(months),
			miles: String(milesAtFirstRepair),
			attempts: String(attempts),
			days: String(days),
		});
		if (vehicleType) sp.set('type', vehicleType);
		const path = withPreservedToolQuery(`/tool/buyback-calculator?${sp.toString()}`, params);
		const embedHome = parseEmbedSiteHome(params);
		const url = embedHome
			? embedMarketingToolUrl(embedHome, 'buyback-calculator')
			: `${window.location.origin}${path}`;
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(url).then(
				() => {
					setLinkCopied(true);
					window.setTimeout(() => setLinkCopied(false), 2200);
				},
				() => toast.error(UI_COPY.tools.buybackCopyLinkError),
			);
		} else {
			toast.error(UI_COPY.tools.buybackCopyUnsupported);
		}
	}, [price, months, milesAtFirstRepair, attempts, days, vehicleType, params]);

	const dismissResume = useCallback(() => setShowResume(false), []);

	const prefill: LeadPrefill = useMemo(
		() => ({ estimate: calc.total, vehicleType }),
		[calc.total, vehicleType],
	);

	const currentState = useMemo<BuybackState>(
		() => ({
			price,
			months,
			miles: milesAtFirstRepair,
			attempts,
			days,
		}),
		[price, months, milesAtFirstRepair, attempts, days],
	);

	const isAtDefaults = useMemo(
		() => buybackStatesEqual(currentState, BUYBACK_DEFAULTS),
		[currentState],
	);

	return {
		prefilled,
		showResume,
		linkCopied,
		price,
		setPrice,
		months,
		setMonths,
		milesAtFirstRepair,
		setMilesAtFirstRepair,
		attempts,
		setAttempts,
		days,
		setDays,
		calc,
		applyState,
		reset,
		startOver,
		shareLink,
		dismissResume,
		prefill,
		currentState,
		isAtDefaults,
	};
}
