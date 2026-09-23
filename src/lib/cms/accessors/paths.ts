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

export const faqDetailPath = (slug: string) => resourceDetailPath(FAQ_HUB_PATH, slug);

export const guidebookChapterPath = (chapterSlug: string) =>
	resourceDetailPath(GUIDEBOOK_HUB_PATH, chapterSlug);

export const blogDetailPath = (slug: string) => resourceDetailPath(BLOG_HUB_PATH, slug);

export const locationDetailPath = (slug: string) => resourceDetailPath(LOCATIONS_HUB_PATH, slug);

export const infoDetailPath = (slug: string) => resourceDetailPath(INFO_HUB_PATH, slug);
