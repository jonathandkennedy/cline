/** `@/kit/ui` — prose text helpers. */

export function proseParagraphsFromText(text: string): readonly string[] {
	const trimmed = text.trim();
	if (!trimmed) return [];
	return trimmed
		.split(/\n\n+/)
		.map((p) => p.trim())
		.filter(Boolean);
}
