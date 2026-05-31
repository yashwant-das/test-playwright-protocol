---
id: "T-008"
title: "Verify Checkout Completion"
status: "TODO"
---

T-008: Verify Checkout Completion

## Objective

Verify the final checkout overview and completion page.

## Context

- **Page Object:** `pages/CheckoutStepTwoPage.ts` & `pages/CheckoutCompletePage.ts`
- **Test File:** `tests/checkout_final.spec.ts`
- **Pre-requisite:** Requires completing Login -> Inventory -> Cart -> Checkout Step 1.

## Acceptance Criteria

> (See Standard DoD in AGENTS.md)

- [ ] Verify Item total and Tax calculation.
- [ ] Click Finish.
- [ ] Verify "THANK YOU FOR YOUR ORDER" message.
