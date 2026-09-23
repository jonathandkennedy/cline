export { maskEmail, maskUsPhone } from '@/kit/forms';

export function locationTitleParts(title: string): {
	lead: string;
	accent: string;
} {
	const match = title.match(/^(.*?)(\s+Lemon Law.*)$/i);
	if (!match?.[1] || !match[2]) {
		return { lead: title, accent: '' };
	}
	return { lead: `${match[1].trim()} `, accent: match[2].trim() };
}
