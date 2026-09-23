'use client';

import { type ReactNode, useContext, useLayoutEffect } from 'react';

import { layoutChromeBaseline } from '../constants/chrome';
import { type LayoutChrome, LayoutContext } from '../contexts';
import { useLayout } from '../hooks/use-layout';
import type { LayoutChromeReadonly } from '../types/layout';

export type ProviderProps = {
	children: ReactNode;
	defaultChrome: LayoutChrome;
};

export function Provider({ children, defaultChrome }: ProviderProps) {
	useLayoutEffect(() => {
		layoutChromeBaseline.title = defaultChrome.title;
		layoutChromeBaseline.subtitle = defaultChrome.subtitle;
	}, [defaultChrome]);

	return children;
}

export function useLayoutChrome() {
	return useLayout();
}

export function useLayoutChromeOptional(defaultChrome: LayoutChrome): LayoutChromeReadonly {
	const ctx = useContext(LayoutContext);
	const title = ctx?.title?.trim() ? ctx.title : defaultChrome.title;
	const subtitle = ctx?.subtitle?.trim() ? ctx.subtitle : defaultChrome.subtitle;
	return { title, subtitle, toolPhase: ctx?.toolPhase ?? null };
}
