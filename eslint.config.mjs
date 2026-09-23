import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const appFiles = ['src/**/*.{js,jsx,ts,tsx}'];

/** @param {import('eslint').Linter.Config[]} configs */
function withAppFiles(configs) {
	return configs.map((config) => {
		if (config && 'ignores' in config && Object.keys(config).length === 1) {
			return config;
		}
		return { ...config, files: config.files ?? appFiles };
	});
}

const eslintConfig = defineConfig([
	globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
	...withAppFiles(nextVitals),
	...withAppFiles(nextTs),
]);

export default eslintConfig;
