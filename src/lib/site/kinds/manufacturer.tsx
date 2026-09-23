'use client';

import { ArrowRight, Library, ListOrdered, Shield, Wrench } from 'lucide-react';
import { useParams } from 'next/navigation';
import { BrandLogo, Checklist, Reveal } from '@/components';
import { PrimaryCallCta } from '@/components/fields/primarycall';
import { leadCaptureInlineSlot } from '@/components/leads/inline';
import Link from '@/components/link';
import { PostList } from '@/components/blog/related';
import { blogTopicPath, getBlogTopic, postsForBrand } from '@/lib/topics';
import type { ManufacturerDetailBlockId } from '@/lib/cms';
import {
	buildManufacturerDetailBreadcrumbs,
	CASE_STUDY_DETAIL_SECTIONS,
	emptyBlockMap,
	FAQ_DETAIL_SECTIONS,
	formatManufacturerRightsBody,
	getFaqBySlug,
	getManufacturerPageBySlug,
	listManufacturerRelatedFaqSlugs,
	listManufacturerRelatedNonFaqCards,
	MANUFACTURER_COMMON_ISSUES_EYEBROW,
	MANUFACTURER_DETAIL_RIGHTS_BODY,
	MANUFACTURER_DETAIL_RIGHTS_EYEBROW,
	MANUFACTURER_DETAIL_RIGHTS_TITLE,
	MANUFACTURER_HOW_WE_HANDLE_EYEBROW,
	MANUFACTURER_RELATED_CARD_KIND_LABEL,
	MANUFACTURERS,
	MANUFACTURERS_HUB_HERO,
	QUALIFY_ITEMS,
	UI_COPY,
} from '@/lib/site';
import { formatBrandTemplate } from '@/lib/cms';
import type { ResourceBlockRenderer } from '@/lib/site/branches';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { components } from '@/kit/theme';
import {
	ResourceDetailCtaLane,
	ResourceKeepExploringGrid,
	ResourceSectionHeading,
} from '@/kit/blocks';
import { makeFunnelBlock } from '@/lib/site/resources/closing';
import { ResourceProse } from '@/kit/blocks/copy';
import { ResourceRelatedQuestionsGrid } from '@/lib/site/resources/faqlinks';
import { RESOURCE_BLEED_ALT, RESOURCE_BLEED_MAIN } from '@/kit/blocks/rhythm';
import { ResourceBand, ResourceDetailHero } from '@/kit/blocks/spotlight';

const manufacturerDetailClosing = makeFunnelBlock('manufacturer-detail');

