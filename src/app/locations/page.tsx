import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { hubSegmentGenerateMetadata, LOCATIONS_HUB_PATH, LOCATIONS_HUB_SEO } from '@/lib/site';
import { locationsHubLd } from '@/lib/structured';

const PAGE_ID = 'locations-hub' satisfies SitePageId;

export default function LocationsHubRoute() {
	return (
		<>
			<JsonLd data={locationsHubLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(LOCATIONS_HUB_SEO, LOCATIONS_HUB_PATH);
}
