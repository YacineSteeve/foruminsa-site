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
    webpack: (config, { isServer }) => {
        // Ignore docs and non-code files
        config.module.rules.push({
            test: /(\.md|\.txt|\.d\.ts|LICENSE)$/i,
            use: 'ignore-loader',
        });
        
        // Let Node.js handle native binaries
        config.module.rules.push({
            test: /\.node$/,
            loader: 'node-loader',
        });
        
        // Optional: prevent bundling prisma/libsql completely
        if (isServer) {
            config.externals.push({
                '@prisma/client': 'commonjs @prisma/client',
                '.prisma/client': 'commonjs .prisma/client',
                '@libsql/client': 'commonjs @libsql/client',
            });
        }
        
        return config;
    },
};

export default withNextIntl(nextConfig);
