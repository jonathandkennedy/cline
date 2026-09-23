/**
 * Full article records (index row + parsed MDC body). Server-side only: importing this from a
 * client component would pull every article body into the browser bundle.
 */
import { BLOG_POSTS, EDITORIAL_PAGES, LOCATION_PAGES } from '../tables';
import type { EditorialIndexRecord, EditorialRecord } from '../types';
import { hydrateEditorialRecord } from './editorial';

function finder(items: readonly EditorialIndexRecord[]) {
	const bySlug = new Map(items.map((item) => [item.slug, item]));
	return (slug: string): EditorialRecord | undefined => {
		const index = bySlug.get(slug);
		return index ? hydrateEditorialRecord(index) : undefined;
	};
}

export const getBlogBySlug = finder(BLOG_POSTS);
export const getLocationPageBySlug = finder(LOCATION_PAGES);
export const getEditorialPageBySlug = finder(EDITORIAL_PAGES);
