'use client';

/** Provider tree renderer — used by app shells wrapping renderSitePage output. */
import { type ComponentType, type Context, memo, type ReactNode } from 'react';

type ProviderTreeNode = {
	provider: ComponentType<{ children: ReactNode } & Record<string, unknown>>;
	args?: Record<string, unknown>;
	elements?: Record<string, ComponentType>;
};

export function createContextProvider<V>({
	context,
	hook,
}: {
	context: Context<V | null>;
	hook: (args: Record<string, unknown>) => V;
}): ComponentType<{ children: ReactNode } & Record<string, unknown>> {
	function ContextProvider({
		children,
		...args
	}: {
		children: ReactNode;
	} & Record<string, unknown>) {
		const value = hook(args);
		const Ctx = context;
		return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
	}
	return ContextProvider;
}

function renderTreeNode(
	node: ProviderTreeNode,
	children: ReactNode,
	inheritedArgs: Record<string, unknown>,
): ReactNode {
	const mergedArgs = { ...inheritedArgs, ...node.args };
	const Provider = node.provider;
	const sidecars = node.elements
		? Object.entries(node.elements).map(([key, Element]) => <Element key={key} />)
		: null;

	const treeChildren =
		sidecars && sidecars.length > 0 ? (
			<>
				{children}
				{sidecars}
			</>
		) : (
			children
		);

	return <Provider {...mergedArgs}>{treeChildren}</Provider>;
}

export function createProvider(options: { tree: Record<string, ProviderTreeNode> }) {
	const order = ['mega', 'layout'].filter((key) => key in options.tree);
	const keys = order.length > 0 ? order : Object.keys(options.tree);
	const nodes = keys.map((key) => options.tree[key]).filter(Boolean);
	if (nodes.length === 0 || !nodes[0]?.provider) {
		throw new Error('createProvider tree requires a provider');
	}

	function Provider({
		children,
		...args
	}: {
		children: ReactNode;
	} & Record<string, unknown>) {
		let content: ReactNode = children;
		for (let i = nodes.length - 1; i >= 0; i -= 1) {
			const node = nodes[i];
			if (!node) continue;
			content = renderTreeNode(node, content, args);
		}
		return <>{content}</>;
	}

	return { provider: Provider };
}

function NexusComponent() {
	return null;
}

export const Nexus = memo(NexusComponent);
