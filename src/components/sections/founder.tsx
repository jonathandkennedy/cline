import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { CaseReviewCtaButton, PhoneCta, Reveal } from '@/components';
import Link from '@/components/link';
import {
	BRAND,
	FOUNDER_STATS,
	GUIDEBOOK_CTA,
	HOME_RESOURCE_CTAS,
	HOME_SECTIONS,
	TEAM_PAGE,
	UI_COPY,
} from '@/lib/cms';
import { components } from '@/kit/theme';

function FounderComponent() {
	return (
		<section className={components.homeFounderRoot}>
			<div className={components.homeFounderGrid}>
				<Reveal>
					<div className={components.homeFounderPortraitWrap}>
						<div aria-hidden className={components.homeFounderGlow} />
						<Link
							href={HOME_SECTIONS.founder.portraitHref ?? TEAM_PAGE.defaultMemberHref}
							aria-label={`${BRAND.founder}, ${HOME_SECTIONS.founder.roleLabel}`}
							className={`${components.homeFounderCard} block cursor-pointer transition duration-300 hover:border-gold/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-base`}
						>
							<div className={components.homeFounderImageAspect}>
								<Image
									src="/images/brian-cline-capture-portrait.jpg"
									alt={UI_COPY.home.founderImageAlt}
									fill
									sizes="(max-width: 768px) 90vw, 420px"
									className={components.homeFounderImage}
								/>
								<div className={components.homeFounderImageOverlay} />
								<div className={components.homeFounderImageCaption}>
									<div className={components.homeFounderName}>{BRAND.founder}</div>
									<div className={components.homeFounderRole}>
										{HOME_SECTIONS.founder.roleLabel}
									</div>
								</div>
							</div>
						</Link>
					</div>
				</Reveal>

				<Reveal delay={90}>
					<span className={components.sectionEyebrow}>{HOME_SECTIONS.founder.eyebrow}</span>
					<h2 className={components.homeSectionH2}>{HOME_SECTIONS.founder.headline}</h2>
					<p className={components.homeSectionBody}>{HOME_SECTIONS.founder.paragraphs[0]}</p>
					<p className={components.homeFounderParagraphMuted}>
						{HOME_SECTIONS.founder.paragraphs[1].replace('{founder}', BRAND.founder)}
					</p>

					<div className={components.homeFounderStatsGrid}>
						{FOUNDER_STATS.map((b) => (
							<div key={b.stat} className={components.homeFounderStatCard}>
								<div className={components.homeFounderStatValue}>{b.stat}</div>
								<div className={components.homeFounderStatLabel}>{b.label}</div>
							</div>
						))}
					</div>

					<div className={components.homeFounderCtaRow}>
						<CaseReviewCtaButton
							leadContextId="home-final-cta"
							className={components.homeFounderPrimaryCta}
						>
							{HOME_SECTIONS.founder.ctaLabel} <ArrowRight size={16} />
						</CaseReviewCtaButton>
						<PhoneCta size="md" />
					</div>

					<div className={components.homeFounderLinksRow}>
						<Link
							href={HOME_RESOURCE_CTAS.caseStudies.href}
							className={components.homeFounderResourceLink}
						>
							{HOME_RESOURCE_CTAS.caseStudies.label}
						</Link>
						<span aria-hidden className={components.homeFounderLinkSep} />
						<Link href={GUIDEBOOK_CTA.ctaHref} className={components.homeFounderResourceLink}>
							{GUIDEBOOK_CTA.ctaLabel}
						</Link>
						<span aria-hidden className={components.homeFounderLinkSep} />
						<Link
							href={HOME_RESOURCE_CTAS.manufacturers.href}
							className={components.homeFounderResourceLink}
						>
							{HOME_RESOURCE_CTAS.manufacturers.label}
						</Link>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

export const Founder = memo(FounderComponent);
