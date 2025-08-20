/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.dvh.sh;
  child-src *.google.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 640, 768, 1024, 1280, 1920, 2560, 3840],
    imageSizes: [16, 32, 64, 128, 256],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars1.githubusercontent.com",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "r2.dvh.sh",
        pathname: "/photos/**",
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
