import { i18nRouting } from '@lib/i18n/routing';
import enMessages from '@lib/i18n/messages/en.json';
import frMessages from '@lib/i18n/messages/fr.json';

declare module 'next-intl' {
    interface AppConfig {
        Locale: (typeof i18nRouting.locales)[number];
        Messages: typeof enMessages & typeof frMessages;
    }
}
