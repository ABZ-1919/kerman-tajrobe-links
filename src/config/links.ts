import { linkBuilders, type Platform } from '@/lib/contact';

/**
 * ✏️ تنها فایلی که برای تغییر لینک‌ها لازم است ویرایش شود.
 *
 * - برای تغییر آیدی/شماره: فقط مقدار `value` را عوض کنید.
 * - برای حذف یک راه ارتباطی: آیتمش را پاک کنید.
 * - برای جابه‌جایی ترتیب نمایش: ترتیب آیتم‌ها را عوض کنید.
 * URL نهایی به‌صورت خودکار ساخته می‌شود (src/lib/contact.ts).
 */

export type ContactLink = {
  platform: Platform;
  /** عنوان نمایشی دکمه */
  title: string;
  /** آیدی (با یا بدون @) یا شماره تلفن */
  value: string;
};

export const CONTACT_LINKS: ContactLink[] = [
  { platform: 'instagram', title: 'اینستاگرام', value: '@kermantajrobeh' },
  { platform: 'telegram', title: 'تلگرام', value: '@kerman_tajroobeh' },
  { platform: 'whatsapp', title: 'واتساپ', value: '09013702037' },
  { platform: 'phone', title: 'تماس تلفنی', value: '09013702037' },
  { platform: 'rubika', title: 'روبیکا', value: '@kermantajrobe' },
  { platform: 'bale', title: 'بله', value: '@kermantajrobeh' },
];

export const SITE = {
  name: 'کرمان تجربه',
  headline: 'آماده‌ی یه تجربه‌ی خفن توی کرمان هستی؟',
  /** کلمه‌ای از تیتر که با رنگ برند نمایش داده می‌شود */
  headlineAccent: 'کرمان',
  subline: 'با ما در ارتباط باشید',
  swipeHint: 'بالا بکشید',
} as const;

/** لینک نهایی + متن نمایشی (آیدی با @ یا شماره) — در کامپوننت‌ها از این استفاده می‌شود */
export function resolveLink(link: ContactLink) {
  const isPhone = link.platform === 'phone' || link.platform === 'whatsapp';
  return {
    ...link,
    href: linkBuilders[link.platform](link.value),
    display: isPhone ? link.value : `@${link.value.replace(/^@/, '')}`,
    external: link.platform !== 'phone',
  };
}

export type ResolvedLink = ReturnType<typeof resolveLink>;
