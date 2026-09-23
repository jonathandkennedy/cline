import siteCatalog from '@/data/site/catalog.json';
import type { SiteCatalog, SitePageDefinition } from '@/kit/catalog';

import { resolveSiteDataRef } from './refs';

export const SITE_CATALOG = siteCatalog as SiteCatalog;

export type SitePageId = keyof typeof SITE_CATALOG.pages & string;

export function getSitePageDefinition(pageId: string): SitePageDefinition {
	const page = SITE_CATALOG.pages[pageId];
	if (!page) {
		throw new Error(`[site] unknown page id "${pageId}"`);
	}
	return page;
}

export function getSitePageByRoute(route: string): SitePageDefinition | undefined {
	return Object.values(SITE_CATALOG.pages).find((p) => p.route === route);
}

export function resolveSitePageMain<T>(pageId: SitePageId): T {
	const page = getSitePageDefinition(pageId);
	if (!page.main) {
		throw new Error(`[site] page "${pageId}" has no main tree ref`);
	}
	return resolveSiteDataRef<T>(page.main);
}

export function resolveSitePageFooter<T>(pageId: SitePageId): T | undefined {
	const page = getSitePageDefinition(pageId);
	if (!page.footer) {
		return undefined;
	}
	return resolveSiteDataRef<T>(page.footer);
}
