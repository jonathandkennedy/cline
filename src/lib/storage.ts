export function loadStore<T>(key: string): T | null {
	if (typeof window === 'undefined') return null;
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : null;
	} catch {
		return null;
	}
}

export function saveStore(key: string, value: unknown): void {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {
		/* ignore quota / private-mode errors */
	}
}

export function clearStore(key: string): void {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.removeItem(key);
	} catch {
		/* ignore */
	}
}

export function hasStore(key: string): boolean {
	if (typeof window === 'undefined') return false;
	try {
		return window.localStorage.getItem(key) != null;
	} catch {
		return false;
	}
}
