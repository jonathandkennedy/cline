'use client';

import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { BlogPostRelated, NearbyLocations } from '@/components/blog/related';
import { useEditorialRecord } from '@/lib/cms/content/current';
import { useParams, usePathname } from 'next/navigation';
import { type ReactNode, Suspense } from 'react';

import { PhoneCta, Reveal } from '@/components';
import { leadCaptureInlineSlot } from '@/components/leads/inline';
import Link from '@/components/link';

import { ResourceProse } from '@/kit/blocks/copy';
import { RESOURCE_BLEED_MAIN, RESOURCE_GRID, RESOURCE_READING_COLUMN } from '@/kit/blocks/rhythm';
import { ResourceBand, ResourceDetailHero } from '@/kit/blocks/spotlight';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { heroPhoneCtaClassName } from '@/kit/promo';
import { components } from '@/kit/theme';
import { cn } from '@/kit/ui/functions/cn';

import type {
	EditorialBlock,
	EditorialDetailBlockId,
	EditorialIndexRecord,
	EditorialRecord,
} from '@/lib/cms';
import { editorialParagraphLooksLikeHeading } from '@/lib/cms/prose';
import { isMailOrTelHref } from '@/lib/lookup';
import { locationTitleParts } from '@/lib/masks';
import {
	BLOG_HUB_GRID,
	BLOG_HUB_HERO,
	BLOG_HUB_PATH,
	BLOG_POSTS,
	blogDetailPath,
	buildBlogDetailBreadcrumbs,
	buildInfoDetailBreadcrumbs,
	buildLocationDetailBreadcrumbs,
	EDITORIAL_DETAIL_SECTIONS,
	EDITORIAL_PAGES,
	emptyBlockMap,
	HERO_TRUST_ITEMS,
	INFO_HUB_GRID,
	INFO_HUB_HERO,
	infoDetailPath,
	LOCATION_PAGES,
	LOCATIONS_HUB_GRID,
	LOCATIONS_HUB_HERO,
	locationDetailPath,
} from '@/lib/site';
import type { ResourceBlockRenderer } from '@/lib/site/branches';

type EditorialCollectionId = 'blog' | 'locations' | 'info';

const BLOG_CARD_MEDIA = cn(
	components.resourceUi.blocks.k029,
	'relative z-[1] shrink-0 pointer-events-none',
);

type EditorialCollection = {
	id: EditorialCollectionId;
	items: readonly EditorialIndexRecord[];
	grid: {
		countLabel: string;
		ctaLabel: string;
		pageSize?: number;
		showingLabel?: string;
		align?: 'center';
	};
	hero: typeof BLOG_HUB_HERO;
	detailPath: (slug: string) => string;
	hubPath?: string;
	buildDetailBreadcrumbs: (slug: string) => ReturnType<typeof buildBlogDetailBreadcrumbs>;
};

const COLLECTIONS: Record<EditorialCollectionId, EditorialCollection> = {
	blog: {
		id: 'blog',
		items: BLOG_POSTS,
		grid: BLOG_HUB_GRID,
		hero: BLOG_HUB_HERO,
		detailPath: blogDetailPath,
		hubPath: BLOG_HUB_PATH,
		buildDetailBreadcrumbs: buildBlogDetailBreadcrumbs,
	},
	locations: {
		id: 'locations',
		items: LOCATION_PAGES,
		grid: LOCATIONS_HUB_GRID,
		hero: LOCATIONS_HUB_HERO,
		detailPath: locationDetailPath,
		buildDetailBreadcrumbs: buildLocationDetailBreadcrumbs,
	},
	info: {
		id: 'info',
		items: EDITORIAL_PAGES,
		grid: INFO_HUB_GRID,
		hero: INFO_HUB_HERO,
		detailPath: infoDetailPath,
		buildDetailBreadcrumbs: buildInfoDetailBreadcrumbs,
	},
};

function collectionFromProps(props: { collection?: unknown }): EditorialCollection {
	const id = String(props.collection ?? '') as EditorialCollectionId;
	const collection = COLLECTIONS[id];
	if (!collection) {
		throw new Error(`[site] unknown editorial collection "${id}"`);
	}
	return collection;
}

