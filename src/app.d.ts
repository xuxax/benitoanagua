// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			seo: {
				title: string;
				description: string;
				keywords: string;
				canonical: string;
				ogImage: string;
				author: string;
				email: string;
			};
			site?: any;
			focus?: any;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
