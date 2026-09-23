import type { VehicleType } from '@/lib/cms';

export type EligibilityPersistedState = {
	step: number;
	vehicleType: VehicleType;
	withinWindow: boolean | null;
	attempts: number;
	daysOut: number;
	impairs: boolean | null;
	safety: boolean | null;
};

export type DocumentationPersistedState = {
	checked: Record<string, boolean>;
	customItems?: string[];
	notes: string;
};

export type ToolVaultState =
	| { tool: 'eligibility-checker'; data: EligibilityPersistedState }
	| { tool: 'documentation-checklist'; data: DocumentationPersistedState };
