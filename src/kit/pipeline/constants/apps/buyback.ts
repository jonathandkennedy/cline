import { defineApp } from '../../functions/define';
import { LAW } from '../../functions/law';
import type { AppDefinition } from '../../types';

export const buybackCalculatorApp: AppDefinition = defineApp({
	uuid: 'c9a5f3b2-7d4e-5a0f-b2c3-4d5e6f708192',
	slug: 'buyback-calculator',
	icon: 'calculator',
	eyebrow: 'Step 2 · Estimate Your Recovery',
	title: 'Buyback Recovery Calculator',
	short: 'Estimate recovery from cash price or lease total, minus the mileage offset.',
	description:
		"Move the sliders for cash price or lease total, repairs, days in the shop and mileage. See a directional figure under California's Lemon Law buyback formula.",
	subtitle:
		"Directional estimate of what you may be owed under California's Lemon Law buyback formula.",
	badge: 'Most Popular',
	cta: 'Estimate My Recovery',
	minutes: '2 min',
	seoTitle: 'Lemon Law Buyback Calculator',
	seoDescription:
		'California Lemon Law buyback estimate using cash price or lease total and the mileage offset.',
	introBg: '/images/tools/buyback-bg.jpg',
	storageKey: 'cline-buyback',
	pipelineJson: [
		{
			type: 'calculator',
			schema: [
				{
					name: 'price',
					type: 'range',
					label: 'Cash price / lease total',
					min: 15000,
					max: 120000,
					step: 500,
					defaultValue: 52000,
					unit: 'USD',
				},
				{
					name: 'months',
					type: 'range',
					label: 'Months owned',
					min: 0,
					max: 48,
					defaultValue: 11,
					unit: 'months',
				},
				{
					name: 'miles',
					type: 'range',
					label: 'Miles at first repair',
					min: 0,
					max: 50000,
					step: 500,
					defaultValue: 9000,
					unit: 'miles',
					hint: `Used for the mileage offset (÷ ${LAW.mileageOffsetDenominator.toLocaleString()}).`,
				},
				{
					name: 'attempts',
					type: 'range',
					label: 'Repair attempts (same defect)',
					min: 0,
					max: 8,
					defaultValue: 4,
					unit: 'attempts',
				},
				{
					name: 'days',
					type: 'range',
					label: 'Days out of service',
					min: 0,
					max: 90,
					defaultValue: 32,
					unit: 'days',
				},
			],
			presets: [
				{
					label: 'New SUV, 4 repairs',
					values: {
						price: 62000,
						months: 9,
						miles: 8000,
						attempts: 4,
						days: 22,
					},
				},
				{
					label: 'EV, 35 days in shop',
					values: {
						price: 55000,
						months: 12,
						miles: 11000,
						attempts: 3,
						days: 35,
					},
				},
				{
					label: 'Truck, safety defect',
					values: {
						price: 48000,
						months: 8,
						miles: 7000,
						attempts: 2,
						days: 18,
					},
				},
				{
					label: 'Sedan, long repair',
					values: {
						price: 32000,
						months: 15,
						miles: 16000,
						attempts: 5,
						days: 41,
					},
				},
			],
		},
	],
});

export type BuybackAggregate = {
	price: number;
	months: number;
	miles: number;
	attempts: number;
	days: number;
};
