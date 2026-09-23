import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { hubSegmentGenerateMetadata, GUIDEBOOK_HUB_PATH, GUIDEBOOK_HUB_SEO } from '@/lib/site';
import { guidebookHubLd } from '@/lib/structured';

const PAGE_ID = 'guidebook-hub' satisfies SitePageId;

export default function GuidebookHubRoute() {
	return (
		<>
			<JsonLd data={guidebookHubLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(GUIDEBOOK_HUB_SEO, GUIDEBOOK_HUB_PATH);
}
