import { APP_URL, MENU_ITEMS } from '@lib/constants';
import { getPathname } from '@lib/i18n/navigation';
import { i18nRouting } from '@lib/i18n/routing';
import { Locale } from 'next-intl';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return MENU_ITEMS.map((item) => generateSitemapEntries(item.href)).flat();
}

type Href = Parameters<typeof getPathname>[0]['href'];

const generateSitemapEntries = (href: Href): Array<MetadataRoute.Sitemap[number]> => {
    return i18nRouting.locales.map((locale) => ({
        url: getUrl(href, locale),
        alternates: {
            languages: Object.fromEntries(
                i18nRouting.locales.map((current) => [current, getUrl(href, current)]),
            ),
        },
        lastModified: new Date().toISOString(),
    }));
};

const getUrl = (href: Href, locale: Locale): string => {
    const pathname = getPathname({ locale, href });
    return new URL(pathname, APP_URL).toString();
};
