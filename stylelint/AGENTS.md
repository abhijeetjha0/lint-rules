# Stylelint Module — Agent Guidelines

## Purpose
Defines Stylelint 16+ presets for standard CSS and SCSS stylesheets, enforcing consistent property ordering, modern notation, and nesting conventions.

## Key Files
| File | Role |
| :--- | :--- |
| `css.js` | Base Stylelint preset extending `stylelint-config-standard`, enforces 5-tier property ordering via `stylelint-order` |
| `scss.js` | SCSS preset extending `css.js` and `stylelint-config-standard-scss`, uses `postcss-scss` custom syntax |

## Conventions
- **Config Export**: Presets export a configuration object with JSDoc:
  ```javascript
  /** @type {import('stylelint').Config} */
  export default { extends: [...], plugins: [...], rules: { ... } };
  ```
- **Property Order Hierarchy**: All rules in `css.js` adhere to the 5-tier order:
  1. Positioning (`position`, `top`, `right`, `bottom`, `left`, `z-index`)
  2. Display & Box Model (`display`, `flex`, `grid`, `gap`)
  3. Sizing & Spacing (`box-sizing`, `width`, `height`, `margin`, `padding`)
  4. Typography (`font-family`, `font-size`, `font-weight`, `line-height`, `color`)
  5. Visuals & Interaction (`background`, `border`, `box-shadow`, `cursor`, `transition`, `transform`)
- **SCSS Collision Handling**: When using SCSS, always disable the default standard rule to let the SCSS plugin rule take precedence:
  ```javascript
  'at-rule-no-unknown': null,
  'scss/at-rule-no-unknown': true
  ```
- **Custom Syntax**: `scss.js` must declare `customSyntax: 'postcss-scss'` to parse SCSS syntax without crashing on mixins, functions, and nested properties.

## Testing & Fixture Contract
Whenever modifying rules in this directory:
1. Validate against `test/fixtures/valid-css.css` and `test/fixtures/valid-scss.scss`.
2. Run `npm test` to verify zero regressions.
