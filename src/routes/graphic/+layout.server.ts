import type { LayoutServerLoad } from './$types';
import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
import { SITE_URL, OG_IMAGES, ROUTES } from '$lib/config';

export const load: LayoutServerLoad = async ({ url, parent }) => {
	const parentData = await parent();
	const cvData = loadCVData();
	const focus = getFocusByName('graphic');
	const isProduction = !url.hostname.includes('localhost');

	const title = `${focus?.title} — ${cvData.personal.name}`;
	const description = focus?.summary || 'Graphic design projects and visual identity work';
	const canonicalUrl = isProduction ? `${SITE_URL}${ROUTES.graphic}` : url.toString();

	return {
		...parentData,
		seo: {
			title,
			description,
			keywords:
				'graphic designer, visual design, branding, logo design, creative, visual identity, illustration',
			canonical: canonicalUrl,
			ogImage: `${SITE_URL}${OG_IMAGES.graphic}`,
			author: cvData.personal.name,
			email: parentData.seo.email
		},
		focus
	};
};
