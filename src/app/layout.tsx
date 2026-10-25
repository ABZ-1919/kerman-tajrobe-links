import { asset } from '@/lib/asset';
import type { Metadata, Viewport } from 'next';
import { bodyFont, displayFont } from '@/font';
import './globals.css';


export const metadata: Metadata = {
  title: 'کرمان تجربه | راه‌های ارتباطی',
  description: 'تلگرام، اینستاگرام، واتساپ، روبیکا، بله و شماره تماس کرمان تجربه',
  icons: { icon: asset('/logo.svg') },
};

export const viewport: Viewport = {
  themeColor: '#F9711A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${bodyFont.variable} ${displayFont.variable}`} suppressHydrationWarning>   
    <body className="font-sans">{children}
    </body>
    </html>
  );
}
