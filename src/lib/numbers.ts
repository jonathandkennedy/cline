export function formatNumber(n: number, decimals = 0): string {
	return n.toLocaleString('en-US', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});
}

const usdFormatterCache = new Map<string, Intl.NumberFormat>();

function getUsdFormatter(decimals: number): Intl.NumberFormat {
	const key = String(decimals);
	let formatter = usdFormatterCache.get(key);
	if (!formatter) {
		formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		});
		usdFormatterCache.set(key, formatter);
	}
	return formatter;
}

export function formatUsd(n: number, decimals = 0): string {
	return getUsdFormatter(decimals).format(n);
}
