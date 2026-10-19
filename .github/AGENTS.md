# GitHub Workflows — Agent Guidelines

## Purpose
Defines the CI/CD pipelines for validating pull requests, checking preset syntax, and publishing releases to both npmjs.com and GitHub Packages.

## Key Files
| File | Role |
| :--- | :--- |
| `workflows/test.yml` | CI test validation triggered on pushes and PRs to `main` |
| `workflows/publish.yml` | Dual-package release pipeline triggered by version tags (`v*.*.*`) |

## Conventions
- **Node Alignment**: Always resolve Node version dynamically via `node-version-file: '.nvmrc'`. Do not hardcode Node versions in workflow YAML files.
- **Fail-Fast Validation**: The CI job must run syntax checks (`node --check eslint/*.js stylelint/*.js`) before executing the integration tests.
- **Tag-Driven Releases**: Releases are triggered exclusively by annotated version tags matching `v*.*.*`.
- **Dual-Package Publishing**: Releases publish in parallel jobs to:
  - **npmjs.com**: Authenticates with `${{ secrets.NPM_TOKEN }}`.
  - **GitHub Packages**: Authenticates with `${{ secrets.GITHUB_TOKEN }}` under the `@abhijeetjha0` scope.
- **Permissions**: `publish.yml` requires `contents: read` and `packages: write` for the GitHub Packages job.
