# Project Agent Guidelines

## Project Overview
`@abhijeetjha0/lint-rules` provides centralized, modular ESLint 9+ Flat Config and Stylelint 16+ presets for JavaScript, TypeScript, React, CSS, and SCSS across repositories. It is published to GitHub Packages as a scoped npm package (`@abhijeetjha0/lint-rules`).

## Tech Stack
- **Runtime & Node**: Node.js `v24.18.0` (see `.nvmrc`)
- **Module System**: Pure ES Modules (`"type": "module"`)
- **Linters**: ESLint 9+ (Flat Config), Stylelint 16+
- **Languages Supported**: JavaScript (ES2024), TypeScript 5.7+, React (JSX/TSX), CSS, SCSS
- **Test Runner**: Node test integration harness (`test/run-tests.mjs`)

## Global Conventions
- **ESM Imports**: All internal imports must use explicit file extensions (e.g. `import baseConfig from './base.js';`).
- **File Naming**: Use kebab-case for test/fixtures and scripts, standard `.js` for configurations, and `.mjs` for standalone scripts.
- **Unused Variables**: Ignore unused identifiers prefixed with `_` (`argsIgnorePattern: '^_'`).
- **Pre-publish Validation**: Any config change must pass `npm test` before commit or release.

## Semantic Versioning (SemVer) Contract
Changes to rules affect downstream CI builds. Follow this strict versioning policy:
- **PATCH** (`1.0.X`): Bug fixes, internal refactoring, non-breaking dependency updates, docs.
- **MINOR** (`1.X.0`): Introducing new rules set to `'warn'`, adding optional presets, or relaxing `'error'` to `'warn'`.
- **MAJOR** (`X.0.0`): Elevating `'warn'` to `'error'`, adding new rules set to `'error'`, or raising peer dependency requirements (e.g. ESLint 10, Stylelint 17, Node 26).

## Modular Guidelines
This repository uses folder-scoped `AGENTS.md` files. When editing code inside any subdirectory, always check for and adhere to the nearest `AGENTS.md`:

| Directory | Purpose | Modular Guidelines |
| :--- | :--- | :--- |
| `eslint/` | ESLint 9 Flat Config presets (JS, TS, React) | [eslint/AGENTS.md](file:///Users/abhijit/Documents/Projects/Learning/Common/lint-rules/eslint/AGENTS.md) |
| `stylelint/` | Stylelint 16 configs (CSS & SCSS with property sorting) | [stylelint/AGENTS.md](file:///Users/abhijit/Documents/Projects/Learning/Common/lint-rules/stylelint/AGENTS.md) |
| `test/` | Programmatic integration runner and lint fixtures | [test/AGENTS.md](file:///Users/abhijit/Documents/Projects/Learning/Common/lint-rules/test/AGENTS.md) |
| `.github/` | GitHub Actions for CI test validation and package releases | [.github/AGENTS.md](file:///Users/abhijit/Documents/Projects/Learning/Common/lint-rules/.github/AGENTS.md) |
