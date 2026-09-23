'use client';

import { Suspense } from 'react';

import { EmbedHeader } from '@/components/header';
import { Footer } from '@/components/footer';
import { StickyCTA } from '@/components/sticky';

import type { SiteComponentKindMap } from '@/kit/catalog';
import { End, Marker, Top } from '@/kit/shared';

export const chromeKinds: SiteComponentKindMap = {
	'chrome.marker': () => <Marker />,
	'chrome.footer': () => <Footer />,
	'chrome.end': () => <End />,
	'chrome.stickyCta': () => <StickyCTA />,
	'chrome.backToTop': () => <Top />,
	'chrome.embedHeader': () => (
		<Suspense fallback={null}>
			<EmbedHeader />
		</Suspense>
	),
	'chrome.toolFooter': (ctx) => <Footer compact={Boolean(ctx.slimFooter)} />,
};
