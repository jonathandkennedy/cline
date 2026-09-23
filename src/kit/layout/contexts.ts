'use client';

import { createContext } from 'react';

import type { MegaBridgeContextValue } from './types/mega';

export type LayoutChrome = {
	title: string;
	subtitle: string;
};

export type ToolPhase = 'welcome' | 'workbench' | null;

export type LayoutContextValue = LayoutChrome & {
	toolPhase: ToolPhase;
	setChrome: (chrome: Partial<LayoutChrome>) => void;
	setToolPhase: (phase: ToolPhase) => void;
	resetChrome: () => void;
};

export const MegaBridgeContext = createContext<MegaBridgeContextValue | null>(null);

export const LayoutContext = createContext<LayoutContextValue | null>(null);
