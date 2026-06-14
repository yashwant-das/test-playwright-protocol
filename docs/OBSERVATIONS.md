# Project Observations & Issues Tracker

**Project:** Smart Playwright Protocol (SPP) v2.1.0
**Date Created:** 2026-06-05

## Legend / Status Definitions

| Status | Description |
|--------|-------------|
| `🔴 OPEN` | Requires investigation or a fix. Priority determined by severity. |
| `🟡 REVIEW` | Needs discussion on whether to implement, refactor, or ignore. |
| `✅ FIXED` | The issue has been resolved in code or documentation. |
| `❌ WONTFIX` | Intentionally accepted as technical debt, cosmetic non-issue, or outside project scope. |

---

## Issue Board (Table View)

### Critical & Actionable Issues

*Requiring immediate attention to restore project integrity or CI reliability.*

| # | Issue Description | Priority | Status |
|---|-------------------|----------|--------|
| 1 | **Stale Task References**: Tasks T-004 through T-009 reference `pages/` and `tests/` files that do not exist on disk, artificially inflating the "Blocked" queue. | High | `❌ WONTFIX` |
| 2 | **CI Flake Risk**: CI tests (`npm test`) are vulnerable to Sauce Demo site downtime or layout changes with no retry/flake protection configured for external endpoints. | High | `✅ FIXED` |
| 3 | **Misleading Config**: `testIdAttribute: 'data-test'` in `playwright.config.ts` is unnecessary since no tests use Playwright's `getByTestId`. Can be removed to reduce config bloat. | Medium | `❌ WONTFIX (Invalid)` |

### Medium / Reliability Concerns

*Impacts developer experience, robustness, or test stability.*

| # | Issue Description | Priority | Status |
|---|-------------------|----------|--------|
| 4 | **Irreversible State Transition**: `processTask` unconditionally overwrites a task to `DONE`. Manual reverts back to `TODO` require editing markdown manually. | Medium | `✅ FIXED` |
| 5 | **Silent Fallback Env**: Running `npm test` with no `.env` file silently defaults to the hardcoded URL without warning the user they aren't testing what they expect. | Low-Med | `✅ FIXED` |
| 6 | **Short Test Timeout**: `timeout: 30s` in `playwright.config.ts` may be too short for Sauce Demo on slow connections or under high network latency. | Medium | `✅ FIXED` |
| 7 | **Empty Stage Pre-commit**: Pre-commit hook silently skips strict validation if staging is empty, reducing gate reliability during `git commit -a` workflows. | Low | `✅ FIXED` |
| 8 | **Selector Analysis Blindspot**: `scripts/check-selectors.ts` only checks literal calls (e.g., `page.getByRole().locator()`). It misses dynamically assigned variable locators. | Medium | `✅ FIXED` |
| 9 | **CLI Status Ordering Bug**: `fs.readdirSync()` order determines how tasks appear in `npm run task status`. This is filesystem-dependent and can be non-alphabetical. | Low | `✅ FIXED` |

### Minor / Cosmetic & Housekeeping Issues

*Low impact, accepted as-is or minor cleanup items.*

| # | Issue Description | Priority | Status |
|---|-------------------|----------|--------|
| 10 | **Over-complicated Screenshot Dir**: `BasePage.ts` unnecessarily creates a local variable for the screenshot path that gets passed straight to fs methods. | Low | `❌ WONTFIX (Cosmetic)` |
| 11 | **Masked Type Errors**: `tsconfig.json` has `"skipLibCheck": true`, masking some third-party type issues, though this is standard practice. | Low | `❌ WONTFIX (Standard Practice)` |
| 12 | **"Next" Menu UX Gap**: The interactive CLI menu `Next` option silently proceeds to the next task without explaining why a new task wasn't selected when one was already IN_PROGRESS. | Medium | `✅ FIXED` |
| 13 | **Redundant `.gitignore` Rules**: Both `logs/` directory and `*.log` glob exclude log files. | Low | `❌ WONTFIX (Cosmetic)` |
| 14 | **Pre-commit Lint Scope Gaps**: `lint-staged` only lints `pages/**/*.ts` and `tests/**/*.ts`. ESLint violations in `scripts/`, `mcp/`, etc., slip through commits. | Medium | `✅ FIXED` |

---

## Detailed Expansions (Actionable Items)

Below is expanded context for the highest-priority items to assist in implementing fixes.

### 1. Stale Task References

