# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Agentic Playwright SDET Framework** — a file-backed task lifecycle for Playwright E2E test automation with Page Object conventions, MCP-first exploration, and human-AI collaboration workflows. Target app: [SauceDemo](https://www.saucedemo.com/).

## Key Commands

```bash
npm test                    # Run all Playwright tests
npm test <file>            # Run a specific spec (e.g., tests/login_navigation.spec.ts)
npm run lint               # ESLint (code) + markdownlint (docs)
npm run lint:code          # ESLint only
npm run lint:md            # markdownlint only
npm run task               # Interactive task CLI
npm run task next          # Activate/resume next eligible task
npm run task T-001         # Verify/re-verify a specific task
npm run mcp                # Start custom task lifecycle MCP server
```

## Architecture

This framework manages AI-assisted test development through a **file-backed task system**:

```
tasks/*.md (frontmatter: status, dependsOn)
  └── scripts/task.ts (CLI runner: TODO→IN_PROGRESS→DONE/BLOCKED)
        ├── pages/*.ts (Page Objects — own all selectors/Locators)
        └── tests/*.spec.ts (Playwright specs — assertions only, no raw locators)
```

- **Task files** (`tasks/T-*.md`) are the source of truth. The runner (`scripts/task.ts`) and MCP server (`mcp/server.ts`) both parse their YAML frontmatter for status transitions and dependency resolution.
- **Page Objects** (`pages/`) are the sole owners of selectors and user actions. They extend `BasePage`.
- **Specs** (`tests/`) contain test scenarios and assertions, referencing Page Objects exclusively.
- **ESLint** (`eslint.config.ts`) enforces: `jsdoc/require-jsdoc` on PropertyDefinitions, `playwright/no-raw-locators` in `.spec.ts` files, and custom JSDoc tag names (`@selector`, `@strategy`, `@verified`, `@reason`).
- **MCP server** (`mcp/server.ts`) exposes `list_tasks`, `activate_task`, `verify_task`, `get_unmet_dependencies` tools for programmatic task lifecycle management.
- **Git hooks** (`.husky/`): `pre-commit` runs lint; `commit-msg` enforces Conventional Commit format.

## Critical Coding Rules

1. **No `page.locator()` in `.spec.ts` files** — enforced by ESLint (`playwright/no-raw-locators`). All element access goes through Page Objects.
2. **Every Page Object property must have three JSDoc tags**: `@selector`, `@strategy`, `@verified` (date in `YYYY-MM-DD` format). Missing any tag is non-compliant.
3. **Prefer accessible selectors**: `getByRole`, `getByLabel`, `getByText` over CSS selectors.
4. **Run `npm run lint` before claiming any task is complete** — it is a completion gate.

## Task Lifecycle

```
TODO ──► IN_PROGRESS ──► DONE
                │
                ▼
           BLOCKED (on lint/test failure)
```

- `dependsOn` in task frontmatter must be `DONE` before a `TODO` task can activate.
- When verification fails, read `logs/last_run.log` before making code changes.

## Adding a New Task

Copy `tasks/template.md` to `tasks/T-###_description.md`, set `status: "TODO"`, and include:
- YAML frontmatter with `id`, `title`, `status`, optional `dependsOn`
- `Context` block with `Page Object`, `Test File`, and `Url` lines
- Acceptance criteria checklist

## Adding a New Page Object

1. Create `pages/YourPage.ts`, extend `BasePage`.
2. Every `readonly` Locator property needs the three JSDoc tags: `@selector`, `@strategy`, `@verified`.
3. Use accessible Playwright APIs (`getByRole`, `getByLabel`, etc.) — never `page.locator()`.

## Documentation

- `README.md` — setup, daily workflow, framework rules
- `AGENTS.md` — mandatory AI agent protocol (coding standards, completion format)
- `docs/TASK_CLI.md` — task CLI reference
- `docs/ROADMAP.md` — planned improvements
