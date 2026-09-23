import { ArrowRight, Phone } from 'lucide-react';
import type { ReactNode } from 'react';

import { PrimaryCallCta } from '@/components/fields/primarycall';
import { Link } from '@/components/link';

import { cn } from '@/kit/shared';

import {
	APP_SHELL,
	BRAND,
	callBrandAriaLabel,
	type FaqIntroCtaItem,
	type StickyCtaItem,
} from '@/lib/cms';

type StickyLinkItem = Extract<StickyCtaItem, { type: 'link' }>;
type StickyCaseReviewItem = Extract<StickyCtaItem, { type: 'case-review' }>;
type FaqLinkItem = Extract<FaqIntroCtaItem, { type: 'link' }>;
type FaqCaseReviewItem = Extract<FaqIntroCtaItem, { type: 'case-review' }>;

export const STICKY_CTA_ACTION_BY_TYPE = {
	'phone-icon': () => (
		<a
			href={BRAND.phoneHref}
			className="mobile-dock__phone"
			aria-label={callBrandAriaLabel(APP_SHELL.aria.callPrefix, APP_SHELL.aria.atPhone)}
		>
			<Phone size={18} className="text-gold" />
		</a>
	),
	link: (item) => {
		const linkItem = item as StickyLinkItem;
		return (
			<Link href={linkItem.href} className="mobile-dock__cta btn btn-primary">
				<span className="mobile-dock__cta-label">{linkItem.label}</span>
				<ArrowRight size={16} className="shrink-0" aria-hidden />
			</Link>
		);
	},
	'case-review': (item) => {
		const reviewItem = item as StickyCaseReviewItem;
		return (
			<PrimaryCallCta
				leadContextId={reviewItem.leadContextId}
				className="mobile-dock__cta btn btn-primary"
				label={reviewItem.label}
				showArrow={false}
			>
				<span className="mobile-dock__cta-label">{reviewItem.label}</span>
				<ArrowRight size={16} className="shrink-0" aria-hidden />
			</PrimaryCallCta>
		);
	},
} satisfies Record<StickyCtaItem['type'], (item: StickyCtaItem) => ReactNode>;

export const FAQ_INTRO_CTA_ACTION_BY_TYPE = {
	link: (item) => {
		const linkItem = item as FaqLinkItem;
		const isPrimary = linkItem.variant === 'primary';
		return (
			<Link
				href={linkItem.href}
				className={cn(
					'btn btn-md min-h-[46px] justify-center sm:w-auto',
					isPrimary ? 'btn-primary relative z-[1]' : 'btn-secondary',
				)}
			>
				{linkItem.label}
				{isPrimary ? <ArrowRight size={16} aria-hidden /> : null}
			</Link>
		);
	},
	'case-review': (item) => {
		const reviewItem = item as FaqCaseReviewItem;
		const isPrimary = reviewItem.variant === 'primary';
		return (
			<PrimaryCallCta
				leadContextId={reviewItem.leadContextId}
				className={cn(
					'btn btn-md min-h-[46px] justify-center sm:w-auto',
					isPrimary ? 'btn-primary relative z-[1]' : 'btn-secondary',
				)}
				label={reviewItem.label}
				showArrow={isPrimary}
				arrowSize={16}
			/>
		);
	},
} satisfies Record<FaqIntroCtaItem['type'], (item: FaqIntroCtaItem) => ReactNode>;
