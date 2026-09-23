'use client';

import { useCallback, useContext, useMemo, useState } from 'react';
import { MegaBridgeContext } from '../contexts';
import type { MegaBridgeContextValue, MegaBridgeSnapshot } from '../types/mega';

/** Hook used to own mega-menu bridge snapshot state for the mega provider. */
export function useMegaContext(_args: Record<string, unknown> = {}): MegaBridgeContextValue {
	const [snapshot, setSnapshot] = useState<MegaBridgeSnapshot | null>(null);
	const publishMegaBridge = useCallback((next: MegaBridgeSnapshot | null) => {
		setSnapshot(next);
	}, []);
	return useMemo(() => ({ snapshot, publishMegaBridge }), [snapshot, publishMegaBridge]);
}

/** Hook used to read mega-menu bridge snapshot state from the mega provider. */
export function useMega(): MegaBridgeContextValue {
	const context = useContext(MegaBridgeContext);
	if (context === null) {
		throw new Error('useMega must be used within MegaBridgeProvider');
	}
	return context;
}
