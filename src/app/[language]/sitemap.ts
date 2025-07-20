import { APP_URL, MENU_ITEMS } from '@lib/constants';
import type { MetadataRoute } from 'next';

const generateSitemap = (path: string): MetadataRoute.Sitemap[number] => ({
    url: new URL(path, APP_URL).toString(),
    lastModified: new Date().toISOString(),
});

export default function sitemap(): MetadataRoute.Sitemap {
    return MENU_ITEMS.map((item) => generateSitemap(item.href));
}
