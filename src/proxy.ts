import { NextResponse, type NextRequest } from 'next/server';
import { SITE_URL } from '@/lib/cms/tables/config';
import { resolveRedirect } from '@/lib/redirects';

const CANONICAL = new URL(SITE_URL);
const APEX_HOST = CANONICAL.host.replace(/^www\./, '');

function requestHost(request: NextRequest): string {
	return (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '')
		.split(',')[0]
		.trim()
		.toLowerCase();
}

export function proxy(request: NextRequest) {
	const host = requestHost(request);
	const { pathname } = request.nextUrl;

	// Legacy WordPress URLs, trailing slashes and mixed case: one 301 to the final address.
	const destination = resolveRedirect(pathname);
	const toCanonicalHost = host === APEX_HOST && APEX_HOST !== CANONICAL.host;
	if (destination || toCanonicalHost) {
		const target = new URL(destination ?? pathname, toCanonicalHost ? SITE_URL : request.nextUrl.origin);
		target.search = request.nextUrl.search;
		return NextResponse.redirect(target, 301);
	}

	const response = NextResponse.next();
	// Only the production host may be indexed. Staging/preview hosts and the embeddable
	// /embed routes are served normally but kept out of search results.
	if (host !== CANONICAL.host || pathname.startsWith('/embed')) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	}
	return response;
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
