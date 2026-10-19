# GitHub Workflows — Agent Guidelines

## Purpose
Defines the CI/CD pipelines for validating pull requests, checking preset syntax, and publishing releases to GitHub Packages.

## Key Files
| File | Role |
| :--- | :--- |
| `workflows/test.yml` | CI test validation triggered on pushes and PRs to `main` |
| `workflows/publish.yml` | Package release pipeline triggered by version tags (`v*.*.*`) |

## Conventions
- **Node Alignment**: Always resolve Node version dynamically via `node-version-file: '.nvmrc'`. Do not hardcode Node versions in workflow YAML files.
- **Fail-Fast Validation**: The CI job must run syntax checks (`node --check eslint/*.js stylelint/*.js`) before executing the integration tests.
- **Tag-Driven Releases**: Releases are triggered exclusively by annotated version tags matching `v*.*.*`.
- **Package Registry**: Releases publish to GitHub Packages (`https://npm.pkg.github.com`) under the `@abhijeetjha0` scope using `GITHUB_TOKEN`.
- **Permissions**: `publish.yml` requires `contents: read` and `packages: write`. Keep workflow permissions strictly scoped.
