import { APP_URL, type MENU_ITEMS } from '@lib/constants';
import { getPathname } from '@lib/i18n/navigation';
import type { Locale } from 'next-intl';

export type Href = (typeof MENU_ITEMS)[number]['href'];

export const getFullUrl = (href: Href): string => {
    return new URL(href, APP_URL).toString();
};

export const getLocalizedFullUrl = (href: Href, locale: Locale): string => {
    const pathname = getPathname({ locale, href });
    return new URL(pathname, APP_URL).toString();
};
