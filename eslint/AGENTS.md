# ESLint Module — Agent Guidelines

## Purpose
Defines ESLint 9+ Flat Config presets for JavaScript, TypeScript, and React applications. All files are distributed via subpath exports in `package.json`.

## Key Files
| File | Role |
| :--- | :--- |
| `base.js` | Core JavaScript preset (`@eslint/js`, globals, code hygiene, `eslint-plugin-import-x` sorting) |
| `ts.js` | TypeScript preset (`typescript-eslint`), replaces base unused-vars/undef, type-import enforcement |
| `react.js` | React preset (`eslint-plugin-react`, `react-hooks`, `react-refresh`), React 18+ JSX runtime rules |

## Conventions
- **Flat Config Format**: Presets must export an array of config objects (`export default [...]`) or use `tseslint.config(...)`.
- **Type Annotations**: Always annotate exports with JSDoc:
  ```javascript
  /** @type {import('eslint').Linter.Config[]} */
  ```
- **Rule Replacement**: When a TypeScript rule supersedes a JavaScript rule, explicitly disable the core ESLint rule:
  ```javascript
  'no-unused-vars': 'off',
  'no-undef': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  ```
- **Composable Presets**: `react.js` must remain standalone (do not import `base.js` directly inside `react.js`). Consumers compose them: `[...baseConfig, ...reactConfig]`.
- **Import Hygiene**: All import ordering and duplicate checking are powered by `eslint-plugin-import-x`. Ensure imports are alphabetical and grouped by category.

## Testing & Fixture Contract
Whenever updating rules in this directory:
1. Update corresponding fixtures in `test/fixtures/` (`valid-js.js`, `valid-ts.ts`, or `valid-react.jsx`).
2. Run `npm test` to verify syntax and execution against the integration suite.
