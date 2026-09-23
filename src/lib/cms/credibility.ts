import { BadgeCheck, Clock, Lock } from 'lucide-react';
import type { IntroTrustItem } from './types';

const INTRO_TRUST_ICONS = {
	'badge-check': BadgeCheck,
	lock: Lock,
	clock: Clock,
} as const;

type IntroTrustJson =
	| {
			iconId: keyof typeof INTRO_TRUST_ICONS;
			iconClass: string;
			label: string;
	  }
	| {
			iconId: keyof typeof INTRO_TRUST_ICONS;
			iconClass: string;
			labelKind: 'minutes';
	  };

export function hydrateIntroTrustItems(rows: IntroTrustJson[]): IntroTrustItem[] {
	return rows.map((row) => {
		const icon = INTRO_TRUST_ICONS[row.iconId];
		if ('labelKind' in row && row.labelKind === 'minutes') {
			return {
				icon,
				iconClass: row.iconClass,
				label: (minutes: string) => `~${minutes}`,
			};
		}
		return {
			icon,
			iconClass: row.iconClass,
			label: (row as { label: string }).label,
		};
	});
}
