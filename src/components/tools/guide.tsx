import toolGuidesTable from '@/data/pages/toolguides.json';
import { Link } from '@/components/link';

type ToolGuide = {
	heading: string;
	intro: string[];
	sections: { heading: string; paragraphs?: string[]; list?: string[]; after?: string[] }[];
	examplesHeading: string;
	examples: { title: string; body: string }[];
	faq: { q: string; a: string }[];
};

const TOOL_GUIDES = toolGuidesTable.TOOL_GUIDES as Record<string, ToolGuide>;

export function getToolGuide(slug: string): ToolGuide | undefined {
	return TOOL_GUIDES[slug];
}

/**
 * Server-rendered explainer under each tool app so the page carries real content for crawlers
 * and readers, independent of the client-side tool.
 */
export function ToolGuideArticle({ slug }: { slug: string }) {
	const guide = getToolGuide(slug);
	if (!guide) return null;
	return (
		<section aria-labelledby="tool-guide" className="border-t border-dashed border-line">
			<article className="container-x mx-auto max-w-3xl py-12 text-[16px] leading-relaxed text-muted md:py-16">
				<h2 id="tool-guide" className="display text-[clamp(1.6rem,3.6vw,2.25rem)] text-fg">
					{guide.heading}
				</h2>
				{guide.intro.map((p) => (
					<p key={p} className="mt-4">
						{p}
					</p>
				))}
				{guide.sections.map((section) => (
					<div key={section.heading}>
						<h3 className="mt-10 text-xl font-semibold text-fg">{section.heading}</h3>
						{section.paragraphs?.map((p) => (
							<p key={p} className="mt-3">
								{p}
							</p>
						))}
						{section.list && (
							<ul className="mt-3 list-disc space-y-2 pl-5">
								{section.list.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						)}
						{section.after?.map((p) => (
							<p key={p} className="mt-3">
								{p}
							</p>
						))}
					</div>
				))}
				<h3 className="mt-10 text-xl font-semibold text-fg">{guide.examplesHeading}</h3>
				<ul className="mt-4 grid gap-4 md:grid-cols-3">
					{guide.examples.map((example) => (
						<li key={example.title} className="card card-static card-pad">
							<p className="font-semibold text-fg">{example.title}</p>
							<p className="mt-2 text-[15px]">{example.body}</p>
						</li>
					))}
				</ul>
				<h3 className="mt-10 text-xl font-semibold text-fg">Frequently asked questions</h3>
				<dl className="mt-4 space-y-5">
					{guide.faq.map((item) => (
						<div key={item.q}>
							<dt className="font-semibold text-fg">{item.q}</dt>
							<dd className="mt-1">{item.a}</dd>
						</div>
					))}
				</dl>
				<p className="mt-10">
					Want an attorney to look at your numbers?{' '}
					<Link href="/contact" className="font-semibold text-gold hover:underline">
						Request a free case review
					</Link>{' '}
					or read the{' '}
					<Link
						href="/info/a-comprehensive-guide-to-california-lemon-law"
						className="font-semibold text-gold hover:underline"
					>
						complete guide to California lemon law
					</Link>
					.
				</p>
			</article>
		</section>
	);
}
