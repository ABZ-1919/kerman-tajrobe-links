import { linkBuilders, type Platform } from '@/lib/contact';

/**
 * ✏️ The only file you need to edit to change the links.
 *
 * - Change an ID or number: edit its `value` only.
 * - Remove a channel: delete its item.
 * - Reorder the list: reorder the items.
 * Final URLs are built automatically (src/lib/contact.ts).
 */

export type ContactLink = {
  platform: Platform;
  /** Label shown on the card */
  title: string;
  /** Username (with or without @) or phone number */
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
  /** Word in the headline rendered in the brand colour */
  headlineAccent: 'کرمان',
  subline: 'با ما در ارتباط باشید',
  swipeHint: 'بالا بکشید',
} as const;

/** Final URL + display text (@username or number); this is what the components consume. */
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
