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
	return pageMetadata({
		title: page.seoTitle,
		description: page.seoDescription,
		canonical: options.canonicalPath(slug),
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
		title: `${tool.seoTitle} · Free`,
		description: tool.seoDescription,
		canonical: `/tool/${tool.slug}`,
	});
}
