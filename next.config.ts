import type { NextConfig } from 'next';

/**
 * روی GitHub Pages سایت زیر یک مسیر سرو می‌شود: username.github.io/<repo>
 * پس basePath از متغیر محیطی خوانده می‌شود (در workflow تنظیم شده).
 * روی لوکال یا Vercel خالی است و سایت از ریشه (/) سرو می‌شود.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  // خروجی کاملاً استاتیک (پوشه‌ی out) — روی هر هاستی بالا می‌آید، حتی بدون سرور Node
  output: 'export',
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
