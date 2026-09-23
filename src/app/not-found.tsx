import type { Metadata } from 'next';
import { ArrowLeft, Compass } from 'lucide-react';
import { Footer, Link } from '@/components';
import { TOOLS } from '@/lib/cms';

export const metadata: Metadata = {
	title: { absolute: 'Page Not Found | CLINE APC' },
	robots: { index: false, follow: true },
};

export default function NotFound() {
	return (
		<div className="flex min-h-[calc(100dvh-var(--header-outer-h,63px))] flex-col">
			<main className="container-x flex flex-1 flex-col items-center justify-center py-16 text-center md:py-24">
				<span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface">
					<Compass size={24} className="text-gold" />
				</span>

				<span className="eyebrow mt-6">404 · Page Not Found</span>

				<h1 className="display mt-3 text-[clamp(2.25rem,5.8vw,3.35rem)] tracking-[-0.01em]">
					This page took a wrong turn.
				</h1>

				<p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted">
					The page you&rsquo;re looking for doesn&rsquo;t exist. Return home or use a free tool to
					research your California Lemon Law claim.
				</p>

				<Link href="/" className="btn btn-primary btn-lg mt-8">
					<ArrowLeft size={17} /> Back Home
				</Link>

				<div className="mt-12 grid w-full max-w-2xl grid-gap sm:grid-cols-2 lg:grid-cols-3">
					{TOOLS.map((t) => (
						<Link
							key={t.slug}
							href={`/tool/${t.slug}`}
							className="card card-static card-pad flex min-h-[5.5rem] items-center text-left text-[14.5px] font-semibold leading-snug text-fg transition hover:border-gold/40"
						>
							{t.title}
						</Link>
					))}
				</div>
			</main>

			<Footer />
		</div>
	);
}
