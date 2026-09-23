import { ResourceStickyScrollAside } from '@/kit/blocks/aside';
import { FAQ_INTRO_CTA_ITEMS, getHomeFeaturedFaqs, HOME_SECTIONS } from '@/lib/cms';
import { FAQ_INTRO_CTA_ACTION_BY_TYPE } from '@/lib/site/gestures';
import { FaqList } from '@/components/listing';
import { Reveal } from '@/components/reveal';

export function Faq() {
	const faqItems = getHomeFeaturedFaqs();

	return (
		<section id="faq" className="rule-y">
			<div className="container-x section-y">
				<div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
					<ResourceStickyScrollAside as="div">
						<Reveal>
							<span className="eyebrow">{HOME_SECTIONS.faq.eyebrow}</span>
							<h2 className="display mt-2.5 max-w-[16ch] text-balance text-[clamp(1.35rem,2.4vw,1.7rem)] leading-[1.15] tracking-[-0.02em] sm:max-w-[20ch] md:max-w-none">
								{HOME_SECTIONS.faq.headline}
							</h2>
							<p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-muted md:text-[15px]">
								{HOME_SECTIONS.faq.subhead}
							</p>
							<div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
								{FAQ_INTRO_CTA_ITEMS.map((item) => (
									<span key={item.id}>{FAQ_INTRO_CTA_ACTION_BY_TYPE[item.type](item)}</span>
								))}
							</div>
						</Reveal>
					</ResourceStickyScrollAside>

					<Reveal delay={80} className="space-y-4">
						<FaqList items={faqItems} />
					</Reveal>
				</div>
			</div>
		</section>
	);
}
