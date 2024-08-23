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
    }
});