function formatDate(iso: string): string {
	const [year, month, day] = iso.split('-').map(Number);
	if (!year || !month || !day) return iso;
	return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	});
}

function renderInline(text: string): ReactNode {
	const nodes: ReactNode[] = [];
	const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|_([^_]+)_/g;
	let last = 0;
	let match: RegExpExecArray | null;
	let key = 0;
	while ((match = pattern.exec(text)) !== null) {
		if (match.index > last) {
			nodes.push(text.slice(last, match.index));
		}
		if (match[1] && match[2]) {
			const href = match[2];
			const label = match[1];
			if (href.startsWith('/')) {
				nodes.push(
					<Link key={key} href={href}>
						{label}
					</Link>,
				);
			} else if (isMailOrTelHref(href)) {
				nodes.push(
					<a key={key} href={href}>
						{label}
					</a>,
				);
			} else {
				nodes.push(
					<a key={key} href={href} target="_blank" rel="noopener noreferrer">
						{label}
					</a>,
				);
			}
		} else if (match[3]) {
			nodes.push(<strong key={key}>{match[3]}</strong>);
		} else if (match[4]) {
			nodes.push(<em key={key}>{match[4]}</em>);
		}
		key += 1;
		last = match.index + match[0].length;
	}
	if (last < text.length) nodes.push(text.slice(last));
	return nodes;
}

function EditorialBlocks({ blocks }: { blocks: readonly EditorialBlock[] }) {
	const nodes: ReactNode[] = [];
	let list: EditorialBlock[] = [];
	const flushList = () => {
		if (list.length === 0) return;
		nodes.push(
			<ul key={`list-${nodes.length}`}>
				{list.map((item, index) => (
					<li key={`${item.text.slice(0, 24)}-${index}`}>{renderInline(item.text)}</li>
				))}
			</ul>,
		);
		list = [];
	};
	blocks.forEach((block, index) => {
		switch (block.type) {
			case 'li':
				list.push(block);
				return;
			case 'h2':
				flushList();
				nodes.push(<h2 key={`h2-${index}`}>{renderInline(block.text)}</h2>);
				return;
			case 'h3':
				flushList();
				nodes.push(<h3 key={`h3-${index}`}>{renderInline(block.text)}</h3>);
				return;
			case 'quote':
				flushList();
				nodes.push(<blockquote key={`q-${index}`}>{renderInline(block.text)}</blockquote>);
				return;
			case 'p':
				flushList();
				if (editorialParagraphLooksLikeHeading(block.text)) {
					nodes.push(<h2 key={`h2p-${index}`}>{renderInline(block.text)}</h2>);
					return;
				}
				nodes.push(<p key={`p-${index}`}>{renderInline(block.text)}</p>);
				return;
			default: {
				const _exhaustive: never = block.type;
				void _exhaustive;
			}
		}
	});
	flushList();
	return <>{nodes}</>;
}

function parseEditorialHubPage(pathname: string, routePage?: string): number {
	if (routePage) {
		const parsed = Number(routePage);
		if (Number.isFinite(parsed) && parsed > 0) return parsed;
	}
	const match = pathname.match(/\/blog\/page\/(\d+)\/?$/);
	if (match?.[1]) {
		const parsed = Number(match[1]);
		if (Number.isFinite(parsed) && parsed > 0) return parsed;
	}
	return 1;
}

function editorialHubPageHref(basePath: string, page: number): string {
	if (page <= 1) return basePath;
	return `${basePath}/page/${page}`;
}

