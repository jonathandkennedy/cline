/** AppDefinition types — pipelineJson is the tool-side layout tree SSOT. */
import type { PipelineStep } from './pipeline';

export type AppSlug = 'eligibility-checker' | 'buyback-calculator' | 'documentation-checklist';

export type AppIcon = 'calculator' | 'scale' | 'clipboard';

export type AppMarketing = {
	slug: AppSlug;
	uuid: string;
	title: string;
	icon: AppIcon;
	eyebrow: string;
	short: string;
	description: string;
	subtitle: string;
	badge: string | null;
	cta: string;
	minutes: string;
	seoTitle: string;
	seoDescription: string;
	introBg: string;
};

export type AppDefinition = AppMarketing & {
	pipelineJson: PipelineStep[];
	generator?: {
		pricing: { generate: number; retry: number };
	};
	storageKey?: string;
};

export type EngineApp = {
	id: string;
	attributes: AppMarketing & {
		pipelineJson: PipelineStep[];
		generator?: AppDefinition['generator'];
		[key: string]: unknown;
	};
};
