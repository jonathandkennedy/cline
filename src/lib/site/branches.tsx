import { Fragment, type ReactNode } from 'react';
import type { SiteTreeNode } from '@/kit/catalog';
import type { HomeBlockId, HomePageNode } from '@/lib/cms';

export type ResourceTreeNode<BlockId extends string> = SiteTreeNode<BlockId>;

export type ResourceBlockRenderer<BlockId extends string> = Record<BlockId, () => ReactNode>;

type GroupNode<BlockId extends string> = Extract<ResourceTreeNode<BlockId>, { type: 'group' }>;
type BlockNode<BlockId extends string> = Extract<ResourceTreeNode<BlockId>, { type: 'block' }>;

function renderGroup<BlockId extends string>(
	node: GroupNode<BlockId>,
	key: string,
	blocks: ResourceBlockRenderer<BlockId>,
): ReactNode {
	return (
		<div key={key} className={node.className}>
			{node.children.map((child, i) => renderResourceTreeNode(child, `${key}-${i}`, blocks))}
		</div>
	);
}

function renderBlock<BlockId extends string>(
	node: BlockNode<BlockId>,
	key: string,
	blocks: ResourceBlockRenderer<BlockId>,
): ReactNode {
	const content = blocks[node.id]();
	if (content == null) return null;
	return <Fragment key={key}>{content}</Fragment>;
}

export const RESOURCE_TREE_NODE_BY_TYPE = {
	group: <BlockId extends string>(
		node: ResourceTreeNode<BlockId>,
		key: string,
		blocks: ResourceBlockRenderer<BlockId>,
	) => renderGroup(node as GroupNode<BlockId>, key, blocks),
	block: <BlockId extends string>(
		node: ResourceTreeNode<BlockId>,
		key: string,
		blocks: ResourceBlockRenderer<BlockId>,
	) => renderBlock(node as BlockNode<BlockId>, key, blocks),
} as const;

export function renderResourceTreeNode<BlockId extends string>(
	node: ResourceTreeNode<BlockId>,
	key: string,
	blocks: ResourceBlockRenderer<BlockId>,
): ReactNode {
	return RESOURCE_TREE_NODE_BY_TYPE[node.type](node, key, blocks);
}

export type HomeBlockRenderer = ResourceBlockRenderer<HomeBlockId>;

export function renderHomePageNode(
	node: HomePageNode,
	key: string,
	blocks: HomeBlockRenderer,
): ReactNode {
	return renderResourceTreeNode(node as ResourceTreeNode<HomeBlockId>, key, blocks);
}

const RESOURCE_TREE_NODE_KEY = {
	block: <BlockId extends string>(node: BlockNode<BlockId>, prefix: string) =>
		`${prefix}-${node.id}`,
	group: <BlockId extends string>(node: GroupNode<BlockId>, prefix: string) =>
		`${prefix}-group-${node.className.replace(/\s+/g, '-')}`,
} as const;

export function resourceTreeNodeKey<BlockId extends string>(
	node: ResourceTreeNode<BlockId>,
	prefix: string,
): string {
	return RESOURCE_TREE_NODE_KEY[node.type](node as BlockNode<BlockId> & GroupNode<BlockId>, prefix);
}

const RESOURCE_SECTION_REVEAL_SKIP = new Set(['hero', 'categories']);

const RESOURCE_SECTION_REVEAL_SKIP_BY_NODE = {
	block: <BlockId extends string>(node: BlockNode<BlockId>) =>
		RESOURCE_SECTION_REVEAL_SKIP.has(node.id),
	group: () => false,
} as const;

export function skipResourceSectionReveal<BlockId extends string>(
	node: ResourceTreeNode<BlockId>,
): boolean {
	return RESOURCE_SECTION_REVEAL_SKIP_BY_NODE[node.type](node as BlockNode<BlockId>);
}
