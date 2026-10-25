/**
 * URL builders for each platform.
 * Why: the config only stores a username or a phone number, and the correct
 * URL format (e.g. wa.me with the country code) is built in one place.
 */

/** 09013702037 → 989013702037 (international format without +, as WhatsApp expects) */
export function toInternationalIR(phone: string): string {
  const digits = toLatinDigits(phone).replace(/\D/g, '');
  if (digits.startsWith('98')) return digits;
  if (digits.startsWith('0')) return `98${digits.slice(1)}`;
  return `98${digits}`;
}

/** Converts Persian/Arabic digits to Latin so config input works in any form. */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
}

const stripAt = (id: string) => id.trim().replace(/^@/, '');

export const linkBuilders = {
  telegram: (id: string) => `https://t.me/${stripAt(id)}`,
  instagram: (id: string) => `https://instagram.com/${stripAt(id)}`,
  whatsapp: (phone: string) => `https://wa.me/${toInternationalIR(phone)}`,
  phone: (phone: string) => `tel:+${toInternationalIR(phone)}`,
  rubika: (id: string) => `https://rubika.ir/${stripAt(id)}`,
  bale: (id: string) => `https://ble.ir/${stripAt(id)}`,
} as const;

export type Platform = keyof typeof linkBuilders;
