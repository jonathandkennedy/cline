'use client';

import { Link } from '@/kit/shared';
import { AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';
import { Footer } from '@/components/footer';
import { APP_SHELL, BRAND } from '@/lib/cms';

export default function ErrorPage({
	error: _error,
	reset,
}: {
	error: globalThis.Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex min-h-[calc(100dvh-var(--header-outer-h,63px))] flex-col bg-base">
			<main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
				<span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface">
					<AlertTriangle size={24} className="text-cta" />
				</span>
				<span className="eyebrow mt-6">{APP_SHELL.error.eyebrow}</span>
				<h1 className="display mt-3 text-[clamp(1.95rem,5vw,2.75rem)] tracking-[-0.01em]">
					{APP_SHELL.error.title}
				</h1>
				<p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-muted">
					{APP_SHELL.error.bodyPrefix}
					<a href={BRAND.phoneHref} className="font-semibold text-gold hover:underline">
						{BRAND.phoneDisplay}
					</a>
					.
				</p>
				<div className="mt-8 flex flex-col gap-3 sm:flex-row">
					<button type="button" onClick={reset} className="btn btn-primary btn-lg">
						<RotateCcw size={16} /> Try Again
					</button>
					<Link href="/" className="btn btn-secondary btn-lg">
						<ArrowLeft size={16} /> Back Home
					</Link>
				</div>
			</main>
			<Footer compact />
		</div>
	);
}
