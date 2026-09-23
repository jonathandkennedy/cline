import type { EditorialBlock, EditorialBlockType, EditorialKind } from '../types';

export type EditorialFrontmatter = {
	title: string;
	description: string;
	slug: string;
	kind: EditorialKind;
	date: string;
	modified: string;
	sourceUrl: string;
	categories?: readonly string[];
	thumbnail?: string;
	thumbnailAlt?: string;
	seoTitle?: string;
	seoDescription?: string;
};

export function splitMdc(raw: string): { frontmatter: EditorialFrontmatter; body: string } {
	const normalized = raw.replace(/\r\n/g, '\n');
	if (!normalized.startsWith('---\n')) {
		throw new Error('MDC missing frontmatter delimiter');
	}
	const end = normalized.indexOf('\n---\n', 4);
	if (end === -1) {
		throw new Error('MDC frontmatter not closed');
	}
	const yaml = normalized.slice(4, end);
	const body = normalized.slice(end + 5).trim();
	const frontmatter = parseSimpleYaml(yaml) as EditorialFrontmatter;
	return { frontmatter, body };
}

function parseSimpleYaml(yaml: string): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	let key: string | null = null;
	let list: string[] | null = null;

	const flushList = () => {
		if (key && list) out[key] = list;
		list = null;
	};

	for (const line of yaml.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed) continue;
		if (trimmed.startsWith('- ') && key && list) {
			list.push(unquote(trimmed.slice(2).trim()));
			continue;
		}
		flushList();
		const match = trimmed.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
		if (!match) continue;
		key = match[1];
		const value = match[2].trim();
		if (value === '') {
			list = [];
			continue;
		}
		if (value.startsWith('[') && value.endsWith(']')) {
			out[key] = value
				.slice(1, -1)
				.split(',')
				.map((part) => unquote(part.trim()))
				.filter(Boolean);
			key = null;
			continue;
		}
		out[key] = unquote(value);
		key = null;
	}
	flushList();
	return out;
}

function unquote(value: string): string {
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1);
	}
	return value;
}

export function markdownBodyToEditorialBlocks(body: string): EditorialBlock[] {
	const blocks: EditorialBlock[] = [];
	const lines = body.split('\n');
	let paragraph: string[] = [];
	let listItems: string[] = [];

	const flushParagraph = () => {
		const text = paragraph.join(' ').trim();
		paragraph = [];
		if (!text) return;
		blocks.push({ type: 'p', text });
	};

	const flushList = () => {
		for (const item of listItems) {
			blocks.push({ type: 'li', text: item });
		}
		listItems = [];
	};

	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed) {
			flushParagraph();
			flushList();
			continue;
		}
		const heading = trimmed.match(/^(#{2,3})\s+(.+)$/);
		if (heading) {
			flushParagraph();
			flushList();
			const level = heading[1].length;
			const type: EditorialBlockType = level === 2 ? 'h2' : 'h3';
			blocks.push({ type, text: heading[2].trim() });
			continue;
		}
		if (trimmed.startsWith('> ')) {
			flushParagraph();
			flushList();
			blocks.push({ type: 'quote', text: trimmed.slice(2).trim() });
			continue;
		}
		if (/^[-*]\s+/.test(trimmed)) {
			flushParagraph();
			listItems.push(trimmed.replace(/^[-*]\s+/, '').trim());
			continue;
		}
		flushList();
		paragraph.push(trimmed);
	}
	flushParagraph();
	flushList();
	return blocks;
}

export function editorialRecordFromMdc(raw: string) {
	const { frontmatter, body } = splitMdc(raw);
	const blocks = markdownBodyToEditorialBlocks(body);
	const title = frontmatter.title;
	return {
		slug: frontmatter.slug,
		title,
		description: frontmatter.description,
		date: frontmatter.date,
		modified: frontmatter.modified,
		sourceUrl: frontmatter.sourceUrl,
		kind: frontmatter.kind,
		categories: frontmatter.categories ?? [],
		blocks,
		seoTitle: frontmatter.seoTitle ?? `${title} | CLINE APC`,
		seoDescription: frontmatter.seoDescription ?? frontmatter.description,
		thumbnail: frontmatter.thumbnail,
		thumbnailAlt: frontmatter.thumbnailAlt,
	};
}
