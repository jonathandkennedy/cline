import homePageTable from '@/data/pages/home.json';
import learnPageTable from '@/data/pages/learn.json';
import hubHeroesTable from '@/data/pages/heroes.json';
import firmPageTable from '@/data/pages/firm.json';
import { table } from '../parse';
import type { HomeClaimPathContent, HomeStat, SiteFunnelJourneyContent } from '../types';

export const VALUE_PROPS = table(homePageTable.VALUE_PROPS) as readonly {
	icon: 'shield-check' | 'banknote' | 'scale';
	title: string;
	body: string;
}[];
export const HERO_TRUST_ITEMS = table(homePageTable.HERO_TRUST_ITEMS);
export const HOME_STATS = table(homePageTable.HOME_STATS) as readonly HomeStat[];
export const PROCESS_STEPS = table(homePageTable.PROCESS_STEPS);
export const QUALIFY_ITEMS = table(homePageTable.QUALIFY_ITEMS);
export const FINAL_CTA_TRUST = table(homePageTable.FINAL_CTA_TRUST) as readonly {
	icon: 'map-pin' | 'shield-check';
	text: string;
}[];
export const FOUNDER_STATS = table(homePageTable.FOUNDER_STATS);
export const HOME_SOCIAL_PROOF = table(homePageTable.HOME_SOCIAL_PROOF);
export const EXAMPLE_RECOVERY = table(homePageTable.EXAMPLE_RECOVERY);
export const CHECKLIST = table(homePageTable.CHECKLIST);
export const TRUST_STATS = table(homePageTable.TRUST_STATS);
export const HOME_PREVIEW_LIMITS = table(homePageTable.HOME_PREVIEW_LIMITS);
export const HOME_RESOURCE_CTAS = table(homePageTable.HOME_RESOURCE_CTAS);
export const HOME_CLAIM_PATH = table(homePageTable.HOME_CLAIM_PATH) as HomeClaimPathContent;
export const HOME_SECTIONS = table(homePageTable.HOME_SECTIONS);
export const HOME_SEO = table(hubHeroesTable.HOME_SEO);
export const LEARN_INTRO_VIDEO = table(learnPageTable.INTRO_VIDEO);

