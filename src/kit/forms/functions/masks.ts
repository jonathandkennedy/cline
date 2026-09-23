/** US phone display mask for lead forms. Digits-only value stays ≤10. */
export function maskUsPhone(raw: string): string {
	const digits = raw.replace(/\D/g, '').slice(0, 10);
	if (digits.length === 0) return '';
	if (digits.length <= 3) return digits;
	if (digits.length <= 6) {
		return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
	}
	return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Lowercase and strip spaces so email entry stays easy to validate. */
export function maskEmail(raw: string): string {
	return raw.replace(/\s+/g, '').toLowerCase();
}
