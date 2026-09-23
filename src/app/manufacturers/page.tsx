import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import {
	hubSegmentGenerateMetadata,
	MANUFACTURERS_HUB_PATH,
	MANUFACTURERS_HUB_SEO,
} from '@/lib/site';
import { manufacturersHubLd } from '@/lib/structured';

const PAGE_ID = 'manufacturers-hub' satisfies SitePageId;

export default function ManufacturersHubRoute() {
	return (
		<>
			<JsonLd data={manufacturersHubLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(MANUFACTURERS_HUB_SEO, MANUFACTURERS_HUB_PATH);
}
