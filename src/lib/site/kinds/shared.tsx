'use client';

import type { ComponentProps } from 'react';

import type { SiteComponentKindMap } from '@/kit/catalog';
import { ResourceHubHero } from '@/kit/blocks/spotlight';

import {
	buildCaseStudiesHubBreadcrumbs,
	buildFaqHubBreadcrumbs,
	buildGuidebookHubBreadcrumbs,
	buildLearnHubBreadcrumbs,
	buildBlogHubBreadcrumbs,
	buildLocationsHubBreadcrumbs,
	buildInfoHubBreadcrumbs,
	buildManufacturersHubBreadcrumbs,
	buildReviewsHubBreadcrumbs,
	buildTheFirmBreadcrumbs,
	buildTeamBreadcrumbs,
	CASE_STUDIES_HUB_HERO,
	FAQ_HUB_HERO,
	GUIDEBOOK_HUB_HERO,
	LEARN_HUB_HERO,
	BLOG_HUB_HERO,
	LOCATIONS_HUB_HERO,
	INFO_HUB_HERO,
	MANUFACTURERS_HUB_HERO,
	REVIEWS_HUB_HERO,
	THE_FIRM_HERO,
	TEAM_HERO,
	type HubPathwaysVariantId,
	type LeadCaptureContextId,
	type SiteBreadcrumbItem,
} from '@/lib/site';
import { ResourceFinalCta } from '@/lib/site/resources/finale';
import { ResourceHubPathwaysBand } from '@/lib/site/resources/strip';

type HubHeroCopy = Pick<
	ComponentProps<typeof ResourceHubHero>,
	'eyebrow' | 'headline' | 'subhead' | 'heroImage' | 'heroImageAlt'
>;

const HERO_BY_KEY: Record<string, HubHeroCopy> = {
	MANUFACTURERS_HUB_HERO,
	REVIEWS_HUB_HERO,
	CASE_STUDIES_HUB_HERO,
	FAQ_HUB_HERO,
	GUIDEBOOK_HUB_HERO,
	LEARN_HUB_HERO,
	BLOG_HUB_HERO,
	LOCATIONS_HUB_HERO,
	INFO_HUB_HERO,
	THE_FIRM_HERO,
	TEAM_HERO,
};

const BREADCRUMBS_BY_KEY: Record<string, () => SiteBreadcrumbItem[]> = {
	'manufacturers-hub': buildManufacturersHubBreadcrumbs,
	'reviews-hub': buildReviewsHubBreadcrumbs,
	'case-studies-hub': buildCaseStudiesHubBreadcrumbs,
	'faq-hub': buildFaqHubBreadcrumbs,
	'guidebook-hub': buildGuidebookHubBreadcrumbs,
	'learn-hub': buildLearnHubBreadcrumbs,
	'the-firm': buildTheFirmBreadcrumbs,
	team: buildTeamBreadcrumbs,
	'blog-hub': buildBlogHubBreadcrumbs,
	'locations-hub': buildLocationsHubBreadcrumbs,
	'info-hub': buildInfoHubBreadcrumbs,
};

export const resourceSharedKinds: SiteComponentKindMap = {
	'resource.hubHero': (props) => {
		const heroKey = String(props.heroKey ?? '');
		const hero = HERO_BY_KEY[heroKey];
		if (!hero) {
			throw new Error(`[site] unknown hub heroKey "${heroKey}"`);
		}
		const breadcrumbKey = String(props.breadcrumb ?? '');
		const breadcrumbs = BREADCRUMBS_BY_KEY[breadcrumbKey]?.();
		if (!breadcrumbs) {
			throw new Error(`[site] unknown hub breadcrumb "${breadcrumbKey}"`);
		}
		const leadContextId = String(props.leadContextId ?? '') as LeadCaptureContextId;
		const ctaLayout = props.ctaLayout as 'dual' | 'primary-link' | undefined;
		const align = props.align as 'start' | 'center' | undefined;
		return (
			<ResourceHubHero
				breadcrumbs={breadcrumbs}
				eyebrow={hero.eyebrow}
				headline={hero.headline}
				subhead={hero.subhead}
				leadContextId={leadContextId}
				heroImage={hero.heroImage}
				heroImageAlt={hero.heroImageAlt}
				ctaLayout={ctaLayout}
				align={align}
			/>
		);
	},
	'resource.pathways': (props) => {
		const variant = String(props.variant ?? 'default') as HubPathwaysVariantId;
		return <ResourceHubPathwaysBand variant={variant} />;
	},
	'resource.funnel': (props) => {
		const leadContextId = String(props.leadContextId ?? '') as LeadCaptureContextId;
		return <ResourceFinalCta leadContextId={leadContextId} />;
	},
};