function EditorialPagination({
	basePath,
	currentPage,
	totalPages,
}: {
	basePath: string;
	currentPage: number;
	totalPages: number;
}) {
	if (totalPages <= 1) return null;
	// Every page is linked so no archive page is more than one click from the hub.
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
	const controlClass =
		'inline-flex min-h-10 items-center gap-1.5 px-3 text-[13px] font-semibold transition';
	const navButtonClass = cn(controlClass, 'text-cta hover:text-gold-soft');
	const navButtonDisabledClass = cn(controlClass, 'text-faint');
	return (
		<nav
			aria-label="Blog pagination"
			className="mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-12"
		>
			{currentPage > 1 ? (
				<Link
					href={editorialHubPageHref(basePath, currentPage - 1)}
					className={navButtonClass}
					aria-label="Previous page"
					scroll
				>
					<ChevronLeft size={16} aria-hidden />
					Previous
				</Link>
			) : (
				<span className={navButtonDisabledClass} aria-hidden>
					<ChevronLeft size={16} aria-hidden />
					Previous
				</span>
			)}
			<div className="flex flex-wrap items-center gap-1.5">
				{pages.map((page) => (
					<Link
						key={page}
						href={editorialHubPageHref(basePath, page)}
						aria-label={`Page ${page}`}
						aria-current={page === currentPage ? 'page' : undefined}
						scroll
						className={cn(
							controlClass,
							'min-w-10 justify-center rounded-md border px-3',
							page === currentPage
								? 'border-gold/35 bg-gold/10 text-gold'
								: 'border-line/35 text-subtle hover:border-gold/30 hover:text-gold-soft',
						)}
					>
						{page}
					</Link>
				))}
			</div>
			{currentPage < totalPages ? (
				<Link
					href={editorialHubPageHref(basePath, currentPage + 1)}
					className={navButtonClass}
					aria-label="Next page"
					scroll
				>
					Next
					<ChevronRight size={16} aria-hidden />
				</Link>
			) : (
				<span className={navButtonDisabledClass} aria-hidden>
					Next
					<ChevronRight size={16} aria-hidden />
				</span>
			)}
		</nav>
	);
}

function EditorialHubCard({
	item,
	index,
	href,
	ctaLabel,
}: {
	item: EditorialIndexRecord;
	index: number;
	href: string;
	ctaLabel: string;
}) {
	const cardImage = item.thumbnail
		? {
				src: item.thumbnail,
				alt: item.thumbnailAlt ?? item.title,
			}
		: null;

	if (!cardImage) {
		return (
			<Reveal delay={(index % 6) * 20} className={components.resourceUi.shared.k031}>
				<Link href={href} className={components.resourceUi.directory.k002}>
					<time dateTime={item.date} className={components.resourceUi.shared.k007}>
						{formatDate(item.date)}
					</time>
					<h3 className={components.catalog.title}>{item.title}</h3>
					<p className={components.resourceUi.directory.k003}>{item.description}</p>
					<span className={components.resourceUi.directory.k004}>
						{ctaLabel}
						<ArrowRight size={14} aria-hidden />
					</span>
				</Link>
			</Reveal>
		);
	}

	return (
		<Reveal delay={(index % 6) * 20} className={components.resourceUi.shared.k031}>
			<div className={components.resourceUi.tile.k001}>
				<Link href={href} className={components.resourceUi.tile.k002} aria-label={item.title} />
				<div className={BLOG_CARD_MEDIA}>
					<Image
						src={cardImage.src}
						alt={cardImage.alt}
						fill
						quality={90}
						sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
						className={components.resourceUi.tile.k003}
					/>
				</div>
				<div className={components.resourceUi.tile.k004}>
					<time dateTime={item.date} className={components.resourceUi.shared.k007}>
						{formatDate(item.date)}
					</time>
					<h3 className={components.catalog.title}>{item.title}</h3>
					<p className={components.resourceUi.directory.k003}>{item.description}</p>
					<span className={components.resourceUi.directory.k004}>
						{ctaLabel}
						<ArrowRight size={14} aria-hidden />
					</span>
				</div>
			</div>
		</Reveal>
	);
}

function formatShowingLabel(
	collection: EditorialCollection,
	visibleItems: readonly EditorialIndexRecord[],
	paginated: boolean,
	rangeStart: number,
	rangeEnd: number,
): string {
	if (!collection.grid.showingLabel) {
		return `${collection.items.length} ${collection.grid.countLabel}`;
	}
	if (paginated && visibleItems.length > 0) {
		return `${collection.grid.showingLabel} ${rangeStart}–${rangeEnd} of ${collection.items.length} ${collection.grid.countLabel}`;
	}
	return `${collection.grid.showingLabel} ${visibleItems.length} of ${collection.items.length} ${collection.grid.countLabel}`;
}

