# @abhijeetjha0/lint-rules

Centralized, unified linting rules and presets for JavaScript, TypeScript, React, Vanilla CSS, and SCSS across repositories.

Powered by **ESLint 9+ Flat Config** and **Stylelint 16+**, structured with **modular subpath exports** for clean, single-dependency management.

---

## Features

- ⚡ **ESLint 9+ Flat Config**: Modern, fast configuration format.
- 📦 **Modular Subpath Exports**: Mix and match JS, TS, React, CSS, and SCSS presets effortlessly.
- 🧹 **Import Hygiene**: Automated duplicate detection, ordering, and grouping via `eslint-plugin-import-x`.
- 📐 **Stylelint 16+**: Strict box model property ordering, modern color standards, and SCSS nested rule ergonomics.
- ⚛️ **React Ready**: Zero-overhead preset for React 18/19 and Next.js applications.
- 🛡️ **Zero Redundant Config**: All plugins and rule parsers bundled directly—consumer apps only need the runtime engines.

---

## Available Exports

| Subpath | Engine | Target | Description |
| :--- | :--- | :--- | :--- |
| `@abhijeetjha0/lint-rules/eslint/js` | ESLint | `*.{js,mjs,cjs,jsx}` | Core JavaScript / ESNext rules, globals, import sorting, formatting |
| `@abhijeetjha0/lint-rules/eslint/ts` | ESLint | `*.{ts,tsx,mts,cts}` | TypeScript rules (extends JS base with `typescript-eslint`) |
| `@abhijeetjha0/lint-rules/eslint/react` | ESLint | `*.{jsx,tsx}` | React, React Hooks, and Fast Refresh presets |
| `@abhijeetjha0/lint-rules/stylelint/css` | Stylelint | `*.css` | Standard CSS, property ordering (`stylelint-order`), color standards |
| `@abhijeetjha0/lint-rules/stylelint/scss` | Stylelint | `*.scss` | SCSS standards with `postcss-scss` and `stylelint-config-standard-scss` |

---

## Installation

### 1. Authenticate with GitHub Packages (`.npmrc`)

Add the following to your consumer project's `.npmrc`:

```ini
@abhijeetjha0:registry=https://npm.pkg.github.com
```

### 2. Install Package and Peer Dependencies

```bash
npm install -D @abhijeetjha0/lint-rules eslint stylelint typescript
```

*(Note: `typescript` is optional if your repository is pure JavaScript).*

---

## Configuration Recipes

### 1. JavaScript + Vanilla CSS

**`eslint.config.js`**
```javascript
import jsConfig from '@abhijeetjha0/lint-rules/eslint/js';

export default [
  ...jsConfig,
  {
    files: ['src/**/*.{js,jsx}'],
    rules: {
      // Repository overrides
    },
  },
];
```

**`stylelint.config.js`**
```javascript
export default {
  extends: ['@abhijeetjha0/lint-rules/stylelint/css'],
};
```

---

### 2. TypeScript + SCSS

**`eslint.config.js`**
```javascript
import tsConfig from '@abhijeetjha0/lint-rules/eslint/ts';

export default [
  ...tsConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Repository overrides
    },
  },
];
```

**`stylelint.config.js`**
```javascript
export default {
  extends: ['@abhijeetjha0/lint-rules/stylelint/scss'],
};
```

---

### 3. React / Next.js (TypeScript + SCSS)

**`eslint.config.js`**
```javascript
import tsConfig from '@abhijeetjha0/lint-rules/eslint/ts';
import reactConfig from '@abhijeetjha0/lint-rules/eslint/react';

export default [
  ...tsConfig,
  ...reactConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Custom overrides
    },
  },
];
```

**`stylelint.config.js`**
```javascript
export default {
  extends: ['@abhijeetjha0/lint-rules/stylelint/scss'],
};
```

---

## Recommended `package.json` Scripts

```json
{
  "scripts": {
    "lint": "npm run lint:js && npm run lint:css",
    "lint:js": "eslint .",
    "lint:css": "stylelint \"src/**/*.{css,scss}\"",
    "lint:fix": "eslint . --fix && stylelint \"src/**/*.{css,scss}\" --fix"
  }
}
```

---

## Migration Playbook for Existing Repositories

### Step 1: Remove Redundant Legacy Packages

```bash
# Purge standalone ESLint plugins
npm uninstall \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-import \
  eslint-plugin-node \
  eslint-plugin-promise \
  eslint-config-prettier \
  eslint-config-standard

# Purge standalone Stylelint plugins
npm uninstall \
  stylelint-config-standard \
  stylelint-config-standard-scss \
  stylelint-order \
  postcss-scss
```

### Step 2: Delete Legacy Configs

Remove outdated configs:
- Remove `.eslintrc`, `.eslintrc.js`, `.eslintrc.json`, `.eslintrc.yml`
- Remove `.stylelintrc`, `.stylelintrc.json`, `.stylelintrc.yml`

Create modern `eslint.config.js` and `stylelint.config.js` using the recipes above.

### Step 3: Auto-Fix Existing Code

```bash
npm run lint:fix
```

---

## Local Development & Testing

```bash
# Clone the repository
git clone https://github.com/abhijeetjha0/lint-rules.git
cd lint-rules

# Install dependencies
npm install

# Run integration tests across all presets
npm test
```

---

## Contributing & Releases

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for branch cutting conventions, rule deprecation policies, and the release tagging procedure.

---

## License

[MIT](LICENSE) © [Abhijit Kumar Jha](https://github.com/abhijeetjha0)