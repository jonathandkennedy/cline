import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { Reveal } from '@/components';
import Link from '@/components/link';
import { PrimaryCallCta } from '@/components/fields/primarycall';
import { HOME_SECTIONS, PRIMARY_ELIGIBILITY_CTA, PROCESS_STEPS, TOOLS } from '@/lib/cms';
import { cn } from '@/kit/shared';
import { PathEligibilityLink } from '@/components/sections/path';
import { components } from '@/kit/theme';

function ProcessComponent() {
	return (
		<section className={components.homeProcessRoot}>
			<div aria-hidden className={components.homeProcessTexture} />
			<div aria-hidden className={components.homeProcessGlow} />
			<div className={components.homeProcessInner}>
				<Reveal className={components.homeSectionHeaderRow}>
					<div className={components.homeMinW0}>
						<span className={components.sectionEyebrow}>{HOME_SECTIONS.process.eyebrow}</span>
						<h2 className={components.homeSectionH2}>{HOME_SECTIONS.process.headline}</h2>
					</div>
					<PathEligibilityLink className={components.homeProcessEligibilityLink} />
				</Reveal>

				<div className={cn(components.homeSectionGridMt, components.homeProcessGrid)}>
					{PROCESS_STEPS.map((s, i) => {
						const tool = TOOLS[i];
						const href = s.href ?? (tool ? `/tool/${tool.slug}` : '/tool/eligibility-checker');
						const ctaLabel = s.ctaLabel ?? (tool ? tool.cta : PRIMARY_ELIGIBILITY_CTA.label);
						return (
							<Reveal key={s.n} delay={i * 60} className={components.homeFullHeight}>
								<div
									className={cn(
										components.homeProcessStepCard,
										i === 0 && components.homeProcessStepCardFeatured,
									)}
								>
									{href.startsWith('tel:') ? (
										<PrimaryCallCta
											leadContextId="home-final-cta"
											className={components.homeProcessStepHitArea}
											showArrow={false}
										>
											<span className="sr-only">{`${s.title}: ${ctaLabel}`}</span>
										</PrimaryCallCta>
									) : (
										<Link
											href={href}
											className={components.homeProcessStepHitArea}
											aria-label={`${s.title}: ${ctaLabel}`}
										/>
									)}
									<div className={components.homeProcessStepBody}>
										<div className={components.homeProcessStepHeader}>
											<span className={components.homeIconWellGold}>
												<span className={components.homeProcessStepNumber}>{s.n}</span>
											</span>
											{i < PROCESS_STEPS.length - 1 ? (
												<span aria-hidden className={components.homeProcessStepConnector} />
											) : null}
										</div>
										<h3 className={components.homeProcessStepTitle}>{s.title}</h3>
										<p className={components.homeProcessStepBodyText}>{s.body}</p>
										<span className={components.homeProcessStepCta}>
											{ctaLabel} <ArrowRight size={14} />
										</span>
									</div>
								</div>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export const Process = memo(ProcessComponent);
