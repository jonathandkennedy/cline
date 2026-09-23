import { components } from '@/kit/theme';

export const TOOL_SECTION_LABEL_CLASS = components['tools.sectionLabel'];
export const TOOL_SECTION_LABEL_GOLD_CLASS = components['tools.sectionLabelGold'];

export type ToolSectionLabelClass =
	| typeof TOOL_SECTION_LABEL_CLASS
	| typeof TOOL_SECTION_LABEL_GOLD_CLASS;
