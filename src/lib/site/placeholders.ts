import type { Metadata } from 'next';
import { getSitePageDefinition, type SitePageId } from '@/lib/cms/catalog';
import { pageMetadata } from '@/lib/seo';

export function emptyBlockMap<T extends string>(ids: readonly T[]): Record<T, () => null> {
	return Object.fromEntries(ids.map((id) => [id, () => null])) as Record<T, () => null>;
}

export function slugSegmentStaticParams(listSlugs: () => readonly string[]): { slug: string }[] {
	return listSlugs().map((slug) => ({ slug }));
}

type RouteSegmentSeo = {
	seoTitle: string;
	seoDescription: string;
	kind?: string;
	date?: string;
	modified?: string;
	thumbnail?: string;
	thumbnailAlt?: string;
	cardImage?: string;
	cardImageAlt?: string;
};

type SlugDetailMetadataOptions = {
	resolve: (slug: string) => RouteSegmentSeo | undefined;
	canonicalPath: (slug: string) => string;
	notFoundTitle: string;
};

export async function slugSegmentGenerateMetadata(
	{ params }: { params: Promise<{ slug: string }> },
	options: SlugDetailMetadataOptions,
): Promise<Metadata> {
	const { slug } = await params;
	const page = options.resolve(slug);
	if (!page) return { title: options.notFoundTitle };
	// Blog and case-study images are 1200×675; smaller thumbnails fall back to the template card.
	const imageUrl = page.kind === 'blog' ? page.thumbnail : page.cardImage;
	const isArticle = Boolean(page.date);
	return pageMetadata({
		title: page.seoTitle,
		description: page.seoDescription,
		canonical: options.canonicalPath(slug),
		type: isArticle ? 'article' : 'website',
		publishedTime: page.date,
		modifiedTime: page.modified,
		...(imageUrl
			? {
					image: {
						url: imageUrl,
						alt: page.thumbnailAlt ?? page.cardImageAlt,
						width: 1200,
						height: 675,
					},
				}
			: {}),
	});
}

export async function hubSegmentGenerateMetadata(
	seo: RouteSegmentSeo,
	canonicalPath: string,
	pageId?: SitePageId,
): Promise<Metadata> {
	const path = pageId != null ? getSitePageDefinition(pageId).route : canonicalPath;
	return pageMetadata({
		title: seo.seoTitle,
		description: seo.seoDescription,
		canonical: path,
	});
}

type ToolSlugSeo = RouteSegmentSeo & { slug: string };

export async function toolSlugSegmentGenerateMetadata(
	{ params }: { params: Promise<{ slug: string }> },
	lookup: (slug: string) => ToolSlugSeo | undefined,
): Promise<Metadata> {
	const { slug } = await params;
	const tool = lookup(slug);
	if (!tool) return { title: 'Tool not found' };

	return pageMetadata({
		title: `${tool.seoTitle} | CLINE APC`,
		description: tool.seoDescription,
		canonical: `/tool/${tool.slug}`,
	});
}
