import brandTable from '@/data/settings/brand.json';
import chromeTable from '@/data/settings/chrome.json';
import leadContextTable from '@/data/settings/context.json';
import uiCopyTable from '@/data/settings/copy.json';
import embedTable from '@/data/settings/embed.json';
import footerTable from '@/data/settings/footer.json';
import navTable from '@/data/settings/nav.json';
import pathsTable from '@/data/settings/paths.json';
import vehiclesTable from '@/data/settings/vehicles.json';
import { numericKeyRecord, table } from '../parse';
import type { FaqIntroCtaItem, ResourceNavItem, StickyCtaItem } from '../types';

export const BRAND = table(brandTable.BRAND);
export const BRAND_COLORS = table(brandTable.BRAND_COLORS);
export const BRAND_LOGO = table(brandTable.BRAND_LOGO);
export const LAYOUT_CHROME = table(brandTable.LAYOUT_CHROME);
export const TOOL_HEADER_TITLES = table(brandTable.TOOL_HEADER_TITLES);
export const OFFICES = table(brandTable.OFFICES);
export const CASE_REVIEW_URL = table(brandTable.CASE_REVIEW_URL);
export const CASE_REVIEW_EMBED = table(embedTable.CASE_REVIEW_EMBED);
export const EMBED_QUERY_ITEMS = table(chromeTable.EMBED_QUERY_ITEMS);
export const FAQ_INTRO_CTA_ITEMS = table(
	chromeTable.FAQ_INTRO_CTA_ITEMS,
) as readonly FaqIntroCtaItem[];
export const GUIDEBOOK_CTA = table(chromeTable.GUIDEBOOK_CTA);
export const LEARN_HUB_CTA = table(chromeTable.LEARN_HUB_CTA);
export const PRIMARY_ELIGIBILITY_CTA = table(chromeTable.PRIMARY_ELIGIBILITY_CTA);
export const REVEAL_DELAY_CLASS = numericKeyRecord(
	chromeTable.REVEAL_DELAY_CLASS as Record<string, string>,
);
export const SECONDARY_CASE_REVIEW_CTA = table(chromeTable.SECONDARY_CASE_REVIEW_CTA);
export const STICKY_CTA_ITEMS = table(chromeTable.STICKY_CTA_ITEMS) as readonly StickyCtaItem[];

export const FOOTER_LINK_ITEMS = table(footerTable.FOOTER_LINK_ITEMS);

export const MANUFACTURERS_HUB_PATH = table(pathsTable.MANUFACTURERS_HUB_PATH);
export const REVIEWS_HUB_PATH = table(pathsTable.REVIEWS_HUB_PATH);
export const CASE_STUDIES_HUB_PATH = table(pathsTable.CASE_STUDIES_HUB_PATH);
export const FAQ_HUB_PATH = table(pathsTable.FAQ_HUB_PATH);
export const GUIDEBOOK_HUB_PATH = table(pathsTable.GUIDEBOOK_HUB_PATH);
export const LEARN_HUB_PATH = table(pathsTable.LEARN_HUB_PATH);
export const THE_FIRM_PATH = table(pathsTable.THE_FIRM_PATH);
export const TEAM_PATH = table(pathsTable.TEAM_PATH);
export const BLOG_HUB_PATH = table(pathsTable.BLOG_HUB_PATH);
export const LOCATIONS_HUB_PATH = table(pathsTable.LOCATIONS_HUB_PATH);
export const INFO_HUB_PATH = table(pathsTable.INFO_HUB_PATH);

export const RESOURCE_HUB_PATH_PREFIXES = [
	MANUFACTURERS_HUB_PATH,
	REVIEWS_HUB_PATH,
	CASE_STUDIES_HUB_PATH,
	FAQ_HUB_PATH,
	GUIDEBOOK_HUB_PATH,
	LEARN_HUB_PATH,
	THE_FIRM_PATH,
	TEAM_PATH,
	BLOG_HUB_PATH,
	LOCATIONS_HUB_PATH,
	INFO_HUB_PATH,
].map((path) => path.replace(/^\//, '')) as readonly string[];

export const LEARN_HEADER_NAV = table(navTable.LEARN_HEADER_NAV);
export const THE_FIRM_HEADER_NAV = table(navTable.THE_FIRM_HEADER_NAV);
export const TEAM_HEADER_NAV = table(navTable.TEAM_HEADER_NAV);

export const RESOURCE_HEADER_NAV_ITEMS = table(
	navTable.RESOURCE_HEADER_NAV_ITEMS,
) as readonly ResourceNavItem[];
export const RESOURCE_FOOTER_NAV_ITEMS = table(
	navTable.RESOURCE_FOOTER_NAV_ITEMS,
) as readonly ResourceNavItem[];

export const LEAD_CAPTURE_CONTEXT_BY_ID = table(leadContextTable.LEAD_CAPTURE_CONTEXT_BY_ID);

export const UI_COPY = table(uiCopyTable);

export const VEHICLE_TYPES = table(vehiclesTable.VEHICLE_TYPES);

export const ELFSIGHT_LEARN_FEED = table(embedTable.ELFSIGHT_LEARN_FEED);
export const LEARN_FEED_PLACEHOLDER = table(embedTable.LEARN_FEED_PLACEHOLDER);
