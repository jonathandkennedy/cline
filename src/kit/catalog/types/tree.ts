export type SiteTreeNode<BlockId extends string = string> =
	| {
			type: 'group';
			className: string;
			children: SiteTreeNode<BlockId>[];
	  }
	| { type: 'block'; id: BlockId };

export type SiteBlockRegistry<BlockId extends string = string> = Record<BlockId, () => unknown>;

export type SiteShellKind = 'home' | 'resource' | 'tool' | 'minimal';

export type DataRef = string | { $ref: string };

export type SitePageDefinition = {
	id: string;
	route: string;
	registry: string;
	shell: SiteShellKind;
	main?: DataRef;
	footer?: DataRef;
	chrome?: DataRef;
	seo?: DataRef;
};

export type SiteCatalog = {
	version: number;
	pages: Record<string, SitePageDefinition>;
};
