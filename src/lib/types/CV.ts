export interface PersonalInfo {
	name: string;
	location: string;
	phone: string;
	email: string;
	website: string;
	linkedin: string;
	github: string;
	behance: string;
	whatsapp: string;
	maps: string;
}

export interface EducationEntry {
	degree: string;
	institution: string;
	year: string;
}

export interface Skill {
	category: string;
	items: string[];
}

export interface Experience {
	company: string;
	position: string;
	period: string;
	description: string;
}

export interface Focus {
	name: string;
	title: string;
	subtitles?: string[];
	summary: string;
	skills: Skill[];
	experiences: Experience[];
}

export interface CVData {
	personal: PersonalInfo;
	education: EducationEntry[];
	focuses: Focus[];
}
