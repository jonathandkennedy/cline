import faqsTable from '@/data/items/faqs.json';
import { resourceDetailPath } from '../gather';
import {
	CASE_STUDIES_HUB_PATH,
	FAQ_HUB_PATH,
	GUIDEBOOK_HUB_PATH,
	MANUFACTURERS_HUB_PATH,
	REVIEWS_HUB_PATH,
	BLOG_HUB_PATH,
	LOCATIONS_HUB_PATH,
	INFO_HUB_PATH,
} from '../tables';

export const manufacturerDetailPath = (slug: string) =>
	resourceDetailPath(MANUFACTURERS_HUB_PATH, slug);

export const reviewDetailPath = (slug: string) => resourceDetailPath(REVIEWS_HUB_PATH, slug);

export const caseStudyDetailPath = (slug: string) =>
	resourceDetailPath(CASE_STUDIES_HUB_PATH, slug);

const FAQ_CATEGORY_SLUGS = faqsTable.FAQ_CATEGORY_SLUGS as Record<string, string>;

/** Topical FAQ page (six pages, one per category) that holds the individual answers. */
export const faqTopicPath = (categoryId: string) =>
	resourceDetailPath(FAQ_HUB_PATH, FAQ_CATEGORY_SLUGS[categoryId] ?? categoryId);

export const faqCategoryIdForTopicSlug = (topicSlug: string) =>
	Object.entries(FAQ_CATEGORY_SLUGS).find(([, slug]) => slug === topicSlug)?.[0];

export const listFaqTopicSlugs = () => Object.values(FAQ_CATEGORY_SLUGS);

/** Individual answers live as anchors on their topical page; old /faq/<slug> URLs 301 there. */
export const faqDetailPath = (slug: string) => {
	const faq = faqsTable.FAQ_DETAILS.find((entry) => entry.slug === slug);
	return faq ? `${faqTopicPath(faq.categoryId)}#${slug}` : resourceDetailPath(FAQ_HUB_PATH, slug);
};

/** Chapters are sections of the single guidebook page; old /guidebook/<chapter> URLs 301 here. */
export const guidebookChapterPath = (chapterSlug: string) => `${GUIDEBOOK_HUB_PATH}#${chapterSlug}`;

export const blogDetailPath = (slug: string) => resourceDetailPath(BLOG_HUB_PATH, slug);

export const locationDetailPath = (slug: string) => resourceDetailPath(LOCATIONS_HUB_PATH, slug);

export const infoDetailPath = (slug: string) => resourceDetailPath(INFO_HUB_PATH, slug);
