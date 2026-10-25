'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import type { ResolvedLink } from '@/config/links';
import { IntroScreen } from './intro/intro-screen';
import { LinksPage } from './links/links-page';

/**
 * Orchestrates the whole experience as a tiny state machine:
 *   intro      → orange intro with the animated logo
 *   revealing  → a fixed white layer opens with a circle growing from the bottom
 *   done       → the intro unmounts and the white layer drops clip-path and `fixed`
 *
 * Why the `done` stage matters: if the page kept scrolling inside a fixed layer with a
 * clip-path, mobile browsers would repaint the whole layer on every scroll frame
 * (jank, black bars, visual noise). So after the reveal the page returns to normal flow.
 */
type Stage = 'intro' | 'revealing' | 'done';

const HIDDEN = 'circle(0% at 50% 100%)';
const FULL = 'circle(150% at 50% 100%)';

export function Experience({ links }: { links: ResolvedLink[] }) {
  const [stage, setStage] = useState<Stage>('intro');
  const reduceMotion = useReducedMotion();
  const revealRef = useRef<HTMLDivElement>(null);

  // Run the circle imperatively so the clip-path can be fully removed once it finishes.
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

  // After entering, make the body background and the browser toolbar colour white too.
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
          // During the reveal: a fixed layer over the intro. Afterwards: a normal page using native scrolling.
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
