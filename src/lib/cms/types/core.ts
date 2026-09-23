import type { AppDefinition, AppSlug } from '@/kit/pipeline';
import type { LucideIcon } from 'lucide-react';
import type { BuybackCalcResult } from '@/lib/arithmetic';
import type { EligResult } from '@/lib/scoring';

export type BrandLogoVariant = 'light' | 'primary' | 'dark';
export type VehicleType = 'New' | 'Certified Pre-Owned' | 'Used';

export type ToolSlug = AppSlug;

export type Tool = Pick<
	AppDefinition,
	| 'slug'
	| 'icon'
	| 'eyebrow'
	| 'title'
	| 'short'
	| 'description'
	| 'subtitle'
	| 'badge'
	| 'cta'
	| 'minutes'
	| 'seoTitle'
	| 'seoDescription'
	| 'introBg'
>;

export type FaqIntroCtaItem =
	| {
			id: string;
			type: 'link';
			href: string;
			label: string;
			variant: 'primary' | 'secondary';
	  }
	| {
			id: string;
			type: 'case-review';
			label: string;
			variant: 'primary' | 'secondary';
			leadContextId: string;
	  };

export type StickyCtaItem =
	| { id: 'phone'; type: 'phone-icon' }
	| {
			id: 'eligibility';
			type: 'link';
			href: string;
			label: string;
			variant: 'primary';
	  }
	| {
			id: 'eligibility';
			type: 'case-review';
			label: string;
			variant: 'primary';
			leadContextId: string;
	  };

export type LeadModalSuccessBlock =
	| { id: string; variant: 'eyebrow'; text: string }
	| { id: string; variant: 'heading'; text: string }
	| { id: string; variant: 'paragraph'; text: string }
	| { id: string; variant: 'phone'; text: string };

export type SiteBreadcrumbItem = {
	label: string;
	href: string;
};

export type LeadCaptureContextId =
	| 'home-final-cta'
	| 'home-atf'
	| 'manufacturers-hub'
	| 'manufacturer-detail'
	| 'reviews-hub'
	| 'review-detail'
	| 'case-studies-hub'
	| 'case-study-detail'
	| 'faq-hub'
	| 'faq-detail'
	| 'guidebook-hub'
	| 'guidebook-chapter'
	| 'guidebook-thank-you'
	| 'learn-hub'
	| 'the-firm'
	| 'team'
	| 'eligibility-results'
	| 'tool-intro'
	| 'tool-shell'
	| 'shell'
	| 'embed-case-review'
	| 'blog-hub'
	| 'blog-detail'
	| 'locations-hub'
	| 'location-detail'
	| 'info-hub'
	| 'info-detail';

export type IntroTrustItem = {
	icon: LucideIcon;
	iconClass: string;
	label: string | ((minutes: string) => string);
};

export type ToolPreviewChips = {
	kind: 'chips';
	railLabel: string;
	badgeLabel: string;
	chips: readonly string[];
};

export type ToolPreviewRecovery = {
	kind: 'recovery';
	amount: string;
	segments: readonly { className: string }[];
};

export type ToolPreviewChecklist = {
	kind: 'checklist';
	rows: readonly { label: string; done: boolean }[];
};

export type ToolPreviewConfig = ToolPreviewChips | ToolPreviewRecovery | ToolPreviewChecklist;

export type HeaderLogoMode = 'tool' | 'home';

export type BuybackState = {
	price: number;
	months: number;
	miles: number;
	attempts: number;
	days: number;
};

export type EligibilityYesNoAnswerKey = 'withinWindow' | 'impairs' | 'safety';

export type EligibilityYesNoStep = {
	index: number;
	kind: 'yesno';
	title: string;
	subtitle: string;
	yesLabel: string;
	noLabel: string;
	answerKey: EligibilityYesNoAnswerKey;
};

export type EligibilityRangeStep = {
	index: number;
	kind: 'range';
	title: string;
	subtitle: string;
	field: 'attempts' | 'daysOut';
	min: number;
	max: number;
	unit: string;
	hint: string;
};

export type EligibilityVehicleStep = {
	index: number;
	kind: 'vehicle';
	title: string;
	subtitle: string;
};

export type EligibilityFlowStep =
	| EligibilityVehicleStep
	| EligibilityYesNoStep
	| EligibilityRangeStep;

export type EligibilityAnswerSummaryKey =
	| 'vehicleType'
	| EligibilityYesNoAnswerKey
	| 'attempts'
	| 'daysOut';

export type EligibilitySummaryContext = {
	vehicleType: VehicleType;
	withinWindow: boolean | null;
	attempts: number;
	daysOut: number;
	impairs: boolean | null;
	safety: boolean | null;
};

export type EligibilityStrength = 'Strong' | 'Moderate' | 'Review';

export type EligibilityResultsViewContext = {
	result: EligResult;
	withinWindow: boolean | null;
	impairs: boolean | null;
};

export type EligibilityResultPoint = {
	id: string;
	good?: boolean;
	show: (ctx: EligibilityResultsViewContext) => boolean;
	text: string | ((ctx: EligibilityResultsViewContext) => string);
};

export type EligibilityRailContext = {
	result: EligResult;
	withinWindow: boolean | null;
	impairs: boolean | null;
};

export type EligibilityQualifyingFactor = {
	id: string;
	label: string;
	resolveMet: (ctx: EligibilityRailContext) => boolean;
};

export type BuybackSliderField = {
	key: keyof BuybackState;
	label: string;
	min: number;
	max: number;
	step?: number;
	minLabel: string;
	maxLabel: string;
	fullWidth?: boolean;
	display: (value: number) => string;
	hint?: (value: number) => string | undefined;
};

export type BuybackBreakdownRow = {
	key: keyof BuybackCalcResult['breakdown'];
	label: string;
	dotClass: string;
	sign: string;
};

export type CompositionSegmentKey = 'price' | 'collateral' | 'incidentals';

export type BuybackPresumptionItem = {
	metKey: 'meetsRepair' | 'meetsDays' | 'withinWindow';
	label: string;
};
