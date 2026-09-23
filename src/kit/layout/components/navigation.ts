'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { lockDocumentScroll } from '../functions/lock';

type MegaMenuId = 'tools' | 'resources';

const MEGA_CLOSE_DELAY_MS = 120;

function resourcePathPattern(prefixes: readonly string[]): RegExp {
	return new RegExp(`^/(${prefixes.join('|')})(/|$)`);
}

export function useHeader(compact: boolean, resourceHubPathPrefixes: readonly string[]) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [activeMega, setActiveMega] = useState<MegaMenuId | null>(null);
	const toolsTriggerRef = useRef<HTMLButtonElement>(null);
	const resourcesTriggerRef = useRef<HTMLButtonElement>(null);
	const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const pathname = usePathname();
	const resourcePathRe = resourcePathPattern(resourceHubPathPrefixes);
	const onToolPath = Boolean(pathname?.match(/^\/tool\/([^/?#]+)/));
	const onResourcePath = Boolean(pathname?.match(resourcePathRe));
	const onToolPage = !compact && onToolPath;
	const onToolChrome = !compact && onToolPath;

	const toolsOpen = activeMega === 'tools';
	const resourcesOpen = activeMega === 'resources';
	const megaOpen = activeMega !== null;

	const cancelScheduledClose = useCallback(() => {
		if (closeTimerRef.current === null) return;
		clearTimeout(closeTimerRef.current);
		closeTimerRef.current = null;
	}, []);

	const closeAllMenus = useCallback(() => {
		cancelScheduledClose();
		setActiveMega(null);
	}, [cancelScheduledClose]);

	const scheduleCloseAllMenus = useCallback(() => {
		cancelScheduledClose();
		closeTimerRef.current = setTimeout(() => {
			setActiveMega(null);
			closeTimerRef.current = null;
		}, MEGA_CLOSE_DELAY_MS);
	}, [cancelScheduledClose]);

	const openMegaMenu = useCallback(
		(id: MegaMenuId) => {
			cancelScheduledClose();
			setActiveMega(id);
		},
		[cancelScheduledClose],
	);

	const openToolsMenu = useCallback(() => {
		openMegaMenu('tools');
	}, [openMegaMenu]);

	const openResourcesMenu = useCallback(() => {
		openMegaMenu('resources');
	}, [openMegaMenu]);

	const toggleToolsMenu = useCallback(() => {
		cancelScheduledClose();
		setActiveMega((current) => (current === 'tools' ? null : 'tools'));
	}, [cancelScheduledClose]);

	const toggleResourcesMenu = useCallback(() => {
		cancelScheduledClose();
		setActiveMega((current) => (current === 'resources' ? null : 'resources'));
	}, [cancelScheduledClose]);

	useLayoutEffect(() => {
		setMobileOpen(false);
		closeAllMenus();
	}, [pathname, closeAllMenus]);

	useEffect(() => {
		if (onToolPath) closeAllMenus();
	}, [onToolPath, closeAllMenus]);

	useEffect(() => {
		return () => {
			if (closeTimerRef.current !== null) {
				clearTimeout(closeTimerRef.current);
			}
		};
	}, []);

	// Layout effect: lock/unlock must land before paint. The lock fixes <body>
	// at top:-scrollY; a stray painted frame with the header back to `sticky`
	// would flash it off-screen on close.
	useLayoutEffect(() => {
		if (!mobileOpen) return;
		return lockDocumentScroll();
	}, [mobileOpen]);

	useEffect(() => {
		if (!mobileOpen && !megaOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') return;
			setMobileOpen(false);
			closeAllMenus();
			toolsTriggerRef.current?.focus();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [mobileOpen, megaOpen, closeAllMenus]);

	return {
		open: mobileOpen,
		activeMega,
		toolsOpen,
		resourcesOpen,
		megaOpen,
		toolsTriggerRef,
		resourcesTriggerRef,
		pathname,
		onToolPath,
		onResourcePath,
		onToolPage,
		onToolChrome,
		openMegaMenu,
		openToolsMenu,
		closeToolsMenuNow: closeAllMenus,
		closeResourcesMenuNow: closeAllMenus,
		openResourcesMenu,
		closeAllMenus,
		scheduleCloseAllMenus,
		cancelScheduledClose,
		toggleToolsMenu,
		toggleResourcesMenu,
		toggleMobileMenu: () => setMobileOpen((v) => !v),
		closeMobileMenu: () => setMobileOpen(false),
		closeToolsOnNavigate: closeAllMenus,
	};
}
