import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.blocketcdn.se',
        port: '',
        pathname: '/pictures/**',
      },
      {
        protocol: 'https',
        hostname: 'fordonsbilder.bilonline.se',
        port: '',
        pathname: '/marstabilhus/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: "frame-src https://www.google.com; img-src 'self' https://i.blocketcdn.se https://fordonsbilder.bilonline.se data:;",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
