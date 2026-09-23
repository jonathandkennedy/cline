import { defineApp } from '../../functions/define';
import type { AppDefinition } from '../../types';

export const eligibilityCheckerApp: AppDefinition = defineApp({
	uuid: 'b8f4e2a1-6c3d-4f9e-a1b2-3c4d5e6f7081',
	slug: 'eligibility-checker',
	icon: 'scale',
	eyebrow: 'Step 1 · Song-Beverly Act',
	title: 'Lemon Law Eligibility Checker',
	short: 'See if your vehicle qualifies as a lemon under California law in under 60 seconds.',
	description:
		'Answer a few questions about whether the defect first occurred during the original manufacturer warranty, plus repair attempts and days out of service.',
	subtitle:
		"Find out in under a minute whether your vehicle likely qualifies as a lemon under California's Song-Beverly Consumer Warranty Act.",
	badge: 'Start Here',
	cta: 'Check My Eligibility',
	minutes: '60 sec',
	seoTitle: 'California Lemon Law Eligibility Checker',
	seoDescription:
		"Free instant check: does your vehicle qualify as a lemon under California's Song-Beverly Act? Answer a few questions about warranty timing and repairs.",
	introBg: '/images/tools/eligibility-bg.jpg',
	storageKey: 'cline-eligibility',
	pipelineJson: [
		{
			type: 'multistep',
			steps: [
				{
					label: 'Vehicle',
					title: 'What type of vehicle is it?',
					description:
						'California Lemon Law covers new, certified pre-owned, and many used vehicles.',
					schema: [
						{
							name: 'vehicleType',
							type: 'radio',
							label: false,
							columns: 3,
							options: [
								{
									id: 'New',
									label: 'New',
									description: 'Still under warranty',
								},
								{
									id: 'Certified Pre-Owned',
									label: 'Certified Pre-Owned',
									description: 'Manufacturer-backed',
								},
								{
									id: 'Used',
									label: 'Used',
									description: 'Often still covered',
								},
							],
						},
					],
				},
				{
					label: 'Timeline',
					title: 'Did the defect first occur during the original manufacturer warranty?',
					description:
						'That is the question that matters. An 18-month / 18,000-mile timeline is not required to have a case.',
					schema: [
						{
							name: 'withinWindow',
							type: 'boolean',
							label: false,
							options: [
								{ id: 'true', label: 'Yes, During Warranty' },
								{ id: 'false', label: 'No / Not Sure' },
							],
						},
					],
				},
				{
					label: 'Repairs',
					title: 'How many times has the same defect been repaired?',
					description:
						'Count only repair visits for the identical problem (e.g. transmission, electrical, engine).',
					form: { submit: { label: 'Continue' } },
					schema: [
						{
							name: 'attempts',
							type: 'range',
							label: false,
							min: 0,
							max: 8,
							defaultValue: 0,
							unit: 'attempts',
							hint: 'Count only visits for the identical problem.',
						},
					],
				},
				{
					label: 'Days out',
					title: 'Total days out of service for repairs?',
					description:
						'Add up every day the vehicle sat at the dealer or shop for warranty repairs.',
					form: { submit: { label: 'Continue' } },
					schema: [
						{
							name: 'daysOut',
							type: 'range',
							label: false,
							min: 0,
							max: 90,
							defaultValue: 10,
							unit: 'days',
							hint: 'Add every day the vehicle sat at the dealer for warranty repairs.',
						},
					],
				},
				{
					label: 'Impairment',
					title: "Does the defect impair the vehicle's use, value, or safety?",
					description: 'A substantial impairment is required under the Song-Beverly Act.',
					schema: [
						{
							name: 'impairs',
							type: 'boolean',
							label: false,
							options: [
								{ id: 'true', label: 'Yes, Substantially' },
								{ id: 'false', label: 'No / Not Sure' },
							],
						},
					],
				},
				{
					label: 'Safety',
					title: 'Is it a safety-related defect?',
					description:
						'A defect likely to cause death or serious injury (brakes, steering, airbags, stalling, fire risk) needs only two repair attempts.',
					schema: [
						{
							name: 'safety',
							type: 'boolean',
							label: false,
							options: [
								{ id: 'true', label: 'Yes' },
								{ id: 'false', label: 'No' },
							],
						},
					],
				},
			],
		},
		{
			type: 'outcome',
			outcomeId: 'eligibility-results',
		},
	],
});

export type EligibilityAggregate = {
	vehicleType: 'New' | 'Certified Pre-Owned' | 'Used';
	withinWindow: boolean | null;
	attempts: number;
	daysOut: number;
	impairs: boolean | null;
	safety: boolean | null;
};
