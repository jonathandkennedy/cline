import type { ComponentType, ReactNode, RefObject } from 'react';

import type { HeaderPhoneChrome } from './phone';

export type HeaderLogoMode = 'home' | 'tool';

export type SiteLogoChrome = {
	ariaLabel: string;
	homeHref: string;
	mark: ReactNode;
	textItems: readonly { key: 'title' | 'subtitle'; className: string }[];
	textLineClassName: (key: 'title' | 'subtitle', mode: HeaderLogoMode, baseClass: string) => string;
	textColumnByMode: Record<HeaderLogoMode, string>;
	rootByMode: Record<HeaderLogoMode, string>;
	innerByMode: Record<HeaderLogoMode, string>;
	defaultChrome: { title: string; subtitle: string };
};

export type SiteNavLink = {
	href: string;
	label: string;
};

export type SiteMobileToolItem = {
	slug: string;
	label: string;
	icon: ReactNode;
};

export type SiteMobileResourceItem = {
	id: string;
	href: string;
	label: string;
};

export type SiteNavChrome = {
	learnNav: SiteNavLink;
	firmNav: SiteNavLink;
	teamNav: SiteNavLink;
	learnHubPath: string;
	firmPath: string;
	teamPath: string;
	resourceHubPathPrefixes: readonly string[];
	mobile: {
		tools: readonly SiteMobileToolItem[];
		resources: readonly SiteMobileResourceItem[];
	};
};

export type CaseReviewCtaProps = {
	leadContextId: string;
	className?: string;
	children?: ReactNode;
	onActivate?: () => void;
};

export type CaseReviewCtaComponent = ComponentType<CaseReviewCtaProps>;

export type MegaMenusSlotProps = {
	megaFlyoutRef: RefObject<HTMLDivElement | null>;
	megaOpen: boolean;
	activeMega: 'tools' | 'resources' | null;
	onMouseEnter: () => void;
	closeToolsOnNavigate: () => void;
};

export type SiteHeaderChromeProps = HeaderPhoneChrome & {
	logoChrome: SiteLogoChrome;
	navChrome: SiteNavChrome;
	caseReviewCta: CaseReviewCtaComponent;
	renderMenus: (props: MegaMenusSlotProps) => ReactNode;
};

export type HeaderChromeProps = HeaderPhoneChrome & {
	compact?: boolean;
	logoChrome: SiteLogoChrome;
	navChrome?: SiteNavChrome;
	caseReviewCta?: CaseReviewCtaComponent;
	renderMenus?: (props: MegaMenusSlotProps) => ReactNode;
};
