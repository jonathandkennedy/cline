'use client';

import { ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

import { PhoneCta } from '@/components/dial';
import { Faq } from '@/components/faq';
import { CaseReviewCtaButton } from '@/components/fields/reviewcta';
import { leadCaptureInlineSlot } from '@/components/leads/inline';
import { Brands } from '@/components/sections/brands';
import { Closing } from '@/components/sections/closing';
import { Founder } from '@/components/sections/founder';
import { Path } from '@/components/sections/path';
import { Process } from '@/components/sections/process';
import { Prompt } from '@/components/sections/prompt';
import { Proof } from '@/components/sections/proof';
import { Qualify } from '@/components/sections/qualify';
import { Stats } from '@/components/sections/stats';
import { Testimonials } from '@/components/testimonials';
import { Utilities } from '@/components/sections/utilities';

import type { SiteComponentKindMap } from '@/kit/catalog';
import { Hero, heroPhoneCtaClassName, heroSectionFromProps } from '@/kit/promo';
import { components } from '@/kit/theme';

import { siteTemplateTokens } from '@/lib/cms/brandtemplate';

export const homeKinds: SiteComponentKindMap = {
	'home.hero': (props) => {
		const content = heroSectionFromProps({
			...props,
			templateTokens: siteTemplateTokens(),
		});
		return (
			<Hero
				content={content}
				formSlot={leadCaptureInlineSlot(props.leadContextId)}
				primaryCtaSlot={
					<CaseReviewCtaButton
						leadContextId="home-final-cta"
						className={components.homeHeroPrimaryCta}
					>
						{content.primaryCta.label} <ArrowRight size={17} aria-hidden />
					</CaseReviewCtaButton>
				}
				phoneCta={<PhoneCta className={heroPhoneCtaClassName} />}
			/>
		);
	},
	'home.socialProof': () => <Proof />,
	'home.stats': () => <Stats />,
	'home.tools': () => <Utilities />,
	'home.process': () => <Process />,
	'home.qualify': () => <Qualify />,
	'home.testimonials': () => <Testimonials />,
	'home.resources': () => <Path />,
	'home.founder': () => <Founder />,
	'home.faq': () => <Faq />,
	'home.guidebook': () => <Prompt />,
	'home.manufacturers': () => <Brands />,
	'home.finalCta': () => <Closing />,
};
