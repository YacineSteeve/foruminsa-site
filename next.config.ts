import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('src/lib/i18n/server-side-config.ts');

const nextConfig: NextConfig = {
    output: 'standalone',
    trailingSlash: true,
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '*',
            },
            {
                protocol: 'https',
                hostname: '*',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
