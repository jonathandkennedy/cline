import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { hubSegmentGenerateMetadata, TEAM_PATH, TEAM_SEO } from '@/lib/site';

const PAGE_ID = 'team' satisfies SitePageId;

export default function TeamRoute() {
	return <SiteCatalogPage pageId={PAGE_ID} />;
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(TEAM_SEO, TEAM_PATH);
}
