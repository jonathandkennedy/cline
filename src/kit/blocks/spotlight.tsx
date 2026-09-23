'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import type { LeadCaptureContextId, SiteBreadcrumbItem } from '@/kit/layout/types/breadcrumb';
import { BANNER_CTA_ROW, BANNER_CTA_ROW_DUAL } from '@/kit/ui/functions/row';
import { Band, type BandProps } from '@/kit/blocks/band';
import { ResourceDualCta, ResourcePrimaryLinkCta } from '@/kit/blocks/paired';
import { SiteBreadcrumbs } from '@/kit/blocks/trail';
import { cn } from '@/kit/ui/functions/cn';
import { components } from '@/kit/theme/interface/components';
import {
	RESOURCE_HERO_BANNER_TOP,
	RESOURCE_HERO_COPY_BODY_TOP_COMPACT,
	RESOURCE_HERO_COPY_BODY_TOP_DEFAULT,
	RESOURCE_HERO_COPY_SHELL,
	RESOURCE_HERO_COPY_SHELL_PHOTO,
	RESOURCE_HERO_COPY_SHELL_WIDE,
	RESOURCE_HERO_COPY_TOP_COMPACT,
	RESOURCE_HERO_COPY_TOP_DEFAULT,
	RESOURCE_HERO_DETAIL_CRUMB_DIVIDER,
	RESOURCE_HERO_DETAIL_CRUMB_DIVIDER_GAP_COMPACT,
	RESOURCE_HERO_DETAIL_CRUMB_DIVIDER_GAP_DEFAULT,
	RESOURCE_HERO_HUB_CRUMB_WRAP,
	RESOURCE_HERO_INSET,
	RESOURCE_HERO_INSET_COMPACT,
} from '@/kit/blocks/tokens';

function Reveal({ children }: { children: ReactNode; delay?: number }) {
	return <>{children}</>;
}

export function ResourceBand(props: BandProps) {
	return <Band {...props} />;
}

const HERO_PHOTO_GRADIENT = [
	'linear-gradient(105deg, var(--color-base) 0%, color-mix(in srgb, var(--color-base) 99%, transparent) 26%, color-mix(in srgb, var(--color-base) 80%, transparent) 48%, color-mix(in srgb, var(--color-base) 36%, transparent) 68%, color-mix(in srgb, var(--color-base) 12%, transparent) 90%)',
	'linear-gradient(180deg, color-mix(in srgb, var(--color-base) 66%, transparent) 0%, transparent 32%, transparent 58%, color-mix(in srgb, var(--color-base) 86%, transparent) 100%)',
	'radial-gradient(ellipse 55% 75% at 88% 42%, color-mix(in srgb, var(--color-gold) 14%, transparent), transparent 72%)',
].join(', ');

const HERO_PHOTO_GRADIENT_MOBILE = [
	'linear-gradient(105deg, color-mix(in srgb, var(--color-base) 99%, transparent) 0%, color-mix(in srgb, var(--color-base) 96%, transparent) 42%, color-mix(in srgb, var(--color-base) 78%, transparent) 68%, color-mix(in srgb, var(--color-base) 52%, transparent) 100%)',
	'linear-gradient(180deg, color-mix(in srgb, var(--color-base) 88%, transparent) 0%, transparent 42%, color-mix(in srgb, var(--color-base) 72%, transparent) 100%)',
	'radial-gradient(ellipse 85% 50% at 78% 28%, color-mix(in srgb, var(--color-gold) 8%, transparent), transparent 72%)',
].join(', ');

function ResourceHeroBackdrop({
	heroImage,
	heroImageAlt,
}: {
	heroImage?: string;
	heroImageAlt?: string;
}) {
	if (heroImage) {
		return (
			<>
				<Image
					src={heroImage}
					alt={heroImageAlt ?? ''}
					fill
					priority
					sizes="100vw"
					className={components.resourceUi.spotlight.k001}
				/>
				<div
					aria-hidden
					className={components.resourceUi.spotlight.k002}
					style={{ background: HERO_PHOTO_GRADIENT_MOBILE }}
				/>
				<div
					aria-hidden
					className={components.resourceUi.spotlight.k003}
					style={{ background: HERO_PHOTO_GRADIENT }}
				/>
				<div aria-hidden className={components.resourceUi.spotlight.k004} />
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 -z-[17] bg-[url('/images/textures/topo.svg')] bg-[length:125%] bg-center opacity-[0.12] mix-blend-screen md:opacity-[0.14]"
				/>
			</>
		);
	}

	return (
		<>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/textures/topo.svg')] bg-[length:125%] bg-center opacity-[0.28] mix-blend-screen"
			/>
			<div aria-hidden className={components.resourceUi.spotlight.k005} />
			<div aria-hidden className={components.resourceUi.spotlight.k006} />
		</>
	);
}

