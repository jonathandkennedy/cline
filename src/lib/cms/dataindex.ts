import homeLayout from '@/data/layouts/home.json';
import hubsLayout from '@/data/layouts/hubs.json';
import shellLayout from '@/data/layouts/shell.json';
import firmPage from '@/data/pages/firm.json';
import heroesPage from '@/data/pages/heroes.json';
import homePage from '@/data/pages/home.json';
import learnPage from '@/data/pages/learn.json';
import brandConfig from '@/data/settings/brand.json';
import buybackConfig from '@/data/settings/buyback.json';
import checklistConfig from '@/data/settings/checklist.json';
import chromeConfig from '@/data/settings/chrome.json';
import contextConfig from '@/data/settings/context.json';
import copyConfig from '@/data/settings/copy.json';
import eligibilityConfig from '@/data/settings/eligibility.json';
import embedConfig from '@/data/settings/embed.json';
import footerConfig from '@/data/settings/footer.json';
import navConfig from '@/data/settings/nav.json';
import pathsConfig from '@/data/settings/paths.json';
import wpRedirectsConfig from '@/data/settings/redirects.json';
import blogLegacyRedirectsConfig from '@/data/settings/legacy.json';
import vehiclesConfig from '@/data/settings/vehicles.json';
import widgetsConfig from '@/data/settings/widgets.json';
import appShellConfig from '@/data/settings/frame.json';
import faqsItems from '@/data/items/faqs.json';
import guidebookItems from '@/data/items/guidebook.json';
import manufacturersItems from '@/data/items/manufacturers.json';
import profilesItems from '@/data/items/profiles.json';
import resultsItems from '@/data/items/results.json';
import reviewsItems from '@/data/items/reviews.json';
import studiesItems from '@/data/items/studies.json';
import testimonialsItems from '@/data/items/testimonials.json';
import blogItems from '@/data/items/blog.json';
import locationsItems from '@/data/items/locations.json';
import editorialItems from '@/data/items/editorial.json';
import teamItems from '@/data/items/team.json';
import siteCatalog from '@/data/site/catalog.json';
import builderMeta from '@/data/site/builder.json';
import siteComponents from '@/data/site/components.json';
import type { SiteDataIndex } from '@/kit/catalog';

export type { SiteDataIndex };

export const SITE_DATA_INDEX: SiteDataIndex = {
	'layouts/home': homeLayout,
	'layouts/hubs': hubsLayout,
	'layouts/shell': shellLayout,
	'pages/home': homePage,
	'pages/learn': learnPage,
	'pages/heroes': heroesPage,
	'pages/firm': firmPage,
	'settings/brand': brandConfig,
	'settings/buyback': buybackConfig,
	'settings/checklist': checklistConfig,
	'settings/chrome': chromeConfig,
	'settings/context': contextConfig,
	'settings/copy': copyConfig,
	'settings/eligibility': eligibilityConfig,
	'settings/embed': embedConfig,
	'settings/footer': footerConfig,
	'settings/nav': navConfig,
	'settings/paths': pathsConfig,
	'settings/redirects': wpRedirectsConfig,
	'settings/legacy': blogLegacyRedirectsConfig,
	'settings/vehicles': vehiclesConfig,
	'settings/widgets': widgetsConfig,
	'settings/frame': appShellConfig,
	'items/faqs': faqsItems,
	'items/guidebook': guidebookItems,
	'items/manufacturers': manufacturersItems,
	'items/profiles': profilesItems,
	'items/results': resultsItems,
	'items/reviews': reviewsItems,
	'items/studies': studiesItems,
	'items/testimonials': testimonialsItems,
	'items/blog': blogItems,
	'items/locations': locationsItems,
	'items/editorial': editorialItems,
	'items/team': teamItems,
	'site/catalog': siteCatalog,
	'site/builder': builderMeta,
	'site/components': siteComponents,
};
