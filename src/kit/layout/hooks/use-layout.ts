'use client';

import { useCallback, useContext, useMemo, useRef, useState } from 'react';

import { layoutChromeBaseline } from '../constants/chrome';
import {
	type LayoutChrome,
	LayoutContext,
	type LayoutContextValue,
	type ToolPhase,
} from '../contexts';

function resolveInitialChrome(args: Record<string, unknown>): LayoutChrome {
	const fromArgs = args.defaultChrome;
	if (fromArgs && typeof fromArgs === 'object' && 'title' in fromArgs && 'subtitle' in fromArgs) {
		const title = String((fromArgs as { title?: unknown }).title ?? '').trim();
		const subtitle = String((fromArgs as { subtitle?: unknown }).subtitle ?? '').trim();
		if (title || subtitle) {
			return { title, subtitle };
		}
	}
	return {
		title: layoutChromeBaseline.title,
		subtitle: layoutChromeBaseline.subtitle,
	};
}

/** Hook used to own layout chrome and tool-phase state for the layout provider. */
export function useLayoutContext(args: Record<string, unknown>): LayoutContextValue {
	const [chrome, setChromeState] = useState<LayoutChrome>(() => resolveInitialChrome(args));
	const [toolPhase, setToolPhaseState] = useState<ToolPhase>(null);
	const defaultsRef = useRef(resolveInitialChrome(args));
	defaultsRef.current = resolveInitialChrome(args);

	const setChrome = useCallback((next: Partial<LayoutChrome>) => {
		setChromeState((prev) => {
			const title = next.title ?? prev.title;
			const subtitle = next.subtitle ?? prev.subtitle;
			if (prev.title === title && prev.subtitle === subtitle) return prev;
			return { title, subtitle };
		});
	}, []);

	const setToolPhase = useCallback((phase: ToolPhase) => {
		setToolPhaseState(phase);
	}, []);

	const resetChrome = useCallback(() => {
		const fromArgs = defaultsRef.current;
		const baseline = fromArgs.title || fromArgs.subtitle ? fromArgs : layoutChromeBaseline;
		setChromeState((prev) =>
			prev.title === baseline.title && prev.subtitle === baseline.subtitle
				? prev
				: { title: baseline.title, subtitle: baseline.subtitle },
		);
	}, []);

	return useMemo<LayoutContextValue>(
		() => ({
			...chrome,
			toolPhase,
			setChrome,
			setToolPhase,
			resetChrome,
		}),
		[chrome, toolPhase, setChrome, setToolPhase, resetChrome],
	);
}

/** Hook used to read layout chrome and tool-phase state from the layout provider. */
export function useLayout(): LayoutContextValue {
	const context = useContext(LayoutContext);
	if (context === null) {
		throw new Error('useLayout must be used within Provider');
	}
	return context;
}
