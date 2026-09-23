import { Link } from '@/components/link';
import { formatUsd } from '@/lib/numbers';
import {
	type CaseResult,
	getHomeTickerResults,
	logoForMake,
	RESULT_BADGE_CLASS,
	resolveResultCaseStudyHref,
} from '@/lib/cms';
import { BrandLogo } from '@/components/emblem';
import { MarqueeTrack } from '@/components/marquee';

function ResultCard({ r }: { r: CaseResult }) {
	const logo = logoForMake(r.make);
	const badgeClass = RESULT_BADGE_CLASS[r.type] ?? RESULT_BADGE_CLASS.default;
	const href = resolveResultCaseStudyHref(r);

	return (
		<Link
			href={href}
			className="group grid w-[min(100%,300px)] shrink-0 grid-cols-[minmax(0,1fr)_auto] grid-rows-2 items-center gap-x-2.5 gap-y-0.5 overflow-hidden rounded-xl border border-line bg-surface/70 px-2.5 py-2 transition hover:border-gold/35 hover:bg-surface/90 sm:w-[300px]"
		>
			<div className="truncate text-[11.5px] font-medium text-subtle">
				{r.vehicle} · <span className="font-semibold text-fg/90">Composite example</span>
			</div>
			{logo ? (
				<BrandLogo
					src={logo}
					className="h-6 w-[4.75rem] shrink-0 justify-self-end text-fg opacity-40 transition group-hover:opacity-55"
				/>
			) : (
				<span aria-hidden className="h-6 w-[4.75rem]" />
			)}
			<div className="tabular text-[23px] font-bold leading-tight text-recovery">
				{formatUsd(r.amount)}
			</div>
			<span className={`justify-self-end ${badgeClass}`}>{r.type}</span>
		</Link>
	);
}

export function SuccessTicker() {
	const items = getHomeTickerResults();

	return (
		<div
			role="region"
			className="ticker-mask relative overflow-hidden py-1"
			aria-label="Representative composite outcomes, not actual client results"
		>
			<div className="marquee gap-1">
				<MarqueeTrack<CaseResult>
					items={items}
					keyFn={(r) => `${r.vehicle}-${r.amount}`}
					render={(r) => <ResultCard r={r} />}
				/>
			</div>
		</div>
	);
}
