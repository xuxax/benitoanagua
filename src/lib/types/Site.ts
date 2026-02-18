export interface SiteProfileSections {
    perfil: string;
    habilidades: string;
    experiencia: string;
    educacion: string;
}

export interface SiteProfile {
    label: string;
    href: string;
    code: string;
    icon: string;
    sections: SiteProfileSections;
}

export interface SiteFooterLink {
    label: string;
    href_key: string; // clave en PersonalInfo (website, behance, github, linkedin, whatsapp, email, maps)
    icon: string;
    accent?: boolean;
    mailto?: boolean;
}

export interface SiteFooterSection {
    title: string;
    links: SiteFooterLink[];
}

export interface SiteFooterSections {
    portfolio: SiteFooterSection;
    contact: SiteFooterSection;
}

export interface SiteFooter {
    bio: string;
    sections: SiteFooterSections;
}

export interface SiteNav {
    home_label: string;
    back_label: string;
    available_label: string;
    profiles: SiteProfile[];
}

export interface SiteMeta {
    lang: string;
    site_name: string;
    tagline: string;
    description: string;
}

export interface SiteData {
    meta: SiteMeta;
    nav: SiteNav;
    footer: SiteFooter;
}
