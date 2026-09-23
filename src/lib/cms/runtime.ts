import type { ToolShellChromeBlockId, ToolShellChromeContext } from './types';

const SHELL_BLOCK_WHEN: Record<ToolShellChromeBlockId, (ctx: ToolShellChromeContext) => boolean> = {
	embedHeader: (ctx) => ctx.isEmbed && !ctx.hideHeader,
	scrollMarker: (ctx) => !ctx.isEmbed && !ctx.welcome,
	footer: (ctx) => !ctx.isStandalone,
	scrollFlag: (ctx) => !ctx.isEmbed,
	backToTop: (ctx) => !ctx.isEmbed,
};

export function hydrateToolShellChromeBlocks(
	rows: readonly { id: ToolShellChromeBlockId; region: 'head' | 'tail' }[],
) {
	return rows.map((row) => ({
		...row,
		when: SHELL_BLOCK_WHEN[row.id],
	}));
}
