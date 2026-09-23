import type { SitePageDefinition } from '../types/tree';

export function definePage<T extends SitePageDefinition>(page: T): Readonly<T> {
	return Object.freeze(page);
}

export function defineSiteCatalog<const T extends Record<string, SitePageDefinition>>(
	pages: T,
): Readonly<{ version: 1; pages: T }> {
	return Object.freeze({ version: 1 as const, pages });
}
