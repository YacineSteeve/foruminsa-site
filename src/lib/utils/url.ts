import { APP_URL, MENU_ITEMS } from '@lib/constants/core';
import type { Locale } from 'next-intl';

export type Href = (typeof MENU_ITEMS)[number]['href'];

export const getFullUrl = (href: Href): string => {
    return new URL(href, APP_URL).toString();
};

export const getLocalizedFullUrl = (href: Href, locale: Locale): string => {
    return new URL(`/${locale}${href}`, APP_URL).toString();
};
