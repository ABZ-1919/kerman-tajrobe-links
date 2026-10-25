# 🧡 کرمان تجربه | صفحه‌ی راه‌های ارتباطی

صفحه‌ای به سبک زیلینک که همه‌ی راه‌های ارتباطی کرمان تجربه را یک‌جا نشان می‌دهد.

🔗 **پیش‌نمایش زنده:** https://abz-1919.github.io/kerman-tajrobe-links/

---

## 🚀 شروع سریع

```bash
npm install      # نصب وابستگی‌ها
npm run dev      # اجرا روی http://localhost:3000
npm run build    # ساخت نسخه‌ی نهایی در پوشه‌ی out
```

> پیش‌نیاز: **Node.js 18.18** یا بالاتر

---

## ✏️ تغییر لینک‌ها (مهم‌ترین بخش)

**فقط یک فایل:** [`src/config/links.ts`](src/config/links.ts)

```ts
export const CONTACT_LINKS: ContactLink[] = [
  { platform: 'instagram', title: 'اینستاگرام', value: '@kermantajrobeh' },
  { platform: 'whatsapp',  title: 'واتساپ',    value: '09013702037' },
  // ...
];
```

| می‌خواهم... | کاری که باید بکنم |
|---|---|
| آیدی یا شماره را عوض کنم | فقط `value` را تغییر بده |
| یک راه ارتباطی را حذف کنم | کل آن خط را پاک کن |
| ترتیب نمایش را عوض کنم | خط‌ها را جابه‌جا کن |
| اسم دکمه را عوض کنم | `title` را تغییر بده |

### `value` چه شکلی باشد؟

| platform | نمونه‌ی `value` | لینک ساخته‌شده |
|---|---|---|
| `instagram` | `@kermantajrobeh` | `instagram.com/kermantajrobeh` |
| `telegram` | `@kerman_tajroobeh` | `t.me/kerman_tajroobeh` |
| `whatsapp` | `09013702037` | `wa.me/989013702037` |
| `phone` | `09013702037` | `tel:+989013702037` |
| `rubika` | `@kermantajrobe` | `rubika.ir/kermantajrobe` |
| `bale` | `@kermantajrobeh` | `ble.ir/kermantajrobeh` |

> 💡 **لازم نیست URL کامل بنویسی.** لینک نهایی خودکار ساخته می‌شود ([`src/lib/contact.ts`](src/lib/contact.ts)).
> `@` اول آیدی اختیاری است و شماره را می‌شود با ارقام فارسی هم نوشت (`۰۹۰۱...`).

---

## 📝 تغییر متن‌های صفحه

همان فایل `links.ts`، بخش `SITE`:

```ts
export const SITE = {
  headline: 'آماده‌ی یه تجربه‌ی خفن توی کرمان هستی؟', // تیتر اصلی
  headlineAccent: 'کرمان',                           // کلمه‌ی نارنجی داخل تیتر
  subline: 'با ما در ارتباط باشید',                   // زیرتیتر
  swipeHint: 'بالا بکشید',                            // متن صفحه‌ی اینترو
};
```

---

## 🎨 سایر تغییرات رایج

| چه چیزی | کجا |
|---|---|
| رنگ‌های برند (نارنجی، سرمه‌ای) | `src/app/globals.css` ← بخش `@theme` |
| فونت‌ها | `src/font.ts` (فایل‌ها در `src/fonts/`) |
| آیکن یا رنگ هر پلتفرم | `src/components/icons/platform-icons.tsx` |
| سرعت و ریتم انیمیشن لوگو | `src/components/intro/animated-logo.tsx` ← ثابت `TIMING` |
| مدت نوار نارنجی قبل از رفتن به لینک | `src/components/links/links-page.tsx` ← `NAV_DELAY` |

---

## ⚠️ قوانین مهم

