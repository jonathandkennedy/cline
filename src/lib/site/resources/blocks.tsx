import {
	Car,
	Clock,
	FileCheck,
	HelpCircle,
	Lightbulb,
	MapPin,
	Scale,
	Sparkles,
	Wrench,
	type LucideIcon,
} from 'lucide-react';

import { Reveal } from '@/components';
import Link from '@/components/link';

import {
	ResourceAsideFactList,
	ResourceContentAsideLayout,
	ResourceDetailAside,
	ResourceIndexedSectionHeading,
	ResourceKeepExploringGrid,
	ResourceSectionHeading,
} from '@/kit/blocks';
import { ResourceProse } from '@/kit/blocks/copy';
import {
	RESOURCE_BLEED_MAIN,
	RESOURCE_INDEXED_BODY_CLASS,
	RESOURCE_SUPPORTING_TEXT_CLASS,
	resourceBleedClass,
} from '@/kit/blocks/rhythm';
import { ResourceBand, ResourceDetailHero } from '@/kit/blocks/spotlight';
import { CaseStudyDesktopToc, CaseStudySectionNav } from '@/kit/blocks/toc';
import { RESOURCE_HERO_COPY_BODY_TOP_DEFAULT } from '@/kit/blocks/tokens';
import { cn } from '@/kit/shared';
import { components } from '@/kit/theme';

import type { CaseStudyDetailBlockId } from '@/lib/cms';
import {
	buildCaseStudyDetailBreadcrumbs,
	CASE_STUDY_DETAIL_SECTIONS,
	CASE_STUDY_REPRESENTATIVE_DISCLAIMER,
	emptyBlockMap,
	getCaseStudyBySlug,
	getFaqBySlug,
	getReviewBySlug,
	MANUFACTURERS,
	manufacturerDetailPath,
	reviewDetailPath,
	UI_COPY,
} from '@/lib/site';

import { makeFunnelBlock } from './closing';
import { ResourceRelatedQuestionsGrid } from './faqlinks';

const RESOURCE_NARRATIVE_COLUMN = components['resource.narrativeColumn'];

const CASE_STUDY_TOC = [
	{ id: 'situation', labelKey: 'tocSituation' as const },
	{ id: 'defect', labelKey: 'tocDefect' as const },
	{ id: 'legal-path', labelKey: 'tocLegal' as const },
	{ id: 'timeline', labelKey: 'tocTimeline' as const },
	{ id: 'outcome', labelKey: 'tocOutcome' as const },
	{ id: 'documents', labelKey: 'tocDocuments' as const },
	{ id: 'lessons', labelKey: 'tocLessons' as const },
] as const;

function caseStudyTocItems() {
	return CASE_STUDY_TOC.map((entry) => ({
		id: entry.id,
		label: CASE_STUDY_DETAIL_SECTIONS[entry.labelKey],
	}));
}

function caseStudyHeroDeck(situation: string): string {
	const sentence = situation.match(/^[^.!?]+[.!?]/)?.[0];
	return sentence?.trim() ?? situation;
}

function narrativeParagraphs(lead: string, detail?: string): readonly string[] {
	return detail ? [lead, detail] : [lead];
}

function CaseStudyNarrativeBody({ paragraphs }: { paragraphs: readonly string[] }) {
	return (
		<div className={RESOURCE_INDEXED_BODY_CLASS}>
			{paragraphs.map((paragraph) => (
				<ResourceProse key={paragraph}>{paragraph}</ResourceProse>
			))}
		</div>
	);
}

function CaseStudyInsetList({ icon: Icon, items }: { icon: LucideIcon; items: readonly string[] }) {
	return (
		<ul className={components.resourceUi.narrative.k001}>
			{items.map((item) => (
				<li
					key={item}
					className={cn(components.resourceUi.narrative.k008, RESOURCE_SUPPORTING_TEXT_CLASS)}
				>
					<span className={components.resourceUi.shared.k008}>
						<Icon size={13} className={components.mobile.iconGold} aria-hidden />
					</span>
					<span>{item}</span>
				</li>
			))}
		</ul>
	);
}

