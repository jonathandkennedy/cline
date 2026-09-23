import type { AppDefinition } from '../types';

/** Frozen tool manifest — pipeline SSOT analogue of `@/kit/catalog` `definePage`. */
export function defineApp<T extends AppDefinition>(app: T): Readonly<T> {
	if (!app.uuid?.trim()) {
		throw new Error(`App "${app.slug}" is missing uuid.`);
	}
	if (!app.title?.trim()) {
		throw new Error(`App "${app.slug}" is missing title.`);
	}
	if (!Array.isArray(app.pipelineJson) || app.pipelineJson.length === 0) {
		throw new Error(`App "${app.slug}" must declare a non-empty pipelineJson.`);
	}

	return Object.freeze(app);
}

export function toEngineApp(
	app: AppDefinition,
	id = app.slug,
): {
	id: string;
	attributes: AppDefinition & Record<string, unknown>;
} {
	return {
		id,
		attributes: {
			...app,
			generator: app.generator ?? {
				pricing: { generate: 0, retry: 0 },
			},
		},
	};
}
