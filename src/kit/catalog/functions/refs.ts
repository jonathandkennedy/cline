import type { DataRef } from '../types/tree';

export type SiteDataIndex = Record<string, Record<string, unknown>>;

const DATA_REF_STRING = /^[a-z0-9][a-z0-9/_-]*\.[A-Za-z0-9_]+$/;

export function isDataRef(value: unknown): value is DataRef {
	if (typeof value === 'string') {
		if (
			value.startsWith('/') ||
			value.startsWith('http://') ||
			value.startsWith('https://') ||
			value.startsWith('tel:') ||
			value.startsWith('mailto:')
		) {
			return false;
		}
		return DATA_REF_STRING.test(value);
	}
	if (value === null || Array.isArray(value)) return false;
	return typeof (value as { $ref?: unknown }).$ref === 'string';
}

function refPath(ref: DataRef): string {
	return typeof ref === 'string' ? ref : ref.$ref;
}

export function resolveDataRef(ref: DataRef, index: SiteDataIndex): unknown {
	const path = refPath(ref);
	const dot = path.lastIndexOf('.');
	if (dot <= 0 || dot === path.length - 1) {
		throw new Error(`[site] invalid $ref "${path}" — expected "file/key"`);
	}
	const file = path.slice(0, dot);
	const key = path.slice(dot + 1);
	const table = index[file];
	if (!table) {
		throw new Error(`[site] unknown data file in $ref "${path}"`);
	}
	if (!(key in table)) {
		throw new Error(`[site] missing key "${key}" in "${file}"`);
	}
	return table[key];
}

export function resolveDataRefAs<T>(ref: DataRef, index: SiteDataIndex): T {
	return resolveDataRef(ref, index) as T;
}
