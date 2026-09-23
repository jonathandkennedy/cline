import { table } from '../parse';
import { resolveSiteDataRef } from '../refs';
import { hydrateToolShellChromeBlocks } from '../runtime';
import type {
	CaseStudiesHubBlockId,
	CaseStudyDetailPageNode,
	FaqDetailPageNode,
	FaqHubBlockId,
	FirmHubBlockId,
	GuidebookChapterPageNode,
	GuidebookHubBlockId,
	HomeFooterBlockId,
	HomePageNode,
	LearnHubBlockId,
	ManufacturerDetailPageNode,
	ManufacturersHubBlockId,
	EditorialHubBlockId,
	BlogDetailPageNode,
	LocationDetailPageNode,
	InfoDetailPageNode,
	ResourceHubPageNode,
	ReviewDetailPageNode,
	ReviewsHubBlockId,
	ToolShellChromeBlockId,
} from '../types';

export const HOME_PAGE_MAIN = table(
	resolveSiteDataRef<HomePageNode[]>('layouts/home.HOME_PAGE_MAIN'),
);
export const HOME_PAGE_FOOTER_BLOCKS = table(
	resolveSiteDataRef<readonly HomeFooterBlockId[]>('layouts/home.HOME_PAGE_FOOTER_BLOCKS'),
);

export const MANUFACTURERS_HUB_PAGE_MAIN = table(
	resolveSiteDataRef<ResourceHubPageNode<ManufacturersHubBlockId>[]>(
		'layouts/hubs.MANUFACTURERS_HUB_PAGE_MAIN',
	),
);
export const REVIEWS_HUB_PAGE_MAIN = table(
	resolveSiteDataRef<ResourceHubPageNode<ReviewsHubBlockId>[]>(
		'layouts/hubs.REVIEWS_HUB_PAGE_MAIN',
	),
);
export const CASE_STUDIES_HUB_PAGE_MAIN = table(
	resolveSiteDataRef<ResourceHubPageNode<CaseStudiesHubBlockId>[]>(
		'layouts/hubs.CASE_STUDIES_HUB_PAGE_MAIN',
	),
);
export const FAQ_HUB_PAGE_MAIN = table(
	resolveSiteDataRef<ResourceHubPageNode<FaqHubBlockId>[]>('layouts/hubs.FAQ_HUB_PAGE_MAIN'),
);
export const GUIDEBOOK_HUB_PAGE_MAIN = table(
	resolveSiteDataRef<ResourceHubPageNode<GuidebookHubBlockId>[]>(
		'layouts/hubs.GUIDEBOOK_HUB_PAGE_MAIN',
	),
);
export const LEARN_HUB_PAGE_MAIN = table(
	resolveSiteDataRef<ResourceHubPageNode<LearnHubBlockId>[]>('layouts/hubs.LEARN_HUB_PAGE_MAIN'),
);
export const THE_FIRM_PAGE_MAIN = table(
	resolveSiteDataRef<ResourceHubPageNode<FirmHubBlockId>[]>('layouts/hubs.THE_FIRM_PAGE_MAIN'),
);
export const REVIEW_DETAIL_PAGE_MAIN = table(
	resolveSiteDataRef<ReviewDetailPageNode[]>('layouts/hubs.REVIEW_DETAIL_PAGE_MAIN'),
);
export const CASE_STUDY_DETAIL_PAGE_MAIN = table(
	resolveSiteDataRef<CaseStudyDetailPageNode[]>('layouts/hubs.CASE_STUDY_DETAIL_PAGE_MAIN'),
);
export const FAQ_DETAIL_PAGE_MAIN = table(
	resolveSiteDataRef<FaqDetailPageNode[]>('layouts/hubs.FAQ_DETAIL_PAGE_MAIN'),
);
export const GUIDEBOOK_CHAPTER_PAGE_MAIN = table(
	resolveSiteDataRef<GuidebookChapterPageNode[]>('layouts/hubs.GUIDEBOOK_CHAPTER_PAGE_MAIN'),
);
export const MANUFACTURER_DETAIL_PAGE_MAIN = table(
	resolveSiteDataRef<ManufacturerDetailPageNode[]>('layouts/hubs.MANUFACTURER_DETAIL_PAGE_MAIN'),
);
export const BLOG_HUB_PAGE_MAIN = table(
	resolveSiteDataRef<ResourceHubPageNode<EditorialHubBlockId>[]>('layouts/hubs.BLOG_HUB_PAGE_MAIN'),
);
export const LOCATIONS_HUB_PAGE_MAIN = table(
	resolveSiteDataRef<ResourceHubPageNode<EditorialHubBlockId>[]>(
		'layouts/hubs.LOCATIONS_HUB_PAGE_MAIN',
	),
);
export const INFO_HUB_PAGE_MAIN = table(
	resolveSiteDataRef<ResourceHubPageNode<EditorialHubBlockId>[]>('layouts/hubs.INFO_HUB_PAGE_MAIN'),
);
export const BLOG_DETAIL_PAGE_MAIN = table(
	resolveSiteDataRef<BlogDetailPageNode[]>('layouts/hubs.BLOG_DETAIL_PAGE_MAIN'),
);
export const LOCATION_DETAIL_PAGE_MAIN = table(
	resolveSiteDataRef<LocationDetailPageNode[]>('layouts/hubs.LOCATION_DETAIL_PAGE_MAIN'),
);
export const INFO_DETAIL_PAGE_MAIN = table(
	resolveSiteDataRef<InfoDetailPageNode[]>('layouts/hubs.INFO_DETAIL_PAGE_MAIN'),
);

export const TOOL_SHELL_CHROME_BLOCKS = hydrateToolShellChromeBlocks(
	resolveSiteDataRef<readonly { id: ToolShellChromeBlockId; region: 'head' | 'tail' }[]>(
		'layouts/shell.TOOL_SHELL_CHROME_BLOCKS',
	),
);
