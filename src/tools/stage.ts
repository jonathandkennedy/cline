'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { LeadPrefill } from '@/components';
import { useLayoutChrome } from '@/kit/layout';
import { usePrefersReducedMotion } from '@/hooks';
import {
	getTool,
	isToolDeepLinked,
	isToolEmbedMode,
	isToolStandalone,
	LAYOUT_CHROME,
	TOOL_HEADER_TITLES,
	TOOLS,
	type ToolQueryMode,
	type ToolSlug,
	withPreservedToolQuery,
} from '@/lib/cms';
import { useEmbedBridge } from '@/lib/embed/hook';
import { resolveToolEntryView } from '@/lib/milestone';
import { TOOL_PANELS } from '@/tools/registry';

type ToolView = 'intro' | 'tool';

export function useToolInner(slug: ToolSlug, queryMode: ToolQueryMode) {
	const tool = getTool(slug)!;
	const ToolPanel = TOOL_PANELS[slug];
	const pathname = usePathname();
	const router = useRouter();
	const params = useSearchParams();
	const onToolRoute = Boolean(pathname?.match(new RegExp(`^/tool/${slug}(?:/|$|\\?)`)));

	const deepLinked = useMemo(
		() => isToolDeepLinked(params) || queryMode.deepLinked,
		[params, queryMode.deepLinked],
	);

	const initialView = resolveToolEntryView(slug, deepLinked);

	const entryReady = true;
	const [view, setView] = useState<ToolView>(() => initialView);
	const [workbenchMounted, setWorkbenchMounted] = useState(() => initialView === 'tool');
	const [workbenchFlow, setWorkbenchFlow] = useState(() => initialView === 'tool');
	const [previousSlug, setPreviousSlug] = useState(slug);
	const [leadOpen, setLeadOpen] = useState(false);
	const [leadPrefill, setLeadPrefill] = useState<LeadPrefill | null>(null);
	const reducedMotion = usePrefersReducedMotion();
	const { setChrome, setToolPhase } = useLayoutChrome();

	const isStandalone = useMemo(
		() => isToolStandalone(params) || queryMode.standalone,
		[params, queryMode.standalone],
	);
	const isEmbed = useMemo(
		() => isToolEmbedMode(params) || queryMode.embed,
		[params, queryMode.embed],
	);

	useEmbedBridge(isStandalone || isEmbed);

	const isIntro = view === 'intro';

	if (previousSlug !== slug) {
		const next = resolveToolEntryView(slug, deepLinked);
		setPreviousSlug(slug);
		setView(next);
		setWorkbenchMounted(next === 'tool');
		setWorkbenchFlow(next === 'tool');
	}

	useEffect(() => {
		if (workbenchMounted || !isIntro) return;
		const mount = () => setWorkbenchMounted(true);
		if (typeof window.requestIdleCallback === 'function') {
			const id = window.requestIdleCallback(mount, { timeout: 480 });
			return () => window.cancelIdleCallback(id);
		}
		const id = window.setTimeout(mount, 160);
		return () => window.clearTimeout(id);
	}, [isIntro, workbenchMounted]);

	useEffect(() => {
		if (isIntro) {
			setWorkbenchFlow(false);
			return;
		}
		if (reducedMotion) {
			setWorkbenchFlow(true);
			return;
		}
		const id = window.setTimeout(() => setWorkbenchFlow(true), 130);
		return () => window.clearTimeout(id);
	}, [isIntro, reducedMotion]);

	useLayoutEffect(() => {
		if (!onToolRoute || !entryReady) return;
		setToolPhase(isIntro ? 'welcome' : 'workbench');
	}, [isIntro, setToolPhase, onToolRoute, entryReady]);

	useEffect(() => () => setToolPhase(null), [setToolPhase]);

	useLayoutEffect(() => {
		if (!onToolRoute) return;
		if (view === 'tool' && entryReady) {
			setChrome({
				title: TOOL_HEADER_TITLES[slug],
				subtitle: LAYOUT_CHROME.siteDomain,
			});
			return;
		}
		setChrome({
			title: LAYOUT_CHROME.defaultTitle,
			subtitle: LAYOUT_CHROME.defaultSubtitle,
		});
	}, [view, slug, setChrome, onToolRoute, entryReady]);

	const openLead = useCallback((prefill?: LeadPrefill) => {
		setLeadPrefill(prefill ?? null);
		setLeadOpen(true);
	}, []);

	const startHref = useMemo(
		() => withPreservedToolQuery(`/tool/${slug}?start=1`, params),
		[slug, params],
	);
	const welcomeHref = useMemo(
		() => withPreservedToolQuery(`/tool/${slug}`, params),
		[slug, params],
	);

	useLayoutEffect(() => {
		if (!onToolRoute || view !== 'tool' || deepLinked) return;
		router.replace(startHref, { scroll: false });
	}, [deepLinked, onToolRoute, router, startHref, view]);

	const transitionTo = useCallback((next: ToolView) => {
		if (next === 'tool') setWorkbenchMounted(true);
		setView(next);
	}, []);

	const handleStart = useCallback(() => {
		transitionTo('tool');
		window.requestAnimationFrame(() => {
			router.replace(startHref, { scroll: false });
		});
	}, [router, startHref, transitionTo]);

	const goToWelcome = useCallback(() => {
		transitionTo('intro');
		window.requestAnimationFrame(() => {
			router.replace(welcomeHref, { scroll: false });
		});
	}, [router, transitionTo, welcomeHref]);

	const restart = goToWelcome;
	const closeLead = useCallback(() => setLeadOpen(false), []);
	const openLeadGeneral = useCallback(() => openLead(), [openLead]);

	const otherTools = TOOLS.filter((t) => t.slug !== slug);

	const chromeWelcome = !entryReady || isIntro;
	const compactFooter = isEmbed || !isStandalone;
	const supplementOpen = !isStandalone && view === 'tool' && workbenchFlow;

	return {
		tool,
		ToolPanel,
		params,
		isIntro,
		entryReady,
		workbenchMounted,
		workbenchFlow,
		reducedMotion,
		view,
		leadOpen,
		leadPrefill,
		isStandalone,
		isEmbed,
		chrome: queryMode.chrome,
		startHref,
		handleStart,
		goToWelcome,
		restart,
		closeLead,
		openLeadGeneral,
		openLead,
		otherTools,
		chromeWelcome,
		compactFooter,
		supplementOpen,
	};
}
