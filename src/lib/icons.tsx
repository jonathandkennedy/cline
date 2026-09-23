import {
	Banknote,
	BookOpen,
	Calculator,
	Car,
	ClipboardCheck,
	ClipboardList,
	CircleDollarSign,
	FileText,
	type LucideIcon,
	MapPin,
	Scale,
	ShieldCheck,
} from 'lucide-react';

import type { FaqCategoryId } from '@/kit/layout/types/faq';

export const FAQ_CATEGORY_ICONS: Record<FaqCategoryId, LucideIcon> = {
	basics: BookOpen,
	coverage: Car,
	fees: CircleDollarSign,
	recovery: Scale,
	process: ClipboardList,
	documentation: FileText,
};

export const TOOL_ICONS = {
	calculator: Calculator,
	scale: Scale,
	clipboard: ClipboardCheck,
} as const;

export type ToolIconId = keyof typeof TOOL_ICONS;

export const VALUE_PROP_ICONS = {
	'shield-check': ShieldCheck,
	banknote: Banknote,
	scale: Scale,
} as const;

export const TRUST_ICONS: Record<'map-pin' | 'shield-check', LucideIcon> = {
	'map-pin': MapPin,
	'shield-check': ShieldCheck,
};

export function shortToolName(title: string): string {
	return title.replace('Lemon Law ', '').replace('Case ', '').replace(' Recovery', '');
}
