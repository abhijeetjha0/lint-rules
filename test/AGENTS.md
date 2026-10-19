# Test Module — Agent Guidelines

## Purpose
Provides the automated verification and integration testing harness for ESLint and Stylelint presets against realistic code fixtures.

## Key Files
| File | Role |
| :--- | :--- |
| `run-tests.mjs` | Integration test runner invoking programmatic ESLint and Stylelint engine APIs |
| `fixtures/valid-js.js` | Fixture exercising core JavaScript linting rules |
| `fixtures/valid-ts.ts` | Fixture exercising TypeScript type-imports and overridden rules |
| `fixtures/valid-react.jsx` | Fixture exercising React JSX runtime and hooks |
| `fixtures/valid-css.css` | Fixture exercising CSS property order rules |
| `fixtures/valid-scss.scss` | Fixture exercising SCSS nested variables, mixins, and ordering |

## Conventions
- **No Mocking**: Always test against the real programmatic ESLint (`new ESLint()`) and Stylelint (`stylelint.lint()`) APIs.
- **Syntax Check First**: Run `node --check eslint/*.js stylelint/*.js` before running the integration harness.
- **Fixture Cleanliness**: Files in `fixtures/` must remain completely error-free when linted against their active preset configurations.
- **Adding Test Fixtures**: When adding a new rule or changing behavior, update or add fixtures demonstrating valid code patterns.
- **Execution Command**: Always invoke tests via `npm test` or `npm run test:lint`.
