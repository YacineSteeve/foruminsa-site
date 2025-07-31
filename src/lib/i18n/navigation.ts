import { createNavigation } from 'next-intl/navigation';
import { i18nRouting } from './routing';

// Lightweight wrappers around Next.js' navigation APIs that consider the routing configuration
export const { Link, usePathname, useRouter, getPathname } = createNavigation(i18nRouting);
