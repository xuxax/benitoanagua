import { parse } from 'toml';
import type { SiteData } from '$lib/types/Site';
import { lang } from '$lib/state/lang.svelte';
import siteEs from './site.es.toml?raw';
import siteEn from './site.en.toml?raw';

export function loadSiteData(): SiteData {
    const raw = lang.current === 'en' ? siteEn : siteEs;
    return parse(raw) as SiteData;
}
