import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { i18nRouting } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    
    const locale = hasLocale(i18nRouting.locales, requested)
        ? requested
        : i18nRouting.defaultLocale;
    
    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});
