import NextLink from 'next/link';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';

type LinkHrefObject = {
	pathname?: string;
	query?: Record<string, string | string[] | undefined>;
	hash?: string;
};

export type LinkProps = {
	href: string | LinkHrefObject;
	prefetch?: boolean | null;
	children?: ReactNode;
	className?: string;
	onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
	onMouseEnter?: (event: MouseEvent<HTMLAnchorElement>) => void;
	onMouseLeave?: (event: MouseEvent<HTMLAnchorElement>) => void;
	'aria-label'?: string;
	'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
	style?: CSSProperties;
	tabIndex?: number;
	target?: string;
	rel?: string;
	replace?: boolean;
	scroll?: boolean;
	shallow?: boolean;
	locale?: string | false;
};

function hrefStringFromLink(href: LinkProps['href']): string | null {
	if (typeof href === 'string') return href;
	const pathname = href.pathname;
	return typeof pathname === 'string' ? pathname : null;
}

function isOffSiteHref(href: LinkProps['href']): boolean {
	const value = hrefStringFromLink(href);
	if (!value) return false;
	return (
		value.startsWith('http://') ||
		value.startsWith('https://') ||
		value.startsWith('mailto:') ||
		value.startsWith('tel:')
	);
}

export function Link({ prefetch, href, ...rest }: LinkProps) {
	const offSite = isOffSiteHref(href);
	return <NextLink href={href} prefetch={offSite ? false : (prefetch ?? true)} {...rest} />;
}

export default Link;
