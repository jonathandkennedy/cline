import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { hubSegmentGenerateMetadata, INFO_HUB_PATH, INFO_HUB_SEO } from '@/lib/site';
import { infoHubLd } from '@/lib/structured';

const PAGE_ID = 'info-hub' satisfies SitePageId;

export default function InfoHubRoute() {
	return (
		<>
			<JsonLd data={infoHubLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(INFO_HUB_SEO, INFO_HUB_PATH);
}
