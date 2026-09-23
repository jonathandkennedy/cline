import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { Reveal } from '@/components';
import Link from '@/components/link';
import { PrimaryCallCta } from '@/components/fields/primarycall';
import { GUIDEBOOK_CTA } from '@/lib/cms';
import { components } from '@/kit/theme';
import { cn } from '@/kit/shared';

function PromptComponent() {
	const cta = GUIDEBOOK_CTA;

	return (
		<section className={components.homePromptRoot}>
			<div className={components.homePromptInner}>
				<Reveal>
					<div className={components.homePromptCard}>
						<div aria-hidden className={components.homePromptGlowWrap}>
							<div className={components.homePromptGlow} />
						</div>
						<div aria-hidden className={components.homePromptTopLine} />

						<Link href={cta.ctaHref} className={components.homePromptCoverLink}>
							<Image
								src={cta.coverSrc}
								alt={cta.coverAlt}
								width={cta.coverWidth}
								height={cta.coverHeight}
								sizes={cta.coverSizes}
								className={components.homePromptCoverImage}
							/>
						</Link>

						<div className={components.homePromptContent}>
							<span className={components.homePromptPill}>{cta.pill}</span>
							<h2 className={cn(components.homeSectionH2, components.homePromptTitle)}>
								{cta.title}
							</h2>
							<p className={cn(components.homeSectionBody, components.homePromptBody)}>
								{cta.description}
							</p>
							<div className={components.homePromptCtaRow}>
								<Link href={cta.ctaHref} className={components.homePromptPrimaryCta}>
									{cta.ctaLabel} <ArrowRight size={16} />
								</Link>
								<PrimaryCallCta
									leadContextId="home-final-cta"
									className={components.homePromptSecondaryCta}
									arrowSize={14}
								/>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

export const Prompt = memo(PromptComponent);
