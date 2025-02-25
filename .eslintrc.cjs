module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/typescript',
	],
	ignorePatterns: [
		'node_modules',
		'lib',
	],
	overrides: [
		{
			extends: [
				'plugin:@typescript-eslint/recommended',
			],
			files: [
				'src/*.ts',
				'src/*.tsx',
			],
			parserOptions: {
				project: ['./tsconfig.json'],
			},
			rules: {
				'@typescript-eslint/array-type': [
					'error',
					{
						default: 'generic',
						readonly: 'generic',
					},
				],
				'@typescript-eslint/await-thenable': 'error',
				'@typescript-eslint/ban-ts-comment': [
					'error',
				],
				'@typescript-eslint/class-literal-property-style': [
					'error',
					'fields',
				],
				'@typescript-eslint/comma-dangle': [
					'error',
					'always-multiline',
				],
				'@typescript-eslint/consistent-type-assertions': [
					'error',
				],
				'@typescript-eslint/consistent-type-definitions': [
					'error',
					'type',
				],
				'@typescript-eslint/consistent-type-imports': 'error',
				'@typescript-eslint/default-param-last': 'error',
				'@typescript-eslint/indent': [
					'error',
					'tab',
					{
						SwitchCase: 1,
					},
				],
				'@typescript-eslint/dot-notation': 'error',
				'@typescript-eslint/key-spacing': [
					'error',
					{
						beforeColon: false,
						afterColon: true,
					},
				],
				'@typescript-eslint/member-ordering': [
					'error',
					{
						classExpressions: {
							order: 'natural',
						},
						typeLiterals: {
							order: 'natural',
						},
					},
				],
				'@typescript-eslint/no-confusing-non-null-assertion': 'error',
				'@typescript-eslint/no-dynamic-delete': 'error',
				'@typescript-eslint/no-extra-non-null-assertion': 'error',
				'@typescript-eslint/no-for-in-array': 'error',
				'@typescript-eslint/no-inferrable-types': [
					'error',
					{
						ignoreParameters: true,
						ignoreProperties: true,
					},
				],
				'@typescript-eslint/no-invalid-this': 'error',
				'@typescript-eslint/no-invalid-void-type': 'error',
				'@typescript-eslint/no-loss-of-precision': 'error',
				'@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
				'@typescript-eslint/no-this-alias': 'error',
				'@typescript-eslint/no-unnecessary-qualifier': 'error',
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						argsIgnorePattern: '^_',
						destructuredArrayIgnorePattern: '^_',
						varsIgnorePattern: '^_',
					},
				],
				'@typescript-eslint/prefer-as-const': 'error',
				'@typescript-eslint/prefer-enum-initializers': 'error',
				'@typescript-eslint/prefer-for-of': 'error',
				'@typescript-eslint/prefer-includes': 'error',
				'@typescript-eslint/prefer-literal-enum-member': 'error',
				'@typescript-eslint/prefer-nullish-coalescing': 'error',
				'@typescript-eslint/prefer-optional-chain': 'error',
				'@typescript-eslint/prefer-readonly': 'error',
				'@typescript-eslint/prefer-reduce-type-parameter': 'error',
				'@typescript-eslint/prefer-string-starts-ends-with': 'error',
				'@typescript-eslint/require-array-sort-compare': 'error',
				'@typescript-eslint/require-await': 'error',
				'@typescript-eslint/restrict-template-expressions': [
					'error',
					{
						allowAny: true,
						allowBoolean: true,
						allowNumber: true,
						allowNullish: true,
					},
				],
				'@typescript-eslint/return-await': 'error',
				'@typescript-eslint/semi': 'error',
				'@typescript-eslint/unified-signatures': 'error',
				'@typescript-eslint/no-explicit-any': 'off',
				'consistent-return': 'off',
				'indent': 'off',
				'key-spacing': 'off',
				'no-dupe-class-members': 'off',
				'no-duplicate-imports': 'off',
				'no-return-await': 'off',
				'no-undef': 'off',
				'no-unused-vars': 'off',
				'semi': 'off',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'canonical',
		'import',
		'promise',
		'simple-import-sort',
		'sort-destructure-keys',
		'unicorn',
	],
	root: true,
	rules: {
		'no-console': 'error',
		'no-debugger': 'error',
		'no-empty': [
			'error',
			{
				allowEmptyCatch: true,
			},
		],
		'array-bracket-newline': [
			'error',
			'consistent',
		],
		'array-bracket-spacing': [
			'error',
			'never',
		],
		'array-callback-return': 'error',
		'array-element-newline': [
			'error',
			'consistent',
		],
		'brace-style': [
			'error',
			'1tbs',
		],
		'comma-dangle': [
			'error',
			'always-multiline',
		],
		'comma-spacing': 'error',
		'computed-property-spacing': 'error',
		'consistent-return': 'error',
		'curly': 'error',
		'default-case-last': 'error',
		'default-param-last': 'error',
		'eol-last': [
			'error',
			'always',
		],
		'eqeqeq': 'error',
		'for-direction': 'error',
		'func-names': 'error',
		'function-paren-newline': [
			'error',
			'multiline-arguments',
		],
		'indent': [
			'error',
			'tab',
			{
				SwitchCase: 1,
			},
		],
		'jsx-quotes': ['error', 'prefer-double'],
		'key-spacing': [
			'error',
			{
				beforeColon: false,
				afterColon: true,
			},
		],
		'new-cap': 'error',
		'newline-before-return': 'error',
		'no-alert': 'error',
		'no-async-promise-executor': 'error',
		'no-bitwise': 'error',
		'no-case-declarations': 'error',
		'no-cond-assign': 'error',
		'no-constant-condition': [
			'error',
			{
				checkLoops: false,
			},
		],
		'no-dupe-class-members': 'off',
		'no-dupe-else-if': 'error',
		'no-duplicate-case': 'error',
		'no-duplicate-imports': [
			'error',
			{
				includeExports: true,
			},
		],
		'no-else-return': 'error',
		'no-eval': 'error',
		'no-ex-assign': 'error',
		'no-extra-bind': 'error',
		'no-extra-boolean-cast': 'error',
		'no-fallthrough': 'error',
		'no-floating-decimal': 'error',
		'no-func-assign': 'error',
		'no-global-assign': 'error',
		'no-implied-eval': 'error',
		'no-import-assign': 'error',
		'no-invalid-regexp': 'error',
		'no-irregular-whitespace': 'error',
		'no-multi-str': 'error',
		'no-multiple-empty-lines': [
			'error',
			{
				max: 3,
				maxBOF: 0,
				maxEOF: 0,
			},
		],
		'no-new-func': 'error',
		'no-new-require': 'error',
		'no-octal': 'error',
		'no-octal-escape': 'error',
		'no-path-concat': 'error',
		'no-proto': 'error',
		'no-restricted-imports': [
			'error',
			{
				paths: [
					{
						name: 'lodash',
						message: 'Don\'t import \'lodash\' directly. Instead import a specific function, e.g. \'lodash/throttle\'',
					},
				],
			},
		],
		'no-return-assign': 'error',
		'no-script-url': 'error',
		'no-self-assign': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-shadow-restricted-names': 'error',
		'no-template-curly-in-string': 'error',
		'no-throw-literal': 'error',
		'no-undef': 'error',
		'no-unexpected-multiline': 'error',
		'no-unmodified-loop-condition': 'error',
		'no-unused-vars': 'off',
		'no-useless-backreference': 'error',
		'no-useless-call': 'error',
		'no-useless-catch': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-escape': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-with': 'error',
		'object-curly-newline': [
			'error',
			{
				ObjectExpression: {
					multiline: true,
					minProperties: 2,
					consistent: true,
				},
				ObjectPattern: {
					multiline: true,
					minProperties: 2,
					consistent: true,
				},
				ImportDeclaration: {
					minProperties: 1,
					consistent: true,
					multiline: true,
				},
				ExportDeclaration: {
					minProperties: 1,
					consistent: true,
					multiline: true,
				},
			},
		],
		'object-curly-spacing': [
			'error',
			'always',
		],
		'object-property-newline': 'error',
		'object-shorthand': [
			'error',
			'always',
		],
		'one-var': [
			'error',
			'never',
		],
		'padded-blocks': [
			'error',
			{
				classes: 'always',
				blocks: 'never',
				switches: 'always',
			},
		],
		'prefer-arrow-callback': 'error',
		'prefer-const': 'error',
		'prefer-object-spread': 'error',
		'prefer-promise-reject-errors': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'quote-props': [
			'error',
			'consistent-as-needed',
		],
		'quotes': [
			'error',
			'single',
		],
		'radix': 'error',
		'require-atomic-updates': 'warn',
		'semi': 'error',
		'space-infix-ops': 'error',
		'use-isnan': 'error',

		'canonical/export-specifier-newline': 'error',
		'canonical/import-specifier-newline': 'error',

		'import/export': 'error',
		'import/namespace': 'error',
		'import/newline-after-import': [
			'error',
			{
				count: 3,
			},
		],
		'import/no-duplicates': 'error',
		'import/no-named-as-default-member': 'warn',
		'import/no-named-as-default': 'warn',
		'import/no-unresolved': [
			'error',
			{
				caseSensitive: true,
				ignore: [
					'all:part:',
					'part:',
					'@common',
					'@studio',
					'@website',
				],
			},
		],

		'promise/no-callback-in-promise': 'error',
		'promise/no-nesting': 'error',
		'promise/no-return-in-finally': 'error',
		'promise/no-return-wrap': 'error',
		'promise/param-names': 'error',

		'simple-import-sort/exports': 'error',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					// side effects
					[
						'^\\u0000',
					],
					// node.js builtins
					[
						`^(${require('module').builtinModules.join('|')})(/|$)`,
					],
					// packages
					[
						'^@?\\w',
					],
					// parent imports
					[
						'^\\.\\.(?!/?$)',
						'^\\.\\./?$',
					],
					// relative imports
					[
						'^\\./(?=.*/)(?!/?$)',
						'^\\.(?!/?$)',
						'^\\./?$',
					],
					// type imports
					[
						'^.+\\u0000$',
					],
					// style imports
					[
						'^.+\\.s?css$',
					],
				],
			},
		],

		'sort-destructure-keys/sort-destructure-keys': [
			'error',
			{
				caseSensitive: true,
			},
		],

		'unicorn/empty-brace-spaces': 'error',
		'unicorn/template-indent': [
			'warn',
			{
				indent: '\t',
				tags: [
					'groq',
				],
				functions: [
					'dedent',
					'stripIndent',
				],
				selectors: [],
			},
		],
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': [
				'.ts',
			],
		},
	},
};
