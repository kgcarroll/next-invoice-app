/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        ppr: 'incremental',
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Prevent Webpack from bundling server-side modules in client code
            config.resolve.fallback = {
                fs: false,
                path: false,
                crypto: false,
            };
        }
        return config;
    },
};

export default nextConfig;
