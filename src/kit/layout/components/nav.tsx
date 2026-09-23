'use client';

import { cn } from '@/kit/ui/functions/cn';
import Link from '@/kit/ui/components/link';
import { Scrim } from '@/kit/ui/components/scrim';
import { scrollWindowToTop } from '@/kit/ui/functions/scroll';
import { components } from '@/kit/theme/interface/components';
import { ArrowRight, ChevronLeft, Menu, Phone, X } from 'lucide-react';
import { type ReactNode, useCallback, useEffect, useRef } from 'react';
import {
	firmNavPillClassName,
	teamNavPillClassName,
	learnHubNavPillClassName,
} from '../functions/navpill';
import { useMega } from '../hooks/use-mega';
import type { HeaderPhoneChrome } from '../types/phone';
import type {
	CaseReviewCtaComponent,
	MegaMenusSlotProps,
	SiteLogoChrome,
	SiteNavChrome,
} from '../types/chrome';
import { Logo } from './logo';
import { Mobile, MobileMenuScrim } from './mobile';
import { Navflyout } from './navflyout';
import { useHeader } from './navigation';

export type NavProps = HeaderPhoneChrome & {
	logoChrome: SiteLogoChrome;
	navChrome: SiteNavChrome;
	caseReviewCta: CaseReviewCtaComponent;
	renderMenus: (props: MegaMenusSlotProps) => ReactNode;
};

