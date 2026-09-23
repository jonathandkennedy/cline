import path from 'node:path';
import { defineConfig } from 'vitest/config';

const root = __dirname;
const r = (p: string) => path.resolve(root, p);

export default defineConfig({
	test: {
		globals: true,
		include: ['tests/**/*.ts', 'src/**/*.test.ts'],
		exclude: ['tests/map-driven/**', 'tests/conventions/**', 'node_modules/**', '.next/**'],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		alias: [
			{ find: '@/data', replacement: r('./content/data') },
			{ find: '@', replacement: r('./src') },
			{ find: '@/kit/ui', replacement: r('./src/kit/ui/index.ts') },
			{ find: /^@\/kit\/ui\/(.*)$/, replacement: `${r('./src/kit/ui')}/$1` },
			{ find: '@/kit/layout', replacement: r('./src/kit/layout/index.ts') },
			{ find: /^@\/kit\/layout\/(.*)$/, replacement: `${r('./src/kit/layout')}/$1` },
			{ find: '@/kit/forms', replacement: r('./src/kit/forms/index.ts') },
			{ find: /^@\/kit\/forms\/(.*)$/, replacement: `${r('./src/kit/forms')}/$1` },
			{ find: '@/kit/promo', replacement: r('./src/kit/promo/index.ts') },
			{ find: /^@\/kit\/promo\/(.*)$/, replacement: `${r('./src/kit/promo')}/$1` },
			{ find: '@/kit/blocks', replacement: r('./src/kit/blocks/index.ts') },
			{ find: /^@\/kit\/blocks\/(.*)$/, replacement: `${r('./src/kit/blocks')}/$1` },
			{ find: '@/kit/shared', replacement: r('./src/kit/shared/index.ts') },
			{ find: /^@\/kit\/shared\/(.*)$/, replacement: `${r('./src/kit/shared')}/$1` },
			{ find: '@/kit/theme', replacement: r('./src/kit/theme/index.ts') },
			{ find: /^@\/kit\/theme\/(.*)$/, replacement: `${r('./src/kit/theme')}/$1` },
			{ find: '@/kit/catalog', replacement: r('./src/kit/catalog/index.ts') },
			{ find: /^@\/kit\/catalog\/(.*)$/, replacement: `${r('./src/kit/catalog')}/$1` },
			{ find: '@/kit/pipeline', replacement: r('./src/kit/pipeline/index.ts') },
			{ find: /^@\/kit\/pipeline\/(.*)$/, replacement: `${r('./src/kit/pipeline')}/$1` },
		],
	},
});
