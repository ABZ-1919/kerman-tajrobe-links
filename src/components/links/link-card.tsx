'use client';

import { motion, type Variants } from 'motion/react';
import type { ResolvedLink } from '@/config/links';
import { PLATFORM_COLOR, PlatformIcon } from '@/components/icons/platform-icons';

/** ورود کارت‌ها (توسط والد با stagger یکی‌یکی اجرا می‌شود) */
export const cardEnter: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

const SHADOW_REST = '0 1px 2px rgba(21,32,76,0.04), 0 0 0 1px rgba(21,32,76,0.07)';
const SHADOW_HOVER = '0 14px 32px -14px rgba(249,113,26,0.45), 0 0 0 1px rgba(249,113,26,0.30)';

type Props = {
  link: ResolvedLink;
  onNavigate: (link: ResolvedLink) => void;
};

export function LinkCard({ link, onNavigate }: Props) {
  const color = PLATFORM_COLOR[link.platform];

  return (
    <motion.li variants={cardEnter}>
      <motion.a
        href={link.href}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        aria-label={`${link.title}: ${link.display}`}
        onClick={(e) => {
          // Ctrl/Cmd/Shift/کلیک وسط → رفتار پیش‌فرض مرورگر (باز شدن در تب جدید) حفظ شود
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
          e.preventDefault();
          onNavigate(link);
        }}
        className="group flex items-center gap-4 rounded-2xl bg-white p-4 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        whileTap="tap"
        variants={{
          rest: { y: 0, boxShadow: SHADOW_REST },
          hover: { y: -3, boxShadow: SHADOW_HOVER },
          tap: { y: 0, scale: 0.98, boxShadow: SHADOW_HOVER },
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {/* آیکن: با هاور/لمس کج می‌شود (variant از والد به ارث می‌رسد) */}
        <motion.span
          className="grid size-12 shrink-0 place-items-center rounded-xl"
          style={{ color, backgroundColor: `${color}1A` }}
          variants={{
            rest: { rotate: 0, scale: 1 },
            hover: { rotate: -12, scale: 1.06 },
            tap: { rotate: -12, scale: 0.94 },
          }}
          transition={{ type: 'spring', stiffness: 420, damping: 12 }}
        >
          <PlatformIcon platform={link.platform} className="size-6" />
        </motion.span>

        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg leading-tight text-ink">{link.title}</span>
          <span className="mt-0.5 block truncate text-sm text-ink/50">
            {/* bdi + ltr: آیدی و شماره داخل متن فارسی به‌هم‌ریخته نمایش داده نشوند */}
            <bdi dir="ltr">{link.display}</bdi>
          </span>
        </span>

        <svg
          viewBox="0 0 24 24"
          className="size-5 shrink-0 text-ink/25 transition-colors group-hover:text-brand"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m14 6-6 6 6 6" />
        </svg>
      </motion.a>
    </motion.li>
  );
}
