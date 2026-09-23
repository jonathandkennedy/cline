import type { SiteTreeNode } from '@/kit/catalog';

export type HomeBlockId =
	| 'hero'
	| 'socialProof'
	| 'stats'
	| 'tools'
	| 'process'
	| 'qualify'
	| 'testimonials'
	| 'founder'
	| 'faq'
	| 'guidebook'
	| 'manufacturers'
	| 'resources'
	| 'finalCta';

export type HomePageNode = SiteTreeNode<HomeBlockId>;

export type HomeFooterBlockId =
	| 'scrollMarker'
	| 'footer'
	| 'scrollFlag'
	| 'stickyCta'
	| 'backToTop';

export type ResourceHubPageNode<BlockId extends string> = SiteTreeNode<BlockId>;

export type ManufacturersHubBlockId = 'hero' | 'grid' | 'pathways' | 'funnel';

export type ReviewsHubBlockId = 'hero' | 'grid' | 'explore' | 'funnel';

export type CaseStudiesHubBlockId = 'hero' | 'grid' | 'pathways' | 'funnel';

export type FaqHubBlockId = 'hero' | 'categories' | 'pathways' | 'funnel';

export type GuidebookHubBlockId = 'hero' | 'chapters' | 'pathways' | 'funnel';

export type LearnHubBlockId = 'hero' | 'introVideo' | 'feed' | 'funnel';

export type EditorialHubBlockId = 'hero' | 'grid' | 'pathways' | 'funnel';

export type EditorialDetailBlockId = 'hero' | 'body' | 'pathways' | 'funnel';

export type BlogHubBlockId = EditorialHubBlockId;
export type LocationsHubBlockId = EditorialHubBlockId;
export type InfoHubBlockId = EditorialHubBlockId;
export type BlogDetailBlockId = EditorialDetailBlockId;
export type LocationDetailBlockId = EditorialDetailBlockId;
export type InfoDetailBlockId = EditorialDetailBlockId;
export type BlogDetailPageNode = SiteTreeNode<BlogDetailBlockId>;
export type LocationDetailPageNode = SiteTreeNode<LocationDetailBlockId>;
export type InfoDetailPageNode = SiteTreeNode<InfoDetailBlockId>;

export type FirmHubBlockId = 'hero' | 'mission' | 'pillars' | 'founder' | 'statewide' | 'funnel';

export type ToolShellChromeContext = {
	isEmbed: boolean;
	isStandalone: boolean;
	/** Tool welcome screen (not workbench) — drives scroll marker visibility. */
	welcome: boolean;
	hideHeader?: boolean;
	hideBg?: boolean;
	cardOnly?: boolean;
};

export type ToolShellChromeBlockId =
	| 'embedHeader'
	| 'scrollMarker'
	| 'footer'
	| 'scrollFlag'
	| 'backToTop';

export type ReviewDetailBlockId =
	| 'hero'
	| 'story'
	| 'relatedQuestions'
	| 'funnel'
	| 'keepExploring';

export type ReviewDetailPageNode = SiteTreeNode<ReviewDetailBlockId>;

export type FaqDetailBlockId = 'hero' | 'answer' | 'relatedQuestions' | 'statuteLinks' | 'funnel';

export type FaqDetailPageNode = SiteTreeNode<FaqDetailBlockId>;

export type CaseStudyDetailBlockId =
	| 'hero'
	| 'narrative'
	| 'relatedQuestions'
	| 'funnel'
	| 'relatedContent';

export type CaseStudyDetailPageNode = SiteTreeNode<CaseStudyDetailBlockId>;

export type GuidebookChapterBlockId = 'hero' | 'sections' | 'chapterNav' | 'funnel';

export type GuidebookChapterPageNode = SiteTreeNode<GuidebookChapterBlockId>;

export type ManufacturerDetailBlockId =
	| 'hero'
	| 'commonIssues'
	| 'howWeHandle'
	| 'rights'
	| 'relatedQuestions'
	| 'funnel'
	| 'relatedContent';

export type ManufacturerDetailPageNode = SiteTreeNode<ManufacturerDetailBlockId>;

export type HubPathwaysVariantId =
	| 'default'
	| 'manufacturers-hub'
	| 'reviews-hub'
	| 'case-studies-hub'
	| 'faq-hub'
	| 'guidebook-hub'
	| 'learn-hub'
	| 'manufacturer-detail'
	| 'review-detail'
	| 'case-study-detail'
	| 'faq-detail'
	| 'guidebook-chapter'
	| 'blog-hub'
	| 'blog-detail'
	| 'locations-hub'
	| 'location-detail'
	| 'info-hub'
	| 'info-detail';

export type FunnelJourneyStepId = 'learn' | 'research' | 'proof' | 'check' | 'counsel';

export interface SiteFunnelJourneyStep {
	id: FunnelJourneyStepId;
	label: string;
	hint: string;
	href: string;
	icon: string;
}

export interface SiteFunnelJourneyContent {
	eyebrow: string;
	title: string;
	ariaLabel: string;
	steps: readonly SiteFunnelJourneyStep[];
}

export interface HomeClaimPathTile {
	id: string;
	title: string;
	body: string;
	href: string;
	cta: string;
	icon: string;
	image?: string;
	featured?: boolean;
}

export interface HomeClaimPathContent {
	eyebrow: string;
	headline: string;
	body: string;
	tiles: readonly HomeClaimPathTile[];
}

export interface ResourceHubExploreContent {
	eyebrow: string;
	title: string;
	body: string;
	href: string;
	ctaLabel: string;
	secondaryHref?: string;
	secondaryLabel?: string;
}

export interface ResourceHubPathwayRow {
	id: string;
	title: string;
	body: string;
	href: string;
	cta: string;
}

export interface ResourceHubPathwaysContent {
	eyebrow: string;
	title: string;
	body: string;
	rows: readonly ResourceHubPathwayRow[];
}

export interface ResourceHubFunnelContent {
	eyebrow: string;
	title: string;
	body: string;
	/** Lead-in before the phone link in hub final CTAs. */
	phoneLead: string;
	trust: readonly string[];
}

export interface ResourceHubHeroContent {
	eyebrow: string;
	headline: string;
	subhead: string;
	heroImage: string;
	heroImageAlt: string;
}

export type HomeStatKind = 'static' | 'count';

export interface HomeStat {
	kind: HomeStatKind;
	label: string;
	href: string;
	staticValue?: string;
	countTo?: number;
	countDecimals?: number;
	countSuffix?: string;
	withStar?: boolean;
}
