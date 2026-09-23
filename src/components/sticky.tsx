import { STICKY_CTA_ITEMS } from '@/lib/cms';
import { STICKY_CTA_ACTION_BY_TYPE } from '@/lib/site/gestures';

export function StickyCTA() {
	if (STICKY_CTA_ITEMS.length === 0) return null;

	return (
		<div className="scroll-affordance mobile-dock sticky-cta fixed inset-x-0 bottom-0 z-40 lg:hidden">
			<div className="mobile-dock__panel">
				<div className="mobile-dock__row">
					{STICKY_CTA_ITEMS.map((item) => (
						<span key={item.id} className="contents">
							{STICKY_CTA_ACTION_BY_TYPE[item.type](item)}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
