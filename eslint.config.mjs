import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

export default defineConfig([
	...nextVitals,
	...nextTypeScript,
	globalIgnores([
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
		'src/components/layout/**',
		'src/components/ui/**',
		'src/config/**',
		'src/data/certificates/**',
		'src/data/header/**',
		'src/data/projects/**',
		'src/data/socials/**',
		'src/data/techs/**',
		'src/data/site-copy.data.ts',
		'src/data/site.data.ts',
		'src/providers/**',
		'src/types/**'
	]),
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			]
		}
	}
])
