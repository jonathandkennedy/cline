'use client';

/** Stateful pipelineJson runner for /tool/[slug] surfaces. */
import { useCallback, useMemo, useState } from 'react';
import { buildPipelineFlow } from '../functions/pipeline/step';
import type { MultistepPipelineStep, PipelineStep } from '../types';

export type PipelineConfiguratorState = {
	active: number;
	value: Record<string, unknown>;
	aggregate?: Record<string, unknown>;
};

export type UsePipelineConfiguratorArgs = {
	pipelineJson: PipelineStep[];
	onFinal?: (aggregate: Record<string, unknown>) => void;
};

export function usePipelineConfigurator({ pipelineJson, onFinal }: UsePipelineConfiguratorArgs) {
	const [multistep, setMultistep] = useState<PipelineConfiguratorState>({
		active: 0,
		value: {},
	});
	const [review, setReview] = useState(false);

	const multistepStep = useMemo(
		() => pipelineJson.find((step): step is MultistepPipelineStep => step.type === 'multistep'),
		[pipelineJson],
	);

	const onFinalInput = useCallback(
		(input: Record<string, unknown>) => {
			onFinal?.(input);
		},
		[onFinal],
	);

	const flow = useMemo(
		() => buildPipelineFlow(pipelineJson, onFinalInput),
		[pipelineJson, onFinalInput],
	);

	const onNext = useCallback(() => {
		const { active, value } = multistep;
		if (active < pipelineJson.length - 1) {
			const nextStep = flow[active + 1];
			if (nextStep) {
				nextStep(value);
				return;
			}
		}
		onFinalInput(value);
	}, [multistep, pipelineJson, flow, onFinalInput]);

	const handleMultistepUpdate = useCallback((data: { aggregate: Record<string, unknown> }) => {
		setMultistep((prev) => ({
			...prev,
			value: data.aggregate,
			aggregate: data.aggregate,
		}));
	}, []);

	const handleMultistepFinish = useCallback(() => {
		setReview(true);
	}, []);

	const isPipelineEmpty = pipelineJson.length === 0;

	return {
		isPipelineEmpty,
		pipelineJson,
		multistep,
		setMultistep,
		review,
		setReview,
		multistepStep,
		onNext,
		handleMultistepUpdate,
		handleMultistepFinish,
	};
}
