---
id: "T-009"
title: "Verify Locked Out User"
status: "TODO"
---

T-009: Verify Locked Out User

## Objective

Verify that a locked-out user receives the correct error message.

## Context

- **Page Object:** `pages/LoginPage.ts`
- **Test File:** `tests/login_error.spec.ts`
- **User:** `locked_out_user` / `secret_sauce`

## Acceptance Criteria

> (See Standard DoD in AGENTS.md)

- [ ] Attempt login with locked_out_user.
- [ ] Verify error: "Epic sadface: Sorry, this user has been locked out."
