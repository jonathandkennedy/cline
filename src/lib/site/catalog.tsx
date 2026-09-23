/** Client boundary for app routes — catalog page id → JSON-driven tree render. */
'use client';

import type { SitePageId } from '@/lib/cms/catalog';
import { renderSitePage } from '@/lib/site/render-page';

export function SiteCatalogPage({ pageId }: { pageId: SitePageId }) {
	return renderSitePage(pageId);
}
