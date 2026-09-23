'use client';

import type { DataRef } from '@/kit/catalog';

import type { HomeFooterBlockId } from '@/lib/cms';
import { getSitePageDefinition, type SitePageId } from '@/lib/cms/catalog';
import { resolveSiteDataRef } from '@/lib/cms/refs';
import type { ResourceTreeNode } from '@/lib/site/branches';
import { getSiteRegistry } from '@/lib/site/registries';
import { ResourcePageChrome } from '@/lib/site/resources/framing';
import { renderResourcePageMain } from '@/lib/site/resources/pageframe';

export function SiteResourcePage({ pageId }: { pageId: SitePageId }) {
	const page = getSitePageDefinition(pageId);
	if (!page.main) {
		throw new Error(`[site] page "${pageId}" has no main tree ref`);
	}
	const registryBundle = getSiteRegistry(page.registry);
	const mainNodes = resolveSiteDataRef<readonly ResourceTreeNode<string>[]>(page.main as DataRef);
	const homePage = getSitePageDefinition('home');
	const footerIds = homePage.footer
		? resolveSiteDataRef<readonly HomeFooterBlockId[]>(homePage.footer as DataRef)
		: [];
	const homeFooter = getSiteRegistry('home').footer;

	return (
		<ResourcePageChrome footerBlocks={homeFooter} footerIds={footerIds}>
			<main id="main" className="flex-1">
				{renderResourcePageMain(mainNodes, pageId, registryBundle.main)}
			</main>
		</ResourcePageChrome>
	);
}
