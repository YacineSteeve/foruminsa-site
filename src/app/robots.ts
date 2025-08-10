import { APP_URL, MENU_ITEMS } from '@lib/constants/core';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        host: APP_URL,
        sitemap: new URL('/sitemap.xml', APP_URL).toString(),
        rules: {
            userAgent: '*',
            disallow: ['/api'],
            allow: MENU_ITEMS.map((item) => item.href),
        },
    };
}
