/** Form field types for multistep pipelineJson steps. */
import type { PipelineStep } from './pipeline';

export type FormFieldIcon = {
	src: string;
};

export type FormFieldOption = {
	id: string;
	label: string;
	description?: string;
	icon?: FormFieldIcon;
};

export type StepSchemaField = {
	name: string;
	type: string;
	label?: string | false;
	placeholder?: string;
	value?: unknown;
	defaultValue?: unknown;
	columns?: number;
	options?: FormFieldOption[];
	min?: number;
	max?: number;
	unit?: string;
	hint?: string;
	[key: string]: unknown;
};

export type MultistepFormStepConfig = {
	submit?: {
		label?: string;
		sticky?: boolean | { sx?: Record<string, unknown> };
	};
	spacing?: number;
	[key: string]: unknown;
};

export type MultistepStep = {
	label?: string;
	title?: string;
	description?: string;
	form?: MultistepFormStepConfig;
	schema: StepSchemaField[];
	conditions?: Array<Record<string, unknown>>;
	[key: string]: unknown;
};

export type MultistepPipelineStep = PipelineStep & {
	type: 'multistep';
	steps: MultistepStep[];
};

export type ChecklistCategory = {
	name: string;
	items: readonly string[];
};

export type ChecklistPipelineStep = PipelineStep & {
	type: 'checklist';
	categories: ChecklistCategory[];
	notesField?: { name: string; label?: string; placeholder?: string };
};

export type CalculatorPipelineStep = PipelineStep & {
	type: 'calculator';
	schema: StepSchemaField[];
	presets?: Array<{ label: string; values: Record<string, number> }>;
};

export type OutcomePipelineStep = PipelineStep & {
	type: 'outcome';
	outcomeId: string;
};
