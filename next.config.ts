import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    trailingSlash: true,
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },
};

export default nextConfig;
