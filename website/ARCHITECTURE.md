# Website Architecture

This document explains the technical architecture, technology stack, and content pipelines powering the Smart Playwright Protocol (SPP) documentation website.

## High-Level Overview

The SPP website is a static, documentation-first platform built on the Astro web framework and the Starlight documentation template. 

It serves two primary purposes:
1. **Onboarding:** Providing a human-optimized, visual introduction to SPP (What, Why, How).
2. **Authoritative Reference:** Displaying the deeply technical, protocol-level rules synced directly from the repository's source-of-truth files.

The website exists to lower the barrier to entry for new users without fragmenting the technical documentation that powers the CLI and AI agents.

---

## Technology Stack

- **Astro**: A modern static site generator that ships zero JavaScript by default, ensuring fast load times.
- **Starlight**: Astro's official documentation theme. It provides a robust sidebar, MDX support, and search capabilities out of the box.
- **@pasqal-io/starlight-client-mermaid**: A Starlight-native plugin that renders Mermaid diagrams (used heavily in our architecture and protocol overviews) on the client side without interfering with Astro's MDX parser.
- **Pagefind**: A static search engine integrated into Starlight that provides full-text search capabilities without needing a backend server.
- **GitHub Pages**: The hosting platform. The site is deployed statically via GitHub Actions.

---

## Directory Structure

The website is entirely contained within the `website/` directory to prevent interference with the core SPP framework.

```text
website/
├── astro.config.mjs    # Core configuration for Astro, Starlight, and Mermaid
├── sync-docs.mjs       # Custom synchronization and transformation engine
├── src/
│   ├── content.config.ts # Defines Astro Content Collections (Starlight docs)
│   ├── styles/
│   │   └── custom.css  # Custom "Ocean Blue" typography and layout overrides
│   ├── content/
│   │   └── docs/
│   │       ├── index.mdx            # Custom authored Homepage
│   │       ├── quick-start.mdx      # Custom authored Onboarding
│   │       ├── why-spp.mdx          # Custom authored Context
│   │       ├── examples.mdx         # Custom authored Scenarios
│   │       ├── architecture.mdx     # Custom authored System Overview
│   │       └── reference/           # GENERATED DIRECTORY (Do not edit)
│   │           ├── protocol.md      # Synced from root docs/PROTOCOL.md
│   │           ├── cli.md           # Synced from root docs/CLI.md
│   │           ├── roadmap.md       # Synced from root docs/ROADMAP.md
│   │           └── agents.md        # Synced from root AGENTS.md
└── package.json        # Contains `dev` and `build` scripts that trigger `sync`
```

---

## Synchronization Engine (`sync-docs.mjs`)

The most critical architectural decision in this project is the **Synchronization Engine**. 

### Purpose
To prevent "documentation drift", the root Markdown files (`docs/PROTOCOL.md`, etc.) must remain the single source of truth for the CLI and AI agents. However, these files lack the metadata (frontmatter) and path structures required to render correctly on a Starlight website. 

The `sync-docs.mjs` script acts as a bridge, reading the root files, transforming them for the web, and injecting them into the Starlight build pipeline.

### Transformation Pipeline
When `npm run sync` is executed, the following happens to each mapped document:

1. **Frontmatter Stripping**: Removes any existing YAML frontmatter block from the source file to prevent conflicts.
2. **Header De-duplication**: Removes the top-level `# H1` tag (Starlight automatically generates the title from frontmatter).
3. **Link Rewriting**: Scans for GitHub-style relative links (e.g., `[CLI](docs/CLI.md)`) and rewrites them to absolute web slugs (e.g., `[CLI](/test-playwright-protocol/reference/cli/)`).
4. **Alert Conversion**: Employs a state-machine parser to convert GitHub-flavored blockquote alerts (`> [!TIP]`, `> [!WARNING]`) into Starlight's native Markdown Directives (`:::tip`, `:::danger`). It handles multi-line alerts and all five GitHub alert types.
5. **Badge Stripping**: Removes raw Markdown image badges (like CI status or NPM versions) that clutter technical reference pages.
6. **Frontmatter Injection**: Prepends the required YAML frontmatter (`title`, `description`) so Starlight can index the page for navigation and search.

### Lifecycle Integration
The script is hooked into the NPM lifecycle in `package.json`:
- `"dev": "npm run sync && astro dev"`
- `"build": "npm run sync && astro build"`

This guarantees that the web view is always perfectly synchronized with the repository logic.

---

## Design Decisions

- **Why Two Layers?** Early iterations of the site simply rendered the repository files. While technically accurate, it provided a poor onboarding experience. By separating custom MDX pages (Layer 1) from synced Markdown (Layer 2), we achieve high human readability without sacrificing technical authority.
- **Why `.mdx` for Onboarding?** MDX allows the injection of rich interactive components (like Starlight's `<Steps>` or `<CardGrid>`) directly into Markdown, which is crucial for modern onboarding guides.
- **Why NOT `remark-mermaidjs` or `astro-mermaid`?** Older Astro setups use remark plugins to render Mermaid to SVGs at build time. This requires Playwright to run during the build step, which slows down CI/CD pipelines. We initially tried `astro-mermaid`, but it interfered with the core MDX compiler. We settled on `@pasqal-io/starlight-client-mermaid` because it is a native Starlight plugin that keeps builds fast and preserves MDX functionality.

---

## Deployment Flow

1. Developer updates root docs (e.g., `PROTOCOL.md`) or web docs (e.g., `quick-start.mdx`).
2. Developer commits and pushes to the `main` branch.
3. GitHub Actions (`.github/workflows/deploy-pages.yml`) triggers.
4. Action checks out code, sets up Node, and runs `npm run build`.
5. `npm run build` triggers `sync-docs.mjs`, pulling the latest root content into the `reference/` folder.
6. Astro builds the static HTML/CSS to the `website/dist/` directory.
7. Action uploads `dist/` as an artifact and publishes it to GitHub Pages.