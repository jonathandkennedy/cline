import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { hubSegmentGenerateMetadata, THE_FIRM_PATH, THE_FIRM_SEO } from '@/lib/site';

const PAGE_ID = 'the-firm' satisfies SitePageId;

export default function TheFirmRoute() {
	return <SiteCatalogPage pageId={PAGE_ID} />;
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(THE_FIRM_SEO, THE_FIRM_PATH);
}
