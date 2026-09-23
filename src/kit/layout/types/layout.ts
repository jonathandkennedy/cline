import type { LayoutChrome, ToolPhase } from '../contexts';

/** App chrome — marketing routes use catalog `shell` on `SitePageDefinition`. */

export type LayoutChromeReadonly = LayoutChrome & {
	toolPhase: ToolPhase;
};
