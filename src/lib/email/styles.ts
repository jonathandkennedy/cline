/** Shared inline-safe email styles (navy + gold brand palette). */
export const EMAIL_BRAND = {
	navy: '#010F27',
	navyPanel: '#0a1830',
	gold: '#BC8F0D',
	goldSoft: '#c9a227',
	text: '#e8edf5',
	muted: '#8b9bb8',
	recovery: '#48bb78',
	line: 'rgba(255,255,255,0.12)',
} as const;

export function emailShellStyles(): string {
	return `
body{margin:0;padding:0;background:${EMAIL_BRAND.navy};font-family:Georgia,"Times New Roman",serif;color:${EMAIL_BRAND.text};-webkit-font-smoothing:antialiased;}
a{color:${EMAIL_BRAND.goldSoft};text-decoration:none;}
`.trim();
}
