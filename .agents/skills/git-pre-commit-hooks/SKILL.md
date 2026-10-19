---
name: git-pre-commit-hooks
description: >-
  Provides a framework for setting up, configuring, and cleaning up pre-commit git hooks across different languages and project types. Includes prompting the user for configuration preferences and restoring hooks to their default state.
author: "Abhijit Kumar Jha"
author_url: "https://github.com/abhijeetjha0"
version: "1.0.0"
---

# Git Pre-Commit Hooks Configuration

## Overview
Automate the setup, configuration, and cleanup of git pre-commit hooks for various project types (JS/TS, Python, Go, etc.). This skill ensures that code quality checks (e.g., linting, formatting, testing) are run before code is committed. It is designed to be highly generic and interactive, prompting the user to determine the best tooling and checks for their specific project configuration.

## Prerequisites & Tools
- Git installed and initialized in the repository (`git status`).
- Project dependency managers installed depending on the ecosystem (e.g., `npm`/`yarn`/`pnpm` for Node.js, `pip`/`poetry` for Python).

## Recommended Workflow

### 1. Discovery & Analysis
- **Inspect the Environment:**
  - Identify the primary languages and project types by looking for configuration files (`package.json`, `pyproject.toml`, `requirements.txt`, `go.mod`, etc.).
  - Identify any existing linters, formatters, or test suites already configured (e.g., `eslint.config.js`, `stylelintrc`, `prettierrc`, `ruff.toml`, `pytest.ini`).
- **Check Existing Hooks:**
  - Check the `.git/hooks` directory to see if a `pre-commit` hook already exists.
  - Check for existing hook management tools (e.g., `husky`, `pre-commit`).

### 2. User Prompting & Configuration Strategy
- **Prompt the User:** Do NOT make assumptions about which tool or checks to use. You MUST present the user with options based on your discovery.
- **Example Prompts:**
  - *JS/TS Projects:* "I see this is a Node.js project. Would you like to use `husky` with `lint-staged`? Which checks should we run on staged files (e.g., `npm run lint`, `npx stylelint`, `prettier --write`, `npm test`)?"
  - *Python Projects:* "I see this is a Python project. Would you like to use the `pre-commit` framework? Should we include hooks like `black`, `ruff`, or `flake8`?"
  - *Generic/Shell:* "Would you prefer a simple bash script inside `.git/hooks/pre-commit`?"

### 3. Execution Steps
- **Setup Hooks:**
  - If using `husky` (Node.js): Run `npx husky init`, then configure `.husky/pre-commit` with the user's chosen command (e.g., `npx lint-staged`). Install necessary dev dependencies.
  - If using `pre-commit` (Python/Generic): Generate a `.pre-commit-config.yaml` file with the user's chosen hooks, then run `pre-commit install`.
  - If using simple bash: Create a hooks script file in the repository (e.g., `.githooks/pre-commit`), make it executable (`chmod +x .githooks/pre-commit`), and write the shell commands provided by the user. For Node projects using this approach, also recommend adding a `postinstall` script in `package.json` (e.g., `"postinstall": "cp .githooks/pre-commit .git/hooks/pre-commit"`) so the hook is automatically installed for all developers.

### 4. Cleanup & Restoration
- If the user requests to clean up or restore the pre-commit hook to its default state:
  - **Node.js/Husky:** Remove the `.husky` directory, uninstall the `husky` package from `package.json`, and run `git config --unset core.hooksPath`.
  - **Pre-commit framework:** Run `pre-commit uninstall` and remove `.pre-commit-config.yaml`.
  - **Manual/Bash:** Remove or empty the `.git/hooks/pre-commit` script. Restore it from `.git/hooks/pre-commit.sample` if necessary.

### 5. Verification & Validation
- Ensure the hook is executable (e.g., `ls -l .git/hooks/pre-commit` or `.husky/pre-commit`).
- If appropriate, simulate a commit or run the hook directly to ensure it triggers the checks as expected.

## Best Practices & Guidelines
- **Always ask first:** Do not unilaterally install dev dependencies without user consent.
- **Fail gracefully:** Ensure that the pre-commit hook scripts handle failures correctly (exit code 1) to prevent the commit from passing when checks fail.
- **Staged files only (STRICT REQUIREMENT):** You MUST configure the hooks to run ONLY on staged/modified files (e.g., using `lint-staged` for Node projects or equivalent tools for other languages). Running checks on the entire codebase during a pre-commit hook is strictly prohibited to minimize commit time.
