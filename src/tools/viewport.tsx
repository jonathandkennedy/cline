'use client';

import { BookOpen } from 'lucide-react';
import { createContext, type ReactNode, useContext } from 'react';

const ShowWelcomeContext = createContext<(() => void) | null>(null);

export type ToolViewProviderProps = {
	onShowWelcome: () => void;
	children: ReactNode;
};

export function ToolViewProvider({ onShowWelcome, children }: ToolViewProviderProps) {
	return (
		<ShowWelcomeContext.Provider value={onShowWelcome}>{children}</ShowWelcomeContext.Provider>
	);
}

function useShowToolWelcome(): (() => void) | null {
	return useContext(ShowWelcomeContext);
}

export function ToolWelcomeButton() {
	const showWelcome = useShowToolWelcome();
	if (!showWelcome) return null;

	return (
		<button
			type="button"
			onClick={showWelcome}
			className="tool-actions__about btn-ghost flex items-center text-[12px] font-medium"
			aria-label="About this tool"
		>
			<BookOpen size={13} aria-hidden="true" />
			<span className="hidden sm:inline">About</span>
		</button>
	);
}
