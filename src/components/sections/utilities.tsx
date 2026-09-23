import { BookOpen } from 'lucide-react';
import { memo } from 'react';
import { Reveal, ToolCard } from '@/components';
import Link from '@/components/link';
import { GUIDEBOOK_CTA, HOME_SECTIONS, LEARN_HUB_CTA, TOOLS } from '@/lib/cms';
import { cn } from '@/kit/shared';
import { PathEligibilityLink } from '@/components/sections/path';
import { components } from '@/kit/theme';

function UtilitiesComponent() {
	return (
		<section id="tools" className={components.homeToolsRoot}>
			<div className={components.homeToolsInner}>
				<Reveal className={components.homeSectionHeaderRow}>
					<div className={cn(components.homeMinW0, components.homeToolsHeadlineWrap)}>
						<span className={components.sectionEyebrow}>{HOME_SECTIONS.tools.eyebrow}</span>
						<h2 className={cn(components.homeSectionH2, components.homeToolsHeadline)}>
							{HOME_SECTIONS.tools.headline}
						</h2>
						<p className={components.homeSectionBody}>{HOME_SECTIONS.tools.aside}</p>
					</div>
					<PathEligibilityLink className={components.homeProcessEligibilityLink} />
				</Reveal>

				<div className={components.homeToolsGrid}>
					{TOOLS.map((t, i) => (
						<Reveal key={t.slug} delay={i * 80} className={components.homeFullHeight}>
							<ToolCard tool={t} index={i} />
						</Reveal>
					))}
				</div>

				<Reveal delay={200}>
					<div className={components.homeToolsFooter}>
						<Link href={GUIDEBOOK_CTA.ctaHref} className={components.homeToolsGuidebookCta}>
							<BookOpen size={16} aria-hidden />
							{GUIDEBOOK_CTA.ctaLabel}
						</Link>
						<Link href={LEARN_HUB_CTA.href} className={components.homeToolsLearnCta}>
							{LEARN_HUB_CTA.label}
						</Link>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

export const Utilities = memo(UtilitiesComponent);
