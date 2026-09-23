import type { ReviewSource } from '@/lib/cms';
import { cn } from '@/kit/shared';

const SOURCE_LABEL: Record<ReviewSource, string> = {
	google: 'Google',
	yelp: 'Yelp',
};

function GoogleIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" role="img">
			<title>Google</title>
			<path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
				fill="#4285F4"
			/>
			<path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
				fill="#34A853"
			/>
			<path
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
				fill="#FBBC05"
			/>
			<path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
				fill="#EA4335"
			/>
		</svg>
	);
}

function YelpIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={className} aria-hidden role="img">
			<title>Yelp</title>
			<rect width="24" height="24" rx="4" fill="#D32323" />
			<path
				fill="#fff"
				d="M6.5 8.2c0-.5.4-.9.9-.9h1.3c.5 0 .9.4.9.9v7.6c0 .5-.4.9-.9.9H7.4c-.5 0-.9-.4-.9-.9V8.2Zm4.8 0c0-.5.4-.9.9-.9h1.3c.5 0 .9.4.9.9v7.6c0 .5-.4.9-.9.9h-1.3c-.5 0-.9-.4-.9-.9V8.2Zm4.8 0c0-.5.4-.9.9-.9h1.3c.5 0 .9.4.9.9v7.6c0 .5-.4.9-.9.9h-1.3c-.5 0-.9-.4-.9-.9V8.2Z"
			/>
		</svg>
	);
}

export function ReviewSourceBadge({
	source,
	className,
	showLabel = true,
}: {
	source: ReviewSource;
	className?: string;
	showLabel?: boolean;
}) {
	const Icon = source === 'google' ? GoogleIcon : YelpIcon;
	return (
		<span
			className={cn(
				'inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-2 py-0.5 text-[11px] font-medium text-subtle',
				className,
			)}
		>
			<Icon className="h-3.5 w-3.5 shrink-0" />
			{showLabel ? (
				<span>{SOURCE_LABEL[source]}</span>
			) : (
				<span className="sr-only">{SOURCE_LABEL[source]}</span>
			)}
		</span>
	);
}
