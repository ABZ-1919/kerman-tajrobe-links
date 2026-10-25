import localFont from 'next/font/local';

export const displayFont = localFont({
  src: './fonts/HastiFaNum-Heavy.woff',
  weight: '900',
  style: 'normal',
  variable: '--font-hasti',
  display: 'swap',
});

export const bodyFont = localFont({
  src: './fonts/AbarLowFaNum-SemiBold.woff2',
  weight: '600',
  style: 'normal',
  variable: '--font-abar',
  display: 'swap',
});