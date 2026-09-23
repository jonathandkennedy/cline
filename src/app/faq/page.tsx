import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { hubSegmentGenerateMetadata, FAQ_HUB_PATH, FAQ_HUB_SEO } from '@/lib/site';
import { faqHubLd } from '@/lib/structured';

const PAGE_ID = 'faq-hub' satisfies SitePageId;

export default function FaqHubRoute() {
	return (
		<>
			<JsonLd data={faqHubLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(FAQ_HUB_SEO, FAQ_HUB_PATH);
}
