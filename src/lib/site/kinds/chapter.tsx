'use client';

import { ArrowLeft, ArrowRight, BookOpen, Clock, FileCheck, Scale, Shield } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Reveal } from '@/components';
import Link from '@/components/link';
import type { GuidebookChapterBlockId } from '@/lib/cms';
import {
	buildGuidebookChapterBreadcrumbs,
	emptyBlockMap,
	GUIDEBOOK_CHAPTER_NAV,
	GUIDEBOOK_CHAPTERS,
	getGuidebookChapterBySlug,
	guidebookChapterPath,
	UI_COPY,
} from '@/lib/site';
import type { ResourceBlockRenderer } from '@/lib/site/branches';
import { cn } from '@/kit/shared';
import { components } from '@/kit/theme';
import {
	ResourceContentAsideLayout,
	ResourceDetailAside,
	ResourceIndexedSectionHeading,
} from '@/kit/blocks';
import { ResourceProse } from '@/kit/blocks/copy';
import { ResourceFinalCta } from '@/lib/site/resources/finale';
import {
	RESOURCE_BLEED_MAIN,
	RESOURCE_INDEXED_BODY_CLASS,
	RESOURCE_READING_COLUMN,
} from '@/kit/blocks/rhythm';
import { ResourceBand, ResourceDetailHero } from '@/kit/blocks/spotlight';
import { CaseStudySectionNav } from '@/kit/blocks/toc';
import type { SiteComponentKindMap } from '@/kit/catalog';

const GUIDEBOOK_CHAPTER_NAV_GAP = 'gap-7 md:gap-9';
const GUIDEBOOK_CHAPTER_NAV_CARD =
	'card card-static group flex flex-col gap-5 card-pad transition hover:border-gold/35';

const CHAPTER_SECTION_ICONS = [BookOpen, Scale, FileCheck, Shield] as const;

const GUIDEBOOK_CHAPTER_SPINE = 'w-full max-w-[42rem]';

