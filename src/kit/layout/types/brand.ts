export type LogoBrandVariant = 'light' | 'primary' | 'dark';

export type LogoBrandPaths = {
	light: string;
	lightTagline: string;
	primary: string;
	primaryTagline: string;
	dark: string;
	darkTagline: string;
};

export type LogoBrandConfig = {
	paths: LogoBrandPaths;
	aspectNoTagline: number;
	aspectWithTagline: number;
	markAlt: string;
	taglineAlt: string;
};

export type HeaderLogoMode = 'tool' | 'home';

export type HeaderLogoChromeTextKey = 'title' | 'subtitle';

export type HeaderLogoConfig = {
	ariaLabel: string;
	homeHref: string;
	defaultChrome: { title: string; subtitle: string };
	mark: { height: number; className: string };
	chromeTextItems: ReadonlyArray<{
		key: HeaderLogoChromeTextKey;
		className: string;
	}>;
	titleMaxWidthByMode: Record<HeaderLogoMode, string>;
	textColumnByMode: Record<HeaderLogoMode, string>;
	rootByMode: Record<HeaderLogoMode, string>;
	innerByMode: Record<HeaderLogoMode, string>;
};

export type HeaderLogoChrome = {
	logoBrand: LogoBrandConfig;
	headerLogo: HeaderLogoConfig;
};

export function logoBrandMarkSrc(
	brand: LogoBrandConfig,
	variant: LogoBrandVariant = 'light',
): string {
	return brand.paths[variant];
}

export function logoBrandFullSrc(
	brand: LogoBrandConfig,
	variant: LogoBrandVariant = 'light',
): string {
	const taglineKey = {
		light: 'lightTagline',
		primary: 'primaryTagline',
		dark: 'darkTagline',
	} as const satisfies Record<LogoBrandVariant, keyof LogoBrandPaths>;
	return brand.paths[taglineKey[variant]];
}

export function logoBrandMarkDimensions(
	brand: LogoBrandConfig,
	height: number,
): { width: number; height: number } {
	return {
		height,
		width: Math.round(height * brand.aspectNoTagline),
	};
}

export function logoBrandFullDimensions(
	brand: LogoBrandConfig,
	width: number,
): { width: number; height: number } {
	return {
		width,
		height: Math.round(width / brand.aspectWithTagline),
	};
}
