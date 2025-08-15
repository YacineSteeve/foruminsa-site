import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('src/lib/i18n/server-side-config.ts');

const nextConfig: NextConfig = {
    output: 'standalone',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    reactStrictMode: true,
    poweredByHeader: false,
    allowedDevOrigins: ['192.168.146.97'],
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '*',
            },
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                pathname: '/u/**',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
