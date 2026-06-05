# Project State: Documentation Website

This document serves as a snapshot of the current state of the SPP documentation website project. It outlines what has been accomplished, current capabilities, and planned future improvements.

## Project Summary

The SPP website has evolved from a simple static generator into a robust, two-layer documentation platform. It successfully separates high-level onboarding (Layer 1) from authoritative technical reference (Layer 2) without duplicating content or fragmenting the source of truth. The foundation is highly stable, leveraging Astro, Starlight, and a custom synchronization engine.

**Current Maturity Level:** Production Ready
**Current Goal:** Maintain synchronization stability while expanding onboarding examples.

---

## Implementation Status

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **Astro & Starlight Setup** | Complete | Running Starlight v0.39 on Astro v6. |
| **GitHub Pages Deployment** | Complete | Automated via `.github/workflows/deploy-pages.yml`. |
| **Two-Layer Architecture** | Complete | Clear separation between `/docs/` and `/docs/reference/`. |
| **Synchronization Engine** | Complete | Custom `sync-docs.mjs` script handles all file mapping. |
| **Content Transformation** | Complete | Robust parsing for GitHub alerts, badges, and internal links. |
| **Mermaid Support** | Complete | Integrated via `astro-mermaid` for client-side rendering. |
| **Search Engine** | Complete | Pagefind full-text search operational in production builds. |
| **Homepage Redesign** | Complete | Custom MDX layout with `<CardGrid>` and workflows. |
| **Quick Start Guide** | Complete | Utilizes Starlight `<Steps>` component. |
| **Examples Page** | Complete | Demonstrates successful flows and recovery loops. |
| **Architecture Overview** | Complete | High-level component explanation with Mermaid diagrams. |

---

## Features Implemented

### 1. Synchronization Engine (`sync-docs.mjs`)
The core of the site's sustainability. It automatically pulls `PROTOCOL.md`, `CLI.md`, `ROADMAP.md`, and `AGENTS.md` from the root repository into the website build process. It guarantees the website is never out of date with the actual framework code.

### 2. Intelligent Content Transformations
The sync engine doesn't just copy files; it upgrades them for the web:
- **Link Rewriting**: Translates local GitHub paths (`docs/PROTOCOL.md`) to Starlight web slugs (`/test-playwright-protocol/reference/protocol/`).
- **State-Machine Alert Parsing**: Converts all variations of GitHub alerts (`> [!TIP]`, `> [!WARNING]`, including multi-line content) into Starlight's Markdown Directives (`:::tip`, `:::danger`).
- **Badge Stripping**: Automatically removes raw Markdown badges from the synced reference docs to keep the UI clean.

### 3. Client-Side Mermaid Rendering
Integrated `astro-mermaid` to parse and render ````mermaid` blocks directly in the browser. This avoided the build-time complexity and CI/CD performance hit associated with older Playwright-based SVG renderers.

### 4. Custom Styling & Typography
Implemented `website/src/styles/custom.css` to override default Starlight styles. The site uses an "Ocean Blue" accent palette, improved line heights (1.8), and specific styling for workflow cards.

### 5. MDX Onboarding Components
Transitioned onboarding pages (Home, Quick Start, Why SPP, Examples, Architecture) to `.mdx` format. This enabled the use of interactive React/Astro components like `<Steps>`, `<Card>`, and `<Tabs>` to dramatically improve the learning experience.

---

## Current Architecture Assessment

### What is working well
- **The Two-Layer Split**: Creating a hard boundary between hand-authored MDX onboarding pages and auto-synced Markdown reference pages is highly effective. It prevents marketing fluff from bleeding into technical specs.
- **The Sync Script**: Running the sync process as a `prebuild` step (via NPM scripts) rather than a separate CI action ensures that local development exactly matches production.
- **astro-mermaid**: Offloading diagram rendering to the client has kept the build times incredibly fast (< 3 seconds).

### What should remain unchanged
- **The Source of Truth**: `PROTOCOL.md` and `CLI.md` at the root of the repository MUST remain the only places technical rules are defined. The website must never become an alternative source of truth.

---

## Known Limitations & Future Improvements

### Known Limitations
- **Limited Real-World Examples**: The current "Examples" page covers theoretical scenarios. It lacks recorded terminal output (asciinema) or actual videos of the CLI in action.
- **Diagram Interactivity**: The Mermaid diagrams are static images. They do not currently link to specific sections of the documentation when clicked.

### Planned Future Improvements
- **Interactive Terminal Demos**: Embed lightweight terminal recordings (like `svg-term-cli` or `asciinema`) into the Quick Start and Examples pages.
- **Expanded Agent Prompts**: Provide a dedicated section showing exactly how different LLMs (Claude 3.5 Sonnet vs. GPT-4o) respond to the generated CLI prompts.
- **Versioned Documentation**: As SPP moves beyond v2.x, we may need to introduce Starlight's versioning plugins to maintain legacy protocol documentation.
