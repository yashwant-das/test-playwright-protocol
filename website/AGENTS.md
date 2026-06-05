# Website Contributor & Agent Instructions

This document provides essential guardrails and workflow instructions for anyone—human or AI assistant—working on the Smart Playwright Protocol (SPP) documentation website.

## 🚨 Source of Truth Rules

The SPP documentation website utilizes a **Two-Layer Architecture**. It is critical that you understand which files you are allowed to edit and which files you must never touch directly.

### Layer 1: Custom Onboarding (Editable)
These files live in `website/src/content/docs/` and have `.mdx` extensions. They are designed for human readability, teaching, and visual onboarding.

**You may safely edit these files:**
- `website/src/content/docs/index.mdx` (Homepage)
- `website/src/content/docs/quick-start.mdx`
- `website/src/content/docs/why-spp.mdx`
- `website/src/content/docs/examples.mdx`
- `website/src/content/docs/architecture.mdx`

### Layer 2: Technical Reference (Do NOT Edit)
These files live in `website/src/content/docs/reference/`. They are **automatically generated** from the repository's root technical documents. 

**DO NOT edit these files directly:**
- `website/src/content/docs/reference/protocol.md`
- `website/src/content/docs/reference/cli.md`
- `website/src/content/docs/reference/roadmap.md`
- `website/src/content/docs/reference/agents.md`

If you need to update technical reference material, **you must edit the root files** (`docs/PROTOCOL.md`, `docs/CLI.md`, etc.) and run the synchronization script.

---

## 🔄 Synchronization Workflow

The website uses a custom Node.js script (`website/sync-docs.mjs`) to copy content from the root directory into the website's reference folder.

### How it Works
1. **Reads** the root `.md` files.
2. **Transforms** the content (injects Starlight frontmatter, rewrites GitHub relative links to absolute web slugs, and converts GitHub `> [!TIP]` syntax to Starlight `:::tip` components).
3. **Writes** the output to `website/src/content/docs/reference/`.

### When to run it
The sync script runs automatically when you execute `npm run dev` or `npm run build` inside the `website/` directory.

To trigger it manually:
```bash
cd website
npm run sync
```

---

## 🛑 Contributor Guardrails

To maintain the integrity of the SPP framework and documentation, adhere to the following rules:

1. **Do not duplicate protocol content:** Never copy-paste rules from `PROTOCOL.md` into the onboarding pages. If an onboarding page needs to reference a technical rule, link to the synced reference page instead.
2. **Do not create alternative sources of truth:** The root `docs/` folder remains the singular authority on how the protocol operates. The website is merely a presentation layer.
3. **Do not bypass synchronization:** Never hardcode changes into the `website/src/content/docs/reference/` directory. They will be overwritten on the next build.
4. **Keep onboarding separate from reference:** Onboarding pages (`.mdx`) should be concise, visual, and action-oriented. Save deep technical specifications for the root `.md` files.
5. **Use MDX Components:** When editing onboarding pages, prefer using Starlight components (like `<Steps>`, `<Card>`, `<Tabs>`) to enhance the user experience.
