import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components';
import { toolQueryModeFromSearchParams } from '@/lib/lookup';
import {
	getTool,
	slugSegmentStaticParams,
	TOOLS,
	type ToolSlug,
	toolSlugSegmentGenerateMetadata,
} from '@/lib/site';
import { toolLd } from '@/lib/structured';
import { ToolClient } from '@/tools';

/** Tool UI is pipeline JSON; catalog `tool-shell` chrome ref not wired through renderSitePage yet. */

export const dynamic = 'force-dynamic';

export const dynamicParams = false;

export function generateStaticParams() {
	return slugSegmentStaticParams(() => TOOLS.map((t) => t.slug));
}

export function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	return toolSlugSegmentGenerateMetadata({ params }, getTool);
}

export default async function ToolPage({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const { slug } = await params;
	const tool = getTool(slug);
	if (!tool) notFound();

	const queryMode = toolQueryModeFromSearchParams(await searchParams);
	const ld = toolLd(tool.slug);

	return (
		<>
			{ld && <JsonLd data={ld} />}
			<ToolClient slug={tool.slug as ToolSlug} queryMode={queryMode} />
		</>
	);
}
