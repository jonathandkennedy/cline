'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { EditorialRecord } from '../types';

/**
 * The article being rendered, handed down from the server route. Client blocks read the body
 * from here so the bundle of every article body (mdc-bundle.ts) never ships to the browser.
 */
const EditorialRecordContext = createContext<EditorialRecord | null>(null);

export function EditorialRecordProvider({
	record,
	children,
}: {
	record: EditorialRecord;
	children: ReactNode;
}) {
	return (
		<EditorialRecordContext.Provider value={record}>{children}</EditorialRecordContext.Provider>
	);
}

export function useEditorialRecord(): EditorialRecord | null {
	return useContext(EditorialRecordContext);
}
