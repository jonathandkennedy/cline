import Image from 'next/image';
import { Avatar } from '@/kit/ui';
import { ArrowRight, Check, type LucideIcon, Quote } from '@/kit/ui/functions/icons';
import {
	cn,
	components,
	FAQ_INTRO_STICKY_ASIDE_CLASS,
	RESOURCE_ASIDE_SECTION_LABEL_CLASS,
	RESOURCE_BAND_GRID_CLASS,
	RESOURCE_BAND_PY,
	RESOURCE_BAND_PY_COMPACT,
	RESOURCE_BAND_PY_MATCH,
	RESOURCE_KEEP_EXPLORING_MIN_ITEMS,
	RESOURCE_SECTION_BODY_CLASS,
	RESOURCE_SECTION_TITLE_CLASS,
	type ReactNode,
	type ResourceBleedTone,
	resourceBleedClass,
} from '@/kit/blocks/rhythm';

function BlocksBand({
	bleedClassName,
	innerClassName,
	pad = 'default',
	borderTop = true,
	edgeToEdge = false,
	children,
}: {
	bleedClassName?: string;
	innerClassName?: string;
	pad?: 'default' | 'compact' | 'match' | 'none';
	borderTop?: boolean;
	edgeToEdge?: boolean;
	children: ReactNode;
}) {
	const padClass =
		pad === 'none'
			? undefined
			: pad === 'compact'
				? RESOURCE_BAND_PY_COMPACT
				: pad === 'match'
					? RESOURCE_BAND_PY_MATCH
					: RESOURCE_BAND_PY;
	return (
		<section className={cn(borderTop && 'rule-y', bleedClassName)}>
			<div className={cn(!edgeToEdge && 'container-x', padClass, innerClassName)}>{children}</div>
		</section>
	);
}

function Reveal({
	children,
	className,
	delay: _delay = 0,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
}) {
	return <div className={className}>{children}</div>;
}

