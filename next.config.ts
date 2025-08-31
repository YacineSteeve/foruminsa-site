import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('src/lib/i18n/server-side-config.ts');

const nextConfig: NextConfig = {
    output: 'standalone',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    reactStrictMode: true,
    poweredByHeader: false,
    allowedDevOrigins: ['192.168.1.227', '10.28.5.9'],
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
        
        // Prevent bundling some packages
        if (isServer) {
            config.externals.push(
                Object.fromEntries([
                    '@prisma/client',
                    '.prisma/client',
                    '@libsql/client',
                    'handlebars',
                    'express-handlebars'
                ].map((pkg) => [pkg, `commonjs ${pkg}`])),
            );
        }
        
        return config;
    },
};

export default withNextIntl(nextConfig);
