import {
	BRAND,
	SITE_URL,
	breadcrumbListJsonLd,
	buildCaseStudiesHubBreadcrumbs,
	buildCaseStudyDetailBreadcrumbs,
	buildFaqHubBreadcrumbs,
	buildGuidebookHubBreadcrumbs,
	buildLearnHubBreadcrumbs,
	buildBlogHubBreadcrumbs,
	buildBlogDetailBreadcrumbs,
	buildLocationsHubBreadcrumbs,
	buildLocationDetailBreadcrumbs,
	buildInfoHubBreadcrumbs,
	buildInfoDetailBreadcrumbs,
	buildManufacturerDetailBreadcrumbs,
	buildManufacturersHubBreadcrumbs,
	buildReviewDetailBreadcrumbs,
	buildReviewsHubBreadcrumbs,
	CASE_STUDIES_HUB_PATH,
	CASE_STUDIES_HUB_SEO,
	CASE_STUDY_DETAILS,
	caseStudyDetailPath,
	FAQ_HUB_PATH,
	FAQ_HUB_SEO,
	GUIDEBOOK_CHAPTERS,
	GUIDEBOOK_HUB_PATH,
	GUIDEBOOK_HUB_SEO,
	LEARN_HUB_PATH,
	LEARN_HUB_SEO,
	BLOG_HUB_PATH,
	BLOG_HUB_SEO,
	BLOG_POSTS,
	blogDetailPath,
	LOCATIONS_HUB_PATH,
	LOCATIONS_HUB_SEO,
	LOCATION_PAGES,
	locationDetailPath,
	INFO_HUB_PATH,
	INFO_HUB_SEO,
	EDITORIAL_PAGES,
	infoDetailPath,
	getBlogBySlug,
	getLocationPageBySlug,
	getEditorialPageBySlug,
	getCaseStudyBySlug,
	getManufacturerPageBySlug,
	getReviewBySlug,
	getTool,
	guidebookChapterPath,
	homePageDescription,
	homePageTitle,
	MANUFACTURER_PAGE_DETAILS,
	MANUFACTURERS,
	MANUFACTURERS_HUB_PATH,
	MANUFACTURERS_HUB_SEO,
	manufacturerDetailPath,
	OFFICES,
	REVIEW_DETAILS,
	REVIEWS_HUB_SEO,
	reviewDetailPath,
	SITE_HOME_BREADCRUMB,
	type SiteBreadcrumbItem,
	webSiteLdName,
} from '@/lib/cms';
import { getSitePageDefinition } from '@/lib/cms/catalog';

const SCHEMA_CONTEXT = 'https://schema.org';
const ORGANIZATION_ID = `${BRAND.site}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_URL = `${SITE_URL}/images/logos/primary-600.png`;

const HOME_PAGE_TITLE = homePageTitle();
const HOME_PAGE_DESCRIPTION = homePageDescription();

function publisherRef() {
	return { '@id': ORGANIZATION_ID };
}

function webSiteRef() {
	return { '@id': WEBSITE_ID };
}

function telephoneSchemaValue() {
	return BRAND.phoneHref.replace(/^tel:/i, '');
}


function webPageNode(title: string, description: string, url: string) {
	return {
		'@type': 'WebPage' as const,
		'@id': url,
		name: title,
		description,
		url,
		isPartOf: webSiteRef(),
		publisher: publisherRef(),
		inLanguage: 'en-US',
	};
}

function absoluteBreadcrumbListLd(items: SiteBreadcrumbItem[]) {
	const base = SITE_URL;
	return {
		...breadcrumbListJsonLd(items),
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem' as const,
			position: index + 1,
			name: item.label,
			item: `${base}${item.href}`,
		})),
	};
}

function itemListLd(entries: readonly { name: string; url: string }[]) {
	return {
		'@type': 'ItemList' as const,
		itemListElement: entries.map((entry, index) => ({
			'@type': 'ListItem' as const,
			position: index + 1,
			name: entry.name,
			url: entry.url,
		})),
	};
}

function resourcePageGraph(
	breadcrumbs: SiteBreadcrumbItem[],
	title: string,
	description: string,
	path: string,
	extra: object[] = [],
) {
	const url = `${SITE_URL}${path}`;
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': [
			webPageNode(title, description, url),
			absoluteBreadcrumbListLd(breadcrumbs),
			...extra,
		],
	};
}

function collectionHubLd(
	breadcrumbs: SiteBreadcrumbItem[],
	title: string,
	description: string,
	path: string,
	listEntries: readonly { name: string; url: string }[],
) {
	const url = `${SITE_URL}${path}`;
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': [
			{
				'@type': 'CollectionPage' as const,
				'@id': url,
				name: title,
				description,
				url,
				isPartOf: webSiteRef(),
				publisher: publisherRef(),
				inLanguage: 'en-US',
				mainEntity: itemListLd(listEntries),
			},
			absoluteBreadcrumbListLd(breadcrumbs),
		],
	};
}

/** Public profiles for the firm (Google Business Profile, Yelp, Instagram). */
const SAME_AS = [
	'https://www.google.com/maps/place/Cline+APC+-+San+Diego+Lemon+Law+Attorney/@32.8472368,-117.2717058,17z/data=!4m6!3m5!1s0x80dc03fcec330fa9:0xea7719a1c043b1bd!8m2!3d32.8472368!4d-117.2717058!16s%2Fg%2F11bwn3gb9q',
	'https://www.yelp.com/biz/cline-apc-a-california-lemon-law-legal-group-la-jolla',
	'https://www.instagram.com/lemonlawlegalgroup/',
];

/** La Jolla office coordinates, from the firm's Google Business Profile. */
const MAIN_OFFICE_GEO = { latitude: 32.8472368, longitude: -117.2717058 };

function postalAddress(office: (typeof OFFICES)[number]) {
	const postalCode = office.region.match(/\b\d{5}\b/)?.[0];
	return {
		'@type': 'PostalAddress' as const,
		streetAddress: office.address,
		addressLocality: office.city,
		addressRegion: 'CA',
		...(postalCode ? { postalCode } : {}),
		addressCountry: 'US',
	};
}

export const AUTHOR_ID = `${SITE_URL}/team/brian-cline#person`;

