/**
 * Portable `{{token}}` interpolation for JSON-driven copy (no project strings in code).
 */
export type SiteTemplateTokens = Record<string, string>;

export function interpolateSiteTemplate(
	template: string,
	tokens: SiteTemplateTokens,
	extra?: Record<string, string>,
): string {
	let out = template;
	for (const [key, value] of Object.entries(tokens)) {
		out = out.replaceAll(`{{${key}}}`, value);
	}
	if (extra) {
		for (const [key, value] of Object.entries(extra)) {
			out = out.replaceAll(`{${key}}`, value);
		}
	}
	return out;
}

export function interpolateSiteTemplateDeep<T>(value: T, tokens: SiteTemplateTokens): T {
	if (typeof value === 'string') {
		return interpolateSiteTemplate(value, tokens) as T;
	}
	if (Array.isArray(value)) {
		return value.map((item) => interpolateSiteTemplateDeep(item, tokens)) as T;
	}
	if (value && typeof value === 'object') {
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(value)) {
			out[k] = interpolateSiteTemplateDeep(v, tokens);
		}
		return out as T;
	}
	return value;
}
