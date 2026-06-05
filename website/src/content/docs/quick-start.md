---
title: Quick Start
description: Get started with Smart Playwright Protocol in under 5 minutes.
---

import { Steps } from '@astrojs/starlight/components';

This guide will walk you through setting up SPP and completing your first automated task in under 5 minutes.

<Steps>

1. **Clone the Repository**
   
   Start by cloning the SPP framework to your local machine:
   ```bash
   git clone https://github.com/yashwant-das/test-playwright-protocol.git
   cd test-playwright-protocol
   ```

2. **Install Dependencies**
   
   Install the required Node.js packages and Playwright browsers:
   ```bash
   npm install
   npx playwright install
   ```

3. **Configure Environment**
   
   Copy the example environment file and update it with your target application's URL:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` and set `BASE_URL=https://www.saucedemo.com` (or your target site).*

4. **Create Your First Task**
   
   Launch the interactive wizard to generate a new task file. Follow the prompts to define your objective:
   ```bash
   npm run task create
   ```
   *This creates a new Markdown file in the `tasks/` directory.*

5. **Activate the Task**
   
   Select the task and move it to `IN_PROGRESS`. This automatically copies a precise AI handoff prompt to your clipboard:
   ```bash
   npm run task next
   ```

6. **Hand Off to AI Assistant**
   
   Paste the clipboard content into your AI assistant (e.g., ChatGPT, Claude, Cursor). The AI will:
   - Read the [Protocol](/test-playwright-protocol/reference/protocol/).
   - Understand the task requirements.
   - Implement the Page Objects and tests.

7. **Verify Task Completion**
   
   Once the AI finishes, run the automated quality gate to verify the implementation:
   ```bash
   npm run task T-001
   ```
   *If it passes, the task moves to `DONE`. If it fails, the CLI provides a repair prompt.*

</Steps>

:::tip
For a deeper dive into how the CLI works, check out the [CLI Reference](/test-playwright-protocol/reference/cli/).
:::
