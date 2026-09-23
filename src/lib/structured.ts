import {
	BRAND,
	SITE_URL,
	BRAND_LOGO,
	breadcrumbListJsonLd,
	buildCaseStudiesHubBreadcrumbs,
	buildCaseStudyDetailBreadcrumbs,
	buildFaqDetailBreadcrumbs,
	buildFaqHubBreadcrumbs,
	buildGuidebookChapterBreadcrumbs,
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
	FAQ_DETAILS,
	FAQ_HUB_PATH,
	FAQ_HUB_SEO,
	FAQS,
	faqDetailPath,
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
	getFaqBySlug,
	getGuidebookChapterBySlug,
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
const TOOLS_LOGO_URL = `${SITE_URL}${BRAND_LOGO.paths.primary}`;

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

function faqQuestionEntity(q: string, a: string) {
	return {
		'@type': 'Question' as const,
		name: q,
		acceptedAnswer: { '@type': 'Answer' as const, text: a },
	};
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

export function organizationLd() {
	return {
		'@context': SCHEMA_CONTEXT,
		'@type': 'LegalService',
		'@id': ORGANIZATION_ID,
		name: BRAND.legalName,
		alternateName: BRAND.name,
		url: BRAND.site,
		logo: TOOLS_LOGO_URL,
		image: TOOLS_LOGO_URL,
		telephone: telephoneSchemaValue(),
		description:
			'California Lemon Law firm that pursues manufacturer buybacks and other consumer matters. Clients never pay attorney fees.',
		areaServed: { '@type': 'State', name: 'California' },
		founder: { '@type': 'Person', name: BRAND.founder },
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: BRAND.rating,
			reviewCount: BRAND.reviewCount,
		},
		knowsAbout: [
			'California Lemon Law',
			'Song-Beverly Consumer Warranty Act',
			'Vehicle buyback',
			'Defective vehicles',
		],
		address: OFFICES.map((o) => ({
			'@type': 'PostalAddress',
			streetAddress: o.address,
			addressLocality: o.city,
			addressRegion: 'CA',
			addressCountry: 'US',
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
			{
				'@type': 'FAQPage',
				'@id': `${url}#faq`,
				isPartOf: webSiteRef(),
				mainEntity: FAQS.map((f) => faqQuestionEntity(f.q, f.a)),
			},
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
	const path = reviewDetailPath(slug);
	const url = `${SITE_URL}${path}`;
	return resourcePageGraph(
		buildReviewDetailBreadcrumbs(slug),
		detail.seoTitle,
		detail.seoDescription,
		path,
		[
			{
				'@type': 'Review' as const,
				'@id': `${url}#review`,
				itemReviewed: {
					'@type': 'Product' as const,
					name: detail.vehicle,
				},
				reviewBody: detail.fullStory,
				author: {
					'@type': 'Person' as const,
					name: detail.name,
				},
				publisher: publisherRef(),
			},
		],
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
	const articleBody = [
		detail.situation,
		detail.situationDetail,
		detail.defectSummary,
		detail.defectDetail,
		detail.legalPath,
		detail.legalDetail,
		detail.outcomeSummary,
		detail.outcomeDetail,
	]
		.filter(Boolean)
		.join('\n\n');
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
				articleBody,
				author: publisherRef(),
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
			{
				'@type': 'FAQPage',
				'@id': `${url}#faq`,
				isPartOf: webSiteRef(),
				mainEntity: FAQ_DETAILS.map((f) => faqQuestionEntity(f.q, f.a)),
			},
			absoluteBreadcrumbListLd(buildFaqHubBreadcrumbs()),
		],
	};
}

export function faqDetailLd(slug: string) {
	const detail = getFaqBySlug(slug);
	if (!detail) return null;
	const path = faqDetailPath(slug);
	const url = `${SITE_URL}${path}`;
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': [
			webPageNode(detail.seoTitle, detail.seoDescription, url),
			{
				'@type': 'FAQPage',
				'@id': `${url}#faq`,
				isPartOf: webSiteRef(),
				mainEntity: faqQuestionEntity(detail.q, detail.a),
			},
			absoluteBreadcrumbListLd(buildFaqDetailBreadcrumbs(slug)),
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

export function guidebookChapterLd(slug: string) {
	const detail = getGuidebookChapterBySlug(slug);
	if (!detail) return null;
	const path = guidebookChapterPath(slug);
	const url = `${SITE_URL}${path}`;
	const articleBody = detail.sections.flatMap((section) => [...section.paragraphs]).join('\n\n');
	return resourcePageGraph(
		buildGuidebookChapterBreadcrumbs(slug),
		detail.seoTitle,
		detail.seoDescription,
		path,
		[
			{
				'@type': 'Article' as const,
				'@id': `${url}#article`,
				headline: detail.title,
				description: detail.summary,
				articleBody,
				timeRequired: `PT${detail.estimatedReadMinutes}M`,
				author: publisherRef(),
				publisher: publisherRef(),
			},
		],
	);
}

function editorialArticleBody(blocks: readonly { type: string; text: string }[]) {
	return blocks.map((block) => block.text).join('\n\n');
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
				articleBody: editorialArticleBody(post.blocks),
				author: publisherRef(),
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
				articleBody: editorialArticleBody(page.blocks),
				author: publisherRef(),
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
				articleBody: editorialArticleBody(page.blocks),
				author: publisherRef(),
				publisher: publisherRef(),
			},
		],
	);
}
