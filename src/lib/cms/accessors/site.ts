import {
	BRAND,
	CASE_STUDIES_HUB_PATH,
	CASE_STUDY_DETAILS,
	FAQ_DETAILS,
	FUNNEL_CTA_BACKGROUNDS,
	HOME_PREVIEW_LIMITS,
	LEAD_CAPTURE_CONTEXT_BY_ID,
	MANUFACTURERS,
	RESULTS,
	REVIEW_DETAILS,
} from '../tables';
import type {
	CaseResult,
	LeadCaptureContextId,
	ReviewDetailRecord,
	SiteBreadcrumbItem,
} from '../types';
import { caseStudyDetailPath } from './paths';

export function mainSiteUrl(path = '/', campaign = 'tools'): string {
	const base = BRAND.site.replace(/\/$/, '');
	const sep = path.includes('?') ? '&' : '?';
	return `${base}${path}${sep}utm_source=tools&utm_medium=referral&utm_campaign=${campaign}`;
}

export function breadcrumbListJsonLd(items: SiteBreadcrumbItem[]) {
	return {
		'@type': 'BreadcrumbList' as const,
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem' as const,
			position: index + 1,
			name: item.label,
			item: item.href,
		})),
	};
}

export function leadCaptureContext(id: LeadCaptureContextId): string {
	return LEAD_CAPTURE_CONTEXT_BY_ID[id];
}

export function funnelCtaBackground(id: LeadCaptureContextId): {
	src: string;
	alt: string;
} {
	return FUNNEL_CTA_BACKGROUNDS[id] ?? FUNNEL_CTA_BACKGROUNDS.default;
}

export function logoForMake(make: string): string | null {
	const hit = MANUFACTURERS.find((m) => m.name.toLowerCase() === make.toLowerCase());
	return hit?.logo ?? null;
}

export function getHomeFeaturedReviews() {
	return REVIEW_DETAILS.slice(0, HOME_PREVIEW_LIMITS.reviews);
}

export function getReviewSocialProofAvatars() {
	const limit = HOME_PREVIEW_LIMITS.socialProofAvatars;
	const withPortrait = REVIEW_DETAILS.filter((review) => Boolean(reviewPortraitSrc(review)));
	const withoutPortrait = REVIEW_DETAILS.filter((review) => !reviewPortraitSrc(review));
	return [...withPortrait, ...withoutPortrait].slice(0, limit);
}

export function reviewPortraitSrc(review: Pick<ReviewDetailRecord, 'portrait'>): string | null {
	const src = review.portrait?.trim();
	if (!src || src.endsWith('/default.jpg')) return null;
	return src;
}

export function getHomeFeaturedFaqs() {
	return FAQ_DETAILS.slice(0, HOME_PREVIEW_LIMITS.faqs);
}

export function getHomeTickerResults(): readonly CaseResult[] {
	return RESULTS;
}

export function resolveResultCaseStudyHref(result: CaseResult): string {
	const study = CASE_STUDY_DETAILS.find((s) => s.vehicle === result.vehicle);
	return study ? caseStudyDetailPath(study.slug) : CASE_STUDIES_HUB_PATH;
}

export function formatStepLabel(template: string, step: number, totalSteps: number): string {
	return template.replace('{step}', String(step)).replace('{totalSteps}', String(totalSteps));
}

export function formatChecklistHeaderProgress(
	template: string,
	checked: number,
	total: number,
): string {
	return template.replace('{checked}', String(checked)).replace('{total}', String(total));
}
