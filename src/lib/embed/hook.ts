'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
	embedModeLabel,
	postEmbedMessage,
	reportEmbedHeight,
	resetEmbedHeight,
} from '@/lib/embed/bridge';
import { resolveClientEmbedSiteHome } from '@/lib/embed/home';

/** Auto-resize + ready signal for ?standalone / embed iframes on WordPress. */
export function useEmbedBridge(active: boolean) {
	const pathname = usePathname();
	useEffect(() => {
		if (!active || typeof window === 'undefined') return;
		if (window.parent === window) return;

		const mode = embedModeLabel(new URLSearchParams(window.location.search));
		postEmbedMessage('READY', { mode });

		let timer = 0;
		const schedule = () => {
			window.clearTimeout(timer);
			timer = window.setTimeout(() => reportEmbedHeight(), 80);
		};

		resetEmbedHeight();
		reportEmbedHeight();

		const shell = document.querySelector('[data-embed-root], .tool-shell');
		const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
		if (shell) ro?.observe(shell);
		else ro?.observe(document.documentElement);

		const onLoad = () => reportEmbedHeight();
		window.addEventListener('load', onLoad);

		const mo = new MutationObserver(schedule);
		mo.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: false,
		});

		return () => {
			window.clearTimeout(timer);
			ro?.disconnect();
			mo.disconnect();
			window.removeEventListener('load', onLoad);
		};
	}, [active, pathname]);
}

export function useEmbedSiteHome(): string {
	const params = useSearchParams();
	return useMemo(() => resolveClientEmbedSiteHome(params), [params]);
}
