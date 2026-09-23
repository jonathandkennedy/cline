'use client';

import { RotateCcw } from 'lucide-react';
import type { ReactNode } from 'react';
import { ToolWelcomeButton } from '@/tools/viewport';

export type ToolWorkbenchActionsProps = {
	extra?: ReactNode;
	onReset: () => void;
	showReset?: boolean;
};

export function ToolWorkbenchActions({
	extra,
	onReset,
	showReset = true,
}: ToolWorkbenchActionsProps) {
	return (
		<div className="tool-actions">
			<ToolWelcomeButton />
			{extra ? <div className="tool-actions__extra">{extra}</div> : null}
			{showReset ? (
				<button
					type="button"
					onClick={onReset}
					className="tool-actions__reset btn-ghost"
					aria-label="Start over"
				>
					<RotateCcw size={13} aria-hidden="true" />
					<span className="hidden sm:inline">Start Over</span>
				</button>
			) : null}
		</div>
	);
}
