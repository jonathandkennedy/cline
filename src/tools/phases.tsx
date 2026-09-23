'use client';

import type { ChangeEvent, ReactElement } from 'react';
import { RangeInput } from '@/components/range';
import type { VehicleType } from '@/lib/cms';
import {
	type EligibilityFlowStep,
	type EligibilityRangeStep,
	type EligibilityYesNoStep,
	VEHICLE_OPTIONS,
} from '@/lib/cms';
import { BigNumber, NavRow, Question, YesNo } from '@/tools/facade';

export type EligibilityFlowStepContext = {
	vehicleType: VehicleType;
	withinWindow: boolean | null;
	attempts: number;
	daysOut: number;
	impairs: boolean | null;
	safety: boolean | null;
	onBack: () => void;
	onAdvance: () => void;
	handleVehicleType: (t: VehicleType) => () => void;
	handleWithinWindow: (v: boolean) => void;
	handleImpairs: (v: boolean) => void;
	handleSafety: (v: boolean) => void;
	handleAttemptsChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleDaysOutChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const RANGE_FIELD_BINDINGS: Record<
	EligibilityRangeStep['field'],
	{
		value: (ctx: EligibilityFlowStepContext) => number;
		onChange: (ctx: EligibilityFlowStepContext) => (e: ChangeEvent<HTMLInputElement>) => void;
	}
> = {
	attempts: {
		value: (ctx) => ctx.attempts,
		onChange: (ctx) => ctx.handleAttemptsChange,
	},
	daysOut: {
		value: (ctx) => ctx.daysOut,
		onChange: (ctx) => ctx.handleDaysOutChange,
	},
};

function VehicleStep({
	config,
	ctx,
}: {
	config: Extract<EligibilityFlowStep, { kind: 'vehicle' }>;
	ctx: EligibilityFlowStepContext;
}) {
	return (
		<Question title={config.title} subtitle={config.subtitle}>
			<div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
				{VEHICLE_OPTIONS.map((opt) => (
					<button
						type="button"
						key={opt.id}
						data-active={ctx.vehicleType === opt.id}
						onClick={ctx.handleVehicleType(opt.id)}
						className="tile min-h-[56px] p-4 text-left sm:min-h-[3.5rem] sm:p-5"
					>
						<div className="text-[14px] font-semibold leading-snug sm:text-[16px]">{opt.label}</div>
						<div className="mt-1 text-[11.5px] leading-snug text-muted sm:text-[12.5px]">
							{opt.description}
						</div>
					</button>
				))}
			</div>
		</Question>
	);
}

function YesNoStep({
	config,
	ctx,
}: {
	config: EligibilityYesNoStep;
	ctx: EligibilityFlowStepContext;
}) {
	const yesNoValues: Record<EligibilityYesNoStep['answerKey'], boolean | null> = {
		withinWindow: ctx.withinWindow,
		impairs: ctx.impairs,
		safety: ctx.safety,
	};
	const yesNoHandlers: Record<EligibilityYesNoStep['answerKey'], (v: boolean) => void> = {
		withinWindow: ctx.handleWithinWindow,
		impairs: ctx.handleImpairs,
		safety: ctx.handleSafety,
	};
	const answerKey = config.answerKey;
	return (
		<Question title={config.title} subtitle={config.subtitle}>
			<YesNo
				value={yesNoValues[answerKey]}
				onSelect={yesNoHandlers[answerKey]}
				yesLabel={config.yesLabel}
				noLabel={config.noLabel}
			/>
			<NavRow onBack={ctx.onBack} hideNext />
		</Question>
	);
}

function RangeStep({
	config,
	ctx,
}: {
	config: EligibilityRangeStep;
	ctx: EligibilityFlowStepContext;
}) {
	const binding = RANGE_FIELD_BINDINGS[config.field];
	const value = binding.value(ctx);
	const onChange = binding.onChange(ctx);
	const unit = value === 1 ? config.unit.replace(/s$/, '') : config.unit;

	return (
		<Question title={config.title} subtitle={config.subtitle}>
			<BigNumber value={value} unit={unit} />
			<RangeInput
				className="mt-6"
				min={config.min}
				max={config.max}
				value={value}
				onChange={onChange}
				aria-label={config.title}
				aria-valuetext={`${value} ${unit}`}
			/>
			<NavRow onBack={ctx.onBack} onNext={ctx.onAdvance} />
		</Question>
	);
}

export const ELIGIBILITY_STEP_BY_KIND: Record<
	EligibilityFlowStep['kind'],
	(props: { config: EligibilityFlowStep; ctx: EligibilityFlowStepContext }) => ReactElement | null
> = {
	vehicle: ({ config, ctx }) => (
		<VehicleStep config={config as Extract<EligibilityFlowStep, { kind: 'vehicle' }>} ctx={ctx} />
	),
	yesno: ({ config, ctx }) => <YesNoStep config={config as EligibilityYesNoStep} ctx={ctx} />,
	range: ({ config, ctx }) => <RangeStep config={config as EligibilityRangeStep} ctx={ctx} />,
};
