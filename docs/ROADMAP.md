# Roadmap & Improvements

This document tracks planned architectural changes, toolchain upgrades, and framework improvements for the Smart Playwright Protocol (SPP).

## ⏳ Backlog (Pending)

### 1. Task Frontmatter Validation

**Status:** `PENDING`
**Owner:** Framework
**Why it matters:** Prevent confusing task activation behavior due to invalid YAML or missing required fields.

### 2. CI Verification Workflow

**Status:** `PENDING`
**Owner:** Framework
**Why it matters:** Enforce quality gates in a remote pipeline before merging pull requests.

### 3. Configurable Quality Gates

**Status:** `PENDING`
**Owner:** Framework
**Why it matters:** Allow users to promote warnings (like skipped tests) to errors based on project needs.

### 4. Priority-Aware Task Selection

**Status:** `PENDING`
**Owner:** Framework
**Why it matters:** Allow the `npm run task next` command to prioritize tasks based on explicit metadata.

### 5. Upgrade ESLint Configuration

**Status:** `PENDING`
**Owner:** Framework
**Why it matters:** The `tseslint.config()` method is deprecated. ESLint core now provides `defineConfig()`, which is the recommended approach for modern flat configurations.