function ResourceHeroChrome({ intensity = 'default' }: { intensity?: 'default' | 'rich' }) {
	return (
		<>
			<div
				aria-hidden
				className={cn(
					components.resourceUi.spotlight.k009,
					intensity === 'rich' ? 'bg-gold/22' : 'bg-gold/18',
				)}
			/>
			<div
				aria-hidden
				className={cn(
					components.resourceUi.spotlight.k010,
					intensity === 'rich' ? 'bg-cta/12' : 'bg-cta/8',
				)}
			/>
		</>
	);
}

export function ResourceDetailHero({
	eyebrow,
	heroImage,
	heroImageAlt,
	breadcrumbs,
	density = 'default',
	copyWidth = 'default',
	copyShellClassName,
	children,
	formSlot,
	chromeIntensity = 'default',
}: {
	eyebrow?: string;
	heroImage?: string;
	heroImageAlt?: string;
	breadcrumbs?: SiteBreadcrumbItem[];
	/** Tighter vertical inset for short copy blocks (FAQ detail). */
	density?: 'default' | 'compact';
	/** Wider copy column for long headlines. */
	copyWidth?: 'default' | 'wide';
	/** Extra classes on the bordered copy shell (e.g. guidebook chapters). */
	copyShellClassName?: string;
	children: ReactNode;
	formSlot?: ReactNode;
	chromeIntensity?: 'default' | 'rich';
}) {
	const compact = density === 'compact';
	const heroInset = compact ? RESOURCE_HERO_INSET_COMPACT : RESOURCE_HERO_INSET;
	const photoHero = Boolean(heroImage);
	const withForm = Boolean(formSlot);
	const copyShell = withForm
		? 'container-x relative z-10 max-w-6xl'
		: copyWidth === 'wide'
			? photoHero && !copyShellClassName
				? 'container-x relative z-10 max-w-4xl'
				: RESOURCE_HERO_COPY_SHELL_WIDE
			: photoHero && !copyShellClassName
				? RESOURCE_HERO_COPY_SHELL_PHOTO
				: RESOURCE_HERO_COPY_SHELL;
	const copyTop = breadcrumbs
		? RESOURCE_HERO_BANNER_TOP
		: cn(
				RESOURCE_HERO_BANNER_TOP,
				compact ? RESOURCE_HERO_COPY_TOP_COMPACT : RESOURCE_HERO_COPY_TOP_DEFAULT,
			);

	return (
		<section
			className={cn(
				components.resourceUi.shared.k038,
				photoHero && 'border-b border-dashed border-line',
			)}
		>
			<ResourceHeroBackdrop heroImage={heroImage} heroImageAlt={heroImageAlt} />
			<ResourceHeroChrome intensity={chromeIntensity} />
			<div
				className={cn(
					copyShell,
					heroInset,
					copyTop,
					copyShellClassName,
					withForm &&
						'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(16.5rem,22rem)] lg:items-start lg:gap-8',
				)}
			>
				{breadcrumbs ? (
					<div
						className={cn(
							RESOURCE_HERO_DETAIL_CRUMB_DIVIDER,
							compact
								? RESOURCE_HERO_DETAIL_CRUMB_DIVIDER_GAP_COMPACT
								: RESOURCE_HERO_DETAIL_CRUMB_DIVIDER_GAP_DEFAULT,
							withForm && 'lg:col-span-2',
						)}
					>
						<SiteBreadcrumbs items={breadcrumbs} inBanner />
					</div>
				) : null}
				{eyebrow ? (
					<>
						<Reveal>
							<span className={components.resourceUi.spotlight.k007}>{eyebrow}</span>
						</Reveal>
						<div className={components.resourceUi.spotlight.k008}>{children}</div>
					</>
				) : (
					children
				)}
				{formSlot ? <div className="relative z-10 mt-6 min-w-0 lg:mt-0">{formSlot}</div> : null}
			</div>
		</section>
	);
}

