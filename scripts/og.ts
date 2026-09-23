/**
 * Generates the default Open Graph cards (1200×630) per page template and the PNG logo used in
 * structured data. Re-run after changing source images: `bun scripts/og.ts`.
 */
import { mkdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const pub = (p: string) => join(root, 'public', p);
const outDir = pub('images/og');
mkdirSync(outDir, { recursive: true });

const CARDS: { name: string; source: string; label: string }[] = [
	{ name: 'default', source: 'images/hero-banner.jpg', label: 'California Lemon Law Attorneys' },
	{ name: 'blog', source: 'images/hero-banner.jpg', label: 'Lemon Law Blog' },
	{
		name: 'locations',
		source: 'images/cta-california.jpg',
		label: 'Lemon Law Attorneys Across California',
	},
	{
		name: 'manufacturers',
		source: 'images/hubs/manufacturers.jpg',
		label: 'Lemon Law by Manufacturer',
	},
	{ name: 'faq', source: 'images/hubs/faq.jpg', label: 'California Lemon Law FAQ' },
	{ name: 'reviews', source: 'images/hubs/reviews.jpg', label: 'Client Reviews' },
	{ name: 'case-studies', source: 'images/hubs/case-studies.jpg', label: 'Lemon Law Case Studies' },
	{ name: 'guidebook', source: 'images/hubs/guidebook.jpg', label: 'California Lemon Law Guide' },
	{ name: 'learn', source: 'images/hubs/learn.jpg', label: 'Learn California Lemon Law' },
	{ name: 'firm', source: 'images/hubs/firm.jpg', label: 'About CLINE APC' },
	{
		name: 'tool-buyback-calculator',
		source: 'images/tools/buyback-bg.jpg',
		label: 'Free Lemon Law Buyback Calculator',
	},
	{
		name: 'tool-eligibility-checker',
		source: 'images/tools/eligibility-bg.jpg',
		label: 'Free Lemon Law Eligibility Checker',
	},
	{
		name: 'tool-documentation-checklist',
		source: 'images/tools/checklist-bg.jpg',
		label: 'Free Lemon Law Case Checklist',
	},
];

function escapeXml(value: string) {
	return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const logo = readFileSync(pub('images/logos/light.svg'));

for (const card of CARDS) {
	const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
	<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
		<stop offset="0" stop-color="#010F27" stop-opacity="0.35"/>
		<stop offset="1" stop-color="#010F27" stop-opacity="0.92"/>
	</linearGradient></defs>
	<rect width="1200" height="630" fill="url(#g)"/>
	<rect x="72" y="470" width="96" height="6" fill="#BC8F0D"/>
	<text x="72" y="545" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="700" fill="#ffffff">${escapeXml(card.label)}</text>
</svg>`);
	const logoPng = await sharp(logo).resize({ width: 300 }).png().toBuffer();
	await sharp(pub(card.source))
		.resize(1200, 630, { fit: 'cover', position: 'centre' })
		.composite([
			{ input: overlay, top: 0, left: 0 },
			{ input: logoPng, top: 64, left: 72 },
		])
		.jpeg({ quality: 82, mozjpeg: true })
		.toFile(join(outDir, `${card.name}.jpg`));
	console.log(`images/og/${card.name}.jpg`);
}

await sharp(pub('images/logos/primary.svg'))
	.resize({ width: 600 })
	.flatten({ background: '#ffffff' })
	.png()
	.toFile(pub('images/logos/primary-600.png'));
console.log('images/logos/primary-600.png');
