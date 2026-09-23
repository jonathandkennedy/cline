export const CASE_ATTACHMENT_ACCEPT =
	'.pdf,.jpg,.jpeg,.png,.heic,.heif,application/pdf,image/jpeg,image/png,image/heic,image/heif';

export const CASE_ATTACHMENT_MAX_FILES = 8;
export const CASE_ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024;

const ACCEPTED_MIME = new Set([
	'application/pdf',
	'image/jpeg',
	'image/png',
	'image/heic',
	'image/heif',
]);

export function isAcceptedCaseAttachment(file: File): boolean {
	if (ACCEPTED_MIME.has(file.type)) return true;
	const lower = file.name.toLowerCase();
	return (
		lower.endsWith('.pdf') ||
		lower.endsWith('.jpg') ||
		lower.endsWith('.jpeg') ||
		lower.endsWith('.png') ||
		lower.endsWith('.heic') ||
		lower.endsWith('.heif')
	);
}

export function mergeCaseAttachments(
	current: readonly File[],
	incoming: FileList | File[],
): File[] {
	const next = [...current];
	for (const file of Array.from(incoming)) {
		if (next.length >= CASE_ATTACHMENT_MAX_FILES) break;
		if (file.size > CASE_ATTACHMENT_MAX_BYTES) continue;
		if (!isAcceptedCaseAttachment(file)) continue;
		if (next.some((f) => f.name === file.name && f.size === file.size)) {
			continue;
		}
		next.push(file);
	}
	return next;
}

export function formatAttachmentSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
