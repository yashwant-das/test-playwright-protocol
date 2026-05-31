---
id: "T-006"
title: "Verify Product Sorting"
status: "TODO"
dependsOn: ["T-002"]
---

T-006: Verify Product Sorting

## Understanding

Feature: Inventory Sorting
Expected Behavior: Products can be sorted by name and price in both ascending and descending order.
Business Outcome: Users can easily find products based on their preferences.
Risk: Incorrect sorting results in a poor user experience.

## Context

- **Page Object:** `pages/InventoryPage.ts`
- **Test File:** `tests/sorting.spec.ts`
- **URL:** `/inventory.html`

## Implementation Plan

1. Use existing `InventoryPage`.
2. Implement sorting dropdown interaction.
3. Verify sorting by 'Price (low to high)' and 'Name (Z to A)'.

## Acceptance Criteria

- [ ] Select 'Price (low to high)'.
- [ ] Verify first item price <= last item price.
- [ ] Select 'Name (Z to A)'.
- [ ] Verify sorting correctness.
