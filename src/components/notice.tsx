'use client';

import { cn } from '@/kit/shared';
import { Info, X } from 'lucide-react';

export function ToolSessionNotice({
	message,
	onDismiss,
}: {
	message: string;
	onDismiss: () => void;
}) {
	return (
		<div
			role="status"
			className={cn(
				'flex items-center gap-3 border-b border-line bg-ink/50 px-[22px] py-2 md:px-4',
			)}
		>
			<Info size={15} className="shrink-0 text-muted/33" aria-hidden="true" />
			<p className="min-w-0 flex-1 text-[13px] leading-snug text-muted">{message}</p>
			<button
				type="button"
				onClick={onDismiss}
				className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-[12px] font-medium text-subtle transition hover:bg-surface hover:text-fg"
			>
				<span className="sr-only">Dismiss</span>
				<X size={14} aria-hidden="true" />
			</button>
		</div>
	);
}