export function ResourceSectionHeading({
	icon: Icon,
	eyebrow,
	title,
	body,
	bodyPlacement = 'below',
	className,
}: {
	icon?: LucideIcon;
	eyebrow?: string;
	title: string;
	body?: string;
	/** Lead copy in the title column, below the headline (aligned with title, not the icon). */
	bodyPlacement?: 'below' | 'indented';
	className?: string;
}) {
	const iconWell = Icon ? (
		<span className={components.resourceUi.shared.k004}>
			<Icon size={18} aria-hidden />
		</span>
	) : null;

	return (
		<div className={cn(bodyPlacement === 'indented' ? 'max-w-none' : 'max-w-2xl', className)}>
			{eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
			{body && bodyPlacement === 'indented' ? (
				<>
					<div className={cn(components.resourceUi.shared.k012, eyebrow ? 'mt-2.5' : 'mt-0')}>
						{iconWell}
						<h2 className={RESOURCE_SECTION_TITLE_CLASS}>{title}</h2>
					</div>
					<p
						className={cn(
							RESOURCE_SECTION_BODY_CLASS,
							'mt-2 max-w-prose',
							Icon && 'lg:pl-[calc(2.5rem+0.875rem)]',
						)}
					>
						{body}
					</p>
				</>
			) : (
				<>
					<div className={cn(components.resourceUi.shared.k012, eyebrow ? 'mt-2.5' : undefined)}>
						{iconWell}
						<h2 className={RESOURCE_SECTION_TITLE_CLASS}>{title}</h2>
					</div>
					{body ? <p className={RESOURCE_SECTION_BODY_CLASS}>{body}</p> : null}
				</>
			)}
		</div>
	);
}

export function ResourceIndexedSectionHeading({
	index,
	icon: Icon,
	title,
	className,
}: {
	/** Zero-padded section index, e.g. `04` */
	index: string;
	icon?: LucideIcon;
	title: string;
	className?: string;
}) {
	const sectionNumber = Number.parseInt(index, 10);

	return (
		<header className={cn(components.resourceUi.blocks.k055, className)}>
			<div className={components.resourceUi.blocks.k001}>
				{Icon ? (
					<span className={components.resourceUi.blocks.k002}>
						<Icon size={18} aria-hidden />
					</span>
				) : null}
				<span aria-hidden className={components.resourceUi.blocks.k003} />
				<span className={components.resourceUi.blocks.k004} aria-hidden>
					{index}
				</span>
			</div>
			<h2 className={cn(RESOURCE_SECTION_TITLE_CLASS, 'mt-2.5 min-w-0 pt-0.5 sm:mt-3')}>{title}</h2>
			{Number.isFinite(sectionNumber) ? (
				<span className={components.resourceUi.shared.k005}>Section {sectionNumber}</span>
			) : null}
		</header>
	);
}

export function ResourceDetailCtaLane({
	children,
	comfortable = false,
}: {
	children: ReactNode;
	/** Roomier padding for case-study narrative CTAs */
	comfortable?: boolean;
}) {
	return (
		<div className={cn(components.resourceUi.blocks.k056, comfortable ? 'p-6 md:p-8' : 'card-pad')}>
			<div
				className={cn(
					components.resourceUi.blocks.k057,
					comfortable
						? 'md:flex-row md:items-center md:justify-between md:gap-8'
						: 'sm:flex-row sm:items-center sm:justify-between sm:gap-6',
				)}
			>
				{children}
			</div>
		</div>
	);
}

const CARD_LEFT_GOLD_EDGE =
	'pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-[var(--radius-card)] bg-gradient-to-b from-gold-soft via-gold to-gold-deep';

function ResourcePullQuote({ quote, attribution }: { quote: string; attribution?: string }) {
	return (
		<blockquote className={components.resourceUi.blocks.k005}>
			<span aria-hidden className={CARD_LEFT_GOLD_EDGE} />
			<Quote size={24} className="text-gold/45" aria-hidden />
			<p className={components.resourceUi.blocks.k006}>&ldquo;{quote}&rdquo;</p>
			{attribution ? (
				<footer className={components.resourceUi.blocks.k007}>{attribution}</footer>
			) : null}
		</blockquote>
	);
}

export function ResourceMetaChips({ items }: { items: { icon: LucideIcon; label: string }[] }) {
	return (
		<ul className={components.resourceUi.blocks.k008}>
			{items.map((item) => {
				const Icon = item.icon;
				return (
					<li key={item.label} className={components.resourceUi.blocks.k009}>
						<span className={components.resourceUi.blocks.k010}>
							<Icon size={12} className="text-gold" aria-hidden />
						</span>
						{item.label}
					</li>
				);
			})}
		</ul>
	);
}

export function ResourceOutcomeBadge({ label }: { label: string }) {
	return <span className={components.resourceUi.blocks.k011}>{label}</span>;
}

function ResourceLinkCardGrid({
	title,
	icon: Icon,
	eyebrow,
	body,
	children,
	bleedClassName,
	bleedTone = 'alt',
}: {
	title: string;
	icon?: LucideIcon;
	eyebrow?: string;
	body?: string;
	children: ReactNode;
	bleedClassName?: string;
	bleedTone?: ResourceBleedTone;
}) {
	return (
		<BlocksBand pad="default" bleedClassName={resourceBleedClass(bleedTone, bleedClassName)}>
			<Reveal>
				<ResourceSectionHeading icon={Icon} eyebrow={eyebrow} title={title} body={body} />
			</Reveal>
			<Reveal delay={50}>
				<div className={RESOURCE_BAND_GRID_CLASS}>{children}</div>
			</Reveal>
		</BlocksBand>
	);
}

type ResourceKeepExploringItem = {
	key: string;
	href: string;
	title: string;
	description?: string;
	kind?: string;
	external?: boolean;
	image?: string;
	imageAlt?: string;
};

export function ResourceKeepExploringGrid({
	title,
	icon: Icon,
	eyebrow = 'Related',
	body,
	items,
	bleedClassName,
	bleedTone = 'alt',
	minItems = RESOURCE_KEEP_EXPLORING_MIN_ITEMS,
}: {
	title: string;
	icon?: LucideIcon;
	eyebrow?: string;
	body?: string;
	items: readonly ResourceKeepExploringItem[];
	bleedClassName?: string;
	bleedTone?: ResourceBleedTone;
	minItems?: number;
}) {
	if (items.length < minItems) return null;
	return (
		<ResourceLinkCardGrid
			title={title}
			icon={Icon}
			eyebrow={eyebrow}
			body={body}
			bleedClassName={bleedClassName}
			bleedTone={bleedTone}
		>
			{items.map((item) => (
				<ResourceLinkCard
					key={item.key}
					href={item.href}
					title={item.title}
					description={item.description}
					kind={item.kind}
					external={item.external}
					image={item.image}
					imageAlt={item.imageAlt}
				/>
			))}
		</ResourceLinkCardGrid>
	);
}

function ResourceLinkCard({
	href,
	title,
	description,
	external,
	image,
	imageAlt,
	kind,
}: {
	href: string;
	title: string;
	description?: string;
	external?: boolean;
	image?: string;
	imageAlt?: string;
	kind?: string;
}) {
	const className = components.resourceUi.blocks.k024;
	const body = (
		<div className={components.resourceUi.blocks.k025}>
			<span aria-hidden className={RESOURCE_LINK_ROW_GOLD_EDGE} />
			{kind ? <span className={components.resourceUi.shared.k007}>{kind}</span> : null}
			<span className={cn(components.resourceUi.blocks.k062, kind ? 'mt-2' : undefined)}>
				{title}
			</span>
			{description ? (
				<span className={components.resourceUi.blocks.k026}>{description}</span>
			) : null}
			<span className={components.resourceUi.blocks.k027}>
				Continue
				<ArrowRight size={14} className={components.resourceUi.blocks.k028} />
			</span>
		</div>
	);
	const inner = (
		<>
			{image ? (
				<div className={components.resourceUi.blocks.k029}>
					<Image
						src={image}
						alt={imageAlt ?? ''}
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className={components.resourceUi.blocks.k030}
					/>
					<div aria-hidden className={components.resourceUi.blocks.k031} />
				</div>
			) : null}
			{body}
		</>
	);
	if (external) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" className={className}>
				{inner}
			</a>
		);
	}
	return (
		<a href={href} className={className}>
			{inner}
		</a>
	);
}

