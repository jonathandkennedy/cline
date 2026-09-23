'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Avatar, BrandLogo, Reveal, ReviewSourceBadge } from '@/components';
import Link from '@/components/link';
import type { CaseStudyDetailRecord, ReviewDetailRecord } from '@/lib/cms';
import {
	caseStudyDetailPath,
	MANUFACTURERS,
	manufacturerDetailPath,
	REVIEW_DETAIL_SECTIONS,
	reviewDetailPath,
	reviewPortraitSrc,
} from '@/lib/site';
import { cn } from '@/kit/shared';
import { ResourceOutcomeBadge } from '@/kit/blocks';
import { components } from '@/kit/theme';

const HUB_CARD_MEDIA =
	'relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-line sm:aspect-[5/4]';

const CASE_STUDY_HUB_LOGO_MARK = 'h-8 w-full max-w-[7.5rem] shrink-0 grayscale opacity-50 text-fg';

export function ReviewHubCard({ review, index }: { review: ReviewDetailRecord; index: number }) {
	const manufacturer = review.manufacturerSlug
		? MANUFACTURERS.find((m) => m.slug === review.manufacturerSlug)
		: undefined;

	const reviewHref = reviewDetailPath(review.slug);
	const reviewLabel = `${REVIEW_DETAIL_SECTIONS.readFullStory}: ${review.name}`;
	const cardImage = review.cardImage
		? {
				src: review.cardImage,
				alt: review.cardImageAlt ?? review.vehicle,
			}
		: null;

	return (
		<Reveal delay={(index % 3) * 40} className={components.resourceUi.shared.k031}>
			<div className={components.resourceUi.tile.k001}>
				<Link
					href={reviewHref}
					className={components.resourceUi.tile.k002}
					aria-label={reviewLabel}
				/>
				{cardImage ? (
					<div className={cn(HUB_CARD_MEDIA, 'relative z-[1] pointer-events-none')}>
						<Image
							src={cardImage.src}
							alt={cardImage.alt}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className={components.resourceUi.tile.k003}
						/>
					</div>
				) : null}
				<div className={components.resourceUi.tile.k004}>
					<div className="flex flex-wrap items-center gap-2">
						<ResourceOutcomeBadge label={review.outcome} />
						<ReviewSourceBadge source={review.source} />
					</div>
					<blockquote className={components.resourceUi.tile.k005}>
						&ldquo;{review.quote}&rdquo;
					</blockquote>
					<div className={components.resourceUi.tile.k006}>
						<Avatar
							name={review.name}
							src={reviewPortraitSrc(review)}
							size={40}
							className={components.resourceUi.tile.k007}
						/>
						<div className={components.resourceUi.shared.k001}>
							<div className={components.resourceUi.tile.k008}>{review.name}</div>
							<div className={components.resourceUi.tile.k009}>{review.location}</div>
						</div>
					</div>
					<div className={components.resourceUi.tile.k010}>
						<span>{review.vehicle}</span>
						{manufacturer ? (
							<>
								<span aria-hidden>·</span>
								<Link
									href={manufacturerDetailPath(manufacturer.slug)}
									className={components.resourceUi.tile.k011}
								>
									{manufacturer.name}
								</Link>
							</>
						) : null}
					</div>
					<span className={components.resourceUi.tile.k012}>
						{REVIEW_DETAIL_SECTIONS.readFullStory}
						<ArrowRight size={14} aria-hidden />
					</span>
				</div>
			</div>
		</Reveal>
	);
}

export function CaseStudyHubCard({
	study,
	index,
}: {
	study: CaseStudyDetailRecord;
	index: number;
}) {
	const manufacturer = MANUFACTURERS.find((m) => m.slug === study.manufacturerSlug);

	return (
		<Reveal delay={(index % 3) * 50} className={components.resourceUi.tile.k013}>
			<Link href={caseStudyDetailPath(study.slug)} className={components.resourceUi.tile.k014}>
				<div className={components.resourceUi.shared.k006}>
					<p className={components.resourceUi.tile.k015}>
						<span className="text-gold">{study.outcomeType}</span>
						<span aria-hidden className="text-line">
							·
						</span>
						<span className="text-subtle">{study.vehicle}</span>
					</p>
					<h2 className={components.resourceUi.tile.k016}>{study.headline}</h2>
					<p className={components.resourceUi.tile.k017}>{study.situation}</p>
				</div>
				<div className={components.resourceUi.tile.k018}>
					<span className={components.resourceUi.tile.k019}>
						Read Case Study
						<ArrowRight size={14} className={components.resourceUi.shared.k040} aria-hidden />
					</span>
					{manufacturer?.logo ? (
						<span
							className={components.resourceUi.tile.k020}
							aria-hidden
							style={
								manufacturer.hubLogoScale != null && manufacturer.hubLogoScale !== 1
									? {
											transform: `scale(${manufacturer.hubLogoScale})`,
											transformOrigin: 'right center',
										}
									: undefined
							}
						>
							<BrandLogo
								src={manufacturer.logo}
								title={manufacturer.name}
								align="end"
								maskFit="contain"
								className={CASE_STUDY_HUB_LOGO_MARK}
							/>
						</span>
					) : (
						<span className={components.resourceUi.tile.k021} aria-hidden />
					)}
				</div>
			</Link>
		</Reveal>
	);
}