/** Named attorney author for articles (the WordPress site attributed posts the same way). */
export function authorRef() {
	return {
		'@type': 'Person' as const,
		'@id': AUTHOR_ID,
		name: 'Brian K. Cline',
		url: `${SITE_URL}/team/brian-cline`,
	};
}

export function organizationLd() {
	const [mainOffice, ...otherOffices] = OFFICES;
	return {
		'@context': SCHEMA_CONTEXT,
		'@type': 'LegalService',
		'@id': ORGANIZATION_ID,
		name: BRAND.legalName,
		alternateName: BRAND.name,
		url: SITE_URL,
		logo: { '@type': 'ImageObject', url: LOGO_URL, width: 600, height: 201 },
		image: `${SITE_URL}/images/og/default.jpg`,
		telephone: telephoneSchemaValue(),
		email: BRAND.email,
		description:
			'California Lemon Law firm that pursues manufacturer buybacks and other consumer matters. Clients never pay attorney fees.',
		areaServed: { '@type': 'State', name: 'California' },
		founder: { '@type': 'Person', name: BRAND.founder },
		foundingDate: String(BRAND.firmEstablished),
		knowsAbout: [
			'California Lemon Law',
			'Song-Beverly Consumer Warranty Act',
			'Vehicle buyback',
			'Defective vehicles',
		],
		address: postalAddress(mainOffice),
		geo: { '@type': 'GeoCoordinates', ...MAIN_OFFICE_GEO },
		hasMap: SAME_AS[0],
		sameAs: SAME_AS,
		department: otherOffices.map((office) => ({
			'@type': 'LegalService',
			name: `${BRAND.name} · ${office.city} office`,
			telephone: telephoneSchemaValue(),
			address: postalAddress(office),
		})),
	};
}

export function webSiteLd() {
	return {
		'@context': SCHEMA_CONTEXT,
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		name: webSiteLdName(),
		url: SITE_URL,
		description: HOME_PAGE_DESCRIPTION,
		publisher: publisherRef(),
		inLanguage: 'en-US',
	};
}

export function homeLd() {
	const url = SITE_URL;
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': [
			webPageNode(HOME_PAGE_TITLE, HOME_PAGE_DESCRIPTION, url),
			absoluteBreadcrumbListLd([SITE_HOME_BREADCRUMB]),
		],
	};
}

