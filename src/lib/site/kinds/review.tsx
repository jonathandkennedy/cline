'use client';

import { Car, MapPin, Scale, UserRound } from 'lucide-react';
import { useParams } from 'next/navigation';

import { Avatar, Reveal, ReviewSourceBadge } from '@/components';

import {
	ResourceKeepExploringGrid,
	ResourceMetaChips,
	ResourceOutcomeBadge,
	ResourceStorySplit,
} from '@/kit/blocks';
import { ResourceProse } from '@/kit/blocks/copy';
import { ResourceDetailHero } from '@/kit/blocks/spotlight';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { components } from '@/kit/theme';

import type { ReviewDetailBlockId } from '@/lib/cms';
import {
	buildReviewDetailBreadcrumbs,
	CASE_STUDY_DETAIL_SECTIONS,
	caseStudyDetailPath,
	emptyBlockMap,
	findCaseStudyByManufacturerSlug,
	getFaqBySlug,
	getReviewBySlug,
	MANUFACTURERS,
	manufacturerDetailPath,
	PRIMARY_ELIGIBILITY_CTA,
	REVIEW_DETAIL_HERO_EYEBROW,
	REVIEW_DETAIL_SECTIONS,
	REVIEW_REPRESENTATIVE_DISCLAIMER,
	REVIEWS_HUB_HERO,
	reviewPortraitSrc,
} from '@/lib/site';
import type { ResourceBlockRenderer } from '@/lib/site/branches';
import { makeFunnelBlock } from '@/lib/site/resources/closing';
import { ResourceRelatedQuestionsGrid } from '@/lib/site/resources/faqlinks';

const reviewDetailClosing = makeFunnelBlock('review-detail');

function createReviewDetailBlockRegistry(slug: string): ResourceBlockRenderer<ReviewDetailBlockId> {
	const review = getReviewBySlug(slug);
	if (!review) {
		return emptyBlockMap<ReviewDetailBlockId>([
			'hero',
			'story',
			'relatedQuestions',
			'funnel',
			'keepExploring',
		]);
	}

	const portrait = reviewPortraitSrc(review);

	return {
		hero: () => (
			<ResourceDetailHero
				breadcrumbs={buildReviewDetailBreadcrumbs(slug)}
				eyebrow={REVIEW_DETAIL_HERO_EYEBROW}
				heroImage={REVIEWS_HUB_HERO.heroImage}
				heroImageAlt={REVIEWS_HUB_HERO.heroImageAlt}
			>
				<Reveal>
					<div className={components.resourceUi.article.k001}>
						<div className={components.resourceUi.article.k002}>
							<span aria-hidden className={components.resourceUi.article.k003} />
							<Avatar
								name={review.name}
								src={portrait}
								size={64}
								className={components.resourceUi.article.k004}
							/>
						</div>
						<div className={components.resourceUi.shared.k001}>
							<div className={components.resourceUi.article.k005}>
								<ResourceOutcomeBadge label={review.outcome} />
								<ReviewSourceBadge source={review.source} />
							</div>
							<h1 className={components.resourceUi.article.k006}>{review.name}</h1>
							<p className={components.resourceUi.article.k007}>
								<span className={components.resourceUi.shared.k003}>
									<MapPin size={13} className="text-gold/80" aria-hidden />
									{review.location}
								</span>
								<span aria-hidden className="text-faint">
									·
								</span>
								<span className={components.resourceUi.shared.k003}>
									<Car size={13} className="text-gold/80" aria-hidden />
									{review.vehicle}
								</span>
							</p>
						</div>
					</div>
				</Reveal>
				<p className={components.resourceUi.article.k008}>{REVIEW_REPRESENTATIVE_DISCLAIMER}</p>
			</ResourceDetailHero>
		),
		story: () => {
			const metaItems = [
				{ icon: MapPin, label: review.location },
				{ icon: Car, label: review.vehicle },
				{ icon: Scale, label: review.outcome },
			];
			return (
				<ResourceStorySplit
					leadHeading={{
						icon: UserRound,
						title: REVIEW_DETAIL_SECTIONS.clientStory,
					}}
					portrait={portrait}
					portraitAlt={`${review.name}, California Lemon Law client`}
					quote={review.quote}
					name={review.name}
				>
					<ResourceProse>{review.fullStory}</ResourceProse>
					<div className={components.resourceUi.article.k009}>
						<ResourceMetaChips items={metaItems} />
					</div>
				</ResourceStorySplit>
			);
		},
		relatedQuestions: () => {
			const relatedFaqs = review.relatedFaqSlugs.flatMap((faqSlug) => {
				const faq = getFaqBySlug(faqSlug);
				return faq ? [faq] : [];
			});
			return (
				<ResourceRelatedQuestionsGrid
					faqs={relatedFaqs}
					title={REVIEW_DETAIL_SECTIONS.relatedQuestions}
				/>
			);
		},
		keepExploring: () => {
			const manufacturer = review.manufacturerSlug
				? MANUFACTURERS.find((m) => m.slug === review.manufacturerSlug)
				: undefined;
			const linkedStudy = review.manufacturerSlug
				? findCaseStudyByManufacturerSlug(review.manufacturerSlug)
				: undefined;
			const items: {
				key: string;
				href: string;
				title: string;
				kind: string;
			}[] = [];
			if (manufacturer) {
				items.push({
					key: `mfg-${manufacturer.slug}`,
					href: manufacturerDetailPath(manufacturer.slug),
					title: `${manufacturer.name} ${REVIEW_DETAIL_SECTIONS.manufacturerCardSuffix}`,
					kind: 'Guide',
				});
			}
			if (linkedStudy) {
				items.push({
					key: `study-${linkedStudy.slug}`,
					href: caseStudyDetailPath(linkedStudy.slug),
					title: linkedStudy.headline,
					kind: 'Case Study',
				});
			}
			items.push({
				key: 'eligibility',
				href: '/tool/eligibility-checker',
				title: PRIMARY_ELIGIBILITY_CTA.label,
				kind: 'Tool',
			});
			return (
				<ResourceKeepExploringGrid
					icon={Car}
					title={CASE_STUDY_DETAIL_SECTIONS.related}
					body={CASE_STUDY_DETAIL_SECTIONS.relatedBody}
					items={items}
				/>
			);
		},
		...reviewDetailClosing,
	};
}

function useReviewDetailSlug(): string {
	const params = useParams();
	const slug = params.slug;
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug) && typeof slug[0] === 'string') return slug[0];
	return '';
}

function reviewDetailBlock(id: ReviewDetailBlockId) {
	return function RenderReviewDetailBlock() {
		const blocks = createReviewDetailBlockRegistry(useReviewDetailSlug());
		return blocks[id]();
	};
}

export const reviewDetailKinds: SiteComponentKindMap = {
	'detail.reviewHero': reviewDetailBlock('hero'),
	'detail.reviewStory': reviewDetailBlock('story'),
	'detail.reviewKeepExploring': reviewDetailBlock('keepExploring'),
	'detail.reviewRelatedQuestions': reviewDetailBlock('relatedQuestions'),
};
