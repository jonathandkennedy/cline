import { Phone } from 'lucide-react';
import { components } from '@/kit/theme/interface/components';
import type { SiteLogoChrome } from '../types/chrome';
import type { HeaderPhoneChrome } from '../types/phone';
import { Logo } from './logo';

export function Compact({
	phoneHref,
	phoneDisplay,
	phoneAriaLabel,
	logoChrome,
}: HeaderPhoneChrome & { logoChrome: SiteLogoChrome }) {
	return (
		<header className={components.masthead.compactRoot}>
			<div className={components.masthead.compactRow}>
				<Logo logoChrome={logoChrome} />

				<a
					href={phoneHref}
					aria-label={phoneAriaLabel}
					className={components.masthead.compactPhone}
				>
					<Phone size={14} className={components.homeHeroPropIcon} aria-hidden="true" />{' '}
					{phoneDisplay}
				</a>
			</div>
		</header>
	);
}
