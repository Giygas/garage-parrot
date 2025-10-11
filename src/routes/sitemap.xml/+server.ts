import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const baseUrl = 'https://garage-parrot.vercel.app';

	const pages = [
		{ url: '/', priority: '1.0', changefreq: 'weekly' },
		{ url: '/vehicles', priority: '0.9', changefreq: 'daily' },
		{ url: '/services', priority: '0.8', changefreq: 'monthly' },
		{ url: '/login', priority: '0.5', changefreq: 'yearly' }
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${pages
		.map(
			(page) => `
	<url>
		<loc>${baseUrl}${page.url}</loc>
		<lastmod>${new Date().toISOString()}</lastmod>
		<priority>${page.priority}</priority>
		<changefreq>${page.changefreq}</changefreq>
	</url>`
		)
		.join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
