/** Discriminated pipeline step unions (kind registry for tools). */
export type PipelineStep = {
	type: string;
	[key: string]: unknown;
};

export type GeneratorPricing = {
	generate: number;
	retry: number;
};

export type GeneratorPipelineStep = PipelineStep & {
	type: 'generator';
	pricing?: GeneratorPricing;
	recap?: boolean;
	prompts?: Record<string, unknown>;
	variables?: unknown;
	[key: string]: unknown;
};

export type VariablesPipelineStep = PipelineStep & {
	type: 'variables';
	ignore?: string[];
};
