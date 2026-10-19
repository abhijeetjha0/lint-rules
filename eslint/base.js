import js from '@eslint/js';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import-x';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Global ignore patterns
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.next/**',
      '**/out/**',
      '**/*.min.js',
      '**/.git/**'
    ],
  },
  // Base recommended rules
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      'import-x': importPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Code hygiene & best practices
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'curly': ['error', 'all'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'space-before-blocks': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: ['return', 'block-like'] },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],

      // Import hygiene
      'import-x/no-duplicates': 'error',
      'import-x/first': 'error',
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];
