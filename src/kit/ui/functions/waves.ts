const BATCH_SIZE = 3;
const STAGGER_MS = 1200;
const WAVE_PAUSE_MS = 3000;

export function startFirmLogoGridWaves({
	slotCount,
	onSlotCycle,
}: {
	slotCount: number;
	onSlotCycle: (slotIndex: number) => void;
}): () => void {
	const timers: ReturnType<typeof setTimeout>[] = [];
	let cancelled = false;

	const clearTimers = () => {
		for (const id of timers) clearTimeout(id);
		timers.length = 0;
	};

	const schedule = (fn: () => void, ms: number) => {
		const id = setTimeout(() => {
			if (!cancelled) fn();
		}, ms);
		timers.push(id);
	};

	const runWave = (startIndex: number) => {
		if (cancelled) return;
		for (let i = 0; i < BATCH_SIZE; i++) {
			const slotIndex = (startIndex + i) % slotCount;
			schedule(() => onSlotCycle(slotIndex), i * STAGGER_MS);
		}
		schedule(
			() => runWave((startIndex + BATCH_SIZE) % slotCount),
			BATCH_SIZE * STAGGER_MS + WAVE_PAUSE_MS,
		);
	};

	runWave(0);

	return () => {
		cancelled = true;
		clearTimers();
	};
}
