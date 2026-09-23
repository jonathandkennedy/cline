import { memo } from 'react';
import { Reveal } from '@/components';
import { FunnelCtaBanner } from '@/components/funnel';
import { UI_COPY } from '@/lib/cms';
import { components } from '@/kit/theme';

function ClosingComponent() {
	return (
		<section className={components.homeClosingSection}>
			<div className={components.homeClosingInner}>
				<Reveal>
					<FunnelCtaBanner
						imageSrc="/images/cta-california.jpg"
						imageAlt={UI_COPY.home.finalCtaImageAlt}
						showFooterLinks
					/>
				</Reveal>
			</div>
		</section>
	);
}

export const Closing = memo(ClosingComponent);