1. **`src/components/logo/logo-paths.ts` را دستی ویرایش نکن.** داده‌ی وکتور لوگوست و ترتیب آرایه همان ترتیب «نوشته شدن» در انیمیشن است.
2. **عکس‌های پوشه‌ی `public` را با `asset()` آدرس بده**، نه مستقیم:
   ```tsx
   <img src={asset('/rubika.png')} />   // ✅ روی GitHub Pages هم کار می‌کند
   <img src="/rubika.png" />            // ❌ روی GitHub Pages پیدا نمی‌شود
   ```
3. **برای انیمیشن فقط `transform` و `opacity`.** انیمیت کردن `box-shadow`، `filter` یا `clip-path` روی موبایل باعث لگ می‌شود.
4. **فایل `.npmrc` در ریپو نمی‌آید.** اگر نصب پکیج‌ها از اینترنت ایران کند است، یک `.npmrc` محلی با آدرس میرور بساز.
5. **متن‌ها فارسی، کامنت‌های کد انگلیسی.**

---

## 🗂 ساختار پروژه

```
src/
├─ config/links.ts        ✏️ لینک‌ها و متن‌ها
├─ lib/                   ساخت URL‌ها + تابع asset()
├─ font.ts, fonts/        فونت‌های محلی
├─ app/                   layout (RTL)، صفحه‌ی اصلی، استایل‌های سراسری
└─ components/
   ├─ experience.tsx      مدیریت مراحل: اینترو ← گذار دایره‌ای ← صفحه‌ی لینک‌ها
   ├─ intro/              صفحه‌ی اینترو و لوگوی متحرک
   ├─ links/              صفحه‌ی لینک‌ها، کارت‌ها، نوار بالا
   ├─ logo/               وکتور لوگو
   └─ icons/              آیکن پلتفرم‌ها
```

---

## 🧰 ابزارها

| ابزار | کاربرد |
|---|---|
| **Next.js 15** (App Router) | فریم‌ورک، خروجی کاملاً استاتیک (`output: 'export'`) |
| **React 19** + **TypeScript** | کامپوننت‌ها با تایپ امن |
| **Tailwind CSS v4** | استایل‌دهی |
| **Motion** (Framer Motion) | انیمیشن لوگو، گذارها و ورود کارت‌ها |
| **next/font/local** | فونت‌های هستی و ابر، بدون وابستگی به سرویس خارجی |
| **GitHub Actions** + **Pages** | build و انتشار خودکار |

---

## 🚢 انتشار

با هر `git push` به شاخه‌ی `main`، سایت خودکار build و روی GitHub Pages منتشر می‌شود ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). وضعیت در تب **Actions** ریپو دیده می‌شود.

<details>
<summary><b>🔍 چند تصمیم فنی (برای کنجکاوها)</b></summary>

- **لوگو با SVG + Motion به‌جای After Effects/Lottie:** حجم تقریباً صفر، شارپ در هر اندازه و قابل بررسی در کد. چون حروف فارسی به هم وصل‌اند، «حرف‌به‌حرف» یعنی رسم تکه‌به‌تکه به ترتیب حرکت قلم (راست به چپ).
- **گذار دایره‌ای:** با `clip-path` روی یک لایه‌ی `fixed`. بعد از اتمام، `clip-path` کاملاً برداشته می‌شود تا اسکرول موبایل روان بماند.
- **رفتن به لینک در همان تب:** `window.open` بعد از تأخیرِ نوار نارنجی توسط مرورگر بلاک می‌شود. Ctrl+کلیک و کلیک وسط همچنان در تب جدید باز می‌کنند.
- **هاور فقط روی دستگاه‌های دارای ماوس.** روی موبایل، افکت هنگام فشار دادن کارت نمایش داده می‌شود و آیکن‌ها یک بار «تکان» می‌خورند تا تعاملی بودن کارت‌ها معلوم شود.
- **دسترس‌پذیری:** هر کارت یک `<a>` واقعی است، با کیبورد کار می‌کند و تنظیم `prefers-reduced-motion` سیستم‌عامل رعایت می‌شود.

</details>
