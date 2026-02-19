import type { LayoutServerLoad } from './$types';
import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
import { SITE_URL, OG_IMAGES, ROUTES } from '$lib/config';

export const load: LayoutServerLoad = async ({ url, parent }) => {
	const parentData = await parent();
	const cvData = loadCVData();
	const focus = getFocusByName('developer');
	const isProduction = !url.hostname.includes('localhost');

	const title = `${focus?.title} — ${cvData.personal.name}`;
	const description = focus?.summary || 'Software development projects and technical expertise';
	const canonicalUrl = isProduction ? `${SITE_URL}${ROUTES.developer}` : url.toString();

	return {
		...parentData,
		seo: {
			title,
			description,
			keywords:
				'developer, web development, software engineer, typescript, svelte, fullstack, programming',
			canonical: canonicalUrl,
			ogImage: `${SITE_URL}${OG_IMAGES.developer}`,
			author: cvData.personal.name,
			email: parentData.seo.email
		},
		focus
	};
};
