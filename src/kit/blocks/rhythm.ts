import { components } from '@/kit/theme/interface/components';
import { cn } from '@/kit/ui/functions/cn';

export type { ReactNode } from 'react';
export { cn, components };

export {
	FAQ_INTRO_STICKY_ASIDE_CLASS,
	RESOURCE_BAND_PY,
	RESOURCE_BAND_PY_COMPACT,
	RESOURCE_BAND_PY_MATCH,
} from '@/kit/blocks/tokens';

export const RESOURCE_ASIDE_SECTION_LABEL_CLASS = components['resource.asideSectionLabel'];

export const RESOURCE_SECTION_TITLE_CLASS = components['resource.sectionTitle'];

export const RESOURCE_SECTION_BODY_CLASS = components['resource.sectionBody'];

export const RESOURCE_BAND_GRID_CLASS = components['resource.bandGrid'];

export const RESOURCE_KEEP_EXPLORING_MIN_ITEMS = 2;

export const RESOURCE_GRID = components['resource.grid'];

export const RESOURCE_READING_COLUMN = components['resource.readingColumn'];

export const RESOURCE_NARRATIVE_COLUMN = components['resource.narrativeColumn'];

export const RESOURCE_INDEXED_BODY_CLASS = components['resource.indexedBody'];

export const RESOURCE_SUPPORTING_TEXT_CLASS = components['resource.supportingText'];

export const RESOURCE_BLEED_MAIN = components['resource.bleedMain'];
export const RESOURCE_BLEED_ALT = components['resource.bleedAlt'];

export const RESOURCE_PROSE_CLASS = components['resource.prose'];

export type ResourceBleedTone = 'main' | 'alt';

export function resourceBleedClass(
	tone: ResourceBleedTone = 'main',
	override?: string,
): string | undefined {
	if (override !== undefined) return override;
	return tone === 'alt' ? RESOURCE_BLEED_ALT : RESOURCE_BLEED_MAIN;
}
