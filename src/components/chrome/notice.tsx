'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BRAND, UI_COPY } from '@/lib/cms';
import {
	DESKTOP_TEL_TOAST_CLASS,
	DESKTOP_TEL_TOAST_ID,
	displayPhoneFromTelHref,
	shouldInterceptDesktopTel,
	telHrefFromClickTarget,
} from '@/lib/cms/tel';

const DESKTOP_TEL_TOAST_MS = 12_000;

function DesktopTelToastBody({ href }: { href: string }) {
	const [copied, setCopied] = useState(false);
	const display = displayPhoneFromTelHref(href, BRAND.phoneDisplay, BRAND.phoneHref);
	const chrome = UI_COPY.chrome;

	return (
		<div className="mt-2 flex flex-col gap-2">
			<p className="text-sm text-muted">{chrome.desktopTelNoticeBody}</p>
			<p className="text-sm font-semibold text-fg">{display}</p>
			<input
				readOnly
				value={href}
				aria-label={chrome.desktopTelInputAria}
				className="w-full rounded-md border border-white/15 bg-black/40 px-2 py-1.5 font-mono text-xs text-fg"
				onFocus={(event) => event.currentTarget.select()}
			/>
			<button
				type="button"
				className="btn btn-primary btn-sm self-start"
				aria-label={chrome.desktopTelCopyAria}
				onClick={async () => {
					try {
						if (!navigator.clipboard?.writeText) {
							toast.error(UI_COPY.tools.buybackCopyUnsupported);
							return;
						}
						await navigator.clipboard.writeText(href);
						setCopied(true);
						window.setTimeout(() => setCopied(false), 2200);
					} catch {
						toast.error(UI_COPY.tools.buybackCopyLinkError);
					}
				}}
			>
				{copied ? chrome.desktopTelCopiedLabel : chrome.desktopTelCopyLabel}
			</button>
		</div>
	);
}

export function DesktopTelNotice() {
	useEffect(() => {
		function onClick(event: MouseEvent) {
			const href = telHrefFromClickTarget(event.target);
			const hoverHover = window.matchMedia('(hover: hover)').matches;
			const pointerFine = window.matchMedia('(pointer: fine)').matches;
			const pointerCoarse = window.matchMedia('(pointer: coarse)').matches;
			const minWidthDesktop = window.matchMedia('(min-width: 1024px)').matches;
			if (
				!shouldInterceptDesktopTel({
					href,
					hoverHover,
					pointerFine,
					pointerCoarse,
					minWidthDesktop,
				})
			) {
				return;
			}
			event.preventDefault();
			event.stopPropagation();
			toast(UI_COPY.chrome.desktopTelNoticeTitle, {
				id: DESKTOP_TEL_TOAST_ID,
				className: DESKTOP_TEL_TOAST_CLASS,
				description: <DesktopTelToastBody href={href as string} />,
				duration: DESKTOP_TEL_TOAST_MS,
			});
		}

		document.addEventListener('click', onClick, true);
		return () => document.removeEventListener('click', onClick, true);
	}, []);

	return null;
}
