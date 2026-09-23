/** APPS record keyed by ToolSlug — no inline slug switches in UI. */
import { buybackCalculatorApp } from '../constants/apps/buyback';
import { documentationChecklistApp } from '../constants/apps/checklist';
import { eligibilityCheckerApp } from '../constants/apps/eligibility';
import type { AppDefinition, AppSlug } from '../types';

export const APPS: Record<AppSlug, AppDefinition> = {
	'eligibility-checker': eligibilityCheckerApp,
	'buyback-calculator': buybackCalculatorApp,
	'documentation-checklist': documentationChecklistApp,
};

export const APP_LIST: AppDefinition[] = [
	eligibilityCheckerApp,
	buybackCalculatorApp,
	documentationChecklistApp,
];

export function getAppDefinition(slug: string): AppDefinition | undefined {
	return APPS[slug as AppSlug];
}