- **Affected Tasks:** [T-004](./tasks/T-004_Logout.md), [T-005](./tasks/T-005_Footer.md), [T-006](./tasks/T-006_Sorting.md), [T-007](./tasks/T-007_checkout-step1.md), [T-008](./tasks/T-008_checkout-final.md), [T-009](./tasks/T-009_login-error.md)
- **The Problem:** 6 out of 10 tasks point to `PageObject` or `TestFile` paths that do not exist in the repository (`pages/Components/Sidebar.ts`, `tests/logout.spec.ts`, etc.). Because T-004 and T-010 are technically marked `BLOCKED`, this artificially inflates the blocked queue with dead-weight tasks.
- **Action:** Verify what was intended for these 6 tasks. Either implement the missing `.ts` files, mark them as completed if they were implemented elsewhere, or remove/resolve stale task entries to clear the board.

### 2. CI Flake Risk

- **The Problem:** The [GitHub Actions verify workflow](./.github/workflows/verify.yml) runs `npm test` against an external endpoint (Sauce Demo). If Sauce Demo's network dips or its HTML layout shifts unexpectedly, tests fail with no automated retry logic built into the local Playwright config for retries.
- **Action:** While `retries: 2` is set in `playwright.config.ts` for CI, ensure it applies globally across all workers. Add a note in documentation about anticipated Sauce Demo flakiness and consider adding mock fallbacks or network isolation if testing against the public site becomes unmanageable.

### 6. Short Test Timeout

- **The Problem:** `timeout: 30 * 1000` (30 seconds) in [playwright.config.ts](./playwright.config.ts) may be tight when Sauce Demo suffers high latency. Combined with parallelized workers, this can cause premature timeouts under poor network conditions.
- **Action:** Increase the default timeout to `45000ms` or make it configurable via an environment variable (e.g., `process.env.PLAYWRIGHT_TIMEOUT`).

### 8. Selector Analysis Blindspot

- **The Problem:** The static analysis script (`scripts/check-selectors.ts`) relies on AST traversal of literal method calls (`expr.includes('.locator')`). It will bypass checks for selector variables.
- **Action:** Update the check script to also flag variable assignments that eventually call `.locator()` or `.getBy*()` with non-ARIA values within Page Objects (the ARIA-first rule enforcement currently has a blind spot).

### 12. Menu "next" UX Gap

- **The Problem:** The interactive menu's `Next` option silently proceeds to the next task. If a task is already marked `IN_PROGRESS`, it simply runs verification on it without explaining *why* a new task wasn't selected. Users might assume their newly added TODO was picked when it actually wasn't.
- **Action:** Add a console log in the `next` handler for the interactive menu: "No new IN_PROGRESS/TODO tasks available. Re-running verification on currently active task."

### 14. Pre-commit Lint Scope Gaps

- **The Problem:** In `package.json`, `lint-staged` is configured to only lint `pages/**/*.ts` and `tests/**/*.ts`. This allows ESLint or static analysis violations in `scripts/`, `mcp/`, etc., to slip through commits, undermining the project's strict quality gates during development.
- **Action:** Expand the glob pattern in `lint-staged` to include `"scripts/**/*.ts": "eslint"`, `"mcp/**/*.ts": "eslint"`, or add a blanket pre-push script that lints all `.ts` files if fine-grained staging behavior isn't strictly required.

---

## Recent Fixes Log

*Track the resolution of observations here as they are implemented.*

| Target Date | Issue #s | Description of Fix Applied | PR / Notes |
|-------------|----------|---------------------------|------------|
| 2026-06-14 | 2, 5, 6 | Updated `playwright.config.ts` to add base URL fallback warning, increased timeout to 45s, and increased retries. | |
| 2026-06-14 | 4, 9, 12 | Updated `scripts/task.ts` to confirm before marking DONE, sorted tasks alphabetically, and added UX log for "Next" command. | |
| 2026-06-14 | 7, 14 | Expanded linting scope in `package.json` to all TS files and fixed pre-commit hooks to catch empty staging correctly. | |
| 2026-06-14 | 8 | Hardened `check-selectors.ts` AST parsing to fix the chained `CallExpression` blindspot for raw locators. | |
| 2026-06-14 | 3 | Evaluated Issue 3 as invalid. `getByTestId` is actively used in `InventoryPage.ts`, so `testIdAttribute` must remain. | Marked `WONTFIX` |
