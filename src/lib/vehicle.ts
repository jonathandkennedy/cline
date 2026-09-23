import type { LeadPrefill } from '@/components/leads/schema';

export const VEHICLE_OTHER_MAKE = '__other__';

export type LeadVehicleFields = {
	vehicleYear: string;
	vehicleMake: string;
	vehicleModel: string;
	vehicleMakeOther: string;
};

const EMPTY_VEHICLE_FIELDS: LeadVehicleFields = {
	vehicleYear: '',
	vehicleMake: '',
	vehicleModel: '',
	vehicleMakeOther: '',
};

export function vehicleYearOptions(now = new Date()): readonly string[] {
	const end = now.getFullYear() + 1;
	const start = 1990;
	const years: string[] = [];
	for (let year = end; year >= start; year -= 1) {
		years.push(String(year));
	}
	return years;
}

export function vehicleMakeOptions(manufacturers: readonly { name: string }[]): readonly string[] {
	return [...manufacturers.map((m) => m.name)].sort((a, b) => a.localeCompare(b));
}

export function composeVehicleLabel(fields: {
	vehicleYear: string;
	vehicleMake: string;
	vehicleModel: string;
	vehicleMakeOther?: string;
}): string {
	const make =
		fields.vehicleMake === VEHICLE_OTHER_MAKE
			? (fields.vehicleMakeOther ?? '').trim()
			: fields.vehicleMake.trim();
	const parts = [fields.vehicleYear.trim(), make, fields.vehicleModel.trim()].filter(Boolean);
	return parts.join(' ');
}

export function parseVehicleString(
	vehicle: string | undefined,
	makes: readonly string[],
): LeadVehicleFields {
	if (!vehicle?.trim()) return { ...EMPTY_VEHICLE_FIELDS };

	const trimmed = vehicle.trim();
	const yearMatch = trimmed.match(/^(\d{4})\s+(.+)$/);
	if (!yearMatch) {
		return { ...EMPTY_VEHICLE_FIELDS, vehicleModel: trimmed };
	}

	const vehicleYear = yearMatch[1];
	const rest = yearMatch[2].trim();
	const sortedMakes = [...makes].sort((a, b) => b.length - a.length);

	for (const make of sortedMakes) {
		if (rest.toLowerCase().startsWith(make.toLowerCase())) {
			const vehicleModel = rest.slice(make.length).trim();
			return {
				vehicleYear,
				vehicleMake: make,
				vehicleModel,
				vehicleMakeOther: '',
			};
		}
	}

	const [firstWord, ...modelParts] = rest.split(/\s+/);
	return {
		vehicleYear,
		vehicleMake: VEHICLE_OTHER_MAKE,
		vehicleMakeOther: firstWord ?? '',
		vehicleModel: modelParts.join(' '),
	};
}

export function resolveLeadVehicleDefaults(
	prefill: LeadPrefill | null | undefined,
	makes: readonly string[],
): LeadVehicleFields {
	if (
		prefill?.vehicleYear ||
		prefill?.vehicleMake ||
		prefill?.vehicleModel ||
		prefill?.vehicleMakeOther
	) {
		return {
			vehicleYear: prefill.vehicleYear ?? '',
			vehicleMake: prefill.vehicleMake ?? '',
			vehicleModel: prefill.vehicleModel ?? '',
			vehicleMakeOther: prefill.vehicleMakeOther ?? '',
		};
	}

	if (prefill?.vehicle) {
		return parseVehicleString(prefill.vehicle, makes);
	}

	return { ...EMPTY_VEHICLE_FIELDS };
}
