import type { MetadataRoute } from 'next';
import {
	BRAND,
	CASE_STUDIES_HUB_PATH,
	caseStudyDetailPath,
	FAQ_HUB_PATH,
	faqDetailPath,
	GUIDEBOOK_HUB_PATH,
	guidebookChapterPath,
	LEARN_HUB_PATH,
	listCaseStudySlugs,
	listFaqSlugs,
	listGuidebookChapterSlugs,
	listManufacturerPageSlugs,
	listReviewSlugs,
	listBlogSlugs,
	listLocationPageSlugs,
	listEditorialPageSlugs,
	MANUFACTURERS_HUB_PATH,
	manufacturerDetailPath,
	REVIEWS_HUB_PATH,
	reviewDetailPath,
	THE_FIRM_PATH,
	TEAM_PATH,
	BLOG_HUB_PATH,
	blogDetailPath,
	LOCATIONS_HUB_PATH,
	locationDetailPath,
	INFO_HUB_PATH,
	infoDetailPath,
	TOOLS,
} from '@/lib/site';

/** Hub/detail paths mirror catalog routes; lists from CMS accessors (SSOT items). */
export default function sitemap(): MetadataRoute.Sitemap {
	const base = BRAND.toolsUrl;
	const now = new Date();
	const monthly = 'monthly' as const;

	const hub = (path: string, priority: number) => ({
		url: `${base}${path}`,
		lastModified: now,
		changeFrequency: monthly,
		priority,
	});

	const detail = (path: string, priority: number) => ({
		url: `${base}${path}`,
		lastModified: now,
		changeFrequency: monthly,
		priority,
	});

	return [
		hub('/', 1),
		hub('/contact', 0.9),
		...TOOLS.map((t) => ({
			url: `${base}/tool/${t.slug}`,
			lastModified: now,
			changeFrequency: monthly,
			priority: 0.9,
		})),
		hub(MANUFACTURERS_HUB_PATH, 0.8),
		...listManufacturerPageSlugs().map((slug) => detail(manufacturerDetailPath(slug), 0.65)),
		hub(REVIEWS_HUB_PATH, 0.8),
		...listReviewSlugs().map((slug) => detail(reviewDetailPath(slug), 0.65)),
		hub(CASE_STUDIES_HUB_PATH, 0.8),
		...listCaseStudySlugs().map((slug) => detail(caseStudyDetailPath(slug), 0.65)),
		hub(FAQ_HUB_PATH, 0.8),
		...listFaqSlugs().map((slug) => detail(faqDetailPath(slug), 0.65)),
		hub(GUIDEBOOK_HUB_PATH, 0.8),
		...listGuidebookChapterSlugs().map((slug) => detail(guidebookChapterPath(slug), 0.7)),
		hub(LEARN_HUB_PATH, 0.75),
		hub(THE_FIRM_PATH, 0.75),
		hub(TEAM_PATH, 0.75),
		hub(BLOG_HUB_PATH, 0.8),
		...listBlogSlugs().map((slug) => detail(blogDetailPath(slug), 0.6)),
		hub(LOCATIONS_HUB_PATH, 0.75),
		...listLocationPageSlugs().map((slug) => detail(locationDetailPath(slug), 0.55)),
		hub(INFO_HUB_PATH, 0.7),
		...listEditorialPageSlugs().map((slug) => detail(infoDetailPath(slug), 0.6)),
	];
}
