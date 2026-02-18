import { parse } from 'toml';
import type { SiteData } from '$lib/types/Site';
import siteToml from './site.toml?raw';

export function loadSiteData(): SiteData {
    return parse(siteToml) as SiteData;
}
