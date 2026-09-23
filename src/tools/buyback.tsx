'use client';

import { Check, Info } from 'lucide-react';
import { ToolSessionNotice, ToolWorkbench } from '@/components';
import { formatNumber } from '@/lib/numbers';
import {
	BUYBACK_BREAKDOWN_ROWS,
	BUYBACK_RAIL_CHROME,
	BUYBACK_SLIDER_FIELDS,
	type BuybackState,
	embedAwareSiteUrl,
	UI_COPY,
	formatBrandTemplate,
} from '@/lib/cms';
import { useSearchParams } from 'next/navigation';
import { useBuybackCalculator } from '@/tools/estimator';
import { BuybackQuickScenarios } from '@/tools/scenarios';
import { BuybackShareButton } from '@/tools/share';
import { type OpenLead, Slider, ToolStickyBar, useOpenLeadPrefill } from '@/tools/shared';
import { BuybackCalculatorRail } from '@/tools/sidebar';
import { TOOL_SECTION_LABEL_CLASS } from '@/tools/tokens';
import { ToolWorkbenchActions } from '@/tools/toolbar';

export function BuybackCalculator({
	onOpenLead,
	onRestart,
}: {
	onOpenLead: OpenLead;
	onRestart?: () => void;
}) {
	const {
		prefilled,
		showResume,
		linkCopied,
		price,
		setPrice,
		months,
		setMonths,
		milesAtFirstRepair,
		setMilesAtFirstRepair,
		attempts,
		setAttempts,
		days,
		setDays,
		calc,
		applyState,
		startOver,
		shareLink,
		dismissResume,
		prefill,
		currentState,
		isAtDefaults,
	} = useBuybackCalculator(onRestart);
	const searchParams = useSearchParams();

	const handleOpenLead = useOpenLeadPrefill(onOpenLead, prefill);

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="tool-canvas">
				<ToolWorkbench
					headerLead={<BuybackQuickScenarios current={currentState} onApply={applyState} />}
					notice={
						showResume ? (
							<ToolSessionNotice
								message={UI_COPY.tools.buybackRestoredBanner}
								onDismiss={dismissResume}
							/>
						) : undefined
					}
					headerAside={
						<ToolWorkbenchActions
							onReset={startOver}
							showReset={!isAtDefaults}
							extra={<BuybackShareButton copied={linkCopied} onShare={shareLink} />}
						/>
					}
					rail={<BuybackCalculatorRail calc={calc} prefill={prefill} onOpenLead={onOpenLead} />}
					foot={
						<>
							<Info size={13} className="mt-0.5 shrink-0 text-subtle" />
							<span>
								Models California&apos;s buyback remedy (Cal. Civ. Code § 1793.2(d)(2)): price
								refunded, plus collateral charges (tax, license, registration) and incidental
								damages, minus the statutory mileage offset (price × miles-before-first-repair ÷
								120,000). Actual recovery depends on your documentation, exact facts, and
								negotiation or litigation.{' '}
								<a
									href={embedAwareSiteUrl('/', 'buyback_calculator', searchParams)}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gold/80 underline-offset-2 transition hover:text-gold"
								>
									{formatBrandTemplate(UI_COPY.chrome.buybackLearnLink)}
								</a>
								.
							</span>
						</>
					}
				>
					{prefilled && (
						<div className="mb-7 flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-[13px] text-gold-soft">
							<Check size={15} className="shrink-0" />
							Loaded with your numbers. Adjust anything for a sharper estimate.
						</div>
					)}

					<div className="min-h-[18px]">
						<span className={TOOL_SECTION_LABEL_CLASS}>{BUYBACK_RAIL_CHROME.yourVehicleLabel}</span>
					</div>
					<div className="mt-3 grid grid-gap lg:grid-cols-2 lg:gap-y-7">
						{BUYBACK_SLIDER_FIELDS.map((field) => {
							const values: BuybackState = {
								price,
								months,
								miles: milesAtFirstRepair,
								attempts,
								days,
							};
							const setters: Record<keyof BuybackState, (v: number) => void> = {
								price: setPrice,
								months: setMonths,
								miles: setMilesAtFirstRepair,
								attempts: setAttempts,
								days: setDays,
							};
							const value = values[field.key];
							const slider = (
								<Slider
									key={field.key}
									label={field.label}
									value={value}
									min={field.min}
									max={field.max}
									step={field.step}
									onChange={setters[field.key]}
									display={field.display(value)}
									minLabel={field.minLabel}
									maxLabel={field.maxLabel}
									hint={field.hint?.(value)}
								/>
							);
							return field.fullWidth ? (
								<div key={field.key} className="lg:col-span-2">
									{slider}
								</div>
							) : (
								slider
							);
						})}
					</div>

					<hr className="tool-divider" />

					<div>
						<span className={TOOL_SECTION_LABEL_CLASS}>
							{BUYBACK_RAIL_CHROME.recoveryBreakdownLabel}
						</span>

						<div className={BUYBACK_RAIL_CHROME.recoveryBreakdownGrid}>
							{BUYBACK_BREAKDOWN_ROWS.map((b) => (
								<div key={b.label} className={BUYBACK_RAIL_CHROME.recoveryBreakdownCell}>
									<div className={BUYBACK_RAIL_CHROME.recoveryBreakdownCaption}>
										<span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${b.dotClass}`} />
										{b.label}
									</div>
									<div className={BUYBACK_RAIL_CHROME.recoveryBreakdownValue}>
										{b.sign}${formatNumber(calc.breakdown[b.key])}
									</div>
								</div>
							))}
						</div>
					</div>
				</ToolWorkbench>
			</div>

			<ToolStickyBar
				label="Estimated recovery"
				value={`$${formatNumber(calc.total)}`}
				cta="Get Evaluation"
				onClick={handleOpenLead}
				tone="recovery"
			/>
		</div>
	);
}
