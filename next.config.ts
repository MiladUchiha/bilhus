import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90, 95],
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
  // The workshop is now run separately by Auto Temple, and the Hyundai
  // authorisation ended with the move. Old workshop URLs still get search
  // and bookmark traffic, so send it where the work is actually done.
  async redirects() {
    const workshop = 'hyundai|general|inspection|tires|repairs|booking';
    return [
      {
        source: `/:locale(sv|en)?/service/:slug(${workshop})`,
        destination: 'https://autotemple.se',
        permanent: true,
      },
      {
        source: '/:locale(sv|en)?/about/workshop',
        destination: 'https://autotemple.se',
        permanent: true,
      },
      { source: '/about/authorization', destination: '/about', permanent: true },
      { source: '/:locale(sv|en)/about/authorization', destination: '/:locale/about', permanent: true },
    ];
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