function EditorialHubGrid({ collection }: { collection: EditorialCollection }) {
	const pathname = usePathname();
	const params = useParams();
	const routePage =
		typeof params.page === 'string'
			? params.page
			: Array.isArray(params.page)
				? params.page[0]
				: undefined;
	const pageSize = collection.grid.pageSize ?? collection.items.length;
	const paginated = Boolean(collection.grid.pageSize && collection.hubPath);
	const currentPage = paginated ? parseEditorialHubPage(pathname, routePage) : 1;
	const totalPages = paginated ? Math.max(1, Math.ceil(collection.items.length / pageSize)) : 1;
	const safePage = Math.min(currentPage, totalPages);
	const pageStart = (safePage - 1) * pageSize;
	const visibleItems = paginated
		? collection.items.slice(pageStart, pageStart + pageSize)
		: collection.items;
	const rangeStart = visibleItems.length > 0 ? pageStart + 1 : 0;
	const rangeEnd = pageStart + visibleItems.length;

	return (
		<ResourceBand bleedClassName={RESOURCE_BLEED_MAIN} borderTop={false} pad="default">
			<p
				className={cn(
					components.resourceUi.shared.k039,
					'mb-8 md:mb-10',
					collection.grid.align === 'center' && 'text-center md:text-left',
				)}
			>
				{formatShowingLabel(collection, visibleItems, paginated, rangeStart, rangeEnd)}
			</p>
			<div className={cn(RESOURCE_GRID, 'mx-auto w-full min-w-0 grid-cols-1 md:grid-cols-2')}>
				{visibleItems.map((item, index) => (
					<EditorialHubCard
						key={item.slug}
						item={item}
						index={index}
						href={collection.detailPath(item.slug)}
						ctaLabel={collection.grid.ctaLabel}
					/>
				))}
			</div>
			{paginated && collection.hubPath ? (
				<EditorialPagination
					basePath={collection.hubPath}
					currentPage={safePage}
					totalPages={totalPages}
				/>
			) : null}
		</ResourceBand>
	);
}

function EditorialHubGridFallback({ collection }: { collection: EditorialCollection }) {
	const pageSize = collection.grid.pageSize ?? collection.items.length;
	const visibleItems = collection.items.slice(0, pageSize);
	return (
		<ResourceBand bleedClassName={RESOURCE_BLEED_MAIN} borderTop={false} pad="default">
			<p
				className={cn(
					components.resourceUi.shared.k039,
					'mb-8 md:mb-10',
					collection.grid.align === 'center' && 'text-center md:text-left',
				)}
			>
				{formatShowingLabel(
					collection,
					visibleItems,
					Boolean(collection.grid.pageSize && collection.hubPath),
					1,
					visibleItems.length,
				)}
			</p>
			<div className={cn(RESOURCE_GRID, 'mx-auto w-full min-w-0 grid-cols-1 md:grid-cols-2')}>
				{visibleItems.map((item, index) => (
					<EditorialHubCard
						key={item.slug}
						item={item}
						index={index}
						href={collection.detailPath(item.slug)}
						ctaLabel={collection.grid.ctaLabel}
					/>
				))}
			</div>
		</ResourceBand>
	);
}

function useEditorialSlug(): string {
	const params = useParams();
	const slug = params.slug;
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug) && typeof slug[0] === 'string') return slug[0];
	return '';
}