export function toolLd(slug: string) {
	const tool = getTool(slug);
	if (!tool) return null;
	const url = `${SITE_URL}/tool/${tool.slug}`;
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': [
			{
				'@type': 'WebApplication',
				'@id': `${url}#app`,
				name: tool.seoTitle,
				url,
				applicationCategory: 'BusinessApplication',
				operatingSystem: 'Web',
				description: tool.seoDescription,
				isPartOf: webSiteRef(),
				offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
				provider: publisherRef(),
			},
			webPageNode(tool.seoTitle, tool.seoDescription, url),
			absoluteBreadcrumbListLd([
				SITE_HOME_BREADCRUMB,
				{ label: tool.title, href: `/tool/${tool.slug}` },
			]),
		],
	};
}

export function manufacturersHubLd() {
	const entries = MANUFACTURER_PAGE_DETAILS.map((detail) => ({
		name: detail.headline,
		url: `${SITE_URL}${manufacturerDetailPath(detail.slug)}`,
	}));
	return collectionHubLd(
		buildManufacturersHubBreadcrumbs(),
		MANUFACTURERS_HUB_SEO.seoTitle,
		MANUFACTURERS_HUB_SEO.seoDescription,
		MANUFACTURERS_HUB_PATH,
		entries,
	);
}

export function manufacturerDetailLd(slug: string) {
	const detail = getManufacturerPageBySlug(slug);
	if (!detail) return null;
	const manufacturer = MANUFACTURERS.find((m) => m.slug === slug);
	const path = manufacturerDetailPath(slug);
	const url = `${SITE_URL}${path}`;
	const webPage = {
		...webPageNode(detail.seoTitle, detail.seoDescription, url),
		...(manufacturer
			? {
					about: {
						'@type': 'Organization' as const,
						name: manufacturer.name,
						url,
					},
				}
			: {}),
	};
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': [webPage, absoluteBreadcrumbListLd(buildManufacturerDetailBreadcrumbs(slug))],
	};
}

export function reviewsHubLd() {
	const entries = REVIEW_DETAILS.map((review) => ({
		name: `${review.name} · ${review.vehicle}`,
		url: `${SITE_URL}${reviewDetailPath(review.slug)}`,
	}));
	return collectionHubLd(
		buildReviewsHubBreadcrumbs(),
		REVIEWS_HUB_SEO.seoTitle,
		REVIEWS_HUB_SEO.seoDescription,
		getSitePageDefinition('reviews-hub').route,
		entries,
	);
}

export function reviewDetailLd(slug: string) {
	const detail = getReviewBySlug(slug);
	if (!detail) return null;
	// Self-published Review markup is ignored by Google (and invites a manual action), so the
	// quote stays on the page as text only.
	return resourcePageGraph(
		buildReviewDetailBreadcrumbs(slug),
		detail.seoTitle,
		detail.seoDescription,
		reviewDetailPath(slug),
	);
}

export function caseStudiesHubLd() {
	const entries = CASE_STUDY_DETAILS.map((study) => ({
		name: study.headline,
		url: `${SITE_URL}${caseStudyDetailPath(study.slug)}`,
	}));
	return collectionHubLd(
		buildCaseStudiesHubBreadcrumbs(),
		CASE_STUDIES_HUB_SEO.seoTitle,
		CASE_STUDIES_HUB_SEO.seoDescription,
		CASE_STUDIES_HUB_PATH,
		entries,
	);
}

export function caseStudyDetailLd(slug: string) {
	const detail = getCaseStudyBySlug(slug);
	if (!detail) return null;
	const path = caseStudyDetailPath(slug);
	const url = `${SITE_URL}${path}`;
	return resourcePageGraph(
		buildCaseStudyDetailBreadcrumbs(slug),
		detail.seoTitle,
		detail.seoDescription,
		path,
		[
			{
				'@type': 'Article' as const,
				'@id': `${url}#article`,
				headline: detail.headline,
				description: detail.seoDescription,
				author: authorRef(),
				publisher: publisherRef(),
				about: {
					'@type': 'Product' as const,
					name: detail.vehicle,
				},
			},
		],
	);
}

export function faqHubLd() {
	const url = `${SITE_URL}${FAQ_HUB_PATH}`;
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': [
			webPageNode(FAQ_HUB_SEO.seoTitle, FAQ_HUB_SEO.seoDescription, url),
			absoluteBreadcrumbListLd(buildFaqHubBreadcrumbs()),
		],
	};
}

export function guidebookHubLd() {
	const entries = GUIDEBOOK_CHAPTERS.map((chapter) => ({
		name: chapter.title,
		url: `${SITE_URL}${guidebookChapterPath(chapter.slug)}`,
	}));
	return collectionHubLd(
		buildGuidebookHubBreadcrumbs(),
		GUIDEBOOK_HUB_SEO.seoTitle,
		GUIDEBOOK_HUB_SEO.seoDescription,
		GUIDEBOOK_HUB_PATH,
		entries,
	);
}

