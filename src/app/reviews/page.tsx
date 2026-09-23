import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { hubSegmentGenerateMetadata, REVIEWS_HUB_PATH, REVIEWS_HUB_SEO } from '@/lib/site';
import { reviewsHubLd } from '@/lib/structured';

const PAGE_ID = 'reviews-hub' satisfies SitePageId;

export default function ReviewsHubRoute() {
	return (
		<>
			<JsonLd data={reviewsHubLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(REVIEWS_HUB_SEO, REVIEWS_HUB_PATH);
}
