import type { PageSection, PageSectionData } from '../types/page';
import type { DataRef } from '../types/tree';
import { isDataRef, resolveDataRef, type SiteDataIndex } from './refs';

function resolveSectionDataValue(value: PageSectionData[string], index: SiteDataIndex): unknown {
	if (isDataRef(value as DataRef)) {
		return resolveDataRef(value as DataRef, index);
	}
	if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(value)) {
			out[k] = resolveSectionDataValue(v as PageSectionData[string], index);
		}
		return out;
	}
	return value;
}

function mergeResolvedSectionData(
	target: Record<string, unknown>,
	raw: PageSectionData,
	index: SiteDataIndex,
): void {
	if (isDataRef(raw as DataRef)) {
		const resolved = resolveDataRef(raw as DataRef, index);
		if (resolved !== null && typeof resolved === 'object' && !Array.isArray(resolved)) {
			Object.assign(target, resolved as Record<string, unknown>);
			return;
		}
		target.value = resolved;
		return;
	}
	const entries = Object.entries(raw);
	if (entries.length === 1 && entries[0][0] === '$ref' && isDataRef(entries[0][1] as DataRef)) {
		const resolved = resolveSectionDataValue(entries[0][1], index);
		if (resolved !== null && typeof resolved === 'object' && !Array.isArray(resolved)) {
			Object.assign(target, resolved as Record<string, unknown>);
			return;
		}
	}
	for (const [key, value] of entries) {
		target[key] = resolveSectionDataValue(value, index);
	}
}

export function resolvePageSectionProps(
	section: Exclude<PageSection, { type: 'group' }>,
	index: SiteDataIndex,
): { data: Record<string, unknown>; config: Record<string, unknown> } {
	const data: Record<string, unknown> = {};
	const config: Record<string, unknown> = {};
	if (section.data) {
		mergeResolvedSectionData(data, section.data, index);
	}
	if ('config' in section && section.config) {
		for (const [key, value] of Object.entries(section.config)) {
			config[key] = resolveSectionDataValue(value, index);
		}
	}
	return { data, config };
}

export function mergePageSectionKindProps(
	section: Exclude<PageSection, { type: 'group' }>,
	index: SiteDataIndex,
): Record<string, unknown> {
	const { data, config } = resolvePageSectionProps(section, index);
	return { ...data, ...config };
}

export type PageSectionRenderer = (props: {
	data: Record<string, unknown>;
	config: Record<string, unknown>;
}) => unknown;

export type PageSectionRendererMap = Record<string, PageSectionRenderer>;

export function isPageSectionArray(value: unknown): value is PageSection[] {
	return (
		Array.isArray(value) &&
		value.every(
			(item) =>
				item !== null &&
				typeof item === 'object' &&
				'type' in item &&
				typeof (item as PageSection).type === 'string',
		)
	);
}

export function isPageDocument(value: unknown): value is {
	sections: PageSection[];
	footer?: readonly string[];
} {
	if (value === null || typeof value !== 'object') return false;
	const doc = value as { sections?: unknown };
	return isPageSectionArray(doc.sections);
}
