import { defineApp } from '../../functions/define';
import type { AppDefinition } from '../../types';

type ChecklistCategory = {
	name: string;
	items: readonly string[];
};

const CHECKLIST_CATEGORIES: readonly ChecklistCategory[] = [
	{
		name: 'Purchase & ownership',
		items: [
			'Purchase or lease contract / agreement (helpful if you have it)',
			'Finance or lease paperwork',
			'Payment records or statements',
			'Proof of down payment or trade-in',
		],
	},
	{
		name: 'Repair records',
		items: [
			'Repair orders / invoices (most helpful if you have them)',
			'Diagnostic reports and technician notes',
			'Warranty repair authorizations',
			'Photos or videos of the defect',
			'Rental car or loaner agreements during repairs',
		],
	},
	{
		name: 'Communications & timeline',
		items: [
			'Emails and letters with the manufacturer or dealer',
			'Notes from phone calls',
			'Service appointment confirmations',
			'Warranty coverage denial letters',
		],
	},
];

export const documentationChecklistApp: AppDefinition = defineApp({
	uuid: 'd0b6a4c3-8e5f-4b1a-c3d4-5e6f708192a3',
	slug: 'documentation-checklist',
	icon: 'clipboard',
	eyebrow: 'Step 3 · Build Your Case',
	title: 'Case Documentation Checklist',
	short: 'Organize repair orders and records that strengthen a Song-Beverly claim.',
	description:
		'Check off records you already have. Repair orders help most; a purchase or lease contract is useful. We do not need a window sticker.',
	subtitle: 'A private organizer for records on hand. Repair orders help if you have them.',
	badge: 'Case File',
	cta: 'Build My Checklist',
	minutes: '5 min',
	seoTitle: 'Lemon Law Documentation Checklist',
	seoDescription:
		'California Lemon Law documentation checklist. Repair orders help if you have them. No window sticker required.',
	introBg: '/images/tools/checklist-bg.jpg',
	storageKey: 'cline-docs',
	pipelineJson: [
		{
			type: 'checklist',
			categories: CHECKLIST_CATEGORIES.map((c) => ({
				name: c.name,
				items: [...c.items],
			})),
			notesField: {
				name: 'notes',
				label: 'Case notes',
				placeholder: 'Timeline, VIN, open issues, or anything else for intake…',
			},
			actions: {
				generateReport: { label: 'Generate case summary' },
			},
		},
	],
});

export { CHECKLIST_CATEGORIES };
