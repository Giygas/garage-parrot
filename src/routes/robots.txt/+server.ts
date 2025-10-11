import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://garage-parrot.vercel.app/sitemap.xml

# Block admin areas
Disallow: /adminpanel/
Disallow: /create-admin/
Disallow: /formSubmit/

# Allow search engines to crawl main content
Allow: /vehicles/
Allow: /services/
Allow: /

# Crawl delay (optional)
Crawl-delay: 1`;

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=86400'
		}
	});
};
