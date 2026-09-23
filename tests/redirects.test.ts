import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import blog from '@/data/items/blog.json';
import editorial from '@/data/items/editorial.json';
import locations from '@/data/items/locations.json';
import profiles from '@/data/items/profiles.json';
import team from '@/data/items/team.json';
import { resolveRedirect } from '@/lib/redirects';

/** Every URL in the WordPress site's sitemaps on Sep 23, 2026 (posts, pages, team, tags). */
const PRODUCTION_URLS = readFileSync(join(__dirname, 'fixtures/production-urls.txt'), 'utf8')
	.split('\n')
	.map((line) => line.trim())
	.filter(Boolean);

const LIVE_PATHS = new Set<string>([
	'/',
	'/blog',
	'/team',
	'/contact',
	'/the-firm',
	'/faq',
	'/locations',
	'/manufacturers',
	'/tool/buyback-calculator',
	'/tool/eligibility-checker',
	'/tool/documentation-checklist',
	...blog.BLOG_POSTS.map((post) => `/blog/${post.slug}`),
	...locations.LOCATION_PAGES.map((page) => `/locations/${page.slug}`),
	...editorial.EDITORIAL_PAGES.map((page) => `/info/${page.slug}`),
	...profiles.MANUFACTURER_PAGE_DETAILS.map((page) => `/manufacturers/${page.slug}`),
	...team.TEAM_MEMBERS.filter((member) => 'profile' in member).map(
		(member) => `/team/${member.id}`,
	),
]);

describe('legacy WordPress URLs', () => {
	it.each(PRODUCTION_URLS)('%s reaches a live page in one hop', (url) => {
		const destination = resolveRedirect(url) ?? url;
		const [path] = destination.split('#');
		expect(LIVE_PATHS.has(path)).toBe(true);
		// The destination itself must not redirect again (exactly one hop).
		expect(resolveRedirect(path)).toBeNull();
	});
});

describe('resolveRedirect', () => {
	it('strips trailing slashes and lowercases in the same hop', () => {
		expect(resolveRedirect('/Blog/Chevy-Cruze-Problems/')).toBe('/blog/chevy-cruze-problems');
		expect(resolveRedirect('/CONTACT')).toBe('/contact');
	});

	it('maps dated posts, archives and consolidated pages', () => {
		expect(resolveRedirect('/2021/07/chevy-cruze-problems/')).toBe('/blog/chevy-cruze-problems');
		expect(resolveRedirect('/tag/gm-recall/')).toBe('/blog');
		expect(resolveRedirect('/team/john-evans/')).toBe('/team#john-evans');
		expect(resolveRedirect('/guidebook/buyback-process')).toBe('/guidebook#buyback-process');
		expect(resolveRedirect('/faq/how-much-does-a-lemon-law-attorney-cost')).toMatch(
			/^\/faq\/[a-z-]+#how-much-does-a-lemon-law-attorney-cost$/,
		);
	});

	it('leaves live pages, assets and API routes alone', () => {
		expect(resolveRedirect('/')).toBeNull();
		expect(resolveRedirect('/blog/chevy-cruze-problems')).toBeNull();
		expect(resolveRedirect('/images/og/default.jpg')).toBeNull();
		expect(resolveRedirect('/api/case-review')).toBeNull();
	});
});
