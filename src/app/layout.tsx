import type { Metadata, Viewport } from 'next';
import { Archivo, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { DesktopTelNotice, SiteToaster, UaDesktopHint } from '@/components/chrome';
import { LayoutProvider, RouteTransition, SiteHeader } from '@/components/layout';
import { JsonLd } from '@/components/markup';
import { siteMetadata, siteViewport } from '@/lib/cms';
import { organizationLd, webSiteLd } from '@/lib/structured';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
	adjustFontFallback: false,
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
	adjustFontFallback: false,
});

const archivo = Archivo({
	variable: '--font-archivo',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
	adjustFontFallback: true,
});

export const metadata: Metadata = siteMetadata();

export const viewport: Viewport = siteViewport();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased dark`}
		>
			<body className={`${geistSans.className} min-h-full flex flex-col bg-base text-fg`}>
				<a
					href="#main"
					className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-lg focus-visible:bg-cta focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-black"
				>
					Skip to content
				</a>
				<UaDesktopHint />
				<LayoutProvider>
					<SiteHeader />
					<RouteTransition>{children}</RouteTransition>
				</LayoutProvider>
				<DesktopTelNotice />
				<SiteToaster />
				<JsonLd data={organizationLd()} />
				<JsonLd data={webSiteLd()} />
			</body>
		</html>
	);
}
