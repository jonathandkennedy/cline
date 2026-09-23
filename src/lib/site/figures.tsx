import { Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { CountUp } from '@/components/counter';
import type { HomeStat } from '@/lib/cms';

function StaticStatValue({ stat }: { stat: HomeStat & { kind: 'static' } }) {
	return <>{stat.staticValue}</>;
}

function CountStatValue({ stat }: { stat: HomeStat & { kind: 'count' } }) {
	return (
		<span className="inline-flex items-center justify-center gap-2">
			<CountUp to={stat.countTo ?? 0} decimals={stat.countDecimals} suffix={stat.countSuffix} />
			{stat.withStar && (
				<Star size={15} className="text-gold fill-gold" strokeWidth={1.5} aria-hidden="true" />
			)}
		</span>
	);
}

export const HOME_STAT_VALUE_BY_KIND = {
	static: (stat: HomeStat) => <StaticStatValue stat={stat as HomeStat & { kind: 'static' }} />,
	count: (stat: HomeStat) => <CountStatValue stat={stat as HomeStat & { kind: 'count' }} />,
} satisfies Record<HomeStat['kind'], (stat: HomeStat) => ReactNode>;
