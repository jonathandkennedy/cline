import { Phone } from 'lucide-react';
import { APP_SHELL, BRAND, callBrandAriaLabel } from '@/lib/cms';

const PHONE_CTA_BY_SIZE = {
	lg: { className: 'btn btn-secondary btn-lg', iconSize: 17 },
	md: { className: 'btn btn-secondary btn-md', iconSize: 16 },
} as const;

type PhoneCtaProps = {
	size?: keyof typeof PHONE_CTA_BY_SIZE;
	className?: string;
};

export function PhoneCta({ size = 'lg', className = '' }: PhoneCtaProps) {
	const { className: sizeClassName, iconSize } = PHONE_CTA_BY_SIZE[size];
	return (
		<a
			href={BRAND.phoneHref}
			className={`${sizeClassName} ${className}`.trim()}
			aria-label={callBrandAriaLabel(APP_SHELL.aria.callPrefix, APP_SHELL.aria.atPhone)}
		>
			<Phone size={iconSize} className="text-gold" /> {BRAND.phoneDisplay}
		</a>
	);
}
