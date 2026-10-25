import type { NextConfig } from 'next';

/**
 * GitHub Pages serves the site under a sub-path: username.github.io/<repo>,
 * so basePath comes from an env variable (set in the deploy workflow).
 * Locally or on Vercel it is empty and the site is served from the root (/).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  // Fully static output (the `out` folder): runs on any host, no Node server needed.
  output: 'export',
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
