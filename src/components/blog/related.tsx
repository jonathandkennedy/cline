import { Link } from '@/components/link';
import {
	blogDetailPath,
	LOCATION_PAGES,
	locationDetailPath,
	type EditorialIndexRecord,
} from '@/lib/cms';
import { blogTopicPath, relatedPosts, topicsForPost, type BlogTopic } from '@/lib/topics';

function formatDate(value: string) {
	return new Date(`${value}T12:00:00Z`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function TopicChips({
	topics,
	label = 'Topics',
}: {
	topics: readonly BlogTopic[];
	label?: string;
}) {
	if (topics.length === 0) return null;
	return (
		<div className="flex flex-wrap items-center gap-2">
			<span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-subtle">
				{label}
			</span>
			{topics.map((topic) => (
				<Link
					key={topic.slug}
					href={blogTopicPath(topic.slug)}
					className="rounded-full border border-line/60 px-3 py-1 text-[13px] text-muted transition hover:border-gold/40 hover:text-gold"
				>
					{topic.label}
				</Link>
			))}
		</div>
	);
}

export function PostList({
	posts,
	headingLevel = 'h2',
}: {
	posts: readonly EditorialIndexRecord[];
	headingLevel?: 'h2' | 'h3';
}) {
	const Heading = headingLevel;
	return (
		<ul className="grid gap-4 md:grid-cols-2">
			{posts.map((post) => (
				<li key={post.slug} className="card card-static card-pad">
					<time
						dateTime={post.date}
						className="text-[12px] uppercase tracking-[0.12em] text-subtle"
					>
						{formatDate(post.date)}
					</time>
					<Heading className="mt-2 text-[17px] font-semibold leading-snug text-fg">
						<Link href={blogDetailPath(post.slug)} className="hover:text-gold">
							{post.title}
						</Link>
					</Heading>
					<p className="mt-2 line-clamp-3 text-[14.5px] leading-relaxed text-muted">
						{post.description}
					</p>
				</li>
			))}
		</ul>
	);
}

/** Topic links plus three related posts, shown under every blog article. */
export function BlogPostRelated({ post }: { post: EditorialIndexRecord }) {
	const related = relatedPosts(post.slug);
	return (
		<section
			aria-labelledby="related-articles"
			className="mt-12 space-y-6 border-t border-line/50 pt-10"
		>
			<TopicChips topics={topicsForPost(post)} />
			<h2 id="related-articles" className="text-xl font-semibold text-fg">
				Related articles
			</h2>
			<PostList posts={related} headingLevel="h3" />
		</section>
	);
}

/**
 * Six other city pages, taken in order around the list, so every city page is linked from
 * several others rather than only from the /locations hub.
 */
export function NearbyLocations({ slug }: { slug: string }) {
	const index = LOCATION_PAGES.findIndex((page) => page.slug === slug);
	if (index === -1) return null;
	const others = Array.from(
		{ length: Math.min(6, LOCATION_PAGES.length - 1) },
		(_, offset) => LOCATION_PAGES[(index + offset + 1) % LOCATION_PAGES.length],
	);
	return (
		<section aria-labelledby="other-cities" className="mt-12 border-t border-line/50 pt-10">
			<h2 id="other-cities" className="text-xl font-semibold text-fg">
				Lemon law help in other California cities
			</h2>
			<ul className="mt-4 grid gap-2 text-[15px] sm:grid-cols-2">
				{others.map((page) => (
					<li key={page.slug}>
						<Link
							href={locationDetailPath(page.slug)}
							className="text-muted underline-offset-4 hover:text-gold hover:underline"
						>
							{page.title}
						</Link>
					</li>
				))}
			</ul>
			<p className="mt-4">
				<Link href="/locations" className="font-semibold text-gold hover:underline">
					All California cities we serve
				</Link>
			</p>
		</section>
	);
}
