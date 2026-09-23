import type { ToolSlug } from './core';

export interface FaqEntry {
	q: string;
	a: string;
}

export type FaqCategoryId =
	| 'basics'
	| 'coverage'
	| 'fees'
	| 'recovery'
	| 'process'
	| 'documentation';

export interface FaqStatuteLink {
	label: string;
	href: string;
}

export interface FaqDetailRecord extends FaqEntry {
	slug: string;
	categoryId: FaqCategoryId;
	seoTitle: string;
	seoDescription: string;
	relatedQuestionSlugs: readonly string[];
	statuteLinks?: readonly FaqStatuteLink[];
	keyPoints?: readonly string[];
}

export type ReviewSource = 'google' | 'yelp';

export interface Testimonial {
	quote: string;
	name: string;
	location: string;
	vehicle: string;
	outcome: string;
	source?: ReviewSource;
	rating?: number;
}

export interface ReviewDetailRecord extends Testimonial {
	slug: string;
	seoTitle: string;
	seoDescription: string;
	fullStory: string;
	manufacturerSlug: string | null;
	relatedToolSlugs: readonly ToolSlug[];
	relatedFaqSlugs: readonly string[];
	/**
	 * Authentic platform portrait under `/public`, or `null` for initials.
	 * Never use synthetic / AI stock faces here.
	 */
	portrait: string | null;
	source: ReviewSource;
	rating: number;
	reviewDate: string;
	sourceUrl: string;
	/** Optional vehicle photo for hub cards; falls back to `portrait`. */
	cardImage?: string;
	cardImageAlt?: string;
}

export type ResultType = 'Refund' | 'Buyback' | 'Settlement' | 'Replacement';

export interface CaseResult {
	vehicle: string;
	make: string;
	amount: number;
	type: ResultType;
}

export interface CaseStudyTimelineEntry {
	label: string;
	detail: string;
}

export interface CaseStudyDetailRecord {
	slug: string;
	seoTitle: string;
	seoDescription: string;
	headline: string;
	vehicle: string;
	manufacturerSlug: string;
	outcomeType: ResultType;
	representativeAmount: number;
	situation: string;
	/** Optional second paragraph for the situation section */
	situationDetail?: string;
	defectSummary: string;
	/** Optional second paragraph for defect / repairs */
	defectDetail?: string;
	legalPath: string;
	/** Optional second paragraph for legal path */
	legalDetail?: string;
	outcomeSummary: string;
	/** Optional second paragraph for outcome (hero uses summary only) */
	outcomeDetail?: string;
	timeline: readonly CaseStudyTimelineEntry[];
	documentHighlights: readonly string[];
	lessons: readonly string[];
	relatedFaqSlugs: readonly string[];
	relatedReviewSlugs: readonly string[];
	cardImage: string;
	cardImageAlt: string;
}

export interface GuidebookSection {
	id: string;
	title: string;
	paragraphs: readonly string[];
}

export interface GuidebookChapterRecord {
	slug: string;
	title: string;
	summary: string;
	estimatedReadMinutes: number;
	seoTitle: string;
	seoDescription: string;
	sections: readonly GuidebookSection[];
	nextChapterSlug: string | null;
	thumbnail: string;
	thumbnailAlt: string;
	/** Lucide icon id for hub navigator (see guidebook chapter icon map). */
	icon: string;
	/** Short topic labels shown on the guidebook hub navigator. */
	hubTopics: readonly string[];
}

export interface ManufacturerPageDetail {
	slug: string;
	seoTitle: string;
	seoDescription: string;
	headline: string;
	intro: string;
	commonDefects: readonly string[];
	howWeHandle: readonly string[];
	relatedFaqSlugs: readonly string[];
	relatedCaseStudySlugs: readonly string[];
	relatedReviewSlugs: readonly string[];
}

export type ManufacturerRelatedCardKind = 'faq' | 'case-study' | 'review';

export interface ManufacturerRelatedCard {
	id: string;
	kind: ManufacturerRelatedCardKind;
	href: string;
	title: string;
	description: string;
}

export interface Manufacturer {
	name: string;
	slug: string;
	logo: string | null;
	/** SVG viewBox width/height. Directory marks size to this at a shared cap-height. */
	logoAspect?: number;
	/** Case-studies hub mark scale (1 = default). Oversized wordmarks use <1. */
	hubLogoScale?: number;
}

export type ResourceNavIconId =
	| 'factory'
	| 'star'
	| 'file-text'
	| 'help-circle'
	| 'book-open'
	| 'newspaper'
	| 'map-pin';

export interface ResourceNavItem {
	id: string;
	href: string;
	label: string;
	description: string;
	icon: ResourceNavIconId;
}

export type FaqSlug = FaqDetailRecord['slug'];
export type ReviewSlug = ReviewDetailRecord['slug'];
export type CaseStudySlug = CaseStudyDetailRecord['slug'];
export type GuidebookChapterSlug = GuidebookChapterRecord['slug'];
export type ManufacturerPageSlug = ManufacturerPageDetail['slug'];

export type EditorialKind = 'blog' | 'location' | 'info';

export type EditorialBlockType = 'p' | 'h2' | 'h3' | 'li' | 'quote';

export interface EditorialBlock {
	type: EditorialBlockType;
	text: string;
}

export interface EditorialIndexRecord {
	slug: string;
	title: string;
	description: string;
	date: string;
	modified: string;
	sourceUrl: string;
	kind: EditorialKind;
	categories: readonly string[];
	seoTitle: string;
	seoDescription: string;
	thumbnail?: string;
	thumbnailAlt?: string;
}

export interface EditorialRecord extends EditorialIndexRecord {
	blocks: readonly EditorialBlock[];
}

export type BlogSlug = EditorialRecord['slug'];
export type LocationPageSlug = EditorialRecord['slug'];
export type EditorialPageSlug = EditorialRecord['slug'];
