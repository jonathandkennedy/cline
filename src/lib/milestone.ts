import { STORAGE_KEYS } from '@/lib/constants';
import { BUYBACK_DEFAULTS, type BuybackState, buybackStatesEqual, type ToolSlug } from '@/lib/site';
import { loadStore } from '@/lib/storage';
import type { DocumentationPersistedState, EligibilityPersistedState } from '@/lib/vault';

export function eligibilityHasProgress(state: EligibilityPersistedState | null): boolean {
	if (!state) return false;
	return state.step > 1 || state.attempts > 0 || state.daysOut > 0 || state.withinWindow !== null;
}

export function buybackHasProgress(state: BuybackState | null): boolean {
	if (!state) return false;
	return !buybackStatesEqual(state, BUYBACK_DEFAULTS);
}

export function checklistHasProgress(state: DocumentationPersistedState | null): boolean {
	if (!state) return false;
	return Object.values(state.checked ?? {}).some(Boolean) || (state.notes ?? '').length > 0;
}

const TOOL_PROGRESS_CHECKERS: Record<ToolSlug, () => boolean> = {
	'eligibility-checker': () =>
		eligibilityHasProgress(loadStore<EligibilityPersistedState>(STORAGE_KEYS.eligibility)),
	'buyback-calculator': () => buybackHasProgress(loadStore<BuybackState>(STORAGE_KEYS.buyback)),
	'documentation-checklist': () =>
		checklistHasProgress(loadStore<DocumentationPersistedState>(STORAGE_KEYS.docs)),
};

function hasToolProgress(slug: ToolSlug): boolean {
	if (typeof window === 'undefined') return false;
	return TOOL_PROGRESS_CHECKERS[slug]();
}

type ToolEntryView = 'intro' | 'tool';

export function resolveToolEntryView(slug: ToolSlug, deepLinked: boolean): ToolEntryView {
	if (deepLinked) return 'tool';
	if (hasToolProgress(slug)) return 'tool';
	return 'intro';
}
