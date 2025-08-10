import { MENU_ITEMS } from '@lib/constants/core';
import { i18nRouting } from '@lib/i18n/routing';
import { getFullUrl, getLocalizedFullUrl, type Href } from '@lib/utils';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return MENU_ITEMS.map((item) => generateSitemapEntries(item.href)).flat();
}

const generateSitemapEntries = (href: Href): MetadataRoute.Sitemap[number] => {
    return {
        url: getFullUrl(href),
        alternates: {
            languages: Object.fromEntries(
                i18nRouting.locales.map((current) => [current, getLocalizedFullUrl(href, current)]),
            ),
        },
        lastModified: new Date().toISOString(),
    };
};
