import {
	ArrowRight,
	Banknote,
	BookOpen,
	CalendarClock,
	Clock,
	FileCheck,
	Handshake,
	type LucideIcon,
	Scale,
	Users,
} from 'lucide-react';
import { Reveal } from '@/components';
import Link from '@/components/link';
import {
	FAQ_HUB_PATH,
	GUIDEBOOK_CHAPTERS,
	GUIDEBOOK_HUB_CHAPTERS,
	guidebookChapterPath,
} from '@/lib/site';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { components } from '@/kit/theme';
import {
	ResourceAsideFactList,
	ResourceContentAsideLayout,
	ResourceDetailAside,
} from '@/kit/blocks';
import { bannerCtaRowAsideStackClass } from '@/kit/ui/functions/row';
import { ResourceDualCta } from '@/lib/site/resources/paired';
import { RESOURCE_BLEED_MAIN } from '@/kit/blocks/rhythm';
import { ResourceBand } from '@/kit/blocks/spotlight';

const CHAPTER_ICONS: Record<string, LucideIcon> = {
	scale: Scale,
	banknote: Banknote,
	'file-check': FileCheck,
	handshake: Handshake,
	'calendar-clock': CalendarClock,
	users: Users,
};

const GUIDEBOOK_TOTAL_READ_MINUTES = GUIDEBOOK_CHAPTERS.reduce(
	(sum, chapter) => sum + chapter.estimatedReadMinutes,
	0,
);

export const guidebookHubKinds: SiteComponentKindMap = {
	'resource.guidebookChapters': () => (
		<ResourceBand bleedClassName={RESOURCE_BLEED_MAIN} borderTop={false} pad="default">
			<ResourceContentAsideLayout
				main={
					<div className={components.resourceUi.shared.k006}>
						<p className={components.resourceUi.shared.k039}>
							{GUIDEBOOK_CHAPTERS.length} {GUIDEBOOK_HUB_CHAPTERS.countLabel}
						</p>
						<h2 className={components.resourceUi.volume.k001}>{GUIDEBOOK_HUB_CHAPTERS.headline}</h2>
						<p className={components.resourceUi.volume.k002}>{GUIDEBOOK_HUB_CHAPTERS.body}</p>

						<nav aria-label="Guidebook chapters" className={components.resourceUi.volume.k003}>
							<ol className={components.resourceUi.volume.k004}>
								{GUIDEBOOK_CHAPTERS.map((chapter, index) => {
									const number = String(index + 1).padStart(2, '0');
									const Icon = CHAPTER_ICONS[chapter.icon] ?? BookOpen;
									return (
										<Reveal key={chapter.slug} delay={index * 35}>
											<li>
												<Link
													href={guidebookChapterPath(chapter.slug)}
													className={components.resourceUi.volume.k005}
												>
													<span className={components.resourceUi.volume.k006}>
														<Icon size={20} aria-hidden />
													</span>
													<div className={components.resourceUi.shared.k001}>
														<div className={components.resourceUi.volume.k007}>
															<span className={components.resourceUi.shared.k007}>
																Chapter {number}
															</span>
															<span aria-hidden className={components.resourceUi.volume.k008}>
																·
															</span>
															<span className={components.resourceUi.volume.k009}>
																<Clock size={12} className="text-gold/70" aria-hidden />
																{chapter.estimatedReadMinutes} min
															</span>
														</div>
														<h3 className={components.resourceUi.volume.k010}>{chapter.title}</h3>
														<p className={components.resourceUi.volume.k011}>{chapter.summary}</p>
														<p className={components.resourceUi.volume.k012}>
															{chapter.hubTopics.join(' · ')}
														</p>
													</div>
													<span className={components.resourceUi.volume.k013}>
														<span className={components.resourceUi.shared.k005}>
															Read chapter {number}
														</span>
														<ArrowRight
															size={18}
															className={components.resourceUi.shared.k040}
															aria-hidden
														/>
													</span>
												</Link>
											</li>
										</Reveal>
									);
								})}
							</ol>
						</nav>

						{GUIDEBOOK_CHAPTERS.map((chapter, index) => (
							<section
								key={chapter.slug}
								id={chapter.slug}
								aria-labelledby={`${chapter.slug}-title`}
								className="mt-14 scroll-mt-28 border-t border-line/50 pt-10"
							>
								<p className={components.resourceUi.shared.k007}>
									Chapter {String(index + 1).padStart(2, '0')}
								</p>
								<h2
									id={`${chapter.slug}-title`}
									className="mt-2 text-[clamp(1.4rem,3vw,1.9rem)] font-semibold text-fg"
								>
									{chapter.title}
								</h2>
								<p className="mt-3 text-[16px] leading-relaxed text-fg/85">{chapter.summary}</p>
								{chapter.sections.map((section) => (
									<div key={section.id}>
										<h3 className="mt-7 text-lg font-semibold text-fg">{section.title}</h3>
										{section.paragraphs.map((paragraph) => (
											<p
												key={paragraph.slice(0, 40)}
												className="mt-3 text-[16px] leading-relaxed text-muted"
											>
												{paragraph}
											</p>
										))}
									</div>
								))}
							</section>
						))}
						<p className="mt-14 text-[16px] text-muted">
							For the full statute-by-statute treatment, read our{' '}
							<Link
								href="/info/a-comprehensive-guide-to-california-lemon-law"
								className="font-semibold text-gold hover:underline"
							>
								comprehensive guide to California lemon law
							</Link>
							.
						</p>
					</div>
				}
				aside={
					<div className={components.resourceUi.volume.k014}>
						<ResourceDetailAside eyebrow="At a glance" title="Guide overview">
							<ResourceAsideFactList
								items={[
									{
										label: 'Chapters',
										value: String(GUIDEBOOK_CHAPTERS.length),
									},
									{
										label: 'Total reading time',
										value: `~${GUIDEBOOK_TOTAL_READ_MINUTES} min`,
									},
									{
										label: 'Best for',
										value: 'California drivers with warranty repairs',
									},
								]}
							/>
							<Link
								href={guidebookChapterPath(GUIDEBOOK_CHAPTERS[0]!.slug)}
								className={components.resourceUi.volume.k015}
							>
								Start with chapter 01
								<ArrowRight size={14} aria-hidden />
							</Link>
						</ResourceDetailAside>
						<ResourceDetailAside eyebrow="Free tools" title="Check your case while you read">
							<p className={components.resourceUi.shared.k002}>
								Use our eligibility checker and buyback calculator alongside the guide - private, in
								your browser.
							</p>
							<ResourceDualCta
								leadContextId="guidebook-hub"
								asideStack
								className={bannerCtaRowAsideStackClass('mt-4')}
							/>
							<Link href={FAQ_HUB_PATH} className={components.resourceUi.volume.k016}>
								Browse FAQ
								<ArrowRight size={14} aria-hidden />
							</Link>
						</ResourceDetailAside>
					</div>
				}
			/>
		</ResourceBand>
	),
};
