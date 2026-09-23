import { buildHubBreadcrumbs, defineSlugCollection } from '../gather';
import {
	CASE_STUDIES_HUB_PATH,
	CASE_STUDY_DETAILS,
	FAQ_DETAILS,
	FAQ_HUB_PATH,
	GUIDEBOOK_CHAPTERS,
	GUIDEBOOK_HUB_PATH,
	LEARN_HUB_PATH,
	MANUFACTURER_PAGE_DETAILS,
	MANUFACTURERS_HUB_PATH,
	REVIEW_DETAILS,
	REVIEWS_HUB_PATH,
	THE_FIRM_HEADER_NAV,
	THE_FIRM_PATH,
	TEAM_PATH,
	TEAM_HEADER_NAV,
	BLOG_POSTS,
	BLOG_HUB_PATH,
	LOCATION_PAGES,
	LOCATIONS_HUB_PATH,
	EDITORIAL_PAGES,
	INFO_HUB_PATH,
} from '../tables';
import type {
	CaseStudyDetailRecord,
	CaseStudySlug,
	FaqDetailRecord,
	FaqSlug,
	GuidebookChapterRecord,
	GuidebookChapterSlug,
	ManufacturerPageDetail,
	ManufacturerPageSlug,
	ReviewDetailRecord,
	ReviewSlug,
	EditorialIndexRecord,
} from '../types';
import {
	caseStudyDetailPath,
	faqDetailPath,
	guidebookChapterPath,
	manufacturerDetailPath,
	reviewDetailPath,
	blogDetailPath,
	locationDetailPath,
	infoDetailPath,
} from './paths';

const faqCollection = defineSlugCollection<FaqDetailRecord>({
	items: FAQ_DETAILS,
	hubLabel: 'FAQ',
	hubHref: FAQ_HUB_PATH,
	detailPath: faqDetailPath,
	detailLabel: (entry) => entry.q,
});

export const listFaqSlugs = (): FaqSlug[] => faqCollection.listSlugs();
export const getFaqBySlug = faqCollection.getBySlug;
export const buildFaqHubBreadcrumbs = faqCollection.buildHubBreadcrumbs;
export const buildFaqDetailBreadcrumbs = faqCollection.buildDetailBreadcrumbs;

const reviewCollection = defineSlugCollection<ReviewDetailRecord>({
	items: REVIEW_DETAILS,
	hubLabel: 'Client Reviews',
	hubHref: REVIEWS_HUB_PATH,
	detailPath: reviewDetailPath,
	detailLabel: (entry) => entry.name,
});

export const listReviewSlugs = (): ReviewSlug[] => reviewCollection.listSlugs();
export const getReviewBySlug = reviewCollection.getBySlug;
export const buildReviewsHubBreadcrumbs = reviewCollection.buildHubBreadcrumbs;
export const buildReviewDetailBreadcrumbs = reviewCollection.buildDetailBreadcrumbs;

const caseStudyCollection = defineSlugCollection<CaseStudyDetailRecord>({
	items: CASE_STUDY_DETAILS,
	hubLabel: 'Case Studies',
	hubHref: CASE_STUDIES_HUB_PATH,
	detailPath: caseStudyDetailPath,
	detailLabel: (entry) => entry.headline,
});

export const listCaseStudySlugs = (): CaseStudySlug[] => caseStudyCollection.listSlugs();
export const getCaseStudyBySlug = caseStudyCollection.getBySlug;
export function findCaseStudyByManufacturerSlug(
	manufacturerSlug: string,
): CaseStudyDetailRecord | undefined {
	return CASE_STUDY_DETAILS.find((study) => study.manufacturerSlug === manufacturerSlug);
}
export const buildCaseStudiesHubBreadcrumbs = caseStudyCollection.buildHubBreadcrumbs;
export const buildCaseStudyDetailBreadcrumbs = caseStudyCollection.buildDetailBreadcrumbs;

const guidebookCollection = defineSlugCollection<GuidebookChapterRecord>({
	items: GUIDEBOOK_CHAPTERS,
	hubLabel: 'Guidebook',
	hubHref: GUIDEBOOK_HUB_PATH,
	detailPath: guidebookChapterPath,
	detailLabel: (entry) => entry.title,
});

export const listGuidebookChapterSlugs = (): GuidebookChapterSlug[] =>
	guidebookCollection.listSlugs();
export const getGuidebookChapterBySlug = guidebookCollection.getBySlug;
export const buildGuidebookHubBreadcrumbs = guidebookCollection.buildHubBreadcrumbs;
export const buildGuidebookChapterBreadcrumbs = guidebookCollection.buildDetailBreadcrumbs;

export function buildLearnHubBreadcrumbs() {
	return buildHubBreadcrumbs('Learn', LEARN_HUB_PATH);
}

export function buildTheFirmBreadcrumbs() {
	return buildHubBreadcrumbs(THE_FIRM_HEADER_NAV.label, THE_FIRM_PATH);
}

export function buildTeamBreadcrumbs() {
	return buildHubBreadcrumbs(TEAM_HEADER_NAV.label, TEAM_PATH);
}

const manufacturerPageCollection = defineSlugCollection<ManufacturerPageDetail>({
	items: MANUFACTURER_PAGE_DETAILS,
	hubLabel: 'Manufacturers',
	hubHref: MANUFACTURERS_HUB_PATH,
	detailPath: manufacturerDetailPath,
	detailLabel: (entry) => entry.slug,
});

export const listManufacturerPageSlugs = (): ManufacturerPageSlug[] =>
	manufacturerPageCollection.listSlugs();
export const getManufacturerPageBySlug = manufacturerPageCollection.getBySlug;
export const buildManufacturersHubBreadcrumbs = manufacturerPageCollection.buildHubBreadcrumbs;

const blogCollection = defineSlugCollection<EditorialIndexRecord>({
	items: BLOG_POSTS,
	hubLabel: 'Blog',
	hubHref: BLOG_HUB_PATH,
	detailPath: blogDetailPath,
	detailLabel: (entry) => entry.title,
});

export const listBlogSlugs = () => blogCollection.listSlugs();
export const buildBlogHubBreadcrumbs = blogCollection.buildHubBreadcrumbs;
export const buildBlogDetailBreadcrumbs = blogCollection.buildDetailBreadcrumbs;

const locationCollection = defineSlugCollection<EditorialIndexRecord>({
	items: LOCATION_PAGES,
	hubLabel: 'Locations',
	hubHref: LOCATIONS_HUB_PATH,
	detailPath: locationDetailPath,
	detailLabel: (entry) => entry.title,
});

export const listLocationPageSlugs = () => locationCollection.listSlugs();
export const buildLocationsHubBreadcrumbs = locationCollection.buildHubBreadcrumbs;
export const buildLocationDetailBreadcrumbs = locationCollection.buildDetailBreadcrumbs;

const editorialCollection = defineSlugCollection<EditorialIndexRecord>({
	items: EDITORIAL_PAGES,
	hubLabel: 'Guides',
	hubHref: INFO_HUB_PATH,
	detailPath: infoDetailPath,
	detailLabel: (entry) => entry.title,
});

export const listEditorialPageSlugs = () => editorialCollection.listSlugs();
export const buildInfoHubBreadcrumbs = editorialCollection.buildHubBreadcrumbs;
export const buildInfoDetailBreadcrumbs = editorialCollection.buildDetailBreadcrumbs;
