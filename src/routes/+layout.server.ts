import type { LayoutServerLoad } from './$types';
import { loadSiteData } from '$lib/data/site-loader';
import { getPersonalInfo } from '$lib/data/cv-loader';
import { SITE_URL, OG_IMAGES } from '$lib/config';

export const load: LayoutServerLoad = async ({ url }) => {
	const site = loadSiteData();
	const personal = getPersonalInfo();
	const currentPath = url.pathname;
	const isProduction = !url.hostname.includes('localhost');
	const canonicalUrl = isProduction
		? `${SITE_URL}${currentPath === '/' ? '' : currentPath}`
		: url.toString();

	// Determine page-specific metadata
	let pageTitle = personal.name;
	let pageDescription = site.meta.description;
	let pageKeywords = 'portfolio, design, development, graphic design, interdisciplinary';

	if (currentPath.includes('/developer')) {
		pageTitle = `Software Developer — ${personal.name}`;
		pageDescription =
			'Software development projects, technical expertise, and professional experience';
		pageKeywords = 'developer, web development, software engineer, typescript, svelte, fullstack';
	} else if (currentPath.includes('/designer')) {
		pageTitle = `UX/UI Designer — ${personal.name}`;
		pageDescription = 'Design systems, user experience, and interface design projects';
		pageKeywords = 'designer, ux, ui, design, user experience, interface design';
	} else if (currentPath.includes('/graphic')) {
		pageTitle = `Graphic Designer — ${personal.name}`;
		pageDescription = 'Visual design, branding, and creative projects';
		pageKeywords = 'graphic designer, visual design, branding, creative, visual identity';
	}

	return {
		seo: {
			title: pageTitle,
			description: pageDescription,
			keywords: pageKeywords,
			canonical: canonicalUrl,
			ogImage: `${SITE_URL}${OG_IMAGES.default}`,
			author: personal.name,
			email: personal.email
		},
		site
	};
};
