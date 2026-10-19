import tseslint from 'typescript-eslint';
import baseConfig from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...baseConfig,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // TypeScript strictness rules
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Relax standard rules replaced by TypeScript equivalents
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
  {
    // Override for config scripts and test files where strict type checking is unnecessary
    files: [
      '**/*.config.{js,ts,mjs,cjs}',
      '**/*.test.{js,ts,jsx,tsx}',
      '**/test/**/*.{js,ts,jsx,tsx}',
      '**/tests/**/*.{js,ts,jsx,tsx}',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
);