function createManufacturerDetailBlockRegistry(
	slug: string,
	leadContextId?: unknown,
): ResourceBlockRenderer<ManufacturerDetailBlockId> {
	const detail = getManufacturerPageBySlug(slug);
	const manufacturer = MANUFACTURERS.find((m) => m.slug === slug);

	if (!detail || !manufacturer) {
		return emptyBlockMap<ManufacturerDetailBlockId>([
			'hero',
			'rights',
			'commonIssues',
			'howWeHandle',
			'relatedQuestions',
			'funnel',
			'relatedContent',
		]);
	}

	const faqSlugs = listManufacturerRelatedFaqSlugs(slug);
	const relatedCards = listManufacturerRelatedNonFaqCards(slug);

	return {
		hero: () => (
			<ResourceDetailHero
				breadcrumbs={buildManufacturerDetailBreadcrumbs(slug)}
				heroImage={MANUFACTURERS_HUB_HERO.heroImage}
				heroImageAlt={MANUFACTURERS_HUB_HERO.heroImageAlt}
				formSlot={leadCaptureInlineSlot(leadContextId)}
			>
				<div className={components.resourceUi.profile.k001}>
					{manufacturer.logo ? (
						<span className={components.resourceUi.profile.k002}>
							<BrandLogo
								src={manufacturer.logo}
								title={manufacturer.name}
								align="start"
								maskFit="contain"
								className={components.resourceUi.profile.k003}
							/>
						</span>
					) : (
						<p className={components.resourceUi.profile.k004}>{manufacturer.name}</p>
					)}
					<h1 className={components.resourceUi.profile.k005}>{detail.headline}</h1>
					<p className={components.resourceUi.profile.k006}>{detail.intro}</p>
				</div>
			</ResourceDetailHero>
		),
		commonIssues: () => (
			<ResourceBand borderTop={false} bleedClassName={RESOURCE_BLEED_MAIN}>
				<Reveal>
					<ResourceSectionHeading
						icon={Wrench}
						eyebrow={MANUFACTURER_COMMON_ISSUES_EYEBROW}
						title={`Defects We See on ${manufacturer.name} Vehicles`}
					/>
					<ResourceProse className="mt-5">
						{`Every case is unique. These are common defects our attorneys evaluate on ${manufacturer.name} claims statewide.`}
					</ResourceProse>
				</Reveal>
				<ul className={components.resourceUi.profile.k007}>
					{detail.commonDefects.map((defect, index) => (
						<Reveal key={defect} delay={index * 35}>
							<li className={components.resourceUi.profile.k008}>{defect}</li>
						</Reveal>
					))}
				</ul>
			</ResourceBand>
		),
		howWeHandle: () => (
			<ResourceBand bleedClassName={RESOURCE_BLEED_ALT}>
				<ResourceSectionHeading
					icon={ListOrdered}
					eyebrow={MANUFACTURER_HOW_WE_HANDLE_EYEBROW}
					title={formatBrandTemplate(UI_COPY.resources.manufacturerHowWeHandleTitleTemplate, {
						name: manufacturer.name,
					})}
				/>
				<ol className={components.resourceUi.profile.k009}>
					{detail.howWeHandle.map((step, index) => (
						<Reveal key={step} delay={index * 60}>
							<li className={components.resourceUi.profile.k010}>
								<span aria-hidden className={components.resourceUi.profile.k011}>
									{String(index + 1).padStart(2, '0')}
								</span>
								<div className={components.resourceUi.profile.k012}>
									<span className={components.resourceUi.profile.k013}>{index + 1}</span>
									{index < detail.howWeHandle.length - 1 ? (
										<span aria-hidden className={components.resourceUi.profile.k014} />
									) : null}
								</div>
								<p className={components.resourceUi.profile.k015}>Step {index + 1}</p>
								<p className={components.resourceUi.profile.k016}>{step}</p>
							</li>
						</Reveal>
					))}
				</ol>
			</ResourceBand>
		),
		rights: () => (
			<ResourceBand bleedClassName={RESOURCE_BLEED_MAIN}>
				<div className={components.resourceUi.profile.k017}>
					<Reveal className={components.resourceUi.profile.k018}>
						<ResourceSectionHeading
							icon={Shield}
							eyebrow={MANUFACTURER_DETAIL_RIGHTS_EYEBROW}
							title={MANUFACTURER_DETAIL_RIGHTS_TITLE}
							body={formatManufacturerRightsBody(
								MANUFACTURER_DETAIL_RIGHTS_BODY,
								manufacturer.name,
							)}
							bodyPlacement="indented"
						/>
						<div className="mt-7">
							<ResourceDetailCtaLane>
								<div className={components.resourceUi.profile.k019}>
									<p className={components.resourceUi.shared.k007}>Next step</p>
									<p className={components.resourceUi.shared.k010}>
										Talk with counsel about your {manufacturer.name} under California Lemon Law.
									</p>
								</div>
								<PrimaryCallCta
									leadContextId="manufacturer-detail"
									className={components.resourceUi.profile.k020}
									arrowSize={15}
								/>
							</ResourceDetailCtaLane>
						</div>
					</Reveal>
					<Reveal delay={80} className={components.resourceUi.shared.k031}>
						<div className={components.resourceUi.profile.k021}>
							<div aria-hidden className={components.resourceUi.shared.k011} />
							<p className={components.resourceUi.shared.k007}>
								{MANUFACTURER_DETAIL_RIGHTS_EYEBROW}
							</p>
							<ul className={components.resourceUi.profile.k022}>
								{QUALIFY_ITEMS.map((item) => (
									<Checklist key={item}>{item}</Checklist>
								))}
							</ul>
						</div>
					</Reveal>
				</div>
			</ResourceBand>
		),
		relatedQuestions: () => {
			const relatedFaqs = faqSlugs.flatMap((faqSlug) => {
				const relatedFaq = getFaqBySlug(faqSlug);
				return relatedFaq ? [relatedFaq] : [];
			});
			const brandPosts = postsForBrand(slug).slice(0, 6);
			const brandHub = getBlogTopic(slug);
			return (
				<>
					<ResourceRelatedQuestionsGrid
						faqs={relatedFaqs}
						title={FAQ_DETAIL_SECTIONS.relatedQuestions}
					/>
					{brandPosts.length > 0 ? (
						<ResourceBand pad="default" bleedClassName={RESOURCE_BLEED_MAIN}>
							<h2 className="text-xl font-semibold text-fg">
								{manufacturer?.name ?? detail.headline} articles from our blog
							</h2>
							<div className="mt-6">
								<PostList posts={brandPosts} headingLevel="h3" />
							</div>
							{brandHub ? (
								<p className="mt-6">
									<Link href={blogTopicPath(brandHub.slug)} className="font-semibold text-gold">
										All {brandHub.label} articles
									</Link>
								</p>
							) : null}
						</ResourceBand>
					) : null}
				</>
			);
		},
		relatedContent: () => {
			const items = relatedCards.map((card) => ({
				key: card.id,
				href: card.href,
				kind: MANUFACTURER_RELATED_CARD_KIND_LABEL[card.kind],
				title: card.title,
				description: card.description,
			}));
			return (
				<ResourceKeepExploringGrid
					icon={Library}
					title={CASE_STUDY_DETAIL_SECTIONS.related}
					body={CASE_STUDY_DETAIL_SECTIONS.relatedBody}
					items={items}
				/>
			);
		},
		...manufacturerDetailClosing,
	};
}

function useManufacturerDetailSlug(): string {
	const params = useParams();
	const slug = params.slug;
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug) && typeof slug[0] === 'string') return slug[0];
	return '';
}

function ManufacturerDetailHero({ leadContextId }: { leadContextId?: unknown }) {
	const blocks = createManufacturerDetailBlockRegistry(useManufacturerDetailSlug(), leadContextId);
	return blocks.hero();
}

function manufacturerDetailBlock(id: ManufacturerDetailBlockId) {
	return function RenderManufacturerDetailBlock() {
		const blocks = createManufacturerDetailBlockRegistry(useManufacturerDetailSlug());
		return blocks[id]();
	};
}

export const manufacturerDetailKinds: SiteComponentKindMap = {
	'detail.manufacturerHero': (props) => (
		<ManufacturerDetailHero leadContextId={props.leadContextId} />
	),
	'detail.manufacturerCommonIssues': manufacturerDetailBlock('commonIssues'),
	'detail.manufacturerHowWeHandle': manufacturerDetailBlock('howWeHandle'),
	'detail.manufacturerRights': manufacturerDetailBlock('rights'),
	'detail.manufacturerRelatedQuestions': manufacturerDetailBlock('relatedQuestions'),
	'detail.manufacturerRelatedContent': manufacturerDetailBlock('relatedContent'),
};
