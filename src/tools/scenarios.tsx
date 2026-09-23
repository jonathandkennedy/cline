'use client';

import { useCallback } from 'react';
import { BUYBACK_PRESETS, type BuybackState, buybackStatesEqual } from '@/lib/cms';

function BuybackPresetButton({
	label,
	state,
	active,
	onApply,
}: {
	label: string;
	state: BuybackState;
	active: boolean;
	onApply: (state: BuybackState) => void;
}) {
	const handleClick = useCallback(() => {
		onApply(state);
	}, [onApply, state]);

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`workbench-head__preset${active ? ' workbench-head__preset--active' : ''}`}
			aria-pressed={active}
		>
			{label}
		</button>
	);
}

export function BuybackQuickScenarios({
	current,
	onApply,
}: {
	current: BuybackState;
	onApply: (state: BuybackState) => void;
}) {
	return (
		<div className="workbench-head__presets">
			<span className="workbench-head__presets-label">Examples</span>
			<div className="workbench-head__presets-row" role="group" aria-label="Examples">
				{BUYBACK_PRESETS.map((p) => (
					<BuybackPresetButton
						key={p.label}
						label={p.label}
						state={p.state}
						active={buybackStatesEqual(p.state, current)}
						onApply={onApply}
					/>
				))}
			</div>
		</div>
	);
}