function createEditorialDetailBlocks(
	collection: EditorialCollection,
	slug: string,
	page: EditorialRecord | null,
	leadContextId?: unknown,
): ResourceBlockRenderer<EditorialDetailBlockId> {
	if (!page) {
		return emptyBlockMap<EditorialDetailBlockId>(['hero', 'body', 'pathways', 'funnel']);
	}
	return {
		hero: () => {
			const isLocation = collection.id === 'locations';
			const titleParts = locationTitleParts(page.title);
			return (
				<ResourceDetailHero
					breadcrumbs={collection.buildDetailBreadcrumbs(slug)}
					heroImage={collection.hero.heroImage}
					heroImageAlt={collection.hero.heroImageAlt}
					copyWidth="wide"
					formSlot={leadCaptureInlineSlot(leadContextId)}
					chromeIntensity={isLocation ? 'rich' : 'default'}
				>
					{isLocation ? (
						<Reveal>
							<span className="eyebrow">{collection.hero.eyebrow}</span>
							<h1 className="display mt-3 max-w-[16ch] text-balance text-[clamp(2rem,4.8vw,3.35rem)] leading-[1.04] tracking-[-0.03em]">
								{titleParts.lead}
								{titleParts.accent ? (
									<span className={components.homeHeroTitleAccent}>{titleParts.accent}</span>
								) : null}
							</h1>
							<p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg/85 md:text-[16px]">
								{page.description}
							</p>
							<div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
								<PhoneCta className={heroPhoneCtaClassName} />
							</div>
							<div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-1.5">
								{HERO_TRUST_ITEMS.map((item, index) => (
									<span
										key={item}
										className="inline-flex items-center text-[12.5px] text-subtle sm:text-[13px]"
									>
										{index > 0 ? (
											<span
												aria-hidden
												className="mx-2.5 hidden h-3.5 w-px bg-line sm:inline-block"
											/>
										) : null}
										<span className="inline-flex items-center gap-1.5">
											<Check size={13} className="text-recovery" /> {item}
										</span>
									</span>
								))}
							</div>
						</Reveal>
					) : (
						<Reveal>
							<span className="eyebrow">{collection.hero.eyebrow}</span>
							<h1 className={components.resourceUi.answer.k002}>{page.title}</h1>
							<p className={components.resourceUi.shared.k002}>
								{page.kind === 'blog' ? (
									<>
										By{' '}
										<Link
											href="/team/brian-cline"
											className="font-semibold text-fg hover:text-gold"
										>
											Brian K. Cline
										</Link>
										, Managing Attorney ·{' '}
									</>
								) : null}
								{EDITORIAL_DETAIL_SECTIONS.publishedLabel}{' '}
								<time dateTime={page.date}>{formatDate(page.date)}</time>
								{page.modified !== page.date ? (
									<>
										{' '}
										· {EDITORIAL_DETAIL_SECTIONS.updatedLabel} {formatDate(page.modified)}
									</>
								) : null}
							</p>
						</Reveal>
					)}
				</ResourceDetailHero>
			);
		},
		body: () => (
			<ResourceBand bleedClassName={RESOURCE_BLEED_MAIN} borderTop={false} pad="default">
				<div className={RESOURCE_READING_COLUMN}>
					<ResourceProse>
						<EditorialBlocks blocks={page.blocks} />
					</ResourceProse>
					{page.kind === 'blog' ? <BlogPostRelated post={page} /> : null}
					{page.kind === 'location' ? <NearbyLocations slug={page.slug} /> : null}
				</div>
			</ResourceBand>
		),
		pathways: () => null,
		funnel: () => null,
	};
}

function EditorialDetailBlock({
	id,
	collection: rawCollection,
	leadContextId,
}: {
	id: EditorialDetailBlockId;
	collection?: unknown;
	leadContextId?: unknown;
}) {
	const collection = collectionFromProps({ collection: rawCollection });
	const slug = useEditorialSlug();
	const record = useEditorialRecord();
	const blocks = createEditorialDetailBlocks(
		collection,
		slug,
		record?.slug === slug ? record : null,
		leadContextId,
	);
	return blocks[id]();
}

export const editorialKinds: SiteComponentKindMap = {
	'resource.editorialGrid': (props) => {
		const collection = collectionFromProps(props);
		return (
			<Suspense fallback={<EditorialHubGridFallback collection={collection} />}>
				<EditorialHubGrid collection={collection} />
			</Suspense>
		);
	},
	'detail.editorialHero': (props) => <EditorialDetailBlock id="hero" {...props} />,
	'detail.editorialBody': (props) => <EditorialDetailBlock id="body" {...props} />,
};
