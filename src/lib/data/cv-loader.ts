import { parse } from 'toml';
import type { CVData } from '$lib/types/CV';
import { lang } from '$lib/state/lang.svelte';
import cvEs from './cv.es.toml?raw';
import cvEn from './cv.en.toml?raw';

export function loadCVData(): CVData {
	const raw = lang.current === 'en' ? cvEn : cvEs;
	return parse(raw) as CVData;
}

export function getFocusByName(name: string) {
	const cvData = loadCVData();
	return cvData.focuses.find((focus) => focus.name === name);
}

export function getAllFocuses() {
	const cvData = loadCVData();
	return cvData.focuses;
}

export function getPersonalInfo() {
	const cvData = loadCVData();
	return cvData.personal;
}

export function getEducation() {
	const cvData = loadCVData();
	return cvData.education;
}
