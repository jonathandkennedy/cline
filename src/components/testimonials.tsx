import {
	HOME_SECTION_BODY,
	HOME_SECTION_GRID_MT,
	HOME_SECTION_H2,
	HOME_SECTION_HEADER_ROW,
} from '@/components/sections/path';
import { ReviewHubCard } from '@/lib/site/resources/tile';
import { Link } from '@/components/link';
import {
	BRAND,
	getHomeFeaturedReviews,
	HOME_RESOURCE_CTAS,
	HOME_SECTIONS,
	REVIEW_REPRESENTATIVE_DISCLAIMER,
	REVIEWS_HUB_HERO,
} from '@/lib/cms';
import { StarRating } from '@/components/rating';
import { Reveal } from '@/components/reveal';

export function Testimonials() {
	const reviews = getHomeFeaturedReviews();

	return (
		<section className="rule-y bg-ink/40">
			<div className="container-x section-y">
				<Reveal className={HOME_SECTION_HEADER_ROW}>
					<div className="min-w-0 flex-1">
						<span className="eyebrow">{REVIEWS_HUB_HERO.eyebrow}</span>
						<h2 className={HOME_SECTION_H2}>{REVIEWS_HUB_HERO.headline}</h2>
					</div>
					<Link
						href={HOME_RESOURCE_CTAS.reviews.href}
						className="group inline-flex min-h-[44px] max-w-full shrink-0 flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-line bg-surface/70 px-4 py-2 text-center transition hover:border-gold/35 hover:bg-surface sm:flex-nowrap sm:self-start"
					>
						<StarRating size={15} />
						<span className="text-[14px] font-semibold text-fg">{BRAND.rating}</span>
						<span className="text-[13px] text-subtle">
							{HOME_SECTIONS.testimonials.ratingCaption.replace(
								'{reviewCount}',
								String(BRAND.reviewCount),
							)}
						</span>
					</Link>
				</Reveal>

				<div
					className={`${HOME_SECTION_GRID_MT} grid-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
				>
					{reviews.map((review, i) => (
						<ReviewHubCard key={review.slug} review={review} index={i} />
					))}
				</div>

				<Reveal className="mt-8 flex flex-col items-center gap-3 text-center md:mt-10">
					<Link href={HOME_RESOURCE_CTAS.reviews.href} className="btn btn-secondary btn-md">
						{HOME_RESOURCE_CTAS.reviews.label}
					</Link>
					<p className="text-[12px] text-faint">{REVIEW_REPRESENTATIVE_DISCLAIMER}</p>
				</Reveal>
			</div>
		</section>
	);
}
