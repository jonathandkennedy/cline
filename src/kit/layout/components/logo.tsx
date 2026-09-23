'use client';

import { useCallback } from 'react';
import { components } from '@/kit/theme/interface/components';
import { cn } from '@/kit/ui/functions/cn';
import type { SiteLogoChrome } from '../types/chrome';
import Link from '@/kit/ui/components/link';
import { useLayoutChromeOptional } from './provider';

export type LogoProps = {
	logoChrome: SiteLogoChrome;
	linked?: boolean;
	toolPage?: boolean;
	onNavigate?: () => void;
};

function logoMode(toolPage: boolean): 'home' | 'tool' {
	return toolPage ? 'tool' : 'home';
}

export function Logo({ logoChrome, linked = true, toolPage = false, onNavigate }: LogoProps) {
	const { title, subtitle } = useLayoutChromeOptional(logoChrome.defaultChrome);
	const chromeText = { title, subtitle } as const;
	const mode = logoMode(toolPage);
	const textColumnExtraClass = logoChrome.textColumnByMode[mode];
	const rootExtraClass = logoChrome.rootByMode[mode];
	const innerClass = logoChrome.innerByMode[mode];

	const textColumn = (
		<span className={cn(components.logo.textColumn, textColumnExtraClass)}>
			<span className={components.logo.textStack}>
				{logoChrome.textItems.map((item) => (
					<span
						key={item.key}
						className={logoChrome.textLineClassName(item.key, mode, item.className)}
					>
						{chromeText[item.key]}
					</span>
				))}
			</span>
		</span>
	);

	const inner = (
		<>
			{logoChrome.mark}
			{textColumn}
		</>
	);

	const className = cn(components.logo.root, rootExtraClass, linked && components.logo.rootLinked);

	const innerClassName = cn(components.logo.inner, innerClass);

	const handleLinkedNavigate = useCallback(() => {
		onNavigate?.();
	}, [onNavigate]);

	const offSite =
		typeof logoChrome.homeHref === 'string' &&
		(/^https?:\/\//i.test(logoChrome.homeHref) ||
			logoChrome.homeHref.startsWith('mailto:') ||
			logoChrome.homeHref.startsWith('tel:'));

	return (
		<div className={className} aria-label={logoChrome.ariaLabel}>
			{linked ? (
				<Link
					href={logoChrome.homeHref}
					className={innerClassName}
					onClick={handleLinkedNavigate}
					target={offSite ? '_top' : undefined}
					rel={offSite ? 'noopener noreferrer' : undefined}
				>
					{inner}
				</Link>
			) : onNavigate ? (
				<button
					type="button"
					className={cn(innerClassName, components.logo.buttonInner)}
					onClick={onNavigate}
				>
					{inner}
				</button>
			) : (
				<span className={innerClassName}>{inner}</span>
			)}
		</div>
	);
}