export function learnHubLd() {
	const url = `${SITE_URL}${LEARN_HUB_PATH}`;
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': [
			webPageNode(LEARN_HUB_SEO.seoTitle, LEARN_HUB_SEO.seoDescription, url),
			absoluteBreadcrumbListLd(buildLearnHubBreadcrumbs()),
		],
	};
}


export function blogHubLd() {
	const entries = BLOG_POSTS.map((post) => ({
		name: post.title,
		url: `${SITE_URL}${blogDetailPath(post.slug)}`,
	}));
	return collectionHubLd(
		buildBlogHubBreadcrumbs(),
		BLOG_HUB_SEO.seoTitle,
		BLOG_HUB_SEO.seoDescription,
		BLOG_HUB_PATH,
		entries,
	);
}

export function blogDetailLd(slug: string) {
	const post = getBlogBySlug(slug);
	if (!post) return null;
	const path = blogDetailPath(slug);
	const url = `${SITE_URL}${path}`;
	return resourcePageGraph(
		buildBlogDetailBreadcrumbs(slug),
		post.seoTitle,
		post.seoDescription,
		path,
		[
			{
				'@type': 'BlogPosting' as const,
				'@id': `${url}#article`,
				headline: post.title,
				description: post.description,
				datePublished: post.date,
				dateModified: post.modified,
				...(post.thumbnail
					? {
							image: {
								'@type': 'ImageObject' as const,
								url: `${SITE_URL}${post.thumbnail}`,
								width: 1200,
								height: 675,
							},
						}
					: {}),
				author: authorRef(),
				publisher: publisherRef(),
			},
		],
	);
}

export function locationsHubLd() {
	const entries = LOCATION_PAGES.map((page) => ({
		name: page.title,
		url: `${SITE_URL}${locationDetailPath(page.slug)}`,
	}));
	return collectionHubLd(
		buildLocationsHubBreadcrumbs(),
		LOCATIONS_HUB_SEO.seoTitle,
		LOCATIONS_HUB_SEO.seoDescription,
		LOCATIONS_HUB_PATH,
		entries,
	);
}

export function locationDetailLd(slug: string) {
	const page = getLocationPageBySlug(slug);
	if (!page) return null;
	const path = locationDetailPath(slug);
	const url = `${SITE_URL}${path}`;
	return resourcePageGraph(
		buildLocationDetailBreadcrumbs(slug),
		page.seoTitle,
		page.seoDescription,
		path,
		[
			{
				'@type': 'Article' as const,
				'@id': `${url}#article`,
				headline: page.title,
				description: page.description,
				author: authorRef(),
				publisher: publisherRef(),
			},
		],
	);
}

export function infoHubLd() {
	const entries = EDITORIAL_PAGES.map((page) => ({
		name: page.title,
		url: `${SITE_URL}${infoDetailPath(page.slug)}`,
	}));
	return collectionHubLd(
		buildInfoHubBreadcrumbs(),
		INFO_HUB_SEO.seoTitle,
		INFO_HUB_SEO.seoDescription,
		INFO_HUB_PATH,
		entries,
	);
}

export function infoDetailLd(slug: string) {
	const page = getEditorialPageBySlug(slug);
	if (!page) return null;
	const path = infoDetailPath(slug);
	const url = `${SITE_URL}${path}`;
	return resourcePageGraph(
		buildInfoDetailBreadcrumbs(slug),
		page.seoTitle,
		page.seoDescription,
		path,
		[
			{
				'@type': 'Article' as const,
				'@id': `${url}#article`,
				headline: page.title,
				description: page.description,
				author: authorRef(),
				publisher: publisherRef(),
			},
		],
	);
}

export function contactLd() {
	const url = `${SITE_URL}/contact`;
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': [
			{
				'@type': 'ContactPage' as const,
				'@id': url,
				name: 'Free California Lemon Law Case Review',
				url,
				isPartOf: webSiteRef(),
				about: publisherRef(),
				inLanguage: 'en-US',
			},
			absoluteBreadcrumbListLd([SITE_HOME_BREADCRUMB, { label: 'Contact', href: '/contact' }]),
		],
	};
}

export function publisherLdRef() {
	return publisherRef();
}

export function breadcrumbLd(items: SiteBreadcrumbItem[]) {
	return absoluteBreadcrumbListLd(items);
}
