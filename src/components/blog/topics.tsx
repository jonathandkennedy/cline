import { Footer, JsonLd, Link } from '@/components';
import { breadcrumbLd } from '@/lib/structured';
import { BLOG_TOPICS, BLOG_TOPICS_PATH, blogTopicPath, type BlogTopic } from '@/lib/topics';
import { PostList, TopicChips } from './related';

type Crumb = { label: string; href: string };

function Breadcrumbs({ items }: { items: Crumb[] }) {
	return (
		<nav aria-label="Breadcrumb" className="text-[13px] text-subtle">
			{items.map((item, index) => (
				<span key={item.href}>
					{index > 0 ? ' / ' : null}
					{index === items.length - 1 ? (
						<span className="text-muted">{item.label}</span>
					) : (
						<Link href={item.href} className="hover:text-gold">
							{item.label}
						</Link>
					)}
				</span>
			))}
		</nav>
	);
}

function TopicPageFrame({
	crumbs,
	eyebrow,
	title,
	intro,
	children,
}: {
	crumbs: Crumb[];
	eyebrow: string;
	title: string;
	intro: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<>
			<JsonLd data={{ '@context': 'https://schema.org', '@graph': [breadcrumbLd(crumbs)] }} />
			<main id="main" className="container-x py-12 md:py-16">
				<Breadcrumbs items={crumbs} />
				<span className="eyebrow mt-8 block">{eyebrow}</span>
				<h1 className="display mt-3 text-[clamp(2rem,5vw,3rem)] tracking-[-0.01em]">{title}</h1>
				<div className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">{intro}</div>
				<div className="mt-10">{children}</div>
			</main>
			<Footer />
		</>
	);
}

const HOME: Crumb = { label: 'Home', href: '/' };
const BLOG: Crumb = { label: 'Blog', href: '/blog' };
const TOPICS: Crumb = { label: 'Topics', href: BLOG_TOPICS_PATH };

export function TopicsIndexPage() {
	const subjects = BLOG_TOPICS.filter((topic) => topic.kind === 'subject');
	const brands = BLOG_TOPICS.filter((topic) => topic.kind === 'brand');
	return (
		<TopicPageFrame
			crumbs={[HOME, BLOG, TOPICS]}
			eyebrow="Lemon Law Blog"
			title="Browse Articles by Topic and Manufacturer"
			intro={
				<p>
					Every article on the blog, grouped by subject and by the manufacturer it covers. Pick a
					topic to see all related posts in one place.
				</p>
			}
		>
			<h2 className="text-xl font-semibold text-fg">By topic</h2>
			<ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{subjects.map((topic) => (
					<li key={topic.slug} className="card card-static card-pad">
						<Link
							href={blogTopicPath(topic.slug)}
							className="font-semibold text-fg hover:text-gold"
						>
							{topic.label}
						</Link>
						<p className="mt-1 text-[14px] text-muted">{topic.description}</p>
						<p className="mt-2 text-[12px] text-subtle">{topic.posts.length} articles</p>
					</li>
				))}
			</ul>
			<h2 className="mt-12 text-xl font-semibold text-fg">By manufacturer</h2>
			<ul className="mt-4 flex flex-wrap gap-2">
				{brands.map((topic) => (
					<li key={topic.slug}>
						<Link
							href={blogTopicPath(topic.slug)}
							className="inline-flex rounded-full border border-line/60 px-3 py-1.5 text-[14px] text-muted hover:border-gold/40 hover:text-gold"
						>
							{topic.label} ({topic.posts.length})
						</Link>
					</li>
				))}
			</ul>
		</TopicPageFrame>
	);
}

export function TopicPage({ topic }: { topic: BlogTopic }) {
	return (
		<TopicPageFrame
			crumbs={[HOME, BLOG, TOPICS, { label: topic.label, href: blogTopicPath(topic.slug) }]}
			eyebrow={topic.kind === 'brand' ? 'Manufacturer' : 'Topic'}
			title={
				topic.kind === 'brand' ? `${topic.label} Lemon Law Articles` : `${topic.label}: Articles`
			}
			intro={
				<>
					<p>{topic.description}</p>
					{topic.kind === 'brand' ? (
						<p className="mt-3">
							Have a {topic.label} with a recurring problem? See{' '}
							<Link href={`/manufacturers/${topic.slug}`} className="font-semibold text-gold">
								{topic.label} lemon law claims in California
							</Link>{' '}
							or{' '}
							<Link href="/contact" className="font-semibold text-gold">
								request a free case review
							</Link>
							.
						</p>
					) : null}
				</>
			}
		>
			<PostList posts={topic.posts} />
			<div className="mt-12">
				<TopicChips
					topics={BLOG_TOPICS.filter((other) => other.slug !== topic.slug)}
					label="More topics"
				/>
			</div>
		</TopicPageFrame>
	);
}
