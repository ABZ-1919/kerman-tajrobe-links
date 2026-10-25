/**
 * آدرس فایل‌های پوشه‌ی public را با basePath درست می‌کند.
 * Next.js لینک‌ها و اسکریپت‌های خودش را خودکار با basePath می‌سازد،
 * ولی آدرس‌هایی که ما دستی در <img src> یا متادیتا می‌نویسیم را نه.
 */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
