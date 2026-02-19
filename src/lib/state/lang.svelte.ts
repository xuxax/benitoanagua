import { browser } from '$app/environment';

export type Language = 'es' | 'en';

class LangState {
	current = $state<Language>('es');

	constructor() {
		if (browser) {
			const saved = localStorage.getItem('lang') as Language | null;
			if (saved === 'es' || saved === 'en') {
				this.current = saved;
			} else {
				// Detectar idioma del navegador
				const systemLang = navigator.language.split('-')[0];
				this.current = systemLang === 'en' ? 'en' : 'es';
			}
		}
	}

	set(lang: Language) {
		this.current = lang;
		if (browser) {
			localStorage.setItem('lang', lang);
			document.documentElement.lang = lang;
		}
	}
}

export const lang = new LangState();
