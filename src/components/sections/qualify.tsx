import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { Checklist, CountUp, Reveal } from '@/components';
import Link from '@/components/link';
import { PrimaryCallCta } from '@/components/fields/primarycall';
import { EXAMPLE_RECOVERY, HOME_SECTIONS, QUALIFY_ITEMS } from '@/lib/cms';
import { components } from '@/kit/theme';

function QualifyComponent() {
	return (
		<section className={components.homeQualifyRoot}>
			<div className={components.homeQualifyInner}>
				<div className={components.homeQualifyGrid}>
					<Reveal>
						<span className={components.sectionEyebrow}>{HOME_SECTIONS.qualify.eyebrow}</span>
						<h2 className={components.homeSectionH2}>{HOME_SECTIONS.qualify.headline}</h2>
						<p className={components.homeSectionBody}>{HOME_SECTIONS.qualify.intro}</p>

						<ul className={components.homeQualifyList}>
							{QUALIFY_ITEMS.map((q) => (
								<Checklist key={q}>{q}</Checklist>
							))}
						</ul>

						<div className={components.homeQualifyCtaRow}>
							<PrimaryCallCta
								leadContextId="home-final-cta"
								className={components.homeQualifyPrimaryCta}
								label={HOME_SECTIONS.qualify.ctaLabel}
								arrowSize={16}
							/>
							<Link href="/tool/buyback-calculator" className={components.homeQualifySecondaryCta}>
								{HOME_SECTIONS.qualify.recoveryCta}
							</Link>
						</div>
					</Reveal>

					<Reveal delay={90}>
						<div className={components.homeQualifyRecoveryCard}>
							<div aria-hidden className={components.homeQualifyRecoveryTopLine} />
							<div aria-hidden className={components.homeQualifyRecoveryGlowRecovery} />
							<div aria-hidden className={components.homeQualifyRecoveryGlowGold} />
							<div className={components.homeQualifyRecoveryRelative}>
								<div className={components.sectionEyebrow}>
									{HOME_SECTIONS.qualify.recoveryEyebrow}
								</div>
								<div className={components.homeQualifyRecoveryValue}>
									<CountUp to={EXAMPLE_RECOVERY.total} prefix="$" />
								</div>
								<p className={components.homeQualifyRecoveryNote}>
									{HOME_SECTIONS.qualify.recoveryNote}
								</p>
								<div className={components.homeQualifyBreakdownGrid}>
									{EXAMPLE_RECOVERY.breakdown.map((b) => (
										<div key={b.key} className={components.homeQualifyBreakdownCell}>
											<div className={components.homeQualifyBreakdownValue}>{b.value}</div>
											<div className={components.homeQualifyBreakdownKey}>{b.key}</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

export const Qualify = memo(QualifyComponent);
