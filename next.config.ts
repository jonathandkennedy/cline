import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

const defaultFrameAncestors =
	"'self' https://www.lemonlawlawyerscalifornia.com https://lemonlawlawyerscalifornia.com https://lemonlawlawyerscalifornia-dev-client.sandboxsite.io";

const nextConfig: NextConfig = {
	turbopack: {
		root: repoRoot,
	},
	allowedDevOrigins: ['abruptive.napoleon-kardashev.ts.net', '*.napoleon-kardashev.ts.net'],
	// Legacy WordPress URLs, trailing slashes and mixed-case paths are resolved in one 301 hop
	// by src/proxy.ts; Next's own trailing-slash redirect would add a second hop.
	skipTrailingSlashRedirect: true,
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
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
				],
			},
		];
	},
};

export default nextConfig;