const RESOURCE_LINK_ROW_EMBEDDED_CLASS =
	'group relative flex min-h-[44px] w-full items-center gap-3 overflow-hidden px-4 py-4 transition-[background-color,color] duration-200 hover:bg-gold/[0.06] md:gap-4 md:px-6 md:py-4';

const RESOURCE_LINK_ROW_EMBEDDED_CLASS_SM =
	'group relative flex min-h-[44px] w-full items-center gap-2.5 overflow-hidden px-3 py-3 transition-[background-color,color] duration-200 hover:bg-gold/[0.06] md:gap-3 md:px-4 md:py-3.5';

const RESOURCE_LINK_ROW_CARD_CLASS =
	'group card card-static relative flex items-center gap-3 overflow-hidden p-4 transition duration-300 hover:border-gold/40 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_22px_48px_-28px_rgba(0,0,0,0.75)] md:gap-4 md:p-5';

const RESOURCE_LINK_ROW_CARD_CLASS_SM =
	'group card card-static relative flex items-center gap-2.5 overflow-hidden p-3.5 transition duration-300 hover:border-gold/40 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_22px_48px_-28px_rgba(0,0,0,0.75)] md:gap-3 md:p-4';

const RESOURCE_LINK_ROW_GOLD_EDGE =
	'pointer-events-none absolute inset-y-0 left-0 w-[2px] rounded-l-[var(--radius-card)] origin-top scale-y-0 opacity-0 bg-gradient-to-b from-gold-soft via-gold to-gold-deep transition-[transform,opacity] duration-300 group-hover:scale-y-100 group-hover:opacity-100 group-focus-visible:scale-y-100 group-focus-visible:opacity-100';

