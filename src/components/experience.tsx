'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import type { ResolvedLink } from '@/config/links';
import { IntroScreen } from './intro/intro-screen';
import { LinksPage } from './links/links-page';

/**
 * ارکستراتور کل تجربه — یک state machine ساده با سه مرحله:
 *   intro      → اینترو نارنجی با لوگوی متحرک
 *   revealing  → لایه‌ی سفید (fixed) با دایره‌ای از پایین صفحه باز می‌شود
 *   done       → اینترو حذف می‌شود و clip-path و fixed از لایه‌ی سفید برداشته می‌شود
 *
 * چرا مرحله‌ی done مهم است؟ اگر صفحه بعد از گذار هم داخل یک لایه‌ی fixed با clip-path
 * اسکرول شود، مرورگر موبایل با هر فریم اسکرول کل لایه را دوباره رسم می‌کند
 * (لگ، نوارهای سیاه و پارازیت). پس بعد از گذار، صفحه به جریان عادی سند برمی‌گردد.
 */
type Stage = 'intro' | 'revealing' | 'done';

const HIDDEN = 'circle(0% at 50% 100%)';
const FULL = 'circle(150% at 50% 100%)';

export function Experience({ links }: { links: ResolvedLink[] }) {
  const [stage, setStage] = useState<Stage>('intro');
  const reduceMotion = useReducedMotion();
  const revealRef = useRef<HTMLDivElement>(null);

  // انیمیشن دایره به‌صورت دستوری (imperative) تا بعد از اتمام، بدون باقی ماندن clip-path پاک شود
  useEffect(() => {
    const el = revealRef.current;
    if (stage !== 'revealing' || !el) return;
    const controls = animate(
      el,
      { clipPath: [HIDDEN, FULL] },
      { duration: reduceMotion ? 0.25 : 0.95, ease: [0.65, 0, 0.35, 1] },
    );
    controls.then(() => setStage('done'));
    return () => controls.stop();
  }, [stage, reduceMotion]);

  // بعد از ورود، پس‌زمینه و رنگ نوار مرورگر هم سفید شود
  useEffect(() => {
    if (stage !== 'done') return;
    document.body.style.background = '#fff';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff');
  }, [stage]);

  const done = stage === 'done';

  return (
    <>
      {!done && <IntroScreen leaving={stage === 'revealing'} onContinue={() => setStage('revealing')} />}

      {stage !== 'intro' && (
        <div
          ref={revealRef}
          // حین گذار: لایه‌ی ثابت روی اینترو — بعد از گذار: صفحه‌ی معمولی با اسکرول خود مرورگر
          className={
            done ? 'flex min-h-dvh flex-col bg-white' : 'fixed inset-0 z-20 flex flex-col overflow-hidden bg-white'
          }
          style={done ? undefined : { clipPath: HIDDEN }}
        >
          <LinksPage links={links} />
        </div>
      )}
    </>
  );
}