export function ResourceHubHero({
	eyebrow,
	headline,
	subhead,
	leadContextId,
	heroImage,
	heroImageAlt,
	breadcrumbs,
	density = 'default',
	ctaLayout = 'dual',
	align = 'start',
	children,
}: {
	eyebrow: string;
	headline: string;
	subhead: ReactNode;
	leadContextId: LeadCaptureContextId;
	heroImage?: string;
	heroImageAlt?: string;
	breadcrumbs?: SiteBreadcrumbItem[];
	density?: 'default' | 'compact';
	ctaLayout?: 'dual' | 'primary-link';
	/** Center copy + CTAs on small screens (locations hub). */
	align?: 'start' | 'center';
	children?: ReactNode;
}) {
	const compact = density === 'compact';
	const centerMobile = align === 'center';
	const heroInset = compact ? RESOURCE_HERO_INSET_COMPACT : RESOURCE_HERO_INSET;
	const copyTop = compact ? RESOURCE_HERO_COPY_TOP_COMPACT : RESOURCE_HERO_COPY_TOP_DEFAULT;
	const copyBodyTop = breadcrumbs
		? compact
			? RESOURCE_HERO_COPY_BODY_TOP_COMPACT
			: RESOURCE_HERO_COPY_BODY_TOP_DEFAULT
		: undefined;
	const headlineClass = compact
		? 'relative display mt-2 max-w-[22ch] text-balance text-[clamp(1.55rem,3.2vw,2.25rem)] leading-[1.12] md:mt-2.5'
		: 'relative display mt-2.5 max-w-[20ch] text-balance text-[clamp(1.7rem,3.6vw,2.55rem)] leading-[1.1] sm:mt-3';
	const subheadClass = compact
		? 'relative mt-2 max-w-xl text-[14px] leading-relaxed text-muted sm:text-[14.5px] md:mt-2.5 md:text-[15px]'
		: 'relative mt-3 max-w-xl text-[14.5px] leading-relaxed text-muted sm:text-[15px] md:text-[15.5px]';
	const ctaRow = ctaLayout === 'primary-link' ? BANNER_CTA_ROW : BANNER_CTA_ROW_DUAL;
	const ctaClass = compact
		? `relative mt-4 w-full ${ctaRow}`
		: `relative mt-5 w-full sm:mt-6 ${ctaRow}`;

	return (
		<section className={components.resourceUi.shared.k038}>
			<ResourceHeroBackdrop heroImage={heroImage} heroImageAlt={heroImageAlt} />
			<ResourceHeroChrome intensity="rich" />
			<div
				className={cn(
					RESOURCE_HERO_COPY_SHELL,
					heroInset,
					'mx-auto w-full min-w-0',
					centerMobile && 'text-center md:text-left',
					breadcrumbs ? RESOURCE_HERO_BANNER_TOP : cn(RESOURCE_HERO_BANNER_TOP, copyTop),
				)}
			>
				{breadcrumbs ? (
					<div
						className={cn(
							RESOURCE_HERO_HUB_CRUMB_WRAP,
							centerMobile && 'flex justify-center md:justify-start',
						)}
					>
						<SiteBreadcrumbs items={breadcrumbs} inBanner />
					</div>
				) : null}
				<div
					className={cn(
						copyBodyTop,
						centerMobile && 'mx-auto flex w-full min-w-0 flex-col items-center md:items-start',
					)}
				>
					<Reveal>
						<span className="eyebrow">{eyebrow}</span>
						<h1 className={cn(headlineClass, centerMobile && 'mx-auto md:mx-0')}>{headline}</h1>
						<p className={cn(subheadClass, centerMobile && 'mx-auto md:mx-0')}>{subhead}</p>
					</Reveal>
					{ctaLayout === 'primary-link' ? (
						<ResourcePrimaryLinkCta leadContextId={leadContextId} className={ctaClass} />
					) : (
						<ResourceDualCta leadContextId={leadContextId} className={ctaClass} />
					)}
					{children ? <div className={cn(compact ? 'mt-3.5' : 'mt-5')}>{children}</div> : null}
				</div>
			</div>
		</section>
	);
}
