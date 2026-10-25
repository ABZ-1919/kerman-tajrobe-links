'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LOGO_COLORS, LOGO_PIECES, LOGO_VIEWBOX } from '@/components/logo/logo-paths';
import { StaticLogo } from '@/components/logo/static-logo';

/** Animation timing in seconds, kept in one place so the rhythm is easy to tune. */
const TIMING = {
  start: 0.35, // pause before the first stroke
  stagger: 0.2, // delay between the start of consecutive pieces
  lineGap: 0.15, // extra pause before the second line («تجربه»)
  draw: 0.75, // how long each outline takes to draw
  fill: 0.35, // how long the fill takes to appear
};

const easeDraw = [0.65, 0, 0.35, 1] as const;

/**
 * The «کرمان تجربه» logo, appearing as if written with a pen.
 * Every piece has two layers:
 *   1) an outline stroke that is "drawn" by animating pathLength from 0 to 1
 *   2) the filled shape with its white outline, popping in once the stroke is drawn
 * Pieces are ordered right-to-left (logo-paths.ts): Persian letters are connected,
 * so "letter by letter" really means "connected piece by piece" in pen order.
 */
export function AnimatedLogo({ className, onDone }: { className?: string; onDone?: () => void }) {
  const reduceMotion = useReducedMotion();

  // Respect the OS-level "reduce motion" setting: show the static logo instead.
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
            {/* Layer 1: the outline being drawn */}
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
            {/* Layer 2: fill + white outline (sits on top of the stroke and covers it) */}
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
