import type { AttachmentItem } from '@/kit/forms';

import {
	CASE_ATTACHMENT_MAX_BYTES,
	CASE_ATTACHMENT_MAX_FILES,
	isAcceptedCaseAttachment,
} from '@/lib/attachments';

export type AttachmentIntakeUpdate = Partial<Pick<AttachmentItem, 'progress' | 'status'>>;

type IntakeHandle = {
	abort: () => void;
	done: Promise<File | null>;
};

const MIN_QUEUED_MS = 80;
const MIN_READING_MS = 450;
const MIN_VALIDATING_MS = 220;

function attachmentKey(file: File): string {
	return `${file.name}:${file.size}:${file.lastModified}`;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function readFileWithProgress(
	file: File,
	onProgress: (percent: number) => void,
): { promise: Promise<ArrayBuffer>; abort: () => void } {
	let reader: FileReader | null = null;
	const promise = new Promise<ArrayBuffer>((resolve, reject) => {
		reader = new FileReader();
		reader.onprogress = (event) => {
			if (event.lengthComputable && event.total > 0) {
				onProgress(Math.min(99, Math.round((event.loaded / event.total) * 100)));
			}
		};
		reader.onload = () => resolve(reader!.result as ArrayBuffer);
		reader.onerror = () => reject(reader!.error ?? new Error('read failed'));
		reader.onabort = () => reject(new DOMException('Aborted', 'AbortError'));
		reader.readAsArrayBuffer(file);
	});
	return {
		promise,
		abort: () => reader?.abort(),
	};
}

function createLiveProgressReporter(onUpdate: (update: AttachmentIntakeUpdate) => void) {
	let status: AttachmentItem['status'] = 'queued';
	let displayProgress = 0;
	let targetProgress = 0;
	let frameId = 0;

	const emit = () => {
		onUpdate({ status, progress: displayProgress });
	};

	const tick = () => {
		if (displayProgress < targetProgress) {
			displayProgress = Math.min(
				targetProgress,
				displayProgress + Math.max(1, Math.ceil((targetProgress - displayProgress) / 4)),
			);
			emit();
		}
		if (displayProgress < targetProgress) {
			frameId = window.requestAnimationFrame(tick);
			return;
		}
		frameId = 0;
	};

	const setStatus = (next: AttachmentItem['status'], progress?: number) => {
		status = next;
		if (progress !== undefined) {
			targetProgress = progress;
			displayProgress = progress;
		}
		emit();
	};

	const setReadingTarget = (percent: number) => {
		status = 'reading';
		targetProgress = percent;
		if (!frameId) {
			frameId = window.requestAnimationFrame(tick);
		}
	};

	const waitForDisplay = async () => {
		while (displayProgress < targetProgress) {
			await new Promise<void>((resolve) => {
				window.requestAnimationFrame(() => resolve());
			});
		}
	};

	const stop = () => {
		if (frameId) window.cancelAnimationFrame(frameId);
		frameId = 0;
	};

	return { setStatus, setReadingTarget, waitForDisplay, stop };
}

export function canQueueCaseAttachment(
	current: readonly AttachmentItem[],
	file: File,
): 'ok' | 'max_files' | 'too_large' | 'unsupported' | 'duplicate' {
	if (current.filter((item) => item.status !== 'failed').length >= CASE_ATTACHMENT_MAX_FILES) {
		return 'max_files';
	}
	if (file.size > CASE_ATTACHMENT_MAX_BYTES) return 'too_large';
	if (!isAcceptedCaseAttachment(file)) return 'unsupported';
	if (
		current.some(
			(item) => item.status !== 'failed' && attachmentKey(item.file) === attachmentKey(file),
		)
	) {
		return 'duplicate';
	}
	return 'ok';
}

export function startCaseAttachmentIntake(
	file: File,
	onUpdate: (update: AttachmentIntakeUpdate) => void,
): IntakeHandle {
	let abortReader: (() => void) | undefined;
	let aborted = false;
	const reporter = createLiveProgressReporter(onUpdate);

	const done = (async () => {
		reporter.setStatus('queued', 0);
		await sleep(MIN_QUEUED_MS);
		if (aborted) return null;

		reporter.setStatus('reading', 0);
		const readStartedAt = Date.now();
		try {
			const { promise, abort } = readFileWithProgress(file, (progress) =>
				reporter.setReadingTarget(progress),
			);
			abortReader = () => {
				aborted = true;
				abort();
			};
			await promise;
			reporter.setReadingTarget(99);
			await reporter.waitForDisplay();
		} catch (error) {
			reporter.stop();
			if (error instanceof DOMException && error.name === 'AbortError') {
				return null;
			}
			reporter.setStatus('failed', 0);
			return null;
		}

		const readElapsed = Date.now() - readStartedAt;
		if (readElapsed < MIN_READING_MS) {
			const simulatedSteps = [25, 50, 75, 99];
			for (const step of simulatedSteps) {
				if (Date.now() - readStartedAt >= MIN_READING_MS) break;
				reporter.setReadingTarget(step);
				await reporter.waitForDisplay();
				await sleep(Math.max(40, MIN_READING_MS / simulatedSteps.length));
			}
		}

		if (aborted) return null;

		reporter.setStatus('validating', 100);
		await sleep(MIN_VALIDATING_MS);
		if (aborted) return null;

		if (file.size > CASE_ATTACHMENT_MAX_BYTES || !isAcceptedCaseAttachment(file)) {
			reporter.setStatus('failed', 0);
			return null;
		}

		reporter.setStatus('ready', 100);
		reporter.stop();
		return file;
	})();

	return {
		abort: () => abortReader?.(),
		done,
	};
}

export function readyAttachmentFiles(items: readonly AttachmentItem[]): File[] {
	return items.filter((item) => item.status === 'ready').map((item) => item.file);
}
