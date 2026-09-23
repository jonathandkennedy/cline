import type { MetadataRoute } from 'next';
import { faqTopicPath, SITE_URL } from '@/lib/cms';
import { listTeamProfileIds, teamMemberPath } from '@/lib/cms/tables/team';
import {
	BLOG_HUB_PATH,
	BLOG_POSTS,
	blogDetailPath,
	CASE_STUDIES_HUB_PATH,
	caseStudyDetailPath,
	EDITORIAL_PAGES,
	FAQ_CATEGORY_LABELS,
	FAQ_HUB_PATH,
	GUIDEBOOK_HUB_PATH,
	INFO_HUB_PATH,
	infoDetailPath,
	LEARN_HUB_PATH,
	listCaseStudySlugs,
	listManufacturerPageSlugs,
	LOCATION_PAGES,
	LOCATIONS_HUB_PATH,
	locationDetailPath,
	MANUFACTURERS_HUB_PATH,
	manufacturerDetailPath,
	REVIEWS_HUB_PATH,
	TEAM_PATH,
	THE_FIRM_PATH,
	TOOLS,
} from '@/lib/site';
import { BLOG_TOPICS, BLOG_TOPICS_PATH, blogTopicPath } from '@/lib/topics';

type Dated = { modified?: string; date?: string };

/** Newest real content date in a set, or undefined when the content carries no dates. */
function newest(items: readonly Dated[]): string | undefined {
	const dates = items.map((item) => item.modified ?? item.date).filter(Boolean) as string[];
	return dates.length > 0 ? dates.sort().at(-1) : undefined;
}

/**
 * Only indexable, canonical URLs. lastmod is the content's own modified date where one exists
 * and is omitted otherwise (a build timestamp on every URL teaches Google to ignore it);
 * priority and changefreq are ignored by Google and left out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const entry = (path: string, lastModified?: string): MetadataRoute.Sitemap[number] => ({
		url: `${SITE_URL}${path}`,
		...(lastModified ? { lastModified } : {}),
	});

	return [
		entry('/'),
		entry('/contact'),
		...TOOLS.map((tool) => entry(`/tool/${tool.slug}`)),
		entry(MANUFACTURERS_HUB_PATH),
		...listManufacturerPageSlugs().map((slug) => entry(manufacturerDetailPath(slug))),
		entry(REVIEWS_HUB_PATH),
		entry(CASE_STUDIES_HUB_PATH),
		...listCaseStudySlugs().map((slug) => entry(caseStudyDetailPath(slug))),
		entry(FAQ_HUB_PATH),
		...Object.keys(FAQ_CATEGORY_LABELS).map((id) => entry(faqTopicPath(id))),
		entry(GUIDEBOOK_HUB_PATH),
		entry(LEARN_HUB_PATH),
		entry(THE_FIRM_PATH),
		entry(TEAM_PATH),
		...listTeamProfileIds().map((id) => entry(teamMemberPath(id))),
		entry(BLOG_HUB_PATH, newest(BLOG_POSTS)),
		entry(BLOG_TOPICS_PATH, newest(BLOG_POSTS)),
		...BLOG_TOPICS.map((topic) => entry(blogTopicPath(topic.slug), newest(topic.posts))),
		...BLOG_POSTS.map((post) => entry(blogDetailPath(post.slug), post.modified)),
		entry(LOCATIONS_HUB_PATH, newest(LOCATION_PAGES)),
		...LOCATION_PAGES.map((page) => entry(locationDetailPath(page.slug), page.modified)),
		entry(INFO_HUB_PATH, newest(EDITORIAL_PAGES)),
		...EDITORIAL_PAGES.map((page) => entry(infoDetailPath(page.slug), page.modified)),
	];
}
