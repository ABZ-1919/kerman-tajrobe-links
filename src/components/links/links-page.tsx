'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SITE, type ResolvedLink } from '@/config/links';
import { StaticLogo } from '@/components/logo/static-logo';
import { LinkCard } from './link-card';
import { TopProgress } from './top-progress';

/** مدت پر شدن نوار نارنجی قبل از رفتن به لینک (ثانیه) */
const NAV_DELAY = 0.45;

export function LinksPage({ links }: { links: ResolvedLink[] }) {
  const reduceMotion = useReducedMotion();
  /** کلید کارتی که کاربر رویش زده (برای نمایش افکت فعال و نوار بالا) */
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  // برگشت با دکمه‌ی Back: مرورگر صفحه را از bfcache برمی‌گرداند → نوار باید ریست شود
  useEffect(() => {
    const onPageShow = () => setActiveKey(null);
    window.addEventListener('pageshow', onPageShow);
    const pending = timers.current;
    return () => {
      window.removeEventListener('pageshow', onPageShow);
      pending.forEach(clearTimeout);
    };
  }, []);

  const navigate = (link: ResolvedLink) => {
    if (activeKey) return;
    setActiveKey(keyOf(link));
    const delay = reduceMotion ? 0 : NAV_DELAY * 1000;
    timers.current.push(
      window.setTimeout(() => {
        // همان تب: window.open بعد از تأخیر توسط مرورگر به‌عنوان پاپ‌آپ بلاک می‌شود.
        // روی موبایل این لینک‌ها مستقیم اپ مربوطه را باز می‌کنند.
        window.location.href = link.href;
        // برای tel: صفحه عوض نمی‌شود → نوار را بعد از کمی برگردان
        timers.current.push(window.setTimeout(() => setActiveKey(null), 1200));
      }, delay),
    );
  };

  const [before, after] = splitAccent(SITE.headline, SITE.headlineAccent);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pb-12 pt-14 sm:px-6 sm:pt-20">
      <TopProgress active={activeKey !== null} duration={NAV_DELAY} />

      <motion.div
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.45, type: 'spring', stiffness: 260, damping: 16 }}
      >
        {/* سایه با box-shadow ثابت روی دایره (نه filter: drop-shadow که با هر اسکرول دوباره محاسبه می‌شود) */}
        <StaticLogo className="size-20 rounded-full shadow-[0_10px_24px_-6px_rgba(249,113,26,0.45)] sm:size-24" />
      </motion.div>

      {/* تیتر با افکت pop (spring با damping کم) */}
      <motion.h1
        className="mt-7 text-balance text-center font-display text-3xl leading-[1.6] text-ink sm:text-5xl"
        initial={{ opacity: 0, scale: 0.6, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 320, damping: 13 }}
      >
        {before}
        {after !== null && <span className="text-brand">{SITE.headlineAccent}</span>}
        {after}
      </motion.h1>

      <motion.p
        className="mt-2 text-base font-medium text-ink/55 sm:text-lg"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.5 }}
      >
        {SITE.subline}
      </motion.p>

      {/* موبایل: زیر هم — تبلت: دو ستون — دسکتاپ: سه ستون کنار هم */}
      <motion.ul
        className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { delayChildren: 1.1, staggerChildren: 0.09 } } }}
      >
        {links.map((link) => (
          <LinkCard key={keyOf(link)} link={link} active={activeKey === keyOf(link)} onNavigate={navigate} />
        ))}
      </motion.ul>

      <motion.footer
        className="mt-auto pt-12 text-xs text-ink/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
      >
        © {SITE.name}
      </motion.footer>
    </main>
  );
}

const keyOf = (link: ResolvedLink) => link.platform + link.value;

/** تیتر را دور کلمه‌ی تأکیدی می‌شکند تا آن کلمه رنگ برند بگیرد */
function splitAccent(text: string, accent: string): [string, string | null] {
  const i = text.indexOf(accent);
  if (i === -1) return [text, null];
  return [text.slice(0, i), text.slice(i + accent.length)];
}
