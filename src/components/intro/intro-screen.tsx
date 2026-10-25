'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SITE } from '@/config/links';
import { AnimatedLogo } from './animated-logo';

type Props = {
  /** true وقتی گذار به صفحه‌ی لینک‌ها شروع شده */
  leaving: boolean;
  onContinue: () => void;
};

/**
 * صفحه‌ی اینترو (پس‌زمینه‌ی نارنجی برند).
 * ورود به صفحه‌ی لینک‌ها با هر کدام از این‌ها:
 *   کشیدن رو به بالا (لمسی/ماوس) · تپ/کلیک · اسکرول رو به پایین · کلیدهای Enter / Space / ↑
 * کاربر مجبور نیست تا آخر انیمیشن صبر کند (هر لحظه می‌تواند رد شود).
 */
/**
 * سه فلش کوچک روی هم که از پایین به بالا یکی‌یکی روشن و خاموش می‌شوند
 * (حس «حرکت رو به بالا» بدون جابه‌جایی واقعی).
 */
function SwipeChevrons() {
  return (
    <svg viewBox="0 0 24 30" className="h-8 w-6" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {[22, 14, 6].map((y, i) => (
        <motion.path
          key={y}
          d={`M6 ${y + 4} 12 ${y - 2} 18 ${y + 4}`}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

export function IntroScreen({ leaving, onContinue }: Props) {
  const [logoDone, setLogoDone] = useState(false);
  const handleLogoDone = useCallback(() => setLogoDone(true), []);

  const proceed = useCallback(() => {
    if (!leaving) onContinue();
  }, [leaving, onContinue]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['Enter', ' ', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        proceed();
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 25) proceed();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, [proceed]);

  return (
    <motion.section
      aria-label="ورود به صفحه‌ی راه‌های ارتباطی کرمان تجربه"
      className="fixed inset-0 z-10 flex cursor-pointer touch-none select-none flex-col items-center justify-center overflow-hidden bg-brand"
      // کشیدن رو به بالا: کل صفحه کمی همراه انگشت بالا می‌آید (حس فیزیکی)
      drag={leaving ? false : 'y'}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.4, bottom: 0.05 }}
      onDragEnd={(_, info) => {
        if (info.offset.y < -60 || info.velocity.y < -400) proceed();
      }}
      onTap={proceed}
    >
      <motion.div
        animate={leaving ? { y: -60, scale: 0.9, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      >
        <AnimatedLogo className="w-[min(52vw,240px)]" onDone={handleLogoDone} />
      </motion.div>

      <AnimatePresence>
        {logoDone && !leaving && (
          <motion.div
            className="absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-2 text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <SwipeChevrons />
            <span className="font-sans text-base">{SITE.swipeHint}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
