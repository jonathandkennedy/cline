/**
 * Imported WordPress copy sometimes stores section titles as short
 * paragraphs instead of h2/h3. Promote those at render time so blog
 * and location pages get real heading styles.
 */
export function editorialParagraphLooksLikeHeading(text: string): boolean {
	const trimmed = text.trim();
	if (trimmed.length < 12 || trimmed.length > 92) return false;
	if (/[\[*_`]|https?:\/\//.test(trimmed)) return false;
	if (/[,:;]$/.test(trimmed)) return false;
	if (/[.!]$/.test(trimmed)) return false;
	if (/\n/.test(trimmed)) return false;
	const words = trimmed.replace(/[?]/g, '').split(/\s+/).filter(Boolean);
	if (words.length < 2 || words.length > 14) return false;
	if (!/^[A-Z0-9]/.test(trimmed)) return false;
	const significant = words.filter((word) => word.replace(/[^A-Za-z]/g, '').length > 3);
	if (significant.length >= 2) {
		const capitalized = significant.filter((word) => /^[A-Z]/.test(word));
		if (capitalized.length / significant.length < 0.5) return false;
	}
	return true;
}
