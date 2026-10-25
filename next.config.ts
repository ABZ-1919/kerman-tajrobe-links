import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // خروجی کاملاً استاتیک (پوشه‌ی out) — روی هر هاستی بالا می‌آید، حتی بدون سرور Node
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