function createGuidebookChapterBlockRegistry(
	slug: string,
): ResourceBlockRenderer<GuidebookChapterBlockId> {
	const chapter = getGuidebookChapterBySlug(slug);
	if (!chapter) {
		return emptyBlockMap<GuidebookChapterBlockId>(['hero', 'sections', 'chapterNav', 'funnel']);
	}

	const chapterIndex = GUIDEBOOK_CHAPTERS.findIndex((entry) => entry.slug === slug);
	const chapterNumber = String((chapterIndex >= 0 ? chapterIndex : 0) + 1).padStart(2, '0');
	const totalChapters = String(GUIDEBOOK_CHAPTERS.length).padStart(2, '0');

	const sectionNavItems = chapter.sections.map((section, index) => ({
		id: section.id,
		label: `${String(index + 1).padStart(2, '0')} · ${section.title}`,
	}));

	return {
		hero: () => (
			<ResourceDetailHero
				breadcrumbs={buildGuidebookChapterBreadcrumbs(slug)}
				eyebrow="Guidebook chapter"
				heroImage={chapter.thumbnail}
				heroImageAlt={chapter.thumbnailAlt}
			>
				<Reveal>
					<h1 className={components.resourceUi.chapter.k001}>{chapter.title}</h1>
					<p className={components.resourceUi.shared.k013}>{chapter.summary}</p>
					<div className={components.resourceUi.shared.k014}>
						<span className={components.resourceUi.shared.k015}>
							Chapter {chapterNumber} of {totalChapters}
						</span>
						<span className={components.resourceUi.shared.k016} aria-hidden>
							·
						</span>
						<span className={components.resourceUi.shared.k017}>
							<Clock size={13} className={components.resourceUi.shared.k018} aria-hidden />
							{chapter.estimatedReadMinutes} min read
						</span>
					</div>
				</Reveal>
			</ResourceDetailHero>
		),
		sections: () => (
			<ResourceBand borderTop={false} bleedClassName={RESOURCE_BLEED_MAIN}>
				<ResourceContentAsideLayout
					main={
						<article className={components.resourceUi.shared.k006}>
							<div className={GUIDEBOOK_CHAPTER_SPINE}>
								<CaseStudySectionNav label="Chapter sections" items={sectionNavItems} />
							</div>
							<div className={cn(GUIDEBOOK_CHAPTER_SPINE, 'pt-5 sm:pt-6 lg:pt-0')}>
								<div className={components.resourceUi.shared.k019}>
									{chapter.sections.map((section, index) => {
										const Icon = CHAPTER_SECTION_ICONS[index % CHAPTER_SECTION_ICONS.length];
										return (
											<Reveal key={section.id} delay={index * 30}>
												<section id={section.id} className={components.resourceUi.chapter.k002}>
													<ResourceIndexedSectionHeading
														index={String(index + 1).padStart(2, '0')}
														icon={Icon}
														title={section.title}
													/>
													<div className={RESOURCE_INDEXED_BODY_CLASS}>
														{section.paragraphs.map((p) => (
															<ResourceProse key={p.slice(0, 24)}>{p}</ResourceProse>
														))}
													</div>
												</section>
											</Reveal>
										);
									})}
								</div>
							</div>
						</article>
					}
					aside={
						<div className={components.resourceUi.chapter.k003}>
							<ResourceDetailAside
								eyebrow={UI_COPY.resources.chapterNavEyebrow}
								title={UI_COPY.resources.chapterJumpTitle}
							>
								<ol className="divide-y divide-line/70">
									{chapter.sections.map((section, index) => (
										<li key={section.id}>
											<a href={`#${section.id}`} className={components.resourceUi.chapter.k004}>
												<span className={components.resourceUi.chapter.k005}>
													{String(index + 1).padStart(2, '0')}
												</span>
												<span className={components.resourceUi.shared.k006}>{section.title}</span>
											</a>
										</li>
									))}
								</ol>
							</ResourceDetailAside>
						</div>
					}
				/>
			</ResourceBand>
		),
		chapterNav: () => {
			const previous = chapterIndex > 0 ? GUIDEBOOK_CHAPTERS[chapterIndex - 1] : undefined;
			const next = chapter.nextChapterSlug
				? getGuidebookChapterBySlug(chapter.nextChapterSlug)
				: undefined;
			if (!previous && !next) return null;

			const previousNumber = chapterIndex > 0 ? String(chapterIndex).padStart(2, '0') : undefined;
			const nextNumber = chapterIndex >= 0 ? String(chapterIndex + 2).padStart(2, '0') : undefined;

			return (
				<ResourceBand bleedClassName="bg-ink/25" innerClassName={RESOURCE_READING_COLUMN}>
					<nav
						aria-label="Chapter navigation"
						className={cn(components.resourceUi.chapter.k009, GUIDEBOOK_CHAPTER_NAV_GAP)}
					>
						{previous ? (
							<Link
								href={guidebookChapterPath(previous.slug)}
								className={GUIDEBOOK_CHAPTER_NAV_CARD}
							>
								<span className={components.resourceUi.shared.k020}>
									{previousNumber ? (
										<span className={components.resourceUi.shared.k021}>
											Chapter {previousNumber}
										</span>
									) : null}
									<span className={components.resourceUi.shared.k022}>{previous.title}</span>
								</span>
								<span className={components.resourceUi.shared.k023}>
									<ArrowLeft size={14} className={components.resourceUi.chapter.k006} aria-hidden />
									{GUIDEBOOK_CHAPTER_NAV.previous}
								</span>
							</Link>
						) : (
							<div className={components.resourceUi.chapter.k007} aria-hidden />
						)}
						{next ? (
							<Link
								href={guidebookChapterPath(next.slug)}
								className={cn(
									GUIDEBOOK_CHAPTER_NAV_CARD,
									!previous && 'md:col-span-2',
									previous && 'text-right md:col-start-2',
								)}
							>
								<span className={components.resourceUi.shared.k020}>
									{nextNumber ? (
										<span className={components.resourceUi.shared.k021}>Chapter {nextNumber}</span>
									) : null}
									<span className={components.resourceUi.shared.k022}>{next.title}</span>
								</span>
								<span className={cn(components.resourceUi.shared.k023, previous && 'justify-end')}>
									{GUIDEBOOK_CHAPTER_NAV.next}
									<ArrowRight
										size={14}
										className={components.resourceUi.chapter.k008}
										aria-hidden
									/>
								</span>
							</Link>
						) : null}
					</nav>
				</ResourceBand>
			);
		},
		funnel: () => <ResourceFinalCta leadContextId="guidebook-chapter" />,
	};
}

function useGuidebookChapterSlug(): string {
	const params = useParams();
	const slug = params.slug;
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug) && typeof slug[0] === 'string') return slug[0];
	return '';
}

function guidebookChapterBlock(id: GuidebookChapterBlockId) {
	return function RenderGuidebookChapterBlock() {
		const blocks = createGuidebookChapterBlockRegistry(useGuidebookChapterSlug());
		return blocks[id]();
	};
}

export const guidebookChapterKinds: SiteComponentKindMap = {
	'detail.guidebookChapterHero': guidebookChapterBlock('hero'),
	'detail.guidebookChapterSections': guidebookChapterBlock('sections'),
	'detail.guidebookChapterNav': guidebookChapterBlock('chapterNav'),
};
