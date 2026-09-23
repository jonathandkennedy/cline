/** Read-only pipeline introspection over frozen pipelineJson arrays. */
import type {
	AppDefinition,
	CalculatorPipelineStep,
	ChecklistPipelineStep,
	MultistepPipelineStep,
	MultistepStep,
	OutcomePipelineStep,
	PipelineStep,
} from '../../types';

export function findPipelineStep<T extends PipelineStep>(
	pipelineJson: PipelineStep[],
	type: T['type'],
): T | undefined {
	return pipelineJson.find((step) => step.type === type) as T | undefined;
}

export function getMultistepStep(
	app: Pick<AppDefinition, 'pipelineJson'>,
): MultistepPipelineStep | undefined {
	return findPipelineStep<MultistepPipelineStep>(app.pipelineJson, 'multistep');
}

export function getMultistepSteps(app: Pick<AppDefinition, 'pipelineJson'>): MultistepStep[] {
	return getMultistepStep(app)?.steps ?? [];
}

export function getOutcomeStep(
	app: Pick<AppDefinition, 'pipelineJson'>,
): OutcomePipelineStep | undefined {
	return findPipelineStep<OutcomePipelineStep>(app.pipelineJson, 'outcome');
}

export function getCalculatorStep(
	app: Pick<AppDefinition, 'pipelineJson'>,
): CalculatorPipelineStep | undefined {
	return findPipelineStep<CalculatorPipelineStep>(app.pipelineJson, 'calculator');
}

export function getChecklistStep(
	app: Pick<AppDefinition, 'pipelineJson'>,
): ChecklistPipelineStep | undefined {
	return findPipelineStep<ChecklistPipelineStep>(app.pipelineJson, 'checklist');
}

export function getGeneratorStep(app: Pick<AppDefinition, 'pipelineJson'>) {
	return findPipelineStep(app.pipelineJson, 'generator');
}

export function multistepQuestionCount(app: Pick<AppDefinition, 'pipelineJson'>): number {
	return getMultistepSteps(app).length;
}

export function interactiveStepCount(app: Pick<AppDefinition, 'pipelineJson'>): number {
	const questions = multistepQuestionCount(app);
	return getOutcomeStep(app) ? questions + 1 : questions;
}

export function aggregateFieldNames(app: Pick<AppDefinition, 'pipelineJson'>): string[] {
	const names = new Set<string>();

	for (const step of getMultistepSteps(app)) {
		for (const field of step.schema) {
			if (field.name) names.add(field.name);
		}
	}

	const calculator = getCalculatorStep(app);
	if (calculator) {
		for (const field of calculator.schema) {
			if (field.name) names.add(field.name);
		}
	}

	const checklist = getChecklistStep(app);
	if (checklist?.notesField?.name) {
		names.add(checklist.notesField.name);
	}

	return [...names];
}
