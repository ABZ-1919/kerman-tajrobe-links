'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { ResolvedLink } from '@/config/links';
import { IntroScreen } from './intro/intro-screen';
import { LinksPage } from './links/links-page';

/**
 * ارکستراتور کل تجربه — یک state machine ساده با سه مرحله:
 *   intro      → اینترو نارنجی با لوگوی متحرک
 *   revealing  → صفحه‌ی سفید با یک دایره از پایین صفحه باز می‌شود (روی اینترو)
 *   done       → اینترو کاملاً حذف (unmount) می‌شود
 */
type Stage = 'intro' | 'revealing' | 'done';

export function Experience({ links }: { links: ResolvedLink[] }) {
  const [stage, setStage] = useState<Stage>('intro');
  const reduceMotion = useReducedMotion();

  // بعد از ورود، پس‌زمینه و رنگ نوار مرورگر هم سفید شود (برای overscroll در موبایل)
  useEffect(() => {
    if (stage !== 'done') return;
    document.body.style.background = '#fff';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff');
  }, [stage]);

  return (
    <>
      {stage !== 'done' && (
        <IntroScreen leaving={stage === 'revealing'} onContinue={() => setStage('revealing')} />
      )}

      {stage !== 'intro' && (
        <motion.div
          // fixed + inset-0 → مرکز دایره همیشه پایین «صفحه‌نمایش» است، نه پایین محتوای اسکرول‌شده
          className="fixed inset-0 z-20 overflow-y-auto bg-white"
          initial={{ clipPath: 'circle(0% at 50% 100%)' }}
          animate={{ clipPath: 'circle(150% at 50% 100%)' }}
          transition={{ duration: reduceMotion ? 0.25 : 0.95, ease: [0.65, 0, 0.35, 1] }}
          onAnimationComplete={() => setStage('done')}
        >
          <LinksPage links={links} />
        </motion.div>
      )}
    </>
  );
}
