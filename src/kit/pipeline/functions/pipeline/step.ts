/** Pipeline step dispatch by step.type (tool SSOT; site blocks use site/kinds). */
type StepHandler = (input: Record<string, unknown>) => void;

function omitKeys(input: Record<string, unknown>, keys: string[]): Record<string, unknown> {
	const out = { ...input };
	for (const key of keys) {
		delete out[key];
	}
	return out;
}

function variablesStep({
	input,
	callback,
	config,
}: {
	input: Record<string, unknown>;
	callback: StepHandler;
	config: { ignore?: string[] };
}) {
	callback(omitKeys(input, config.ignore ?? []));
}

function generatorStep({
	input,
	callback,
}: {
	input: Record<string, unknown>;
	callback: StepHandler;
}) {
	callback({ variables: input });
}

export function getPipelineStepHandler({
	type,
	callback,
	...rest
}: {
	type: string;
	callback: StepHandler;
	ignore?: string[];
	[key: string]: unknown;
}): StepHandler {
	const config = rest as { ignore?: string[] };

	const steps: Record<string, StepHandler> = {
		variables: (input) => variablesStep({ input, callback, config }),
		generator: (input) => generatorStep({ input, callback }),
		default: (input) => callback(input),
	};

	return steps[type] ?? steps.default;
}

export function buildPipelineFlow(
	pipelineJson: Array<{ type: string; [key: string]: unknown }>,
	onFinal: (input: Record<string, unknown>) => void,
): StepHandler[] {
	const payload: StepHandler[] = [];

	for (const [i, step] of pipelineJson.entries()) {
		const { type, ...config } = step;
		const callback: StepHandler = (input) => {
			if (i < pipelineJson.length - 1) {
				const next = payload[i + 1];
				next?.(input);
			} else {
				onFinal(input);
			}
		};
		const handler = getPipelineStepHandler({
			type,
			callback,
			...config,
		});
		payload.push(handler);
	}

	return payload;
}
