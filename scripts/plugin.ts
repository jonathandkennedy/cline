import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const repoRoot = resolve(import.meta.dirname, '..');
const pluginDir = join(repoRoot, 'wordpress/cline-apc-tools');
const php = readFileSync(join(pluginDir, 'cline-apc-tools.php'), 'utf8');
const readme = readFileSync(join(pluginDir, 'readme.txt'), 'utf8');

const version =
	php.match(/\* Version:\s*([^\n]+)/)?.[1]?.trim() ??
	readme.match(/^Stable tag:\s*([^\n]+)/m)?.[1]?.trim();
if (!version) {
	throw new Error('Could not read plugin version from cline-apc-tools.php');
}

const changelog = readme
	.split('== Changelog ==')[1]
	?.split('==')[0]
	?.trim()
	.replace(/^=\s*([\d.]+)\s*=/gm, '### $1')
	.trim();

const outDir = join(repoRoot, 'public/wordpress');
mkdirSync(outDir, { recursive: true });

const zipPath = join(outDir, 'cline-apc-tools.zip');
execSync(
	`cd "${join(repoRoot, 'wordpress')}" && zip -r "${zipPath}" cline-apc-tools -x "*.DS_Store"`,
	{ stdio: 'inherit' },
);

const origin = 'https://tools.lemonlawlawyerscalifornia.com';
const metadata = {
	name: 'CLINE APC Tools',
	slug: 'cline-apc-tools',
	version,
	download_url: `${origin}/wordpress/cline-apc-tools.zip`,
	homepage: 'https://www.lemonlawlawyerscalifornia.com/',
	requires: '6.0',
	tested: '6.8',
	requires_php: '7.4',
	author: 'CLINE APC',
	author_profile: 'https://www.lemonlawlawyerscalifornia.com/',
	sections: {
		description:
			'Embed CLINE APC Lemon Law tools and the free case-review form via shortcodes on any page, post, or popup.',
		changelog: changelog ?? '',
	},
};

writeFileSync(join(outDir, 'cline-apc-tools.json'), `${JSON.stringify(metadata, null, 2)}\n`);

console.log(`Built cline-apc-tools v${version} → public/wordpress/`);
