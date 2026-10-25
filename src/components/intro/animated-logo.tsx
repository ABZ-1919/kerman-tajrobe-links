'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LOGO_COLORS, LOGO_PIECES, LOGO_VIEWBOX } from '@/components/logo/logo-paths';
import { StaticLogo } from '@/components/logo/static-logo';

/** زمان‌بندی انیمیشن (ثانیه) — همه‌ی اعداد یک‌جا تا تنظیم ریتم آسان باشد */
const TIMING = {
  start: 0.35, // مکث قبل از شروع
  stagger: 0.2, // فاصله‌ی شروع هر تکه با تکه‌ی قبلی
  lineGap: 0.15, // مکث اضافه قبل از شروع خط دوم («تجربه»)
  draw: 0.75, // مدت کشیده شدن خط دور هر تکه
  fill: 0.35, // مدت پر شدن رنگ
};

const easeDraw = [0.65, 0, 0.35, 1] as const;

/**
 * لوگوی «کرمان تجربه» که مثل نوشتن با قلم ظاهر می‌شود.
 * هر تکه دو لایه دارد:
 *   ۱) خط دور (stroke) که با pathLength از ۰ تا ۱ «کشیده» می‌شود
 *   ۲) شکل پرشده با حاشیه‌ی سفید که بعد از کشیده شدن خط، با یک pop کوچک ظاهر می‌شود
 * ترتیب تکه‌ها راست‌به‌چپ است (logo-paths.ts) چون حروف فارسی متصل‌اند و
 * «حرف‌به‌حرف» در عمل یعنی «تکه‌به‌تکه» به ترتیب حرکت قلم.
 */
export function AnimatedLogo({ className, onDone }: { className?: string; onDone?: () => void }) {
  const reduceMotion = useReducedMotion();

  // اگر کاربر انیمیشن را در سیستم‌عامل کم کرده، لوگو را ثابت نشان بده
  useEffect(() => {
    if (reduceMotion) onDone?.();
  }, [reduceMotion, onDone]);

  if (reduceMotion) return <StaticLogo className={className} withCircle={false} />;

  const lastIndex = LOGO_PIECES.length - 1;
  const delayOf = (i: number) =>
    TIMING.start + i * TIMING.stagger + (LOGO_PIECES[i].line === 1 ? TIMING.lineGap : 0);
  const totalDuration = delayOf(lastIndex) + TIMING.draw;

  return (
    <motion.svg
      viewBox={`0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}`}
      className={className}
      role="img"
      aria-label="کرمان تجربه"
      initial={{ scale: 0.92 }}
      animate={{ scale: 1 }}
      transition={{ delay: totalDuration, type: 'spring', stiffness: 220, damping: 11 }}
    >
      {LOGO_PIECES.map((piece, i) => {
        const delay = delayOf(i);
        return (
          <g key={piece.id}>
            {/* لایه ۱: خط دور که کشیده می‌شود */}
            <motion.path
              d={piece.d}
              fill="none"
              stroke={LOGO_COLORS.ink}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { delay, duration: TIMING.draw, ease: easeDraw },
                opacity: { delay, duration: 0.01 },
              }}
            />
            {/* لایه ۲: پر شدن رنگ + حاشیه‌ی سفید (روی خط دور می‌نشیند و آن را می‌پوشاند) */}
            <motion.path
              d={piece.d}
              fill={LOGO_COLORS.ink}
              fillRule="evenodd"
              stroke={LOGO_COLORS.outline}
              strokeWidth={8}
              strokeLinejoin="round"
              paintOrder="stroke"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: delay + TIMING.draw * 0.7,
                duration: TIMING.fill,
                scale: { delay: delay + TIMING.draw * 0.7, type: 'spring', stiffness: 380, damping: 14 },
              }}
              onAnimationComplete={i === lastIndex ? onDone : undefined}
            />
          </g>
        );
      })}
    </motion.svg>
  );
}
