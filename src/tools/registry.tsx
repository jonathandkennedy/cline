'use client';

import type { ComponentType } from 'react';
import type { ToolSlug } from '@/lib/cms';
import { BuybackCalculator } from '@/tools/buyback';
import { DocumentationChecklist } from '@/tools/checklist';
import { EligibilityChecker } from '@/tools/eligibility';
import type { OpenLead } from '@/tools/shared';

type ToolPanelProps = {
	onOpenLead: OpenLead;
	onRestart: () => void;
};

export type { ToolPanelProps };

export const TOOL_PANELS: Record<ToolSlug, ComponentType<ToolPanelProps>> = {
	'buyback-calculator': BuybackCalculator,
	'eligibility-checker': EligibilityChecker,
	'documentation-checklist': DocumentationChecklist,
};
