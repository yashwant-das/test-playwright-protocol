---
id: "T-003"
title: "Verify Cart Functionality"
status: "DONE"
dependsOn: ["T-002"]
---

T-003: Verify Cart Functionality

## Understanding

Feature: Cart Management
Expected Behavior: Users can add items to the cart, and the cart indicator (badge) reflects the total count.
Business Outcome: Allows users to collect items for purchase, increasing conversion and sales.
Risk: Failure to track cart items prevents users from buying products, leading to revenue loss.

## Context

- **Page Object:** `pages/InventoryPage.ts`
- **Test File:** `tests/cart.spec.ts`
- **URL:** `/inventory.html`

## Implementation Plan

1. **Update `InventoryPage.ts`**:
   - Add `cartBadge` locator using `page.locator('.shopping_cart_badge')`.
   - Add `addToCartButtons` locator using `page.locator('[data-test^="add-to-cart-"]')`.
   - Implement `addItemToCart(index: number)` method.
   - Implement `getCartCount()` method.
2. **Create `tests/cart.spec.ts`**:
   - Arrange: Login and navigate to inventory.
   - Act: Add the first item to the cart.
   - Assert: Verify cart badge shows "1".
   - Act: Add another item to the cart.
   - Assert: Verify cart badge shows "2".
3. **Verify**:
   - Run `npm run lint`.
   - Run `npm run task T-003`.

## Acceptance Criteria

- [x] Add to cart method implemented.
- [x] Test verifies cart badge update.
