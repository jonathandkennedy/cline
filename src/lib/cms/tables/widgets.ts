import toolsUiTable from '@/data/settings/widgets.json';
import { hydrateIntroTrustItems } from '../credibility';
import { table } from '../parse';
import type { LeadModalSuccessBlock, ToolPreviewConfig, ToolSlug } from '../types';

export const INTRO_STEPS = table(toolsUiTable.INTRO_STEPS) as Record<ToolSlug, readonly string[]>;
export const TOOL_PREVIEW_CONFIG = table(toolsUiTable.TOOL_PREVIEW_CONFIG) as Record<
	ToolSlug,
	ToolPreviewConfig
>;
export const INTRO_TRUST_ITEMS = hydrateIntroTrustItems(
	toolsUiTable.INTRO_TRUST_ITEMS as Parameters<typeof hydrateIntroTrustItems>[0],
);
export const LEAD_FORM_TRUST_ITEMS = hydrateIntroTrustItems(
	toolsUiTable.LEAD_FORM_TRUST_ITEMS as Parameters<typeof hydrateIntroTrustItems>[0],
);
export const LEAD_MODAL_SUCCESS_ITEMS = table(
	toolsUiTable.LEAD_MODAL_SUCCESS_ITEMS,
) as readonly LeadModalSuccessBlock[];
export const TOOL_SECTION_LABELS = table(toolsUiTable.TOOL_SECTION_LABELS);
export const TOOL_SUPPLEMENT_COPY = table(toolsUiTable.TOOL_SUPPLEMENT_COPY);
export const TOOL_INTRO_KEYBOARD_HINT = table(toolsUiTable.TOOL_INTRO_KEYBOARD_HINT);

const headerLogo = toolsUiTable.headerLogo;
export const HEADER_LOGO_ARIA_LABEL = headerLogo.HEADER_LOGO_ARIA_LABEL;
export const HEADER_LOGO_HOME_HREF = headerLogo.HEADER_LOGO_HOME_HREF;
export const HEADER_LOGO_MARK = table(headerLogo.HEADER_LOGO_MARK);
export const HEADER_LOGO_CHROME_TEXT_ITEMS = table(
	headerLogo.HEADER_LOGO_CHROME_TEXT_ITEMS,
) as readonly {
	key: 'title' | 'subtitle';
	className: string;
}[];
export const HEADER_LOGO_TITLE_MAX_WIDTH_BY_MODE = table(
	headerLogo.HEADER_LOGO_TITLE_MAX_WIDTH_BY_MODE,
);
export const HEADER_LOGO_TEXT_COLUMN_BY_MODE = table(headerLogo.HEADER_LOGO_TEXT_COLUMN_BY_MODE);
export const HEADER_LOGO_ROOT_BY_MODE = table(headerLogo.HEADER_LOGO_ROOT_BY_MODE);
export const HEADER_LOGO_INNER_BY_MODE = table(headerLogo.HEADER_LOGO_INNER_BY_MODE);
