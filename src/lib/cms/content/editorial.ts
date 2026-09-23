import type { EditorialIndexRecord, EditorialRecord } from '../types';
import { mdcRawByKey } from './mdc-bundle';
import { editorialRecordFromMdc } from './mdc';

export function hydrateEditorialRecord(index: EditorialIndexRecord): EditorialRecord {
	const key = `${index.kind}:${index.slug}`;
	const raw = mdcRawByKey[key];
	if (!raw) {
		throw new Error(
			`Missing MDC bundle for ${key}. Run bun scripts/syncmdc.ts after editing content/collections.`,
		);
	}
	const fromMdc = editorialRecordFromMdc(raw);
	if (fromMdc.slug !== index.slug) {
		throw new Error(`MDC slug mismatch for ${index.slug}: file has "${fromMdc.slug}"`);
	}
	return {
		...index,
		...fromMdc,
		categories: index.categories.length ? index.categories : fromMdc.categories,
	};
}

export function tryHydrateEditorialRecord(
	index: EditorialIndexRecord,
): EditorialRecord | undefined {
	try {
		return hydrateEditorialRecord(index);
	} catch {
		return undefined;
	}
}
