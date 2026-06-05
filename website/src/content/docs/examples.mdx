---
title: Examples
description: Real-world workflow examples using Smart Playwright Protocol.
---

Explore how SPP handles common automation scenarios, from successful implementation to automated recovery.

## Scenario 1: Perfect Implementation

In this ideal path, the AI understands the task and implements it correctly on the first attempt.

1.  **Task Creation**: User runs `npm run task create` to define "Verify Shopping Cart".
2.  **Handoff**: User runs `npm run task next` and pastes the prompt to Claude.
3.  **AI Work**: AI reads the [Protocol](/test-playwright-protocol/reference/protocol/), creates `CartPage.ts` and `cart.spec.ts`.
4.  **Verification**: User runs `npm run task T-003`.
    ```bash
    🛡️ Running Pre-Commit Checks...
    ✅ lint passed
    ✅ tests passed
    Task T-003 moved to DONE.
    ```

## Scenario 2: Verification Failure & Recovery

This scenario demonstrates the "Quality Gate" in action.

1.  **Handoff**: User activates a task to "Verify Login Error Message".
2.  **AI Mistake**: AI implements the test but uses a raw locator `page.locator('#error')` instead of using a Page Object.
3.  **Verification**: User runs `npm run task T-009`.
    ```bash
    ❌ Verification Failed
    - Selector Health Check: FAILED (Raw locator found in tests/login.spec.ts)
    Task T-009 moved to BLOCKED.
    ```
4.  **Recovery**: The CLI generates a **Repair Prompt**:
    > "Verification for T-009 failed. Issue: Raw locator found in tests/login.spec.ts. Please move all selectors to the Page Object and retry."
5.  **AI Fix**: AI corrects the code by moving the selector to `LoginPage.ts`.
6.  **Success**: User re-runs `npm run task T-009`. Verification passes, and the task is marked `DONE`.

## Scenario 3: UI Regression Recovery

1.  **Implementation**: AI writes a test for "Checkout Tax".
2.  **Verification**: The test fails because the application's tax calculation changed from `5%` to `6%`.
3.  **Diagnosis**: User reviews `logs/last_run.log`.
    ```text
    Error: expect(received).toHaveText(expected)
    Expected: "$5.00"
    Received: "$6.00"
    ```
4.  **Handoff**: User provides this log to the AI.
5.  **AI Fix**: AI updates the test's expected values to match the new business requirements.
6.  **Success**: Verification passes.

:::tip[Try it yourself]
The best way to see these examples in action is to clone the [Demo Repository](https://github.com/yashwant-das/test-playwright-protocol) and run through the provided tasks in the `tasks/` directory.
:::
