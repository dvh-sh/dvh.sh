const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars1.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
        ],
    },
    webpack(config, { isServer }) {
        if (!isServer) {
            config.resolve.alias['@sentry/node'] = '@sentry/browser';
        }
        return config;
    },
});