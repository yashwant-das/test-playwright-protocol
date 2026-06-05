// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid';

// Force BASE_URL to the correct path to prevent interference from root .env
process.env.BASE_URL = '/test-playwright-protocol/';

// https://astro.build/config
export default defineConfig({
	site: 'https://yashwant-das.github.io',
	base: '/test-playwright-protocol',
	integrations: [
		starlight({
			title: 'Smart Playwright Protocol',
			plugins: [starlightClientMermaid()],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/yashwant-das/test-playwright-protocol' }],
			sidebar: [
				{ label: 'Home', slug: 'index', icon: 'home' },
				{ label: 'Quick Start', slug: 'quick-start', icon: 'rocket' },
				{ label: 'Why SPP?', slug: 'why-spp', icon: 'information' },
				{ label: 'Examples', slug: 'examples', icon: 'list-format' },
				{ label: 'Architecture Overview', slug: 'architecture', icon: 'puzzle' },
				{
					label: 'Reference Documentation',
					items: [
						{ label: 'Protocol', slug: 'reference/protocol', icon: 'setting' },
						{ label: 'CLI', slug: 'reference/cli', icon: 'terminal' },
						{ label: 'Roadmap', slug: 'reference/roadmap', icon: 'list-format' },
						{ label: 'AI Agents', slug: 'reference/agents', icon: 'laptop' },
					],
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
		}),
	],
});
