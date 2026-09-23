import { resolveDataRefAs, type DataRef } from '@/kit/catalog';

import { SITE_DATA_INDEX } from './dataindex';

/** Resolve a catalog-style `fileStem.exportKey` ref against `SITE_DATA_INDEX`. */
export function resolveSiteDataRef<T>(ref: DataRef): T {
	return resolveDataRefAs<T>(ref, SITE_DATA_INDEX);
}
