'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SITE } from '@/config/links';
import { AnimatedLogo } from './animated-logo';

type Props = {
  /** True once the transition to the links page has started. */
  leaving: boolean;
  onContinue: () => void;
};

/**
 * Intro screen on the orange brand background.
 * The user can continue to the links page with any of:
 *   swipe up (touch/mouse) · tap/click · scroll wheel · Enter / Space / ↑ keys
 * There is no need to wait for the animation to finish; it can be skipped at any time.
 */
/**
 * Three small stacked chevrons that light up one after another from bottom to top,
 * suggesting upward motion without actually moving anything.
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
      // Swipe up: the whole screen follows the finger slightly for a physical feel.
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
