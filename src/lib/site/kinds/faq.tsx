'use client';

import { ExternalLink, ListChecks, Scale } from 'lucide-react';
import { useParams } from 'next/navigation';

import { Reveal } from '@/components';
import Link from '@/components/link';

import {
	ResourceCallout,
	ResourceContentAsideLayout,
	ResourceDetailAside,
	ResourceHighlightCard,
	ResourceKeyTakeaways,
	ResourceSectionHeading,
} from '@/kit/blocks';
import { ResourceProse } from '@/kit/blocks/copy';
import { ResourceBand, ResourceDetailHero } from '@/kit/blocks/spotlight';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { components } from '@/kit/theme';
import { cn } from '@/kit/ui/functions/cn';
import { bannerCtaRowAsideStackClass } from '@/kit/ui/functions/row';

import type { FaqDetailBlockId } from '@/lib/cms';
import {
	buildFaqDetailBreadcrumbs,
	emptyBlockMap,
	FAQ_CATEGORY_LABELS,
	FAQ_DETAIL_HERO_EYEBROW,
	FAQ_DETAIL_SECTIONS,
	FAQ_HUB_HERO,
	FAQ_HUB_PATH,
	getFaqBySlug,
} from '@/lib/site';
import type { ResourceBlockRenderer } from '@/lib/site/branches';
import { makeFunnelBlock } from '@/lib/site/resources/closing';
import { ResourceRelatedQuestionsGrid } from '@/lib/site/resources/faqlinks';
import { ResourceDualCta } from '@/lib/site/resources/paired';

const FAQ_ANSWER_SPINE = components['resource.faqAnswerSpine'];
const faqDetailClosing = makeFunnelBlock('faq-detail');

function createFaqDetailBlockRegistry(slug: string): ResourceBlockRenderer<FaqDetailBlockId> {
	const faq = getFaqBySlug(slug);
	if (!faq) {
		return emptyBlockMap<FaqDetailBlockId>([
			'hero',
			'answer',
			'relatedQuestions',
			'statuteLinks',
			'funnel',
		]);
	}

	const categoryLabel = FAQ_CATEGORY_LABELS[faq.categoryId];
	const statuteLinks = faq.statuteLinks ?? [];

	return {
		hero: () => (
			<ResourceDetailHero
				breadcrumbs={buildFaqDetailBreadcrumbs(slug)}
				heroImage={FAQ_HUB_HERO.heroImage}
				heroImageAlt={FAQ_HUB_HERO.heroImageAlt}
			>
				<Reveal>
					<div className={components.resourceUi.answer.k001}>
						<span className="eyebrow">{FAQ_DETAIL_HERO_EYEBROW}</span>
						<span className={components['resource.categoryDivider']} aria-hidden />
						<span className={components['resource.categoryPill']}>{categoryLabel}</span>
					</div>
					<h1 className={components.resourceUi.answer.k002}>{faq.q}</h1>
					<div className={components.resourceUi.answer.k003}>
						<p className={components.resourceUi.answer.k004}>{FAQ_DETAIL_SECTIONS.plainAnswer}</p>
						<ResourceProse className={components.resourceUi.answer.k005}>{faq.a}</ResourceProse>
					</div>
				</Reveal>
			</ResourceDetailHero>
		),
		answer: () => (
			<ResourceBand borderTop={false} bleedClassName="bg-ink/15">
				<ResourceContentAsideLayout
					main={
						<div className={cn(FAQ_ANSWER_SPINE, components.resourceUi.answer.k010)}>
							{faq.keyPoints ? (
								<Reveal>
									<ResourceKeyTakeaways
										icon={ListChecks}
										title={FAQ_DETAIL_SECTIONS.keyTakeaways}
										points={faq.keyPoints}
									/>
								</Reveal>
							) : null}
							{statuteLinks.length > 0 ? (
								<Reveal>
									<ResourceHighlightCard>
										<ResourceSectionHeading
											icon={ExternalLink}
											title={FAQ_DETAIL_SECTIONS.statuteLinks}
											className="max-w-none"
										/>
										<ul className={components.resourceUi.answer.k006}>
											{statuteLinks.map((link) => (
												<li key={link.href}>
													<a
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
														className={components['resource.statuteLinkCard']}
													>
														<span className={components['resource.statuteLinkIcon']}>
															<Scale size={15} aria-hidden />
														</span>
														<span className={components.resourceUi.shared.k001}>
															<span className={components['resource.statuteLinkLabel']}>
																{link.label}
															</span>
															<span className={components['resource.statuteLinkAction']}>
																{FAQ_DETAIL_SECTIONS.openStatute}
																<ExternalLink
																	size={11}
																	className={components.resourceUi.answer.k007}
																	aria-hidden
																/>
															</span>
														</span>
													</a>
												</li>
											))}
										</ul>
									</ResourceHighlightCard>
								</Reveal>
							) : null}
							<Reveal>
								<ResourceCallout
									icon={Scale}
									title={FAQ_DETAIL_SECTIONS.contextCalloutTitle}
									className="mt-0"
								>
									{FAQ_DETAIL_SECTIONS.contextCalloutBody}
								</ResourceCallout>
							</Reveal>
						</div>
					}
					aside={
						<div className={components.resourceUi.answer.k008}>
							<ResourceDetailAside
								eyebrow={FAQ_DETAIL_SECTIONS.asideEyebrow}
								title={FAQ_DETAIL_SECTIONS.asideTitle}
							>
								<p className={components.resourceUi.shared.k002}>{FAQ_DETAIL_SECTIONS.asideBody}</p>
								<ResourceDualCta
									leadContextId="faq-detail"
									asideStack
									className={bannerCtaRowAsideStackClass('mt-5')}
								/>
								<Link href={FAQ_HUB_PATH} className={components.resourceUi.answer.k009}>
									{FAQ_DETAIL_SECTIONS.browseAllFaq}
									<span aria-hidden>→</span>
								</Link>
							</ResourceDetailAside>
						</div>
					}
				/>
			</ResourceBand>
		),
		relatedQuestions: () => {
			const relatedFaqs = faq.relatedQuestionSlugs.flatMap((relatedSlug) => {
				const related = getFaqBySlug(relatedSlug);
				return related ? [related] : [];
			});
			return <ResourceRelatedQuestionsGrid faqs={relatedFaqs} />;
		},
		statuteLinks: () => null,
		...faqDetailClosing,
	};
}

function useFaqDetailSlug(): string {
	const params = useParams();
	const slug = params.slug;
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug) && typeof slug[0] === 'string') return slug[0];
	return '';
}

function faqDetailBlock(id: FaqDetailBlockId) {
	return function RenderFaqDetailBlock() {
		const blocks = createFaqDetailBlockRegistry(useFaqDetailSlug());
		return blocks[id]();
	};
}

export const faqDetailKinds: SiteComponentKindMap = {
	'detail.faqHero': faqDetailBlock('hero'),
	'detail.faqAnswer': faqDetailBlock('answer'),
	'detail.faqStatuteLinks': faqDetailBlock('statuteLinks'),
	'detail.faqRelatedQuestions': faqDetailBlock('relatedQuestions'),
};
