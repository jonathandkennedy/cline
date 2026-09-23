import { APP_LIST } from '@/kit/pipeline';
import type { Tool } from './types';

export const TOOLS: Tool[] = APP_LIST.map(
	({
		slug,
		icon,
		eyebrow,
		title,
		short,
		description,
		subtitle,
		badge,
		cta,
		minutes,
		seoTitle,
		seoDescription,
		introBg,
	}) => ({
		slug,
		icon,
		eyebrow,
		title,
		short,
		description,
		subtitle,
		badge,
		cta,
		minutes,
		seoTitle,
		seoDescription,
		introBg,
	}),
);

export function getTool(slug: string): Tool | undefined {
	return TOOLS.find((t) => t.slug === slug);
}
