/** Keep only decimal digits so phone fields cannot accept letters or symbols. */
export function digitsOnlyPhone(value: string): string {
	return value.replace(/\D/g, '');
}

/** True when insert data is digits-only (used to cancel letter keystrokes). */
export function isPhoneDigitInput(data: string | null | undefined): boolean {
	if (data == null || data.length === 0) return true;
	return /^\d+$/.test(data);
}
