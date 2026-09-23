import { memo } from 'react';
import { Reveal } from '@/components';
import { LEARN_INTRO_VIDEO } from '@/lib/cms';
import { components } from '@/kit/theme';

function IntroVideoComponent() {
	const copy = LEARN_INTRO_VIDEO;

	return (
		<section className={components.homeIntroVideoRoot}>
			<div className={components.homeIntroVideoInner}>
				<div className={components.homeIntroVideoGrid}>
					<Reveal>
						<h2 className={components.homeIntroVideoTitle}>
							{copy.headlineBefore}{' '}
							<span className={components.homeIntroVideoTitleAccent}>{copy.headlineAccent}</span>
						</h2>
						<div className={components.homeIntroVideoFrame}>
							<iframe
								className={components.homeIntroVideoIframe}
								src={copy.embedSrc}
								title={copy.title}
								loading="lazy"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
							/>
						</div>
					</Reveal>

					<Reveal delay={90}>
						<div className={components.homeIntroVideoCopy}>
							{copy.paragraphs.map((paragraph) => (
								<p key={paragraph.slice(0, 48)} className={components.homeIntroVideoParagraph}>
									{paragraph}
								</p>
							))}
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

export const IntroVideo = memo(IntroVideoComponent);
