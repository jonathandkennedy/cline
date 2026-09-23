import type { Metadata } from 'next';

import { BRAND } from '@/lib/cms';

function absolutePageTitle(seoTitle: string): Metadata['title'] {
	return { absolute: seoTitle };
}

export function pageMetadata(input: {
	title: string;
	description: string;
	canonical: string;
	type?: 'website' | 'article';
}): Metadata {
	const url = `${BRAND.toolsUrl}${input.canonical}`;
	const type = input.type ?? 'website';
	return {
		title: absolutePageTitle(input.title),
		description: input.description,
		alternates: { canonical: input.canonical },
		openGraph: {
			title: input.title,
			description: input.description,
			url,
			type,
		},
		twitter: {
			card: 'summary_large_image',
			title: input.title,
			description: input.description,
		},
	};
}
