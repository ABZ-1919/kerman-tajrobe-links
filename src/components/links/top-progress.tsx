'use client';

import { AnimatePresence, motion } from 'motion/react';

/** Orange bar at the top of the page that fills before navigating (from the right, since the page is RTL). */
export function TopProgress({ active, duration }: { active: boolean; duration: number }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="fixed inset-x-0 top-0 z-50 h-1 origin-right bg-brand shadow-[0_0_12px_rgba(249,113,26,0.6)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
