'use client';

import { Check, Loader2, Paperclip, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef } from 'react';

import { components } from '@/kit/theme/interface/components';

export type AttachmentIntakeStatus = 'queued' | 'reading' | 'validating' | 'ready' | 'failed';

export type AttachmentItem = {
	id: string;
	file: File;
	progress: number;
	status: AttachmentIntakeStatus;
};

export type AttachmentsCopy = {
	attachmentsLabel: string;
	attachmentsAddLabel: string;
	attachmentsRemoveAria: string;
	attachmentsStatusTemplate: string;
	attachmentsStepQueued: string;
	attachmentsStepReadingTemplate: string;
	attachmentsStepValidating: string;
	attachmentsStepReady: string;
	attachmentsStepFailed: string;
};

export type AttachmentsProps = {
	items: readonly AttachmentItem[];
	onAdd: (files: FileList | File[]) => void;
	onRemove: (id: string) => void;
	accept: string;
	copy: AttachmentsCopy;
	formatSize: (bytes: number) => string;
	error?: string;
};

function statusLabel(template: string, count: number): string {
	return template.replace('{count}', String(count));
}

function stepLabel(item: AttachmentItem, copy: AttachmentsCopy): string {
	switch (item.status) {
		case 'queued':
			return copy.attachmentsStepQueued;
		case 'reading':
			return copy.attachmentsStepReadingTemplate.replace('{percent}', String(item.progress));
		case 'validating':
			return copy.attachmentsStepValidating;
		case 'ready':
			return copy.attachmentsStepReady;
		case 'failed':
			return copy.attachmentsStepFailed;
	}
}

function isIntakeActive(status: AttachmentIntakeStatus): boolean {
	return status === 'queued' || status === 'reading' || status === 'validating';
}

export function Attachments({
	items,
	onAdd,
	onRemove,
	accept,
	copy,
	formatSize,
	error,
}: AttachmentsProps) {
	const inputId = useId();
	const statusId = useId();
	const errorId = useId();
	const inputRef = useRef<HTMLInputElement>(null);
	const readyCount = items.filter((item) => item.status === 'ready').length;
	const activeCount = items.filter((item) => isIntakeActive(item.status)).length;
	const hasReady = readyCount > 0;
	const isBusy = activeCount > 0;

	const openPicker = useCallback(() => {
		inputRef.current?.click();
	}, []);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files?.length) onAdd(e.target.files);
			e.target.value = '';
		},
		[onAdd],
	);

	const handleRemove = useCallback((id: string) => () => onRemove(id), [onRemove]);

	useEffect(() => {
		if (!error) return;
		document.getElementById(errorId)?.scrollIntoView({
			block: 'nearest',
			inline: 'nearest',
		});
	}, [error, errorId]);

	return (
		<div className={components.captureAttachmentsCard}>
			<div className={components.captureAttachmentsHeader}>
				<span className={components.captureAttachmentsLabel}>{copy.attachmentsLabel}</span>
				<button
					type="button"
					onClick={openPicker}
					className={components.captureAttachmentsAdd}
					aria-describedby={
						[items.length > 0 ? statusId : null, error ? errorId : null]
							.filter(Boolean)
							.join(' ') || undefined
					}
				>
					{isBusy ? (
						<Loader2 size={14} aria-hidden className={components.captureAttachmentsSpinner} />
					) : hasReady ? (
						<Check size={14} aria-hidden className={components.captureAttachmentsCheck} />
					) : (
						<Paperclip size={14} aria-hidden />
					)}
					{copy.attachmentsAddLabel}
					{readyCount > 0 ? (
						<span className={components.captureAttachmentsCount} aria-hidden>
							{readyCount}
						</span>
					) : null}
				</button>
			</div>
			<input
				ref={inputRef}
				id={inputId}
				type="file"
				className={components.captureAttachmentsInput}
				multiple
				accept={accept}
				aria-label={copy.attachmentsAddLabel}
				onChange={handleChange}
			/>
			<p id={statusId} className={components.captureAttachmentsStatus} aria-live="polite">
				{activeCount > 0
					? items
							.filter((item) => isIntakeActive(item.status))
							.map((item) => `${item.file.name}: ${stepLabel(item, copy)}`)
							.join(' · ')
					: hasReady
						? statusLabel(copy.attachmentsStatusTemplate, readyCount)
						: ''}
			</p>
			{error ? (
				<p id={errorId} role="alert" className={components.fieldError}>
					{error}
				</p>
			) : null}
			{items.length > 0 ? (
				<ul className={components.captureAttachmentsList}>
					{items.map((item) => (
						<li key={item.id} className={components.captureAttachmentsRow}>
							<div className={components.captureAttachmentsMinW0}>
								<div className={components.captureAttachmentsName}>{item.file.name}</div>
								<div className={components.captureAttachmentsSize}>
									{formatSize(item.file.size)}
								</div>
								<div className={components.captureAttachmentsStep} aria-live="polite">
									{stepLabel(item, copy)}
								</div>
								{isIntakeActive(item.status) || item.status === 'failed' ? (
									<div
										className={components.captureAttachmentsProgressTrack}
										role="progressbar"
										aria-valuemin={0}
										aria-valuemax={100}
										aria-valuenow={item.progress}
										aria-label={stepLabel(item, copy)}
									>
										<div
											className={
												item.status === 'failed'
													? components.captureAttachmentsProgressBarFailed
													: components.captureAttachmentsProgressBar
											}
											style={{
												width: `${item.progress}%`,
											}}
										/>
									</div>
								) : null}
							</div>
							<button
								type="button"
								onClick={handleRemove(item.id)}
								className={components.captureAttachmentsRemove}
								aria-label={`${copy.attachmentsRemoveAria}: ${item.file.name}`}
							>
								<X size={14} />
							</button>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}
