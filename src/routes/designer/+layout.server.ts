import type { LayoutServerLoad } from './$types';
import { loadCVData, getFocusByName } from '$lib/data/cv-loader';
import { SITE_URL, OG_IMAGES, ROUTES } from '$lib/config';

export const load: LayoutServerLoad = async ({ url, parent }) => {
	const parentData = await parent();
	const cvData = loadCVData();
	const focus = getFocusByName('designer');
	const isProduction = !url.hostname.includes('localhost');

	const title = `${focus?.title} — ${cvData.personal.name}`;
	const description = focus?.summary || 'UX/UI design projects and user experience expertise';
	const canonicalUrl = isProduction ? `${SITE_URL}${ROUTES.designer}` : url.toString();

	return {
		...parentData,
		seo: {
			title,
			description,
			keywords:
				'designer, ux, ui, user experience, interface design, product design, figma, design systems',
			canonical: canonicalUrl,
			ogImage: `${SITE_URL}${OG_IMAGES.designer}`,
			author: cvData.personal.name,
			email: parentData.seo.email
		},
		focus
	};
};
