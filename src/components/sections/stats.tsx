import { memo } from 'react';
import Link from '@/components/link';
import { HOME_STATS } from '@/lib/cms';
import { HOME_STAT_VALUE_BY_KIND } from '@/lib/site/figures';
import { components } from '@/kit/theme';

function StatsComponent() {
	return (
		<section className={components.homeStatsRoot}>
			<div className={`${components.shell} section-y-sm`}>
				<div className={components.homeStatsGrid}>
					{HOME_STATS.map((s) => (
						<Link
							key={s.label}
							href={s.href}
							aria-label={s.label}
							className={components.homeStatsCell}
						>
							<div aria-hidden className={components.homeStatsCellHoverLine} />
							<div className={components.homeStatsValue}>{HOME_STAT_VALUE_BY_KIND[s.kind](s)}</div>
							<div className={components.homeStatsLabel}>{s.label}</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

export const Stats = memo(StatsComponent);
