import { buildDetailBreadcrumbs } from '../gather';
import { MANUFACTURERS, MANUFACTURERS_HUB_PATH } from '../tables';
import type { ManufacturerRelatedCard } from '../types';
import {
	buildManufacturersHubBreadcrumbs,
	getCaseStudyBySlug,
	getFaqBySlug,
	getManufacturerPageBySlug,
	getReviewBySlug,
} from './collections';
import {
	caseStudyDetailPath,
	faqDetailPath,
	manufacturerDetailPath,
	reviewDetailPath,
} from './paths';

export function formatManufacturerRightsBody(template: string, manufacturerName: string): string {
	return template.replaceAll('{manufacturer}', manufacturerName);
}

export function buildManufacturerDetailBreadcrumbs(slug: string) {
	const entry = getManufacturerPageBySlug(slug);
	const manufacturer = MANUFACTURERS.find((m) => m.slug === slug);
	if (!entry || !manufacturer) return buildManufacturersHubBreadcrumbs();
	return buildDetailBreadcrumbs(
		'Manufacturers',
		MANUFACTURERS_HUB_PATH,
		manufacturer.name,
		manufacturerDetailPath(slug),
	);
}

export function listManufacturerRelatedCards(slug: string): ManufacturerRelatedCard[] {
	const detail = getManufacturerPageBySlug(slug);
	if (!detail) return [];

	const cards: ManufacturerRelatedCard[] = [];

	for (const faqSlug of detail.relatedFaqSlugs) {
		const faq = getFaqBySlug(faqSlug);
		if (!faq) continue;
		cards.push({
			id: `faq-${faq.slug}`,
			kind: 'faq',
			href: faqDetailPath(faq.slug),
			title: faq.q,
			description: faq.seoDescription,
		});
	}

	for (const caseSlug of detail.relatedCaseStudySlugs) {
		const study = getCaseStudyBySlug(caseSlug);
		if (!study) continue;
		cards.push({
			id: `case-${study.slug}`,
			kind: 'case-study',
			href: caseStudyDetailPath(study.slug),
			title: study.headline,
			description: study.seoDescription,
		});
	}

	for (const reviewSlug of detail.relatedReviewSlugs) {
		const review = getReviewBySlug(reviewSlug);
		if (!review) continue;
		cards.push({
			id: `review-${review.slug}`,
			kind: 'review',
			href: reviewDetailPath(review.slug),
			title: `${review.name} · ${review.vehicle}`,
			description: review.seoDescription,
		});
	}

	return cards.slice(0, 4);
}

export function listManufacturerRelatedFaqSlugs(slug: string): string[] {
	const detail = getManufacturerPageBySlug(slug);
	if (!detail) return [];
	return [...detail.relatedFaqSlugs];
}

export function listManufacturerRelatedNonFaqCards(slug: string): ManufacturerRelatedCard[] {
	return listManufacturerRelatedCards(slug).filter((card) => !card.id.startsWith('faq-'));
}
