export function table<T>(data: T): T {
	return data;
}

export function numericKeyRecord(record: Record<string, string>): Record<number, string> {
	return Object.fromEntries(Object.entries(record).map(([k, v]) => [Number(k), v])) as Record<
		number,
		string
	>;
}
