import { Link } from '@/components/link';
import { MANUFACTURER_LOGOS, manufacturerDetailPath } from '@/lib/cms';
import { BrandLogo } from '@/components/emblem';
import { MarqueeTrack } from '@/components/marquee';

const MANUFACTURER_LOGO_CLASS =
	'h-10 w-[9.5rem] shrink-0 text-muted/45 motion-ui transition-colors group-hover:text-gold-soft sm:h-11 sm:w-[10.5rem] md:h-12 md:w-[11.5rem]';

export function Manufacturers() {
	return (
		<div
			role="region"
			className="marquee-mask relative overflow-hidden pb-6 md:pb-8"
			aria-label="Manufacturers we take on"
		>
			<div className="marquee marquee-slow items-center gap-3 py-2 sm:gap-4 md:gap-5 md:py-3">
				<MarqueeTrack
					items={MANUFACTURER_LOGOS}
					keyFn={(m) => m.slug}
					render={(m) => (
						<Link
							href={manufacturerDetailPath(m.slug)}
							className="group flex shrink-0 items-center justify-center rounded-lg px-0.5 py-0.5 transition hover:bg-surface/40"
							aria-label={`${m.name} Lemon Law help`}
						>
							<BrandLogo src={m.logo} title={m.name} className={MANUFACTURER_LOGO_CLASS} />
						</Link>
					)}
				/>
			</div>
		</div>
	);
}