export const FAQ_HUB_HERO = table(hubHeroesTable.FAQ_HUB_HERO);
export const FAQ_HUB_SEO = table(hubHeroesTable.FAQ_HUB_SEO);
export const REVIEWS_HUB_HERO = table(hubHeroesTable.REVIEWS_HUB_HERO);
export const REVIEWS_HUB_SEO = table(hubHeroesTable.REVIEWS_HUB_SEO);
export const REVIEW_REPRESENTATIVE_DISCLAIMER = table(
	hubHeroesTable.REVIEW_REPRESENTATIVE_DISCLAIMER,
);
export const CASE_STUDIES_HUB_HERO = table(hubHeroesTable.CASE_STUDIES_HUB_HERO);
export const CASE_STUDIES_HUB_SEO = table(hubHeroesTable.CASE_STUDIES_HUB_SEO);
export const CASE_STUDIES_HUB_GRID = table(hubHeroesTable.CASE_STUDIES_HUB_GRID);
export const CASE_STUDY_REPRESENTATIVE_DISCLAIMER = table(
	hubHeroesTable.CASE_STUDY_REPRESENTATIVE_DISCLAIMER,
);
export const GUIDEBOOK_HUB_HERO = table(hubHeroesTable.GUIDEBOOK_HUB_HERO);
export const GUIDEBOOK_HUB_SEO = table(hubHeroesTable.GUIDEBOOK_HUB_SEO);
export const GUIDEBOOK_HUB_CHAPTERS = table(hubHeroesTable.GUIDEBOOK_HUB_CHAPTERS);
export const GUIDEBOOK_HUB_GLANCE = table(hubHeroesTable.GUIDEBOOK_HUB_GLANCE);
export const GUIDEBOOK_CHAPTER_NAV = table(hubHeroesTable.GUIDEBOOK_CHAPTER_NAV);
export const MANUFACTURERS_HUB_HERO = table(hubHeroesTable.MANUFACTURERS_HUB_HERO);
export const MANUFACTURERS_HUB_CARD_CTA = table(hubHeroesTable.MANUFACTURERS_HUB_CARD_CTA);
export const REVIEWS_HUB_EXPLORE = table(hubHeroesTable.REVIEWS_HUB_EXPLORE);
export const MANUFACTURERS_HUB_SEO = table(hubHeroesTable.MANUFACTURERS_HUB_SEO);
export const MANUFACTURER_DETAIL_RIGHTS_EYEBROW = table(
	hubHeroesTable.MANUFACTURER_DETAIL_RIGHTS_EYEBROW,
);
export const MANUFACTURER_DETAIL_RIGHTS_TITLE = table(
	hubHeroesTable.MANUFACTURER_DETAIL_RIGHTS_TITLE,
);
export const MANUFACTURER_DETAIL_RIGHTS_BODY = table(
	hubHeroesTable.MANUFACTURER_DETAIL_RIGHTS_BODY,
);
export const MANUFACTURER_COMMON_ISSUES_EYEBROW = table(
	hubHeroesTable.MANUFACTURER_COMMON_ISSUES_EYEBROW,
);
export const MANUFACTURER_HOW_WE_HANDLE_EYEBROW = table(
	hubHeroesTable.MANUFACTURER_HOW_WE_HANDLE_EYEBROW,
);
export const MANUFACTURER_RELATED_CONTENT_EYEBROW = table(
	hubHeroesTable.MANUFACTURER_RELATED_CONTENT_EYEBROW,
);
export const MANUFACTURER_RELATED_CARD_KIND_LABEL = table(
	hubHeroesTable.MANUFACTURER_RELATED_CARD_KIND_LABEL,
);
export const FAQ_DETAIL_HERO_EYEBROW = table(hubHeroesTable.FAQ_DETAIL_HERO_EYEBROW);
export const REVIEW_DETAIL_HERO_EYEBROW = table(hubHeroesTable.REVIEW_DETAIL_HERO_EYEBROW);
export const REVIEW_DETAIL_SECTIONS = table(hubHeroesTable.REVIEW_DETAIL_SECTIONS);
export const FAQ_DETAIL_SECTIONS = table(hubHeroesTable.FAQ_DETAIL_SECTIONS);
export const CASE_STUDY_DETAIL_SECTIONS = table(hubHeroesTable.CASE_STUDY_DETAIL_SECTIONS);
export const RESOURCE_TOOLS_STRIP = table(hubHeroesTable.RESOURCE_TOOLS_STRIP);
export const RESOURCE_MEGA = table(hubHeroesTable.RESOURCE_MEGA);
export const BLOG_HUB_HERO = table(hubHeroesTable.BLOG_HUB_HERO);
export const BLOG_HUB_SEO = table(hubHeroesTable.BLOG_HUB_SEO);
export const BLOG_HUB_GRID = table(hubHeroesTable.BLOG_HUB_GRID);
export const LOCATIONS_HUB_HERO = table(hubHeroesTable.LOCATIONS_HUB_HERO);
export const LOCATIONS_HUB_SEO = table(hubHeroesTable.LOCATIONS_HUB_SEO);
export const LOCATIONS_HUB_GRID = table(hubHeroesTable.LOCATIONS_HUB_GRID) as {
	countLabel: string;
	ctaLabel: string;
	align?: 'center';
};
export const INFO_HUB_HERO = table(hubHeroesTable.INFO_HUB_HERO);
export const INFO_HUB_SEO = table(hubHeroesTable.INFO_HUB_SEO);
export const INFO_HUB_GRID = table(hubHeroesTable.INFO_HUB_GRID);
export const EDITORIAL_DETAIL_SECTIONS = table(hubHeroesTable.EDITORIAL_DETAIL_SECTIONS);
export const LEARN_HUB_HERO = table(hubHeroesTable.LEARN_HUB_HERO);
export const LEARN_HUB_SEO = table(hubHeroesTable.LEARN_HUB_SEO);
export const THE_FIRM_HERO = table(hubHeroesTable.THE_FIRM_HERO);
export const THE_FIRM_SEO = table(hubHeroesTable.THE_FIRM_SEO);
export const TEAM_HERO = table(hubHeroesTable.TEAM_HERO);
export const TEAM_SEO = table(hubHeroesTable.TEAM_SEO);
export const THE_FIRM_SECTIONS = table(firmPageTable.THE_FIRM_SECTIONS);
export const HUB_PATHWAYS = table(hubHeroesTable.HUB_PATHWAYS);
export const HUB_FUNNEL = table(hubHeroesTable.HUB_FUNNEL);
export const FUNNEL_CTA_BACKGROUNDS = table(hubHeroesTable.FUNNEL_CTA_BACKGROUNDS) as Record<
	string,
	{ src: string; alt: string }
>;
export const SITE_FUNNEL_JOURNEY = table(
	hubHeroesTable.SITE_FUNNEL_JOURNEY,
) as SiteFunnelJourneyContent;
export const HUB_PATHWAYS_VARIANTS = table(hubHeroesTable.HUB_PATHWAYS_VARIANTS);
