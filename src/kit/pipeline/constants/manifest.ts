/** Nexus app manifest slugs; full trees live in defineApp pipelineJson (map-driven). */
import type { AppSlug } from '../types';

export type ProductAddon = {
	id: string;
	title: string;
	description: string;
};

export type NexusAppManifestEntry = {
	slug: AppSlug;
	uuid: string;
	title: string;
};

export const apps: readonly NexusAppManifestEntry[] = [
	{
		slug: 'eligibility-checker',
		uuid: 'b8f4e2a1-6c3d-4f9e-a1b2-3c4d5e6f7081',
		title: 'Lemon Law Eligibility Checker',
	},
	{
		slug: 'buyback-calculator',
		uuid: 'c9a5f3b2-7d4e-5a0f-b2c3-4d5e6f708192',
		title: 'Buyback Recovery Calculator',
	},
	{
		slug: 'documentation-checklist',
		uuid: 'd0b6a4c3-8e5f-4b1a-c3d4-5e6f708192a3',
		title: 'Case Documentation Checklist',
	},
];
