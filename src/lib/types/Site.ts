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
    theme_toggle_aria: string;
    lang_toggle_aria: string;
    exp_yrs_label: string;
    exp_label: string;
    location_label: string;
    phone_label: string;
    exp_title: string;
    grad_label: string;
    hero_eyebrow: string;
    specializations_label: string;
    view_cv_label: string;
    education_section_title: string;
    methodology_label: string;
    professional_label: string;
    technical_label: string;
    laboral_label: string;
    current_label: string;
    items_label: string;
    engineering_spec_label: string;
    email_label: string;
    web_label: string;
    behance_label: string;
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
