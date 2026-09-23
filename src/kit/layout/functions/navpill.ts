import { components } from '@/kit/theme/interface/components';
import { cn } from '@/kit/ui/functions/cn';

export function learnHubNavPillClassName(
	pathname: string | null | undefined,
	learnHubPath: string,
) {
	const onLearnHub =
		pathname === learnHubPath || (pathname?.startsWith(`${learnHubPath}/`) ?? false);
	return cn(components.nav.pill, onLearnHub ? components.nav.pillOpen : components.nav.pillClosed);
}

export function firmNavPillClassName(pathname: string | null | undefined, firmPath: string) {
	return cn(
		components.nav.pill,
		pathname === firmPath ? components.nav.pillOpen : components.nav.pillClosed,
	);
}

export function teamNavPillClassName(pathname: string | null | undefined, teamPath: string) {
	return cn(
		components.nav.pill,
		pathname === teamPath ? components.nav.pillOpen : components.nav.pillClosed,
	);
}
