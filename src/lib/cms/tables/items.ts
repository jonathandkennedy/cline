import faqsTable from '@/data/items/faqs.json';
import guidebookTable from '@/data/items/guidebook.json';
import manufacturersTable from '@/data/items/manufacturers.json';
import manufacturerPagesTable from '@/data/items/profiles.json';
import resultsTable from '@/data/items/results.json';
import reviewsTable from '@/data/items/reviews.json';
import caseStudiesTable from '@/data/items/studies.json';
import testimonialsTable from '@/data/items/testimonials.json';
import blogTable from '@/data/items/blog.json';
import locationsTable from '@/data/items/locations.json';
import editorialTable from '@/data/items/editorial.json';
import { table } from '../parse';
import type {
	CaseResult,
	CaseStudyDetailRecord,
	EditorialIndexRecord,
	FaqDetailRecord,
	GuidebookChapterRecord,
	Manufacturer,
	ManufacturerPageDetail,
	ResultType,
	ReviewDetailRecord,
	Testimonial,
} from '../types';

export const TESTIMONIALS = table(testimonialsTable.TESTIMONIALS) as Testimonial[];
export const FAQ_DETAILS = table(faqsTable.FAQ_DETAILS) as readonly FaqDetailRecord[];
export const FAQS = FAQ_DETAILS.map(({ q, a }) => ({ q, a }));
export const FAQ_CATEGORY_LABELS = table(faqsTable.FAQ_CATEGORY_LABELS);
export const REVIEW_DETAILS = table(reviewsTable.REVIEW_DETAILS) as readonly ReviewDetailRecord[];
export const CASE_STUDY_DETAILS = table(
	caseStudiesTable.CASE_STUDY_DETAILS,
) as readonly CaseStudyDetailRecord[];
export const GUIDEBOOK_CHAPTERS = table(
	guidebookTable.GUIDEBOOK_CHAPTERS,
) as readonly GuidebookChapterRecord[];
export const MANUFACTURERS = table(manufacturersTable.MANUFACTURERS) as Manufacturer[];
export const MANUFACTURER_LOGOS = table(manufacturersTable.MANUFACTURER_LOGOS) as (Manufacturer & {
	logo: string;
})[];
export const MANUFACTURER_PAGE_DETAILS = table(
	manufacturerPagesTable.MANUFACTURER_PAGE_DETAILS,
) as readonly ManufacturerPageDetail[];
export const RESULTS = table(resultsTable.RESULTS) as CaseResult[];
export const RESULT_BADGE_CLASS = table(resultsTable.RESULT_BADGE_CLASS) as Partial<
	Record<ResultType, string>
> & { default: string };
export const BLOG_POSTS = table(blogTable.BLOG_POSTS) as readonly EditorialIndexRecord[];
export const LOCATION_PAGES = table(
	locationsTable.LOCATION_PAGES,
) as readonly EditorialIndexRecord[];
export const EDITORIAL_PAGES = table(
	editorialTable.EDITORIAL_PAGES,
) as readonly EditorialIndexRecord[];
