// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// Force BASE_URL to the correct path to prevent interference from root .env
process.env.BASE_URL = '/test-playwright-protocol/';

// https://astro.build/config
export default defineConfig({
	site: 'https://yashwant-das.github.io',
	base: '/test-playwright-protocol',
	integrations: [
		mermaid(),
		starlight({
			title: 'Smart Playwright Protocol',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/yashwant-das/test-playwright-protocol' }],
			sidebar: [
				{
					label: 'Introduction',
					items: [
						{ label: 'Home', slug: 'index', icon: 'home' },
						{ label: 'Quick Start', slug: 'quick-start', icon: 'rocket' },
					],
				},
				{
					label: 'Core Protocol',
					items: [
						{ label: 'Protocol', slug: 'protocol', icon: 'open-book' },
						{ label: 'AI Agents', slug: 'agents', icon: 'laptop' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'CLI', slug: 'cli', icon: 'terminal' },
						{ label: 'Roadmap', slug: 'roadmap', icon: 'list-format' },
					],
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
		}),
	],
});
