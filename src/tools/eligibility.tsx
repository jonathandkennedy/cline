'use client';

import { Info } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import { useCallback, useState } from 'react';
import { ToolSessionNotice, ToolWorkbench } from '@/components';
import { usePrefersReducedMotion } from '@/hooks';
import { motionFadeUpExit, motionFadeUpVisible, motionTransition } from '@/kit/ui';
import {
	ELIGIBILITY_DISCLAIMER_ITEMS,
	ELIGIBILITY_FOOT_LINK_ITEMS,
	ELIGIBILITY_RESULTS_STEP,
	ELIGIBILITY_STICKY_BAR,
	ELIGIBILITY_STRENGTH_CHROME,
	embedAwareSiteUrl,
	formatStepLabel,
	UI_COPY,
} from '@/lib/cms';
import { useSearchParams } from 'next/navigation';
import { useEligibilityChecker } from '@/tools/assessor';
import { EligibilityAnswersRail, EligibilityCheckerRail } from '@/tools/panel';
import { EligibilityCheckerFlow } from '@/tools/pipeline';
import { type OpenLead, ToolStickyBar } from '@/tools/shared';
import { ToolWorkbenchActions } from '@/tools/toolbar';

export function EligibilityChecker({
	onOpenLead,
	onRestart,
}: {
	onOpenLead: OpenLead;
	onRestart: () => void;
}) {
	const {
		showResume,
		step,
		vehicleType,
		setVehicleType,
		withinWindow,
		setWithinWindow,
		attempts,
		setAttempts,
		daysOut,
		setDaysOut,
		impairs,
		setImpairs,
		safety,
		setSafety,
		result,
		startOver,
		advance,
		back,
		goEdit,
		openEval,
		dismissResume,
		progress,
		strengthColor,
		meterColor,
		stickyTone,
		calcHref,
		answered,
		answersSummary,
		totalSteps,
	} = useEligibilityChecker(onOpenLead, onRestart);
	const searchParams = useSearchParams();
	const reducedMotion = usePrefersReducedMotion();
	const [holdResultsRail, setHoldResultsRail] = useState(false);

	const holdResultsRailDuringExit = useCallback(
		(onStepChange: () => void) => {
			if (step === ELIGIBILITY_RESULTS_STEP) {
				setHoldResultsRail(true);
			}
			onStepChange();
		},
		[step],
	);

	const handleBack = useCallback(
		() => holdResultsRailDuringExit(back),
		[back, holdResultsRailDuringExit],
	);

	const handleGoEdit = useCallback(
		(nextStep: number) => holdResultsRailDuringExit(() => goEdit(nextStep)),
		[goEdit, holdResultsRailDuringExit],
	);

	const onStepMotionExitComplete = useCallback(() => {
		setHoldResultsRail(false);
	}, []);

	const showAnswersRail = step === ELIGIBILITY_RESULTS_STEP || holdResultsRail;

	const rail = showAnswersRail ? (
		<EligibilityAnswersRail
			answersSummary={answersSummary}
			onGoEdit={handleGoEdit}
			onStartOver={startOver}
		/>
	) : (
		<EligibilityCheckerRail
			answered={answered}
			result={result}
			strengthColor={strengthColor}
			meterColor={meterColor}
			withinWindow={withinWindow}
			impairs={impairs}
		/>
	);

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="tool-canvas">
				<ToolWorkbench
					headerLead={
						<span className="workbench-head__meta tabular">
							{step > totalSteps ? (
								'Complete'
							) : (
								<>
									<span className="sm:hidden">
										{formatStepLabel('{step}/{totalSteps}', step, totalSteps)}
									</span>
									<span className="hidden sm:inline">
										{formatStepLabel(UI_COPY.tools.eligibilityStepTemplate, step, totalSteps)}
									</span>
								</>
							)}
						</span>
					}
					progress={{
						percent: step > totalSteps ? 100 : progress,
						ariaLabel: 'Assessment progress',
					}}
					notice={
						showResume ? (
							<ToolSessionNotice
								message={UI_COPY.tools.eligibilityRestoredBanner}
								onDismiss={dismissResume}
							/>
						) : undefined
					}
					mainClassName="workbench-main-flow"
					headerAside={<ToolWorkbenchActions onReset={startOver} />}
					rail={rail}
					foot={
						<>
							<Info size={13} className="mt-0.5 shrink-0 text-subtle" />
							<span>
								{ELIGIBILITY_DISCLAIMER_ITEMS.map((text) => (
									<span key={text}>{text} </span>
								))}
								{ELIGIBILITY_FOOT_LINK_ITEMS.map((link) => (
									<a
										key={link.label}
										href={embedAwareSiteUrl(link.path, link.campaign, searchParams)}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gold/80 underline-offset-2 transition hover:text-gold"
									>
										{link.label}
									</a>
								))}
								.
							</span>
						</>
					}
				>
					<AnimatePresence mode="wait" onExitComplete={onStepMotionExitComplete}>
						<m.div
							key={step}
							className="min-w-0 w-full shrink-0"
							initial={false}
							animate={motionFadeUpVisible()}
							exit={motionFadeUpExit(reducedMotion)}
							transition={motionTransition(reducedMotion)}
						>
							<EligibilityCheckerFlow
								step={step}
								vehicleType={vehicleType}
								withinWindow={withinWindow}
								attempts={attempts}
								daysOut={daysOut}
								impairs={impairs}
								safety={safety}
								result={result}
								strengthColor={strengthColor}
								calcHref={calcHref}
								answersSummary={answersSummary}
								onVehicleType={setVehicleType}
								onWithinWindow={setWithinWindow}
								onAttemptsChange={setAttempts}
								onDaysOutChange={setDaysOut}
								onImpairs={setImpairs}
								onSafety={setSafety}
								onAdvance={advance}
								onBack={handleBack}
								onGoEdit={handleGoEdit}
								onOpenEval={openEval}
								onStartOver={startOver}
							/>
						</m.div>
					</AnimatePresence>
				</ToolWorkbench>
			</div>

			{answered && (
				<ToolStickyBar
					label={ELIGIBILITY_STICKY_BAR.label}
					value={ELIGIBILITY_STRENGTH_CHROME[result.strength].displayLabel}
					cta={ELIGIBILITY_STICKY_BAR.cta}
					onClick={openEval}
					tone={stickyTone}
				/>
			)}
		</div>
	);
}
