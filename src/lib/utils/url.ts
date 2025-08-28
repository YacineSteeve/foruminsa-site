import { APP_URL } from '@lib/constants/core';
import type { MenuItem } from '@lib/types/core';
import type { Locale } from 'next-intl';

export type Href = MenuItem['href'];

export const getFullUrl = (href: Href): string => {
    return new URL(href, APP_URL).toString();
};

export const getLocalizedFullUrl = (href: Href, locale: Locale): string => {
    return new URL(`/${locale}${href}`, APP_URL).toString();
};
