import { parse } from 'toml';
import type { CVData } from '$lib/types/CV';
import cvToml from './cv.toml?raw';

export function loadCVData(): CVData {
	return parse(cvToml) as CVData;
}

export function getFocusByName(name: string) {
	const cvData = loadCVData();
	return cvData.focuses.find(focus => focus.name === name);
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
