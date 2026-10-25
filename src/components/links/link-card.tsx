'use client';

import { motion, type Variants } from 'motion/react';
import type { ResolvedLink } from '@/config/links';
import { PLATFORM_COLOR, PlatformIcon } from '@/components/icons/platform-icons';

/** ورود کارت‌ها (توسط والد با stagger یکی‌یکی اجرا می‌شود) — فقط opacity و transform */
export const cardEnter: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};

type Props = {
  link: ResolvedLink;
  /** کاربر روی همین کارت زده و در حال رفتن به لینک است */
  active: boolean;
  onNavigate: (link: ResolvedLink) => void;
};

/**
 * افکت‌های هاور با CSS ساده (نه JS) و فقط با transform و opacity:
 *   - این دو ویژگی روی GPU انیمیت می‌شوند و باعث repaint نمی‌شوند (برخلاف box-shadow)
 *   - hover در Tailwind v4 فقط روی دستگاه‌های دارای ماوس فعال است، پس روی موبایل
 *     هنگام اسکرول کارت‌ها الکی «روشن» نمی‌شوند
 *   - روی موبایل همان افکت با data-active هنگام تپ واقعی (کلیک) نمایش داده می‌شود
 */
export function LinkCard({ link, active, onNavigate }: Props) {
  const color = PLATFORM_COLOR[link.platform];

  return (
    <motion.li variants={cardEnter}>
      <a
        href={link.href}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        aria-label={`${link.title}: ${link.display}`}
        data-active={active ? '' : undefined}
        onClick={(e) => {
          // Ctrl/Cmd/Shift/کلیک وسط → رفتار پیش‌فرض مرورگر (باز شدن در تب جدید) حفظ شود
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
          e.preventDefault();
          onNavigate(link);
        }}
        className="group relative flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(21,32,76,0.04),0_0_0_1px_rgba(21,32,76,0.07)] outline-none transition-transform duration-300 ease-out select-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 data-active:-translate-y-0.5 [-webkit-tap-highlight-color:transparent]"
      >
        {/* لایه‌ی سایه‌ی نارنجی: سایه ثابت است، فقط opacity آن تغییر می‌کند */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_14px_32px_-14px_rgba(249,113,26,0.45),0_0_0_1px_rgba(249,113,26,0.35)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-active:opacity-100"
        />

        {/* آیکن: کج شدن با منحنی فنری (overshoot) */}
        <span
          className="grid size-12 shrink-0 place-items-center rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-12 group-hover:scale-105 group-data-active:-rotate-12 group-data-active:scale-105"
          style={{ color, backgroundColor: `${color}1A` }}
        >
          <PlatformIcon platform={link.platform} className="size-6" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg leading-tight text-ink">{link.title}</span>
          <span className="mt-0.5 block truncate text-sm text-ink/50">
            {/* bdi + ltr: آیدی و شماره داخل متن فارسی به‌هم‌ریخته نمایش داده نشوند */}
            <bdi dir="ltr">{link.display}</bdi>
          </span>
        </span>

        <svg
          viewBox="0 0 24 24"
          className="size-5 shrink-0 text-ink/25 transition-colors duration-300 group-hover:text-brand group-data-active:text-brand"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m14 6-6 6 6 6" />
        </svg>
      </a>
    </motion.li>
  );
}
