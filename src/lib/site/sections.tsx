'use client';

import type { ReactNode } from 'react';

import type { PageSection, SiteComponentsSchema } from '@/kit/catalog';
import { createComponentRenderer, isPageDocument, mergePageSectionKindProps } from '@/kit/catalog';

import { SITE_DATA_INDEX } from '@/lib/cms/dataindex';
import { siteComponentKinds } from '@/lib/site/kinds';

import siteComponents from '@/data/site/components.json';

const siteComponentsSchema = siteComponents as SiteComponentsSchema;

function isSectionGroup(section: PageSection): section is Extract<PageSection, { type: 'group' }> {
	return section.type === 'group';
}

function sectionKindRenderer(
	registryId: string,
	blockId: string,
	section: Exclude<PageSection, { type: 'group' }>,
): () => ReactNode {
	const registrySpec = siteComponentsSchema.registries[registryId];
	const def = registrySpec?.main?.[blockId];
	if (!def) {
		throw new Error(`[site] unknown section block "${blockId}" in registry "${registryId}"`);
	}
	const flatProps = mergePageSectionKindProps(section, SITE_DATA_INDEX);
	const mergedDef = {
		...def,
		props: {
			...(def.props ?? {}),
			...flatProps,
		},
	};
	return createComponentRenderer(mergedDef, siteComponentKinds, SITE_DATA_INDEX) as () => ReactNode;
}

export function renderPageSections(
	sections: PageSection[],
	registryId: string,
	fallbackBlocks: Record<string, () => ReactNode>,
	prefix = 'sec',
): ReactNode[] {
	const out: ReactNode[] = [];
	sections.forEach((section, i) => {
		const key = `${prefix}-${i}`;
		if (isSectionGroup(section)) {
			out.push(
				<div key={key} className={section.config.className}>
					{renderPageSections(section.sections, registryId, fallbackBlocks, key)}
				</div>,
			);
			return;
		}
		const blockId = section.type;
		const hasPayload =
			Boolean(section.data && Object.keys(section.data).length > 0) ||
			Boolean(section.config && Object.keys(section.config).length > 0);
		if (hasPayload) {
			const Render = sectionKindRenderer(registryId, blockId, section);
			out.push(<Render key={key} />);
			return;
		}
		const Block = fallbackBlocks[blockId];
		if (!Block) {
			throw new Error(`[site] missing renderer for section type "${blockId}"`);
		}
		out.push(<Block key={key} />);
	});
	return out;
}

export function renderPageDocument(
	main: unknown,
	registryId: string,
	fallbackBlocks: Record<string, () => ReactNode>,
): ReactNode[] {
	if (isPageDocument(main)) {
		return renderPageSections(main.sections, registryId, fallbackBlocks);
	}
	throw new Error('[site] main ref must be a page document with sections');
}