export function Nav({
	phoneHref,
	phoneDisplay,
	phoneAriaLabel,
	logoChrome,
	navChrome,
	caseReviewCta: CaseReviewCta,
	renderMenus,
}: NavProps) {
	const {
		open,
		activeMega,
		toolsOpen,
		resourcesOpen,
		megaOpen,
		toolsTriggerRef,
		resourcesTriggerRef,
		pathname,
		onToolPage,
		onToolChrome,
		openMegaMenu,
		closeAllMenus,
		scheduleCloseAllMenus,
		cancelScheduledClose,
		toggleToolsMenu,
		toggleResourcesMenu,
		toggleMobileMenu,
		closeMobileMenu,
		closeToolsOnNavigate,
	} = useHeader(false, navChrome.resourceHubPathPrefixes);

	const megaFlyoutRef = useRef<HTMLDivElement>(null);
	const { publishMegaBridge } = useMega();

	useEffect(() => {
		publishMegaBridge({
			megaFlyoutRef,
			megaOpen,
			activeMega,
			toolsTriggerRef,
			resourcesTriggerRef,
		});
		return () => publishMegaBridge(null);
	}, [
		publishMegaBridge,
		megaOpen,
		activeMega,
		megaFlyoutRef,
		toolsTriggerRef,
		resourcesTriggerRef,
	]);

	useEffect(() => {
		const root = document.documentElement;
		const syncVisualViewport = () => {
			// iPad Safari PTR can leave visualViewport.offsetTop > 0 → gap under the URL bar.
			const offset = window.visualViewport?.offsetTop ?? 0;
			root.style.setProperty('--vv-offset-top', `${offset}px`);
		};
		const onPageShow = (event: PageTransitionEvent) => {
			syncVisualViewport();
			const staleOffset = (window.visualViewport?.offsetTop ?? 0) > 0;
			// Only reset scroll for a bfcache restore or a stale visualViewport
			// offset left behind by iPad pull-to-refresh. On a normal load this
			// fires once `load` completes and would yank anyone who already
			// started scrolling back to the top (ABRE-127).
			if (event.persisted || staleOffset) {
				window.scrollTo(0, 0);
			}
		};
		syncVisualViewport();
		window.visualViewport?.addEventListener('scroll', syncVisualViewport);
		window.visualViewport?.addEventListener('resize', syncVisualViewport);
		window.addEventListener('pageshow', onPageShow);
		return () => {
			window.visualViewport?.removeEventListener('scroll', syncVisualViewport);
			window.visualViewport?.removeEventListener('resize', syncVisualViewport);
			window.removeEventListener('pageshow', onPageShow);
		};
	}, []);

	const handleToolsTriggerClick = useCallback(() => {
		cancelScheduledClose();
		toggleToolsMenu();
	}, [cancelScheduledClose, toggleToolsMenu]);

	const handleResourcesTriggerClick = useCallback(() => {
		cancelScheduledClose();
		toggleResourcesMenu();
	}, [cancelScheduledClose, toggleResourcesMenu]);

	const onToolsMegaEnter = useCallback(() => {
		openMegaMenu('tools');
	}, [openMegaMenu]);

	const onResourcesMegaEnter = useCallback(() => {
		openMegaMenu('resources');
	}, [openMegaMenu]);

	const isHome = pathname === '/';

	const handleLogoActivate = useCallback(() => {
		closeMobileMenu();
		if (isHome) scrollWindowToTop('smooth');
	}, [closeMobileMenu, isHome]);

	return (
		<>
			<Scrim open={megaOpen} />
			<header
				className={cn(components.masthead.root, megaOpen && components.masthead.rootMegaOpen)}
				data-menu-open={megaOpen || open ? true : undefined}
			>
				<div className={components.masthead.inner} onMouseLeave={scheduleCloseAllMenus}>
					<div className={components.masthead.row}>
						<div
							className={cn(
								components.masthead.brand,
								onToolChrome && components.masthead.brandTool,
							)}
						>
							{onToolChrome ? (
								<Link
									href="/"
									aria-label="Back to home"
									onClick={closeMobileMenu}
									className={components.nav.toolBack}
								>
									<ChevronLeft size={16} aria-hidden />
								</Link>
							) : null}
							<Logo
								logoChrome={logoChrome}
								linked={!isHome}
								toolPage={onToolChrome}
								onNavigate={handleLogoActivate}
							/>
						</div>

						{!onToolPage ? (
							<nav
								className={components.nav.primary}
								aria-label="Primary"
								onMouseEnter={cancelScheduledClose}
							>
								<div onMouseEnter={onToolsMegaEnter}>
									<Navflyout
										label="Tools"
										open={toolsOpen}
										onClick={handleToolsTriggerClick}
										buttonRef={toolsTriggerRef}
										controlsId="tools-megamenu"
									/>
								</div>
								<div onMouseEnter={onResourcesMegaEnter}>
									<Navflyout
										label="Resources"
										open={resourcesOpen}
										onClick={handleResourcesTriggerClick}
										buttonRef={resourcesTriggerRef}
										controlsId="resources-megamenu"
									/>
								</div>
								<div className={components.nav.linkCluster}>
									<Link
										href={navChrome.learnNav.href}
										onMouseEnter={closeAllMenus}
										className={learnHubNavPillClassName(pathname, navChrome.learnHubPath)}
									>
										{navChrome.learnNav.label}
									</Link>
									<Link
										href={navChrome.firmNav.href}
										onMouseEnter={closeAllMenus}
										className={firmNavPillClassName(pathname, navChrome.firmPath)}
									>
										{navChrome.firmNav.label}
									</Link>
									<Link
										href={navChrome.teamNav.href}
										onMouseEnter={closeAllMenus}
										className={teamNavPillClassName(pathname, navChrome.teamPath)}
									>
										{navChrome.teamNav.label}
									</Link>
								</div>
							</nav>
						) : null}

						<div className={components.masthead.actions}>
							<a href={phoneHref} aria-label={phoneAriaLabel} className={components.masthead.phone}>
								<Phone size={14} className={components.mobile.phoneIconGold} aria-hidden />
								{phoneDisplay}
							</a>
							<CaseReviewCta leadContextId="site-header" className={components.navHeaderCta}>
								Free Case Review <ArrowRight size={15} />
							</CaseReviewCta>
							<button
								type="button"
								onClick={toggleMobileMenu}
								className={components.nav.menuToggle}
								aria-label={open ? 'Close menu' : 'Open menu'}
								aria-expanded={open}
								aria-controls="mobile-menu"
							>
								{open ? <X size={18} /> : <Menu size={18} />}
							</button>
						</div>
					</div>

					{renderMenus({
						megaFlyoutRef,
						megaOpen,
						activeMega,
						onMouseEnter: cancelScheduledClose,
						closeToolsOnNavigate,
					})}
				</div>

				<MobileMenuScrim open={open} onClose={closeMobileMenu} />

				<Mobile
					open={open}
					pathname={pathname}
					onClose={closeMobileMenu}
					phoneHref={phoneHref}
					phoneDisplay={phoneDisplay}
					phoneAriaLabel={phoneAriaLabel}
					navChrome={navChrome}
					caseReviewCta={CaseReviewCta}
				/>
			</header>
		</>
	);
}
