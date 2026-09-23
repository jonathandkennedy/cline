import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { SiteCatalogPage } from '@/lib/site/catalog';
import {
	hubSegmentGenerateMetadata,
	CASE_STUDIES_HUB_PATH,
	CASE_STUDIES_HUB_SEO,
} from '@/lib/site';
import { JsonLd } from '@/components';
import { caseStudiesHubLd } from '@/lib/structured';

const PAGE_ID = 'case-studies-hub' satisfies SitePageId;

export default function CaseStudiesHubRoute() {
	return (
		<>
			<JsonLd data={caseStudiesHubLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(CASE_STUDIES_HUB_SEO, CASE_STUDIES_HUB_PATH);
}
