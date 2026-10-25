import { CONTACT_LINKS, resolveLink } from '@/config/links';
import { Experience } from '@/components/experience';

/**
 * Server Component: links are resolved here at build time,
 * and only plain ready-to-render data is passed to the client side.
 */
export default function Home() {
  const links = CONTACT_LINKS.map(resolveLink);
  return <Experience links={links} />;
}
