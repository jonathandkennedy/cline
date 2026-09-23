'use client';

declare global {
	interface Window {
		eapps?: { platform?: { initialize?: () => void } };
	}
}

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ELFSIGHT_LEARN_FEED, LEARN_FEED_PLACEHOLDER } from '@/lib/cms';

const ELFSIGHT_APP_CLASS = `elfsight-app-${ELFSIGHT_LEARN_FEED.appId}`;
const FEED_READY_POLL_MS = 400;
const FEED_EMPTY_AFTER_MS = 8_000;

const FEED_POST_SELECTORS = [
	'iframe',
	'.eapps-instagram-feed-posts-item',
	'.eapps-instagram-feed-posts-grid-item',
	'[class*="instagram-feed-post"]',
	'a[href*="instagram.com/p/"]',
].join(', ');

function initElfsightPlatform() {
	window.eapps?.platform?.initialize?.();
}

function feedHasContent(root: HTMLElement): boolean {
	if (root.querySelector(FEED_POST_SELECTORS)) return true;

	const widget = root.querySelector<HTMLElement>('.eapps-widget, .eapps-instagram-feed');
	if (!widget) return false;

	if (widget.querySelector(FEED_POST_SELECTORS)) return true;

	return widget.childElementCount > 0 && widget.offsetHeight > 96;
}

export function ElfsightLearnFeed() {
	const rootRef = useRef<HTMLDivElement>(null);
	const [platformReady, setPlatformReady] = useState(
		() => typeof window !== 'undefined' && !!window.eapps?.platform,
	);
	const [feedState, setFeedState] = useState<'loading' | 'ready' | 'empty'>('loading');

	const markReady = useCallback(() => {
		setFeedState((prev) => (prev === 'ready' ? prev : 'ready'));
	}, []);

	const onPlatformReady = useCallback(() => {
		setPlatformReady(true);
		initElfsightPlatform();
	}, []);

	const onAppMount = useCallback((node: HTMLDivElement | null) => {
		if (!node) return;
		initElfsightPlatform();
	}, []);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const sync = () => {
			if (feedHasContent(root)) markReady();
		};

		sync();
		const observer = new MutationObserver(sync);
		observer.observe(root, { childList: true, subtree: true });

		const pollTimer = setInterval(sync, FEED_READY_POLL_MS);
		const emptyTimer = setTimeout(() => {
			setFeedState((prev) => (prev === 'loading' ? 'empty' : prev));
		}, FEED_EMPTY_AFTER_MS);

		return () => {
			observer.disconnect();
			clearInterval(pollTimer);
			clearTimeout(emptyTimer);
		};
	}, [markReady, platformReady]);

	useEffect(() => {
		if (!platformReady) return;
		const root = rootRef.current;
		if (!root) return;
		initElfsightPlatform();
		if (feedHasContent(root)) markReady();
	}, [platformReady, markReady]);

	// Elfsight marks the mute control pointer-events:none; force hit-testing
	// for tablet / touch so unmute gestures reach the widget handler.
	useEffect(() => {
		if (typeof document === 'undefined') return;

		const SOUND_SELECTOR = '.eapps-instagram-feed-popup-item-media-video-sound';
		const POPUP_VISIBLE =
			'.eapps-instagram-feed-popup-visible, .eapps-instagram-feed-popup.eapps-instagram-feed-popup-visible';

		const syncSoundControls = () => {
			document.querySelectorAll<HTMLElement>(SOUND_SELECTOR).forEach((el) => {
				if (el.style.pointerEvents !== 'auto') {
					el.style.pointerEvents = 'auto';
				}
				if (el.style.cursor !== 'pointer') {
					el.style.cursor = 'pointer';
				}
			});
			const open = !!document.querySelector(POPUP_VISIBLE);
			document.documentElement.toggleAttribute('data-instagram-popup-open', open);
		};

		syncSoundControls();
		const observer = new MutationObserver(syncSoundControls);
		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['class', 'style'],
		});
		return () => {
			observer.disconnect();
			document.documentElement.removeAttribute('data-instagram-popup-open');
		};
	}, []);

	const showPlaceholder = feedState !== 'ready';
	const copy = LEARN_FEED_PLACEHOLDER;
	const placeholderMessage = feedState === 'loading' ? copy.loadingMessage : copy.emptyMessage;

	return (
		<div ref={rootRef} className="learn-elfsight relative w-full">
			<Script
				src={ELFSIGHT_LEARN_FEED.platformScript}
				strategy="afterInteractive"
				onReady={onPlatformReady}
			/>
			<div className="relative w-full min-h-[min(420px,50vh)]">
				<div className="learn-elfsight__mount">
					<div ref={onAppMount} className={ELFSIGHT_APP_CLASS} />
				</div>
				{showPlaceholder ? (
					<div
						className="learn-feed-skeleton"
						aria-busy={feedState === 'loading'}
						aria-live="polite"
					>
						<div className="learn-feed-skeleton__header" aria-hidden>
							<div className="learn-feed-skeleton__avatar learn-feed-skeleton__shimmer" />
							<div className="learn-feed-skeleton__profile">
								<div className="learn-feed-skeleton__line learn-feed-skeleton__line--title learn-feed-skeleton__shimmer" />
								<div className="learn-feed-skeleton__line learn-feed-skeleton__line--handle learn-feed-skeleton__shimmer" />
							</div>
							<div className="learn-feed-skeleton__follow learn-feed-skeleton__shimmer" />
						</div>
						<div className="learn-feed-skeleton__grid" aria-hidden>
							{Array.from({ length: 6 }, (_, index) => (
								<div
									key={index}
									className="learn-feed-skeleton__tile learn-feed-skeleton__shimmer"
								/>
							))}
						</div>
						{feedState !== 'loading' ? (
							<p className="learn-feed-skeleton__copy">
								{placeholderMessage}{' '}
								<a
									href={copy.instagramHref}
									target="_blank"
									rel="noopener noreferrer"
									className="learn-feed-skeleton__link"
								>
									{copy.instagramHandle}
								</a>
							</p>
						) : null}
					</div>
				) : null}
			</div>
		</div>
	);
}
