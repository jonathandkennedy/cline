'use client';

import type { SitePageId } from '@/lib/cms/catalog';
import { SiteCatalogPage } from '@/lib/site/catalog';

export function ManufacturersHubPage() {
	return <SiteCatalogPage pageId={'manufacturers-hub' satisfies SitePageId} />;
}

export function ReviewsHubPage() {
	return <SiteCatalogPage pageId={'reviews-hub' satisfies SitePageId} />;
}

export function CaseStudiesHubPage() {
	return <SiteCatalogPage pageId={'case-studies-hub' satisfies SitePageId} />;
}

export function FaqHubPage() {
	return <SiteCatalogPage pageId={'faq-hub' satisfies SitePageId} />;
}

export function GuidebookHubPage() {
	return <SiteCatalogPage pageId={'guidebook-hub' satisfies SitePageId} />;
}

export function LearnHubPage() {
	return <SiteCatalogPage pageId={'learn-hub' satisfies SitePageId} />;
}

export function TheFirmPage() {
	return <SiteCatalogPage pageId={'the-firm' satisfies SitePageId} />;
}

export function TeamPage() {
	return <SiteCatalogPage pageId={'team' satisfies SitePageId} />;
}

export function ReviewDetailPage() {
	return <SiteCatalogPage pageId={'review-detail' satisfies SitePageId} />;
}

export function CaseStudyDetailPage() {
	return <SiteCatalogPage pageId={'case-study-detail' satisfies SitePageId} />;
}

export function FaqDetailPage() {
	return <SiteCatalogPage pageId={'faq-detail' satisfies SitePageId} />;
}

export function GuidebookChapterPage() {
	return <SiteCatalogPage pageId={'guidebook-chapter' satisfies SitePageId} />;
}

export function ManufacturerDetailPage() {
	return <SiteCatalogPage pageId={'manufacturer-detail' satisfies SitePageId} />;
}

export function BlogHubPage() {
	return <SiteCatalogPage pageId={'blog-hub' satisfies SitePageId} />;
}

export function BlogDetailPage() {
	return <SiteCatalogPage pageId={'blog-detail' satisfies SitePageId} />;
}

export function LocationsHubPage() {
	return <SiteCatalogPage pageId={'locations-hub' satisfies SitePageId} />;
}

export function LocationDetailPage() {
	return <SiteCatalogPage pageId={'location-detail' satisfies SitePageId} />;
}

export function InfoHubPage() {
	return <SiteCatalogPage pageId={'info-hub' satisfies SitePageId} />;
}

export function InfoDetailPage() {
	return <SiteCatalogPage pageId={'info-detail' satisfies SitePageId} />;
}
