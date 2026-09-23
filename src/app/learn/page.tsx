import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { hubSegmentGenerateMetadata, LEARN_HUB_PATH, LEARN_HUB_SEO } from '@/lib/site';
import { learnHubLd } from '@/lib/structured';

const PAGE_ID = 'learn-hub' satisfies SitePageId;

export default function LearnHubRoute() {
	return (
		<>
			<JsonLd data={learnHubLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(LEARN_HUB_SEO, LEARN_HUB_PATH);
}
