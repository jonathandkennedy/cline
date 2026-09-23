'use client';

import type { ReactNode } from 'react';

import { createSiteRegistryById, type SiteComponentsSchema } from '@/kit/catalog';

import { SITE_CATALOG } from '@/lib/cms/catalog';
import { SITE_DATA_INDEX } from '@/lib/cms/dataindex';
import type { ResourceBlockRenderer } from '@/lib/site/branches';
import { siteComponentKinds } from '@/lib/site/kinds';

import siteComponents from '@/data/site/components.json';

const siteComponentsSchema = siteComponents as SiteComponentsSchema;

const built = createSiteRegistryById(siteComponentsSchema, siteComponentKinds, SITE_DATA_INDEX);

export type SiteBlockRegistry = ResourceBlockRenderer<string>;

export type SiteRegistryBundle = {
	main: SiteBlockRegistry;
	footer?: Record<string, () => ReactNode>;
	chrome?: Record<string, () => ReactNode>;
};

export type SiteRegistryId =
	(typeof SITE_CATALOG.pages)[keyof typeof SITE_CATALOG.pages]['registry'];

export const SITE_REGISTRY_BY_ID = built as Record<string, SiteRegistryBundle>;

export function getSiteRegistry(registryId: string): SiteRegistryBundle {
	const registry = SITE_REGISTRY_BY_ID[registryId];
	if (!registry) {
		throw new Error(`[site] missing block registry "${registryId}"`);
	}
	return registry;
}

export { siteComponentKinds };
