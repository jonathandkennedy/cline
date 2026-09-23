import Image from 'next/image';
import {
	logoBrandFullDimensions,
	logoBrandFullSrc,
	logoBrandMarkDimensions,
	logoBrandMarkSrc,
	type LogoBrandConfig,
	type LogoBrandVariant,
} from '@/kit/shared';
import { Link } from '@/components/link';
import { BRAND, type BrandLogoVariant } from '@/lib/cms';
import { siteHeaderLogoChrome } from '@/lib/cms/logo';

const SITE_LOGO_BRAND = siteHeaderLogoChrome().logoBrand;

type LogoImageProps = {
	brand: LogoBrandConfig;
	variant?: LogoBrandVariant;
	tagline?: boolean;
	className?: string;
	priority?: boolean;
};

function logoDimensions(
	brand: LogoBrandConfig,
	tagline: boolean,
	opts: { height?: number; width?: number },
) {
	if (opts.height != null) {
		if (tagline) {
			const width = Math.round(opts.height * brand.aspectWithTagline);
			return { height: opts.height, width };
		}
		return logoBrandMarkDimensions(brand, opts.height);
	}
	const width = opts.width ?? 168;
	if (tagline) {
		return logoBrandFullDimensions(brand, width);
	}
	return {
		width,
		height: Math.round(width / brand.aspectNoTagline),
	};
}

function logoAlt(brand: LogoBrandConfig, tagline: boolean) {
	return tagline ? brand.taglineAlt : brand.markAlt;
}

function logoImageClassName(
	className: string,
	width: number,
	height: number,
	fixedHeight: boolean,
): string {
	const sizeClass = fixedHeight
		? `h-[${height}px] w-[${width}px] min-w-[${width}px]`
		: `w-[${width}px] min-w-[${width}px] h-auto`;
	return `block shrink-0 max-w-full ${sizeClass} ${className}`.trim();
}

function LogoImage({
	brand,
	variant = 'light',
	tagline = false,
	className = '',
	priority = false,
	...size
}: LogoImageProps & { height?: number; width?: number }) {
	const src = tagline ? logoBrandFullSrc(brand, variant) : logoBrandMarkSrc(brand, variant);
	const { width, height } = logoDimensions(brand, tagline, size);
	const alt = logoAlt(brand, tagline);
	const fixedHeight = size.height != null;

	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			priority={priority}
			className={logoImageClassName(className, width, height, fixedHeight)}
		/>
	);
}

export function LogoMark({
	height = 34,
	variant = 'light',
	className = '',
	brand = SITE_LOGO_BRAND,
}: {
	height?: number;
	variant?: BrandLogoVariant;
	className?: string;
	brand?: LogoBrandConfig;
}) {
	return (
		<LogoImage
			brand={brand}
			variant={variant}
			tagline={false}
			height={height}
			className={className}
		/>
	);
}

export function LogoFull({
	width = 168,
	variant = 'light',
	className = '',
	brand = SITE_LOGO_BRAND,
}: {
	width?: number;
	variant?: BrandLogoVariant;
	className?: string;
	brand?: LogoBrandConfig;
}) {
	return (
		<LogoImage brand={brand} variant={variant} tagline={true} width={width} className={className} />
	);
}

export function SiteLogo({
	href = '/',
	variant = 'mark',
	height,
	width,
	logoVariant = 'light',
	className = '',
	brand = SITE_LOGO_BRAND,
}: {
	href?: string | null;
	variant?: 'mark' | 'full';
	height?: number;
	width?: number;
	logoVariant?: BrandLogoVariant;
	className?: string;
	brand?: LogoBrandConfig;
}) {
	const inner =
		variant === 'full' ? (
			<LogoFull width={width} variant={logoVariant} brand={brand} />
		) : (
			<LogoMark height={height} variant={logoVariant} brand={brand} />
		);

	const linkAria = `${BRAND.name} California Lemon Law`;

	if (href === null) {
		return <span className={`inline-flex items-center ${className}`}>{inner}</span>;
	}

	return (
		<Link
			href={href}
			className={'group inline-flex items-center transition-opacity hover:opacity-90 ' + className}
			aria-label={linkAria}
		>
			{inner}
		</Link>
	);
}
