import { components } from '@/kit/theme/interface/components';

type ResourceLayoutTokens = {
	bandPy: string;
	bandPyCompact: string;
	bandPyMatch: string;
	heroInset: string;
	heroInsetCompact: string;
	heroBannerTop: string;
	heroCopyShell: string;
	heroCopyShellPhoto: string;
	heroCopyShellWide: string;
	crumbPy: string;
	heroDetailCrumbDivider: string;
	heroDetailCrumbDividerGapDefault: string;
	heroDetailCrumbDividerGapCompact: string;
	heroCopyTopDefault: string;
	heroCopyBodyTopDefault: string;
	heroCopyBodyTopCompact: string;
	heroHubCrumbWrap: string;
	cardPad: string;
};

type TrailTokens = {
	crumbPy: string;
	list: string;
	item: string;
	separator: string;
	current: string;
	link: string;
};

export const resourceLayoutTokens: ResourceLayoutTokens = {
	bandPy: components['resource.bandPy'],
	bandPyCompact: components['resource.bandPyCompact'],
	bandPyMatch: components['resource.bandPyMatch'],
	heroInset: components['resource.heroInset'],
	heroInsetCompact: components['resource.heroInsetCompact'],
	heroBannerTop: components['resource.heroBannerTop'],
	heroCopyShell: components['resource.heroCopyShell'],
	heroCopyShellPhoto: components['resource.heroCopyShellPhoto'],
	heroCopyShellWide: components['resource.heroCopyShellWide'],
	crumbPy: components['resource.crumbPy'],
	heroDetailCrumbDivider: components['resource.heroDetailCrumbDivider'],
	heroDetailCrumbDividerGapDefault: components['resource.heroDetailCrumbDividerGapDefault'],
	heroDetailCrumbDividerGapCompact: components['resource.heroDetailCrumbDividerGapCompact'],
	heroCopyTopDefault: components['resource.heroCopyTopDefault'],
	heroCopyBodyTopDefault: components['resource.heroCopyBodyTopDefault'],
	heroCopyBodyTopCompact: components['resource.heroCopyBodyTopCompact'],
	heroHubCrumbWrap: components['resource.heroHubCrumbWrap'],
	cardPad: components['resource.cardPad'],
};

export const trailTokens: TrailTokens = {
	crumbPy: components['trail.crumbPy'],
	list: components['trail.list'],
	item: components['trail.item'],
	separator: components['trail.separator'],
	current: components['trail.current'],
	link: components['trail.link'],
};
