'use client';

import { ArrowRight, Phone } from 'lucide-react';
import {
	motionFadeExit,
	motionFadeHidden,
	motionFadeVisible,
	motionTransition,
} from '../functions/motion';
import { usePrefersReducedMotion } from '../hooks/gentle';
import type { CaseReviewCtaComponent, SiteNavChrome } from '@/kit/layout/types/chrome';
import type { HeaderPhoneChrome } from '@/kit/layout/types/phone';
import { components } from '@/kit/theme';
import { cn } from '../functions/cn';
import { AnimatePresence, m } from '../vendors/motion';
import Link from './link';
import { MotionLazy } from './lazy';

type MobileMenuScrimProps = {
	open: boolean;
	onClose: () => void;
};

type MobileProps = HeaderPhoneChrome & {
	open: boolean;
	pathname: string | null;
	onClose: () => void;
	navChrome: SiteNavChrome;
	caseReviewCta: CaseReviewCtaComponent;
};

export function MobileMenuScrim({ open, onClose }: MobileMenuScrimProps) {
	const reducedMotion = usePrefersReducedMotion();

	return (
		<MotionLazy>
			<AnimatePresence>
				{open ? (
					<m.button
						key="mobile-menu-scrim"
						type="button"
						tabIndex={-1}
						aria-label="Close menu"
						className={components.scrim.root}
						onClick={onClose}
						initial={motionFadeHidden(reducedMotion)}
						animate={motionFadeVisible()}
						exit={motionFadeExit(reducedMotion)}
						transition={motionTransition(reducedMotion)}
					/>
				) : null}
			</AnimatePresence>
		</MotionLazy>
	);
}

function headerMobileNavStaggerClass(index: number): string {
	return `header-mobile-nav-stagger-${Math.min(index, 31)}`;
}

function mobileToolNavItemClassName(active: boolean, index: number): string {
	return cn(
		components.mobile.itemTools,
		headerMobileNavStaggerClass(index),
		active ? components.mobile.itemActive : components.mobile.itemIdle,
	);
}

function mobileResourceNavItemClassName(active: boolean, index: number): string {
	return cn(
		components.mobile.itemLink,
		headerMobileNavStaggerClass(index),
		active ? components.mobile.itemActive : components.mobile.itemIdle,
	);
}

function learnHubPathActive(pathname: string | null, learnHubPath: string): boolean {
	return pathname === learnHubPath || (pathname?.startsWith(`${learnHubPath}/`) ?? false);
}

function mobileLearnHubNavItemClassName(
	pathname: string | null,
	index: number,
	learnHubPath: string,
): string {
	return cn(
		components.mobile.itemLink,
		'mt-4',
		headerMobileNavStaggerClass(index),
		learnHubPathActive(pathname, learnHubPath)
			? components.mobile.itemActive
			: components.mobile.itemIdle,
	);
}

function mobileFirmNavItemClassName(
	pathname: string | null,
	index: number,
	firmPath: string,
): string {
	return cn(
		components.mobile.itemLink,
		headerMobileNavStaggerClass(index),
		pathname === firmPath ? components.mobile.itemActive : components.mobile.itemIdle,
	);
}

export function Mobile({
	open,
	pathname,
	onClose,
	phoneHref,
	phoneDisplay,
	phoneAriaLabel,
	navChrome,
	caseReviewCta: CaseReviewCta,
}: MobileProps) {
	let menuItemIndex = 0;
	const nextIndex = () => menuItemIndex++;
	const { mobile } = navChrome;

	return (
		<div
			id="mobile-menu"
			inert={!open}
			data-open={open}
			className={cn(components.mobile.root, open && components.mobile.rootOpen)}
		>
			<div className={components.mobileOverflow}>
				<div className={components.mobileMenuScroll}>
					<div className={components.mobileMenuInner}>
						<span className={components.mobile.sectionLabel}>Free Tools</span>
						{mobile.tools.map((t) => {
							const active = pathname === `/tool/${t.slug}`;
							const itemIndex = nextIndex();
							return (
								<Link
									key={t.slug}
									href={`/tool/${t.slug}`}
									onClick={onClose}
									aria-current={active ? 'page' : undefined}
									className={mobileToolNavItemClassName(active, itemIndex)}
								>
									<span className={components.mobile.toolIconWrap}>{t.icon}</span>
									{t.label}
								</Link>
							);
						})}
						<span className={cn('mt-4', components.mobile.sectionLabel)}>Resources</span>
						{mobile.resources.map((item) => {
							const active =
								pathname === item.href || (pathname?.startsWith(`${item.href}/`) ?? false);
							const itemIndex = nextIndex();
							return (
								<Link
									key={item.id}
									href={item.href}
									onClick={onClose}
									aria-current={active ? 'page' : undefined}
									className={mobileResourceNavItemClassName(active, itemIndex)}
								>
									{item.label}
								</Link>
							);
						})}
						<Link
							href={navChrome.learnNav.href}
							onClick={onClose}
							aria-current={
								learnHubPathActive(pathname, navChrome.learnHubPath) ? 'page' : undefined
							}
							className={mobileLearnHubNavItemClassName(
								pathname,
								nextIndex(),
								navChrome.learnHubPath,
							)}
						>
							{navChrome.learnNav.label}
						</Link>
						<Link
							href={navChrome.firmNav.href}
							onClick={onClose}
							aria-current={pathname === navChrome.firmPath ? 'page' : undefined}
							className={mobileFirmNavItemClassName(pathname, nextIndex(), navChrome.firmPath)}
						>
							{navChrome.firmNav.label}
						</Link>
					</div>
				</div>
				<div className={components.mobile.footer}>
					<a href={phoneHref} aria-label={phoneAriaLabel} className={components.mobile.phoneBtn}>
						<Phone size={15} className={components.mobile.phoneIconGold} aria-hidden="true" />{' '}
						{phoneDisplay}
					</a>
					<CaseReviewCta
						leadContextId="site-header"
						onActivate={onClose}
						className={components.mobile.caseReviewCta}
					>
						Start My Free Case Review <ArrowRight size={15} />
					</CaseReviewCta>
				</div>
			</div>
		</div>
	);
}
