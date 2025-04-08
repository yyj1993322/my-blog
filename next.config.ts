import type { NextConfig } from "next";

const securityHeaders = [
  // {
  //   key: 'Content-Security-Policy',
  //   value:
  //     "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://*.lottiefiles.com; style-src 'self' 'unsafe-inline'; img-src * data: blob:; font-src *; connect-src *;",
  // },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig;
