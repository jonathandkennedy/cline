import { z } from 'zod';
import { VEHICLE_TYPES } from '@/lib/cms';
import type { VehicleType } from '@/lib/cms/types';
import { VEHICLE_OTHER_MAKE } from '@/lib/vehicle';

export const leadSchema = z
	.object({
		name: z.string().min(2, 'Please enter your full name'),
		phone: z
			.string()
			.refine((value) => value.replace(/\D/g, '').length === 10, 'Enter a valid phone number'),
		email: z.email('Enter a valid email'),
		vehicleYear: z.string().min(1, 'Select year'),
		vehicleMake: z.string().min(1, 'Select make'),
		vehicleMakeOther: z.string().optional(),
		vehicleModel: z.string().min(1, 'Enter model'),
		vehicleType: z.enum(VEHICLE_TYPES),
		issue: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.vehicleMake === VEHICLE_OTHER_MAKE && !data.vehicleMakeOther?.trim()) {
			ctx.addIssue({
				code: 'custom',
				path: ['vehicleMakeOther'],
				message: 'Enter manufacturer',
			});
		}
	});

export type LeadFormFields = z.infer<typeof leadSchema>;

export type LeadForm = LeadFormFields & {
	vehicle: string;
};

export interface LeadPrefill {
	vehicle?: string;
	vehicleYear?: string;
	vehicleMake?: string;
	vehicleModel?: string;
	vehicleMakeOther?: string;
	vehicleType?: VehicleType;
	estimate?: number;
	issue?: string;
	attachments?: File[];
}
