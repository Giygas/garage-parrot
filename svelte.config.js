import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'img-src': ['self', 'data:', 'localhost:*', '127.0.0.1:*', 'https://*.supabase.co'],
				'script-src': [
					'self',
					'https://*.supabase.co',
					'https://apis.google.com',
					'localhost',
					'*.vercel-scripts.com'
				],
				'frame-src': ['https://*.google.com'],
				'connect-src': [
					'self',
					'127.0.0.1:*',
					'https://*.google.com',
					'*.supabase.com',
					'*.iconify.design'
				],
				'object-src': ['none'],
				'base-uri': ['self'],
				'frame-ancestors': ['self'],
				'worker-src': ['none'],
				'font-src': ['self'],
				'child-src': ['self'],
				sandbox: [
					'allow-same-origin',
					'allow-scripts',
					'allow-popups',
					'allow-forms',
					'allow-modals'
				],
				'block-all-mixed-content': true,
				'upgrade-insecure-requests': true
			}
		},
		alias: {
			$components: 'src/lib/components',
			'$components/*': 'src/lib/components/*'
		}
	}
};

export default config;