function CaseStudyAside({
	manufacturerName,
	manufacturerSlug,
	factItems,
}: {
	manufacturerName?: string;
	manufacturerSlug: string;
	factItems: { label: string; value: string }[];
}) {
	return (
		<div className={components['resource.bannerCtaRowAsideStack']}>
			<div className={components.resourceUi.shared.k028}>
				<ResourceDetailAside
					title={CASE_STUDY_DETAIL_SECTIONS.factsAsideTitle}
					titleVariant="section"
				>
					<ResourceAsideFactList items={factItems} />
					{manufacturerName ? (
						<Link
							href={manufacturerDetailPath(manufacturerSlug)}
							className={components.resourceUi.narrative.k002}
						>
							{CASE_STUDY_DETAIL_SECTIONS.manufacturerLink} →
						</Link>
					) : null}
				</ResourceDetailAside>
			</div>
			<CaseStudyDesktopToc
				label={CASE_STUDY_DETAIL_SECTIONS.tocLabel}
				items={caseStudyTocItems()}
			/>
		</div>
	);
}

export function ResourceAmountHighlight({
	amount,
	outcomeType,
	qualifier,
}: {
	amount: number;
	outcomeType: string;
	qualifier?: string;
}) {
	return (
		<div className={components.resourceUi.blocks.k012}>
			<span aria-hidden className={components.resourceUi.blocks.k013} />
			<dl className={components.resourceUi.shared.k006}>
				<dt className={components.resourceUi.shared.k007}>
					Representative {outcomeType.toLowerCase()}
				</dt>
				<dd className={components.resourceUi.blocks.k014}>${amount.toLocaleString()}</dd>
				{qualifier ? <dd className={components.resourceUi.blocks.k015}>{qualifier}</dd> : null}
			</dl>
		</div>
	);
}

export function ResourceTimeline({
	title,
	icon: Icon,
	eyebrow = 'Chapter 05',
	sectionIndex,
	bleedClassName,
	embedded = false,
	steps,
	layout = 'vertical',
}: {
	title: string;
	icon: LucideIcon;
	eyebrow?: string;
	sectionIndex?: string;
	bleedClassName?: string;
	embedded?: boolean;
	steps: readonly { label: string; detail: string }[];
	layout?: 'vertical' | 'horizontal';
}) {
	const horizontal = layout === 'horizontal';
	const resolvedBleed = bleedClassName ?? resourceBleedClass('alt');

	const heading = sectionIndex ? (
		<ResourceIndexedSectionHeading index={sectionIndex} icon={Icon} title={title} />
	) : (
		<ResourceSectionHeading icon={Icon} eyebrow={eyebrow} title={title} />
	);

	const stepsList = (
		<ol
			className={cn(
				horizontal
					? 'mt-8 flex gap-4 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden'
					: cn(embedded ? 'mt-6 sm:mt-7' : 'mt-7', 'max-w-2xl space-y-0'),
			)}
		>
			{steps.map((step, index) => (
				<li
					key={step.label}
					className={cn(
						horizontal
							? 'card-inset relative flex min-w-[min(82vw,17.5rem)] shrink-0 snap-start flex-col p-4 lg:min-w-0 lg:snap-align-none'
							: 'relative flex gap-3.5 pb-7 last:pb-0',
					)}
				>
					{!horizontal && index < steps.length - 1 ? (
						<span aria-hidden className={components.resourceUi.blocks.k022} />
					) : null}
					{horizontal && index < steps.length - 1 ? (
						<span aria-hidden className={components.resourceUi.blocks.k023} />
					) : null}
					<span
						className={cn(
							components.resourceUi.blocks.k061,
							horizontal ? 'h-8 w-8 text-[12px]' : 'h-9 w-9 text-[12.5px]',
						)}
					>
						{index + 1}
					</span>
					<div className={cn(components.resourceUi.shared.k006, horizontal ? 'mt-3' : 'pt-1')}>
						<p className={components.resourceUi.shared.k009}>{step.label}</p>
						<p className={components.resourceUi.shared.k010}>{step.detail}</p>
					</div>
				</li>
			))}
		</ol>
	);

	if (embedded) {
		return (
			<div>
				{heading}
				{stepsList}
			</div>
		);
	}

	return (
		<ResourceBand bleedClassName={resolvedBleed}>
			{heading}
			{stepsList}
		</ResourceBand>
	);
}

