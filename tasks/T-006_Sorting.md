---
id: "T-006"
title: "Verify Product Sorting"
status: "TODO"
---

T-006: Verify Product Sorting

## Objective

Verify that the inventory page determines the correct order when sorting options are selected.

## Context

- **Page Object:** `pages/InventoryPage.ts`
- **Test File:** `tests/sorting.spec.ts`

## Acceptance Criteria

> (See Standard DoD in AGENTS.md)

- [ ] Select 'Price (low to high)'.
- [ ] Verify first item price < last item price.
- [ ] Select 'Name (Z to A)'.
- [ ] Verify sorting correctness.
