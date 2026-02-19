/**
 * Build script to generate dynamic static files
 * Reads SITE_URL from src/lib/config.ts and generates:
 * - static/robots.txt
 * - static/sitemap.xml
 * - static/manifest.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const STATIC_DIR = path.join(projectRoot, 'static');
const CONFIG_FILE = path.join(projectRoot, 'src/lib/config.ts');

// Read SITE_URL from config
function readSiteUrl(): string {
	const configContent = fs.readFileSync(CONFIG_FILE, 'utf-8');
	const match = configContent.match(/export const SITE_URL = '([^']+)'/);
	if (!match) {
		throw new Error('Could not find SITE_URL in src/lib/config.ts');
	}
	return match[1];
}

// Generate robots.txt
function generateRobotsTxt(siteUrl: string): string {
	return `# Robots.txt for ${new URL(siteUrl).hostname}
User-agent: *
Allow: /
Allow: /developer
Allow: /designer
Allow: /graphic

# Disallow private sections (if any)
Disallow: /admin/
Disallow: /private/

# XML Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 0
`;
}

// Generate sitemap.xml
function generateSitemapXml(siteUrl: string): string {
	const routes = [
		{ path: '/', priority: '1.0', changefreq: 'weekly' },
		{ path: '/developer', priority: '0.9', changefreq: 'monthly' },
		{ path: '/designer', priority: '0.9', changefreq: 'monthly' },
		{ path: '/graphic', priority: '0.9', changefreq: 'monthly' }
	];

	const today = new Date().toISOString().split('T')[0];

	const entries = routes
		.map(
			(route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
		)
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

// Generate manifest.json
function generateManifestJson(siteUrl: string): string {
	const manifest = {
		name: 'Benito Anagua — Interactive Portfolio',
		short_name: 'Benito Anagua',
		description:
			'A modern, anti-reflow portal showcasing an interdisciplinary creative practice across design, development, and graphic design disciplines.',
		start_url: '/',
		scope: '/',
		display: 'standalone',
		orientation: 'portrait-primary',
		theme_color: '#000000',
		background_color: '#ffffff',
		icons: [
			{
				src: '/favicon.svg',
				sizes: 'any',
				type: 'image/svg+xml',
				purpose: 'any maskable'
			}
		],
		categories: ['portfolio', 'business'],
		screenshots: [
			{
				src: '/og-image.png',
				sizes: '1200x630',
				type: 'image/png',
				form_factor: 'wide'
			}
		]
	};

	return JSON.stringify(manifest, null, 2);
}

// Main function
async function main() {
	try {
		const siteUrl = readSiteUrl();
		console.log(`🔧 Generating static files for: ${siteUrl}`);

		// Ensure static directory exists
		if (!fs.existsSync(STATIC_DIR)) {
			fs.mkdirSync(STATIC_DIR, { recursive: true });
		}

		// Generate robots.txt
		const robotsTxt = generateRobotsTxt(siteUrl);
		fs.writeFileSync(path.join(STATIC_DIR, 'robots.txt'), robotsTxt);
		console.log('✓ Generated static/robots.txt');

		// Generate sitemap.xml
		const sitemapXml = generateSitemapXml(siteUrl);
		fs.writeFileSync(path.join(STATIC_DIR, 'sitemap.xml'), sitemapXml);
		console.log('✓ Generated static/sitemap.xml');

		// Generate manifest.json
		const manifestJson = generateManifestJson(siteUrl);
		fs.writeFileSync(path.join(STATIC_DIR, 'manifest.json'), manifestJson);
		console.log('✓ Generated static/manifest.json');

		console.log('\n✅ Static files generated successfully!\n');
	} catch (error) {
		console.error('❌ Error generating static files:', error);
		process.exit(1);
	}
}

main();
