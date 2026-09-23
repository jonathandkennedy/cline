import { ArrowRight } from 'lucide-react';

import { StarRating } from '@/components';
import { SectionExploreLink } from '@/components/explore';
import Link from '@/components/link';

import { RESOURCE_BLEED_ALT, RESOURCE_BLEED_MAIN, RESOURCE_GRID } from '@/kit/blocks/rhythm';
import { ResourceBand } from '@/kit/blocks/spotlight';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { cn } from '@/kit/ui/functions/cn';
import { components } from '@/kit/theme';

import { REVIEW_DETAILS, REVIEWS_HUB_EXPLORE, REVIEWS_HUB_HERO } from '@/lib/site';
import { ReviewHubCard } from '@/lib/site/resources/tile';

function reviewsHubSubheadParts() {
	const parts = REVIEWS_HUB_HERO.subhead.split(/\.\s+/);
	const statsLine = parts[0] ?? '';
	const disclaimer = parts.slice(1).join('. ').trim();
	const ratingMatch = statsLine.match(/^([\d.]+)/);
	const ratingValue = ratingMatch?.[1] ?? '';
	const statsTail = statsLine.replace(/^[\d.]+\s*★?\s*/u, '').trim();
	return { ratingValue, statsTail, disclaimer };
}

function ReviewsHubGridHeader() {
	const { ratingValue, statsTail, disclaimer } = reviewsHubSubheadParts();
	return (
		<p className={components.resourceUi.ratings.k001}>
			<span className={components.resourceUi.ratings.k002}>
				<StarRating size={14} />
				{ratingValue ? (
					<span className={components.resourceUi.ratings.k003}>{ratingValue}</span>
				) : null}
				{statsTail ? <span>{statsTail}</span> : null}
			</span>
			{disclaimer ? (
				<>
					<span aria-hidden className="text-line">
						·
					</span>
					<span>{disclaimer}</span>
				</>
			) : null}
		</p>
	);
}

export const reviewsHubKinds: SiteComponentKindMap = {
	'resource.reviewsGrid': () => (
		<ResourceBand bleedClassName={RESOURCE_BLEED_MAIN} borderTop={false} pad="default">
			<ReviewsHubGridHeader />
			<div className={cn(RESOURCE_GRID, 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
				{REVIEW_DETAILS.map((review, index) => (
					<ReviewHubCard key={review.slug} review={review} index={index} />
				))}
			</div>
		</ResourceBand>
	),
	'resource.reviewsExplore': () => (
		<ResourceBand pad="default" bleedClassName={RESOURCE_BLEED_ALT}>
			<div className={components.resourceUi.shared.k032}>
				<div className={components.resourceUi.shared.k033}>
					<span className="eyebrow">{REVIEWS_HUB_EXPLORE.eyebrow}</span>
					<h2 className={components.resourceUi.shared.k034}>{REVIEWS_HUB_EXPLORE.title}</h2>
					<p className={components.resourceUi.shared.k035}>{REVIEWS_HUB_EXPLORE.body}</p>
				</div>
				<Link href={REVIEWS_HUB_EXPLORE.href} className={components.resourceUi.shared.k036}>
					{REVIEWS_HUB_EXPLORE.ctaLabel} <ArrowRight size={15} />
				</Link>
			</div>
			{REVIEWS_HUB_EXPLORE.secondaryHref && REVIEWS_HUB_EXPLORE.secondaryLabel ? (
				<div className={components.resourceUi.shared.k037}>
					<SectionExploreLink href={REVIEWS_HUB_EXPLORE.secondaryHref}>
						{REVIEWS_HUB_EXPLORE.secondaryLabel}
					</SectionExploreLink>
				</div>
			) : null}
		</ResourceBand>
	),
};
