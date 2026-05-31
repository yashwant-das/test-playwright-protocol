---
id: "T-008"
title: "Verify Checkout Completion"
status: "TODO"
dependsOn: ["T-007"]
---

T-008: Verify Checkout Completion

## Understanding

Feature: Checkout Confirmation
Expected Behavior: Users can review their order details and finalize the purchase.
Business Outcome: Completes the transaction and confirms order placement.
Risk: Incorrect totals or failed completion blocks revenue generation.

## Context

- **Page Object:** `pages/CheckoutStepTwoPage.ts` & `pages/CheckoutCompletePage.ts`
- **Test File:** `tests/checkout_final.spec.ts`
- **URL:** `/checkout-step-two.html`

## Implementation Plan

1. Implement `CheckoutStepTwoPage` and `CheckoutCompletePage`.
2. Verify tax and total calculations.
3. Finalize the order and verify the success message.

## Acceptance Criteria

- [ ] Verify Item total and Tax calculation.
- [ ] Click Finish.
- [ ] Verify "THANK YOU FOR YOUR ORDER" message.
