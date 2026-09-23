/** Walk catalog `main` tree nodes and render block ids via registry maps. */

import type { ReactNode } from 'react';

import { Reveal } from '@/components';

import {
	type ResourceBlockRenderer,
	type ResourceTreeNode,
	renderResourceTreeNode,
	resourceTreeNodeKey,
	skipResourceSectionReveal,
} from '@/lib/site/branches';

const RESOURCE_SECTION_REVEAL_STEP_MS = 40;
const RESOURCE_SECTION_REVEAL_MAX_MS = 160;

export function renderResourcePageMain<BlockId extends string>(
	nodes: readonly ResourceTreeNode<BlockId>[],
	prefix: string,
	blocks: ResourceBlockRenderer<BlockId>,
): ReactNode {
	return nodes.map((node, index) => {
		const key = resourceTreeNodeKey(node, prefix);
		const section = renderResourceTreeNode(node, key, blocks);
		if (skipResourceSectionReveal(node)) return section;
		const delay = Math.min(index * RESOURCE_SECTION_REVEAL_STEP_MS, RESOURCE_SECTION_REVEAL_MAX_MS);
		return (
			<Reveal key={key} delay={delay}>
				{section}
			</Reveal>
		);
	});
}
