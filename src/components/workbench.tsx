'use client';

import { cn } from '@/kit/shared';
import type { ReactNode } from 'react';
import { ProgressFill } from '@/components/fill';

export function ToolWorkbench({
	headerLead,
	progress,
	headerAside,
	notice,
	rail,
	foot,
	className = '',
	mainClassName = '',
	children,
}: {
	headerLead?: ReactNode;
	progress?: { percent: number; ariaLabel: string };
	headerAside?: ReactNode;
	notice?: ReactNode;
	rail?: ReactNode;
	foot?: ReactNode;
	className?: string;
	mainClassName?: string;
	children: ReactNode;
}) {
	const hasLead = Boolean(headerLead) || progress != null;

	return (
		<div className={cn('workbench', className)}>
			{hasLead || headerAside ? (
				<div className={`workbench-head${hasLead ? '' : ' workbench-head--actions-only'}`}>
					{hasLead ? (
						<div className="workbench-head__lead">
							{headerLead}
							{progress != null ? (
								<div
									className="workbench-head__progress progress"
									role="progressbar"
									aria-label={progress.ariaLabel}
									aria-valuenow={progress.percent}
									aria-valuemin={0}
									aria-valuemax={100}
								>
									<ProgressFill percent={progress.percent} />
								</div>
							) : null}
						</div>
					) : null}
					{headerAside ? <div className="workbench-head__actions">{headerAside}</div> : null}
				</div>
			) : null}

			{notice}

			<div className={`workbench-body${rail ? ' has-rail' : ''}`}>
				<div className={cn('workbench-main', mainClassName)}>{children}</div>
				{rail ? (
					<aside className="workbench-rail">
						<div className="workbench-rail-sticky">{rail}</div>
					</aside>
				) : null}
			</div>

			{foot ? <div className="workbench-foot">{foot}</div> : null}
		</div>
	);
}
