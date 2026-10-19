# Contributing & Release Guide

Thank you for contributing to `@abhijeetjha0/lint-rules`. This document outlines the development workflow, branching strategy, semantic versioning guidelines, and the step-by-step release tagging procedure.

---

## Table of Contents

1. [Development Setup](#1-development-setup)
2. [Branching Strategy & Branch Cutting](#2-branching-strategy--branch-cutting)
3. [Local Development & Testing](#3-local-development--testing)
4. [Semantic Versioning Contract for Rules](#4-semantic-versioning-contract-for-rules)
5. [Release & Tagging Procedure](#5-release--tagging-procedure)
6. [Hotfix Release Workflow](#6-hotfix-release-workflow)

---

## 1. Development Setup

### Prerequisites

- **Node.js**: `v24.18.0` (or specified in [`.nvmrc`](.nvmrc))
- **npm**: `v10+`

```bash
# Clone the repository
git clone https://github.com/abhijeetjha0/lint-rules.git
cd lint-rules

# Switch to the correct Node version
nvm use

# Install dependencies
npm install
```

---

## 2. Branching Strategy & Branch Cutting

All active development branches should branch off the latest `main` branch.

### Branch Naming Conventions

| Branch Type | Format | Example | Description |
| :--- | :--- | :--- | :--- |
| **Feature** | `feat/<short-description>` | `feat/react-compiler-rules` | New presets or opt-in rule additions |
| **Fix / Adjustment** | `fix/<short-description>` | `fix/scss-at-rule-ignore` | Rule relaxations, bug fixes, parser updates |
| **Chore / Maintenance** | `chore/<short-description>` | `chore/upgrade-stylelint` | Dependency bumps, docs, CI updates |
| **Release Preparation** | `release/v<X.Y.Z>` | `release/v1.1.0` | Preparing release metadata and changelog |

### Step-by-Step Branch Cutting

```bash
# 1. Fetch latest changes from origin
git checkout main
git pull origin main

# 2. Cut a feature or fix branch
git checkout -b feat/add-css-grid-ordering

# 3. Work on your changes and test locally
npm test

# 4. Commit using Conventional Commits
git commit -m "feat(stylelint): add explicit grid-template ordering"

# 5. Push branch to GitHub
git push -u origin feat/add-css-grid-ordering
```

Open a Pull Request targeting `main`. The CI suite ([`.github/workflows/test.yml`](.github/workflows/test.yml)) will run all syntax checks and preset integration tests automatically.

---

## 3. Local Development & Testing

Whenever you modify any rule under [`eslint/`](eslint/) or [`stylelint/`](stylelint/):

```bash
# 1. Syntax check all configuration files
node --check eslint/*.js stylelint/*.js

# 2. Run the integration test suite across all 5 presets
npm run test:lint

# 3. Or run the combined test command
npm test
```

If adding new rules or syntax patterns, update or add fixtures in the [`test/fixtures/`](test/fixtures/) directory to ensure they are exercised by [`test/run-tests.mjs`](test/run-tests.mjs).

---

## 4. Semantic Versioning Contract for Rules

Because changes in linting rules directly affect downstream CI pipelines across multiple repositories, follow this strict SemVer contract:

| Version Bump | Criteria | Downstream Impact |
| :--- | :--- | :--- |
| **PATCH** (`1.0.X`) | Bug fixes in presets, documentation updates, dependency upgrades without rule behavior changes. | Non-breaking; auto-merged by Dependabot. |
| **MINOR** (`1.X.0`) | Introducing **new rules configured as `'warn'`**, new optional preset exports, or relaxing an existing rule from `'error'` to `'warn'`. | Non-breaking; warns developers without breaking CI builds. |
| **MAJOR** (`X.0.0`) | Elevating existing rules from `'warn'` to `'error'`, introducing **new rules set to `'error'`**, or raising engine peer requirements (e.g. ESLint 10, Node 26). | **Breaking**; requires coordinated consumer repository migration. |

---

## 5. Release & Tagging Procedure

Releases are published automatically to **GitHub Packages** via GitHub Actions ([`.github/workflows/publish.yml`](.github/workflows/publish.yml)) when a version tag (`v*.*.*`) is pushed.

### Step 1: Ensure `main` is Clean and Tested

```bash
git checkout main
git pull origin main
npm test
```

### Step 2: Bump Version in `package.json`

Use `npm version` to bump the version without creating a Git tag yet:

```bash
# For a patch release (1.0.0 -> 1.0.1)
npm version patch --no-git-tag-version

# For a minor release (1.0.0 -> 1.1.0)
npm version minor --no-git-tag-version

# For a major release (1.0.0 -> 2.0.0)
npm version major --no-git-tag-version
```

### Step 3: Commit the Version Bump

```bash
git add package.json package-lock.json
git commit -m "chore(release): bump version to $(node -p "require('./package.json').version")"
git push origin main
```

### Step 4: Create and Push the Release Tag

Extract the version from `package.json` and push the corresponding Git tag:

```bash
# Read version from package.json
VERSION=$(node -p "require('./package.json').version")

# Create annotated tag
git tag -a "v$VERSION" -m "Release v$VERSION"

# Push tag to GitHub
git push origin "v$VERSION"
```

### Step 5: Verify CI Publishing

1. Open **GitHub Actions** in the repository: `https://github.com/abhijeetjha0/lint-rules/actions`
2. Select the **Release Lint Rules Package** workflow triggered by your tag.
3. Verify that:
   - Dependencies were installed (`npm ci`).
   - Rule validation and integration tests passed (`npm test`).
   - Package published successfully to GitHub Packages (`npm publish`).

---

## 6. Hotfix Release Workflow

If an urgent rule break affects downstream builds:

```bash
# 1. Cut hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/revert-strict-rule

# 2. Apply fix and verify tests
npm test

# 3. Bump patch version
npm version patch --no-git-tag-version

# 4. Commit and merge to main via PR or direct push
git add .
git commit -m "fix(eslint): relax strict promise rule for hotfix"
git push origin hotfix/revert-strict-rule
# (Merge PR into main)

# 5. Tag and release from updated main
git checkout main
git pull origin main
VERSION=$(node -p "require('./package.json').version")
git tag -a "v$VERSION" -m "Hotfix v$VERSION"
git push origin "v$VERSION"
```
