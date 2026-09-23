import type { DataRef } from '../types/tree';
import { resolveDataRef, isDataRef, type SiteDataIndex } from './refs';

export type SiteComponentProps = Record<string, unknown>;

export type SiteComponentDef = {
	kind: string;
	props?: SiteComponentProps;
};

export type SiteRegistrySpec = {
	main?: Record<string, SiteComponentDef>;
	footer?: Record<string, SiteComponentDef>;
	chrome?: Record<string, SiteComponentDef>;
};

export type SiteComponentsSchema = {
	version: number;
	registries: Record<string, SiteRegistrySpec>;
};

export type SiteComponentKindRenderer = (props: Record<string, unknown>) => unknown;

export type SiteComponentKindMap = Record<string, SiteComponentKindRenderer>;

export function defineComponent<T extends SiteComponentDef>(component: T): Readonly<T> {
	if (!component.kind?.trim()) {
		throw new Error('[site] component.kind is required');
	}
	return Object.freeze(component);
}

export function defineSiteComponentsSchema<const T extends SiteComponentsSchema['registries']>(
	registries: T,
): Readonly<{ version: 1; registries: T }> {
	return Object.freeze({ version: 1 as const, registries });
}

function resolveComponentProps(
	props: SiteComponentDef['props'],
	index: SiteDataIndex,
): Record<string, unknown> {
	if (!props) return {};
	const out: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(props)) {
		if (isDataRef(value)) {
			out[key] = resolveDataRef(value, index);
		} else {
			out[key] = value;
		}
	}
	return out;
}

export function createComponentRenderer(
	def: SiteComponentDef,
	kinds: SiteComponentKindMap,
	index: SiteDataIndex,
): () => unknown {
	const renderKind = kinds[def.kind];
	if (!renderKind) {
		throw new Error(`[site] unknown component kind "${def.kind}"`);
	}
	const props = resolveComponentProps(def.props, index);
	return () => renderKind(props);
}

export function createBlockRegistryFromSpec(
	spec: Record<string, SiteComponentDef>,
	kinds: SiteComponentKindMap,
	index: SiteDataIndex,
): Record<string, () => unknown> {
	return Object.fromEntries(
		Object.entries(spec).map(([blockId, def]) => [
			blockId,
			createComponentRenderer(def, kinds, index),
		]),
	);
}

export function createSiteRegistryBundle(
	registrySpec: SiteRegistrySpec,
	kinds: SiteComponentKindMap,
	index: SiteDataIndex,
): {
	main: Record<string, () => unknown>;
	footer?: Record<string, () => unknown>;
	chrome?: Record<string, () => unknown>;
} {
	return {
		main: registrySpec.main ? createBlockRegistryFromSpec(registrySpec.main, kinds, index) : {},
		footer: registrySpec.footer
			? createBlockRegistryFromSpec(registrySpec.footer, kinds, index)
			: undefined,
		chrome: registrySpec.chrome
			? createBlockRegistryFromSpec(registrySpec.chrome, kinds, index)
			: undefined,
	};
}

export function createSiteRegistryById(
	schema: SiteComponentsSchema,
	kinds: SiteComponentKindMap,
	index: SiteDataIndex,
): Record<
	string,
	{
		main: Record<string, () => unknown>;
		footer?: Record<string, () => unknown>;
		chrome?: Record<string, () => unknown>;
	}
> {
	return Object.fromEntries(
		Object.entries(schema.registries).map(([registryId, registrySpec]) => [
			registryId,
			createSiteRegistryBundle(registrySpec, kinds, index),
		]),
	);
}
