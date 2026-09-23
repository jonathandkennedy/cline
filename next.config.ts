import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
import wpRedirects from './content/data/settings/redirects.json';
import { mergeWpAndLegacyRedirects } from './scripts/blog';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

const defaultFrameAncestors =
	"'self' https://www.lemonlawlawyerscalifornia.com https://lemonlawlawyerscalifornia.com https://lemonlawlawyerscalifornia-dev-client.sandboxsite.io";

const nextConfig: NextConfig = {
	turbopack: {
		root: repoRoot,
	},
	allowedDevOrigins: ['abruptive.napoleon-kardashev.ts.net', '*.napoleon-kardashev.ts.net'],
	async redirects() {
		return mergeWpAndLegacyRedirects(wpRedirects.WP_REDIRECTS);
	},
	async headers() {
		const ancestors =
			process.env.EMBED_FRAME_ANCESTORS ??
			(process.env.NODE_ENV === 'production'
				? defaultFrameAncestors
				: `${defaultFrameAncestors} http://abruptive.napoleon-kardashev.ts.net:3800 http://abruptive.napoleon-kardashev.ts.net:5000`);
		return [
			{
				source: '/wordpress/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'no-store, no-cache, must-revalidate',
					},
				],
			},
			{
				source: '/:path*',
				headers: [
					{
						key: 'Content-Security-Policy',
						value: `frame-ancestors ${ancestors};`,
					},
				],
			},
		];
	},
};

export default nextConfig;
