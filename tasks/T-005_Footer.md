---
id: "T-005"
title: "Verify Footer Social Links"
status: "TODO"
---

T-005: Verify Footer Social Links

## Objective

Verify that the social media links in the footer open the correct URLs in new tabs.

## Context

- **Page Object:** `pages/FooterComponent.ts` (or BasePage)
- **Test File:** `tests/footer.spec.ts`
- **Constraint:** Handle new tab/window creation.

## Acceptance Criteria

> (See Standard DoD in AGENTS.md)

- [ ] Verify Twitter/X link.
- [ ] Verify Facebook link.
- [ ] Verify LinkedIn link.
- [ ] Assert `target="_blank"` or verify new page context URL.
