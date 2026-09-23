import { memo } from 'react';
import { ReviewAvatarStack, StarRating, SuccessTicker } from '@/components';
import { SectionExploreLink } from '@/components/explore';
import Link from '@/components/link';
import { BRAND, HOME_RESOURCE_CTAS, HOME_SOCIAL_PROOF } from '@/lib/cms';
import { components } from '@/kit/theme';

export type ProofProps = {
	showCaseStudyExplore?: boolean;
};

function ProofComponent({ showCaseStudyExplore = true }: ProofProps) {
	return (
		<section className={components.homeSocialProofRoot}>
			<div className={components.homeSocialProofInner}>
				<div className={components.homeSocialProofRow}>
					<div className={components.homeSocialProofLeadRow}>
						<Link
							href={HOME_RESOURCE_CTAS.reviews.href}
							className={components.homeSocialProofReviewsLink}
						>
							<ReviewAvatarStack size={36} collapseAfter={4} />
							<div className={components.homeSocialProofReviewsMeta}>
								<div className={components.homeSocialProofRatingRow}>
									<StarRating size={12} label={`Rated ${BRAND.rating} out of 5 stars`} />
									<span className={components.homeSocialProofRatingValue}>{BRAND.rating}</span>
								</div>
								<p className={components.homeSocialProofCaption}>
									{HOME_SOCIAL_PROOF.successStoriesCaption}
								</p>
							</div>
						</Link>

						{showCaseStudyExplore ? (
							<div className={components.homeSocialProofExploreMd}>
								<SectionExploreLink href={HOME_RESOURCE_CTAS.caseStudies.href}>
									{HOME_RESOURCE_CTAS.caseStudies.label}
								</SectionExploreLink>
							</div>
						) : null}
					</div>

					<div aria-hidden className={components.homeSocialProofDivider} />

					<div className={components.homeSocialProofTickerWrap}>
						<SuccessTicker />
					</div>

					{showCaseStudyExplore ? (
						<div className={components.homeSocialProofExploreLg}>
							<SectionExploreLink
								href={HOME_RESOURCE_CTAS.caseStudies.href}
								variant="icon-expand"
								expandLabel={HOME_RESOURCE_CTAS.caseStudies.expandLabel}
							>
								{HOME_RESOURCE_CTAS.caseStudies.label}
							</SectionExploreLink>
						</div>
					) : null}
				</div>

				{showCaseStudyExplore ? (
					<div className={components.homeSocialProofMobileCta}>
						<SectionExploreLink href={HOME_RESOURCE_CTAS.caseStudies.href}>
							{HOME_RESOURCE_CTAS.caseStudies.label}
						</SectionExploreLink>
					</div>
				) : null}
			</div>
		</section>
	);
}

export const Proof = memo(ProofComponent);
