import type { DataRef } from './tree';

export type PageSectionData = Record<string, unknown>;

export type PageSection =
	| {
			type: 'group';
			config: { className: string };
			sections: PageSection[];
	  }
	| {
			type: string;
			data?: PageSectionData;
			config?: PageSectionData;
	  };

export type PageDocument = {
	version: number;
	id?: string;
	sections: PageSection[];
	footer?: readonly string[];
};
