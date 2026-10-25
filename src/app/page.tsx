import { CONTACT_LINKS, resolveLink } from '@/config/links';
import { Experience } from '@/components/experience';

/**
 * Server Component: لینک‌ها همین‌جا (زمان build) ساخته می‌شوند
 * و فقط داده‌ی آماده به بخش کلاینت فرستاده می‌شود.
 */
export default function Home() {
  const links = CONTACT_LINKS.map(resolveLink);
  return <Experience links={links} />;
}
