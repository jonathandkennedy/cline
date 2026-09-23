import topicsTable from '@/data/settings/topics.json';
import { BLOG_POSTS, MANUFACTURERS, type EditorialIndexRecord } from '@/lib/cms';

export const BLOG_TOPICS_PATH = '/blog/topics';

export type BlogTopic = {
	slug: string;
	label: string;
	description: string;
	kind: 'subject' | 'brand';
	posts: readonly EditorialIndexRecord[];
};

/** A hub needs enough posts to be worth a page; smaller brands are linked from their brand page. */
const MIN_HUB_POSTS = 2;

const byNewest = (a: EditorialIndexRecord, b: EditorialIndexRecord) => b.date.localeCompare(a.date);

const SUBJECT_TOPICS: BlogTopic[] = topicsTable.BLOG_TOPICS.map((topic) => ({
	slug: topic.slug,
	label: topic.label,
	description: topic.description,
	kind: 'subject' as const,
	posts: BLOG_POSTS.filter((post) => post.topics?.includes(topic.slug)).sort(byNewest),
}));

const BRAND_TOPICS: BlogTopic[] = MANUFACTURERS.map((brand) => ({
	slug: brand.slug,
	label: brand.name,
	description: `Articles about ${brand.name} defects, recalls and lemon law claims in California.`,
	kind: 'brand' as const,
	posts: BLOG_POSTS.filter((post) => post.brands?.includes(brand.slug)).sort(byNewest),
}));

export const BLOG_TOPICS: readonly BlogTopic[] = [...SUBJECT_TOPICS, ...BRAND_TOPICS].filter(
	(topic) => topic.posts.length >= MIN_HUB_POSTS,
);

export function blogTopicPath(slug: string): string {
	return `${BLOG_TOPICS_PATH}/${slug}`;
}

export function getBlogTopic(slug: string): BlogTopic | undefined {
	return BLOG_TOPICS.find((topic) => topic.slug === slug);
}

/** Posts that mention a manufacturer (used on manufacturer pages, even below the hub threshold). */
export function postsForBrand(brandSlug: string): readonly EditorialIndexRecord[] {
	return BLOG_POSTS.filter((post) => post.brands?.includes(brandSlug)).sort(byNewest);
}

/** Topic hubs a post belongs to, brands first. */
export function topicsForPost(post: EditorialIndexRecord): readonly BlogTopic[] {
	const slugs = [...(post.brands ?? []), ...(post.topics ?? [])];
	return slugs.flatMap((slug) => {
		const topic = getBlogTopic(slug);
		return topic ? [topic] : [];
	});
}

/**
 * Related posts by shared brand (strongest signal), then shared topic, then nearest in time,
 * so each post gets its own set rather than one sitewide block.
 */
export function relatedPosts(slug: string, limit = 3): readonly EditorialIndexRecord[] {
	const post = BLOG_POSTS.find((candidate) => candidate.slug === slug);
	if (!post) return [];
	const time = Date.parse(post.date);
	return BLOG_POSTS.filter((candidate) => candidate.slug !== slug)
		.map((candidate) => {
			const sharedBrands =
				candidate.brands?.filter((brand) => post.brands?.includes(brand)).length ?? 0;
			const sharedTopics =
				candidate.topics?.filter((topic) => post.topics?.includes(topic)).length ?? 0;
			const distance = Math.abs(Date.parse(candidate.date) - time) / 8.64e7 / 365;
			return { candidate, score: sharedBrands * 10 + sharedTopics * 3 - distance };
		})
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map(({ candidate }) => candidate);
}
