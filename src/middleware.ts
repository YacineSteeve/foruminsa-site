import createMiddleware from 'next-intl/middleware';
import { i18nRouting } from '@lib/i18n/routing';

const middleware = createMiddleware(i18nRouting);

export default middleware;

export const config = {
    // Match all pathnames except
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
