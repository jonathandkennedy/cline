'use client';

import { ArrowRight, Banknote, Scale, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { memo, type ReactNode } from 'react';
import { interpolateSiteTemplate } from '@/kit/catalog';
import { components } from '@/kit/theme/interface/components';
import { cn } from '@/kit/ui/functions/cn';
import { Check } from '@/kit/ui/functions/icons';
import Link from '@/kit/ui/components/link';

const VALUE_PROP_ICONS: Record<string, LucideIcon> = {
	'shield-check': ShieldCheck,
	banknote: Banknote,
	scale: Scale,
};

type ValueProp = {
	icon: string;
	title: string;
	body: string;
};

export type HeroSectionContent = {
	pill: string;
	headline: string;
	title: string;
	titleAccent: string;
	lede: string;
	image: string;
	imageAlt: string;
	valueProps: readonly ValueProp[];
	trustItems: readonly string[];
	primaryCta: { href: string; label: string };
};

function HeroComponent({
	content,
	phoneCta,
	primaryCtaSlot,
	formSlot,
}: {
	content: HeroSectionContent;
	phoneCta?: ReactNode;
	/** When set, replaces the default primaryCta link (e.g. lead-form button). */
	primaryCtaSlot?: ReactNode;
	/** Compact case-review form in the hero column (does not replace phone CTA). */
	formSlot?: ReactNode;
}) {
	const {
		pill,
		headline,
		title,
		titleAccent,
		lede,
		image,
		imageAlt,
		valueProps,
		trustItems,
		primaryCta,
	} = content;
	const showHeadline = headline.trim().length > 0;
	const TitleTag = showHeadline ? 'p' : 'h1';

	return (
		<section className={components.homeHeroRoot}>
			<Image
				src={image}
				alt={imageAlt}
				fill
				priority
				sizes="100vw"
				className={components.homeHeroImage}
			/>
			<div className={cn(components.homeHeroMobileGradientWrap, 'home-hero__gradient-mobile')} />
			<div className={cn(components.homeHeroDesktopGradientWrap, 'home-hero__gradient-desktop')} />
			<div
				aria-hidden
				className={cn(components.homeHeroRadialWrap, 'home-hero__gradient-radial')}
			/>
			<div className={components.homeHeroBottomFade} />
			<div className={components.homeHeroBottomBar} />
			<div aria-hidden className={components.homeHeroTexture} />
			<div aria-hidden className={components.homeHeroGlowGold} />
			<div aria-hidden className={components.homeHeroGlowCta} />

			<div className={components.homeHeroInner}>
				<div className={components.homeHeroFadeUp}>
					<span className={components.homeHeroPill}>
						<Sparkles size={13} className={components.homeHeroPillIcon} /> {pill}
					</span>

					{showHeadline ? <h1 className={components.homeHeroHeadline}>{headline}</h1> : null}

					<TitleTag className={components.homeHeroTitle}>
						{title}
						<span className={components.homeHeroTitleAccent}>{titleAccent}</span>
					</TitleTag>

					<p className={components.homeHeroLede}>{lede}</p>

					<div className={components.homeHeroCtaRow}>
						{primaryCtaSlot ?? (
							<Link href={primaryCta.href} className={components.homeHeroPrimaryCta}>
								{primaryCta.label} <ArrowRight size={17} />
							</Link>
						)}
						{phoneCta ?? null}
					</div>

					<div className={components.homeHeroTrust}>
						{trustItems.map((item, i) => (
							<span key={item} className={components.homeHeroTrustItem}>
								{i > 0 ? <span aria-hidden className={components.homeHeroTrustSep} /> : null}
								<span className="inline-flex items-center gap-1.5">
									<Check size={13} className="text-recovery" /> {item}
								</span>
							</span>
						))}
					</div>
				</div>

				{formSlot ? (
					<div className="min-w-0">{formSlot}</div>
				) : (
					<ul className={components.homeHeroProps}>
						{valueProps.map((v) => {
							const Icon = VALUE_PROP_ICONS[v.icon];
							return (
								<li key={v.title} className={components.homeHeroPropCard}>
									{Icon ? (
										<div className={components.homeHeroPropIconWrap}>
											<Icon size={18} className={components.homeHeroPropIcon} strokeWidth={1.75} />
										</div>
									) : null}
									<div className={components.homeMinW0}>
										<h3 className={components.homeHeroPropTitle}>{v.title}</h3>
										<p className={components.homeHeroPropBody}>{v.body}</p>
									</div>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</section>
	);
}

export const Hero = memo(HeroComponent);

export const heroPhoneCtaClassName = components.homeHeroPhoneCta;

function interpolateCopy(value: string, tokens: Record<string, string> | undefined): string {
	return tokens ? interpolateSiteTemplate(value, tokens) : value;
}

export function heroSectionFromProps(props: Record<string, unknown>): HeroSectionContent {
	const templateTokens = props.templateTokens as Record<string, string> | undefined;
	const valueProps = (props.valueProps ?? []) as readonly ValueProp[];

	return {
		pill: interpolateCopy(String(props.pill ?? ''), templateTokens),
		headline: interpolateCopy(String(props.headline ?? ''), templateTokens),
		title: interpolateCopy(String(props.title ?? ''), templateTokens),
		titleAccent: interpolateCopy(String(props.titleAccent ?? ''), templateTokens),
		lede: interpolateCopy(String(props.lede ?? ''), templateTokens),
		image: String(props.image ?? ''),
		imageAlt: String(props.imageAlt ?? ''),
		valueProps: valueProps.map((v) => ({
			...v,
			title: interpolateCopy(v.title, templateTokens),
			body: interpolateCopy(v.body, templateTokens),
		})),
		trustItems: (props.trustItems ?? []) as readonly string[],
		primaryCta: (props.primaryCta ?? {
			href: '',
			label: '',
		}) as { href: string; label: string },
	};
}
