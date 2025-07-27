import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@lib/constants';
import { defineRouting } from 'next-intl/routing';

export const i18nRouting = defineRouting({
    locales: SUPPORTED_LANGUAGES,
    defaultLocale: DEFAULT_LANGUAGE,
    alternateLinks: true,
});