export type ResourceLinkListSize = 'default' | 'sm';

function resourceLinkListShellClass(
	size: ResourceLinkListSize,
	className?: string,
	embedded?: boolean,
) {
	if (embedded) {
		return cn(components.resourceUi.blocks.k063, className);
	}
	return cn(
		components.resourceUi.blocks.k064,
		size === 'sm' ? 'mt-4 md:mt-5' : 'mt-6 md:mt-7',
		className,
	);
}

export function ResourceLinkListPanel({
	items,
	className,
	size = 'default',
	embedded = false,
}: {
	items: readonly {
		key: string;
		href: string;
		title: string;
		leading?: ReactNode;
		external?: boolean;
	}[];
	className?: string;
	size?: ResourceLinkListSize;
	/** Flush inside a parent card (e.g. FAQ hub category) — no outer margin or frame */
	embedded?: boolean;
}) {
	if (items.length === 0) return null;
	const rowClass = embedded
		? size === 'sm'
			? RESOURCE_LINK_ROW_EMBEDDED_CLASS_SM
			: RESOURCE_LINK_ROW_EMBEDDED_CLASS
		: size === 'sm'
			? RESOURCE_LINK_ROW_CARD_CLASS_SM
			: RESOURCE_LINK_ROW_CARD_CLASS;
	const titleClass = embedded
		? size === 'sm'
			? 'min-w-0 flex-1 text-[14.5px] font-medium leading-relaxed text-fg transition duration-200 group-hover:text-gold-soft md:text-[15px]'
			: 'min-w-0 flex-1 text-[15px] font-medium leading-relaxed text-fg transition duration-200 group-hover:text-gold-soft md:text-[15.5px]'
		: size === 'sm'
			? 'min-w-0 flex-1 font-display text-[1rem] font-semibold leading-snug text-fg transition-colors duration-200 group-hover:text-gold-soft md:text-[1.05rem]'
			: 'min-w-0 flex-1 font-display text-[1.02rem] font-semibold leading-snug text-fg transition-colors duration-200 group-hover:text-gold-soft md:text-[1.08rem]';
	const arrowWrapClass =
		size === 'sm'
			? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line/30 bg-ink/20 text-gold/80 transition duration-200 group-hover:border-gold/35 group-hover:bg-gold/10 group-hover:text-gold'
			: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line/30 bg-ink/20 text-gold/80 transition duration-200 group-hover:border-gold/35 group-hover:bg-gold/10 group-hover:text-gold';

	const listShell = resourceLinkListShellClass(size, className, embedded);

	return (
		<div className={listShell}>
			<ul className={cn(embedded ? 'divide-y divide-line/20' : 'contents')}>
				{items.map((item) => {
					const row = (
						<>
							<span aria-hidden className={RESOURCE_LINK_ROW_GOLD_EDGE} />
							{item.leading ?? null}
							<span className={titleClass}>{item.title}</span>
							<span className={arrowWrapClass}>
								<ArrowRight
									size={size === 'sm' ? 13 : 14}
									className={components.resourceUi.blocks.k032}
									aria-hidden
								/>
							</span>
						</>
					);
					return (
						<li key={item.key} className={embedded ? undefined : 'min-w-0'}>
							{item.external ? (
								<a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
									{row}
								</a>
							) : (
								<a href={item.href} className={rowClass}>
									{row}
								</a>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export function ResourceCallout({
	icon: Icon,
	title,
	children,
	className,
}: {
	icon: LucideIcon;
	title: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn(components.resourceUi.blocks.k065, className)}>
			<span aria-hidden className={components.resourceUi.shared.k011} />
			<div className={components.resourceUi.blocks.k033}>
				<span className={components.resourceUi.blocks.k034}>
					<Icon size={16} aria-hidden />
				</span>
				<div className={components.resourceUi.shared.k006}>
					<p className={components.resourceUi.blocks.k035}>{title}</p>
					<div className={components.resourceUi.shared.k010}>{children}</div>
				</div>
			</div>
		</div>
	);
}

export function ResourceStorySplit({
	portrait,
	portraitAlt,
	quote,
	name,
	children,
	leadHeading,
}: {
	portrait: string | null;
	portraitAlt: string;
	quote: string;
	name: string;
	children: ReactNode;
	leadHeading?: { icon: LucideIcon; title: string; eyebrow?: string };
}) {
	return (
		<BlocksBand borderTop={false} bleedClassName="bg-ink/25">
			{leadHeading ? (
				<ResourceSectionHeading
					icon={leadHeading.icon}
					eyebrow={leadHeading.eyebrow}
					title={leadHeading.title}
					className="mb-7"
				/>
			) : null}
			<ResourceContentAsideLayout
				main={<div className={components.resourceUi.blocks.k038}>{children}</div>}
				aside={
					<>
						<div
							className={cn(
								components.resourceUi.blocks.k040,
								!portrait && 'flex items-center justify-center bg-ink/40',
							)}
						>
							{portrait ? (
								<Image
									src={portrait}
									alt={portraitAlt}
									fill
									sizes="(max-width: 1024px) 80vw, 340px"
									className={components.resourceUi.blocks.k041}
								/>
							) : (
								<Avatar name={name} size={64} />
							)}
						</div>
						<ResourcePullQuote quote={quote} attribution={name} />
					</>
				}
			/>
		</BlocksBand>
	);
}

export function ResourceHighlightCard({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return (
		<div className={cn(components.resourceUi.blocks.k066, className)}>
			<span aria-hidden className={components.resourceUi.blocks.k045} />
			{children}
		</div>
	);
}

export function ResourceKeyTakeaways({
	title,
	icon: Icon,
	points,
	className,
}: {
	title: string;
	icon?: LucideIcon;
	points: readonly string[];
	className?: string;
}) {
	if (points.length === 0) return null;
	return (
		<ResourceHighlightCard className={className}>
			<ResourceSectionHeading icon={Icon} title={title} className="max-w-none" />
			<ul className={components.resourceUi.blocks.k046}>
				{points.map((point) => (
					<li key={point} className={components.resourceUi.blocks.k047}>
						<span className={components.resourceUi.blocks.k048}>
							<Check size={12} className="text-recovery" aria-hidden />
						</span>
						<span>{point}</span>
					</li>
				))}
			</ul>
		</ResourceHighlightCard>
	);
}

export function ResourceDetailAside({
	eyebrow,
	title,
	titleVariant = 'display',
	children,
}: {
	eyebrow?: string;
	title?: string;
	titleVariant?: 'display' | 'section';
	children: ReactNode;
}) {
	return (
		<div className={components.resourceUi.blocks.k049}>
			<span aria-hidden className={components.resourceUi.shared.k011} />
			{eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
			{title ? (
				<p
					className={cn(
						titleVariant === 'section'
							? RESOURCE_ASIDE_SECTION_LABEL_CLASS
							: 'font-display text-lg font-bold text-fg',
						eyebrow && titleVariant === 'display' ? 'mt-2' : undefined,
					)}
				>
					{title}
				</p>
			) : null}
			<div className={cn(title || eyebrow ? 'mt-3' : undefined)}>{children}</div>
		</div>
	);
}

export function ResourceContentAsideLayout({ main, aside }: { main: ReactNode; aside: ReactNode }) {
	return (
		<div className={components.resourceUi.blocks.k050}>
			<div className={components.resourceUi.shared.k006}>{main}</div>
			<aside className={FAQ_INTRO_STICKY_ASIDE_CLASS}>{aside}</aside>
		</div>
	);
}

export function ResourceAsideFactList({ items }: { items: { label: string; value: string }[] }) {
	return (
		<dl className={components.resourceUi.blocks.k051}>
			{items.map((item) => (
				<div key={item.label} className={components.resourceUi.blocks.k052}>
					<dt className={components.resourceUi.blocks.k053}>{item.label}</dt>
					<dd className={components.resourceUi.blocks.k054}>{item.value}</dd>
				</div>
			))}
		</dl>
	);
}
