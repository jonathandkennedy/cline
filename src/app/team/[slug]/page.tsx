import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Footer, JsonLd, Link } from '@/components';
import { BLOG_POSTS, BRAND, blogDetailPath, SITE_HOME_BREADCRUMB, SITE_URL } from '@/lib/cms';
import { listTeamProfileIds, TEAM_MEMBERS, teamMemberPath } from '@/lib/cms/tables/team';
import { pageMetadata } from '@/lib/seo';
import { AUTHOR_ID, breadcrumbLd, publisherLdRef } from '@/lib/structured';

export const dynamicParams = false;

export function generateStaticParams() {
	return listTeamProfileIds().map((slug) => ({ slug }));
}

function getProfile(slug: string) {
	const member = TEAM_MEMBERS.find((m) => m.id === slug);
	return member?.profile ? { ...member, profile: member.profile } : undefined;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const member = getProfile(slug);
	if (!member) return {};
	const lead = member.bio[0] ?? '';
	return pageMetadata({
		title: `${member.name}, ${member.role} | ${BRAND.name}`,
		description: lead.length > 158 ? `${lead.slice(0, lead.lastIndexOf(' ', 155))}…` : lead,
		canonical: teamMemberPath(member.id),
	});
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const member = getProfile(slug);
	if (!member) notFound();

	const path = teamMemberPath(member.id);
	const isAuthor = member.id === 'brian-cline';
	const recentPosts = isAuthor
		? [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
		: [];
	const personId = isAuthor ? AUTHOR_ID : `${SITE_URL}${path}#person`;

	const ld = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'ProfilePage',
				'@id': `${SITE_URL}${path}`,
				url: `${SITE_URL}${path}`,
				name: `${member.name}, ${member.role}`,
				mainEntity: { '@id': personId },
			},
			{
				'@type': 'Person',
				'@id': personId,
				name: member.id === 'brian-cline' ? BRAND.founder : member.name,
				jobTitle: member.profile.jobTitle,
				url: `${SITE_URL}${path}`,
				image: `${SITE_URL}${member.image}`,
				worksFor: publisherLdRef(),
				...(member.profile.email ? { email: member.profile.email } : {}),
				...(member.profile.alumniOf
					? {
							alumniOf: member.profile.alumniOf.map((name) => ({
								'@type': 'EducationalOrganization',
								name,
							})),
						}
					: {}),
				...(member.profile.memberOf
					? {
							memberOf: member.profile.memberOf.map((name) => ({ '@type': 'Organization', name })),
						}
					: {}),
				...(member.profile.knowsAbout ? { knowsAbout: member.profile.knowsAbout } : {}),
				description: member.bio[0],
			},
			breadcrumbLd([
				SITE_HOME_BREADCRUMB,
				{ label: 'Team', href: '/team' },
				{ label: member.name, href: path },
			]),
		],
	};

	return (
		<>
			<JsonLd data={ld} />
			<main id="main" className="container-x py-12 md:py-16">
				<nav aria-label="Breadcrumb" className="text-[13px] text-subtle">
					<Link href="/" className="hover:text-gold">
						Home
					</Link>{' '}
					/{' '}
					<Link href="/team" className="hover:text-gold">
						Team
					</Link>{' '}
					/ <span className="text-muted">{member.name}</span>
				</nav>
				<div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
					<div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[var(--radius-card)] border border-line/70 bg-ink/35 lg:mx-0">
						<Image
							src={member.image}
							alt={member.imageAlt}
							fill
							priority
							sizes="(max-width: 1024px) 80vw, 320px"
							className="object-cover object-top"
						/>
					</div>
					<div className="max-w-2xl">
						<h1 className="display text-[clamp(2rem,5vw,3rem)] tracking-[-0.01em]">
							{member.name}
						</h1>
						<p className="mt-2 text-[13px] font-medium uppercase tracking-[0.16em] text-gold">
							{member.role}
						</p>
						<div className="mt-6 space-y-4 text-[16px] leading-relaxed text-muted">
							{member.bio.map((paragraph) => (
								<p key={paragraph.slice(0, 40)}>{paragraph}</p>
							))}
						</div>
						{member.profile.email ? (
							<p className="mt-6 text-[15px] text-muted">
								Email:{' '}
								<a href={`mailto:${member.profile.email}`} className="text-fg hover:text-gold">
									{member.profile.email}
								</a>
							</p>
						) : null}
						<div className="mt-8 flex flex-wrap gap-3">
							<Link href="/contact" className="btn btn-primary btn-md">
								Free case review
							</Link>
							<Link href="/team" className="btn btn-md">
								Meet the whole team
							</Link>
						</div>
						{recentPosts.length > 0 ? (
							<section className="mt-12">
								<h2 className="text-xl font-semibold text-fg">Recent articles by {member.name}</h2>
								<ul className="mt-4 space-y-2 text-[15px]">
									{recentPosts.map((post) => (
										<li key={post.slug}>
											<Link
												href={blogDetailPath(post.slug)}
												className="text-muted underline-offset-4 hover:text-gold hover:underline"
											>
												{post.title}
											</Link>
										</li>
									))}
								</ul>
								<p className="mt-4">
									<Link href="/blog" className="font-semibold text-gold hover:underline">
										All articles
									</Link>
								</p>
							</section>
						) : null}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