const caseStudyDetailClosing = makeFunnelBlock('case-study-detail');

export function createCaseStudyDetailBlocks(
	slug: string,
): Record<CaseStudyDetailBlockId, () => React.ReactNode> {
	const study = getCaseStudyBySlug(slug);
	if (!study) {
		return emptyBlockMap<CaseStudyDetailBlockId>([
			'hero',
			'narrative',
			'relatedQuestions',
			'funnel',
			'relatedContent',
		]);
	}

	const manufacturer = MANUFACTURERS.find((m) => m.slug === study.manufacturerSlug);
	const factItems = [
		{
			label: CASE_STUDY_DETAIL_SECTIONS.factsVehicleLabel,
			value: study.vehicle,
		},
	];
	const readMinutes = Math.max(
		3,
		Math.round(
			[
				study.situation,
				study.situationDetail,
				study.defectSummary,
				study.defectDetail,
				study.legalPath,
				study.legalDetail,
				study.outcomeSummary,
				study.outcomeDetail,
			]
				.filter(Boolean)
				.join(' ')
				.split(/\s+/).length / 200,
		),
	);

	return {
		hero: () => (
			<ResourceDetailHero
				breadcrumbs={buildCaseStudyDetailBreadcrumbs(slug)}
				eyebrow={UI_COPY.resources.caseStudyDetailEyebrow}
				heroImage={study.cardImage}
				heroImageAlt={study.cardImageAlt}
			>
				<Reveal>
					<h1 className={components.resourceUi.narrative.k003}>{study.headline}</h1>
					<p className={components.resourceUi.shared.k013}>{caseStudyHeroDeck(study.situation)}</p>
					<div className={components.resourceUi.shared.k014}>
						<span className={components.resourceUi.shared.k015}>
							{CASE_STUDY_DETAIL_SECTIONS.heroRepresentativePill}
						</span>
						<span className={components.resourceUi.shared.k016} aria-hidden>
							·
						</span>
						<span className={components.resourceUi.shared.k017}>
							<Clock size={13} className={components.resourceUi.shared.k018} aria-hidden />
							{readMinutes} min read
						</span>
						<span className={components.resourceUi.shared.k016} aria-hidden>
							·
						</span>
						<span className={components.resourceUi.shared.k017}>
							<Car size={13} className={components.resourceUi.shared.k018} aria-hidden />
							{study.vehicle}
						</span>
					</div>
					<p className={components.resourceUi.narrative.k004}>
						{CASE_STUDY_REPRESENTATIVE_DISCLAIMER} {UI_COPY.resources.caseStudyDisclaimerSuffix}
					</p>
				</Reveal>
			</ResourceDetailHero>
		),
		narrative: () => (
			<ResourceBand borderTop={false} bleedClassName={RESOURCE_BLEED_MAIN}>
				<ResourceContentAsideLayout
					main={
						<article className={components.resourceUi.shared.k006}>
							<CaseStudySectionNav
								label={CASE_STUDY_DETAIL_SECTIONS.tocLabel}
								items={caseStudyTocItems()}
							/>
							<div className={cn(RESOURCE_NARRATIVE_COLUMN, RESOURCE_HERO_COPY_BODY_TOP_DEFAULT)}>
								<div className={components.resourceUi.shared.k019}>
									<Reveal>
										<section id="situation" className={components.resourceUi.shared.k029}>
											<ResourceIndexedSectionHeading
												index="01"
												icon={MapPin}
												title={CASE_STUDY_DETAIL_SECTIONS.situation}
											/>
											<CaseStudyNarrativeBody
												paragraphs={narrativeParagraphs(study.situation, study.situationDetail)}
											/>
										</section>
									</Reveal>
									<Reveal delay={40}>
										<section id="defect" className={components.resourceUi.shared.k029}>
											<ResourceIndexedSectionHeading
												index="02"
												icon={Wrench}
												title={UI_COPY.resources.defectRepairsEyebrow}
											/>
											<CaseStudyNarrativeBody
												paragraphs={narrativeParagraphs(study.defectSummary, study.defectDetail)}
											/>
										</section>
									</Reveal>
									<Reveal delay={80}>
										<section id="legal-path" className={components.resourceUi.shared.k029}>
											<ResourceIndexedSectionHeading
												index="03"
												icon={Scale}
												title={CASE_STUDY_DETAIL_SECTIONS.legalPath}
											/>
											<CaseStudyNarrativeBody
												paragraphs={narrativeParagraphs(study.legalPath, study.legalDetail)}
											/>
										</section>
									</Reveal>
									<Reveal delay={120}>
										<section id="timeline" className={components.resourceUi.shared.k029}>
											<ResourceTimeline
												embedded
												sectionIndex="04"
												icon={Car}
												title={CASE_STUDY_DETAIL_SECTIONS.timeline}
												steps={study.timeline}
												layout="vertical"
											/>
										</section>
									</Reveal>
									<Reveal delay={140}>
										<section id="outcome" className={components.resourceUi.narrative.k005}>
											<ResourceIndexedSectionHeading
												index="05"
												icon={Sparkles}
												title={CASE_STUDY_DETAIL_SECTIONS.outcome}
											/>
											<CaseStudyNarrativeBody
												paragraphs={narrativeParagraphs(study.outcomeSummary, study.outcomeDetail)}
											/>
											<ResourceAmountHighlight
												amount={study.representativeAmount}
												outcomeType={study.outcomeType}
												qualifier={CASE_STUDY_DETAIL_SECTIONS.amountQualifier}
											/>
											<p className={components.resourceUi.narrative.k006}>
												{CASE_STUDY_REPRESENTATIVE_DISCLAIMER}
											</p>
										</section>
									</Reveal>
								</div>
								<div className={components.resourceUi.narrative.k007}>
									<Reveal>
										<section id="documents" className={components.resourceUi.shared.k029}>
											<ResourceIndexedSectionHeading
												index="06"
												icon={FileCheck}
												title={CASE_STUDY_DETAIL_SECTIONS.documents}
											/>
											<CaseStudyInsetList icon={FileCheck} items={study.documentHighlights} />
										</section>
									</Reveal>
									<Reveal delay={50}>
										<section id="lessons" className={components.resourceUi.shared.k029}>
											<ResourceIndexedSectionHeading
												index="07"
												icon={Lightbulb}
												title={CASE_STUDY_DETAIL_SECTIONS.lessons}
											/>
											<CaseStudyInsetList icon={Lightbulb} items={study.lessons} />
										</section>
									</Reveal>
								</div>
							</div>
						</article>
					}
					aside={
						<div className={components.resourceUi.shared.k028}>
							<CaseStudyAside
								manufacturerName={manufacturer?.name}
								manufacturerSlug={study.manufacturerSlug}
								factItems={factItems}
							/>
						</div>
					}
				/>
			</ResourceBand>
		),
		relatedQuestions: () => {
			const relatedFaqs = study.relatedFaqSlugs.flatMap((faqSlug) => {
				const relatedFaq = getFaqBySlug(faqSlug);
				return relatedFaq ? [relatedFaq] : [];
			});
			return <ResourceRelatedQuestionsGrid faqs={relatedFaqs} />;
		},
		relatedContent: () => {
			const items = study.relatedReviewSlugs.flatMap((reviewSlug) => {
				const relatedReview = getReviewBySlug(reviewSlug);
				if (!relatedReview) return [];
				return [
					{
						key: reviewSlug,
						href: reviewDetailPath(reviewSlug),
						kind: 'Review',
						title: relatedReview.name,
						description: `${relatedReview.vehicle} · ${relatedReview.outcome}`,
					},
				];
			});
			return (
				<ResourceKeepExploringGrid
					icon={HelpCircle}
					title={CASE_STUDY_DETAIL_SECTIONS.related}
					body={CASE_STUDY_DETAIL_SECTIONS.relatedBody}
					items={items}
				/>
			);
		},
		...caseStudyDetailClosing,
	};
}
