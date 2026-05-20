const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE}/about` },
  ],
};

export const metadata = {
  title: 'About Us — Web Development Team in Hyderabad, India',
  description:
    'Horizon Web Labs is a web development company based in Hyderabad. Our team has delivered 50+ projects for startups and businesses across Andhra Pradesh, Telangana, and India. 100% satisfaction guaranteed.',
  keywords: [
    'about Horizon Web Labs',
    'web development team Hyderabad',
    'web development company Hyderabad',
    'who is Horizon Web Labs',
    'web developers Andhra Pradesh',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Horizon Web Labs — Web Development Team Hyderabad',
    description:
      '50+ projects delivered. 30+ happy clients. 100% satisfaction rate. Meet the team behind Horizon Web Labs, a web development company based in Hyderabad, India.',
    url: '/about',
  },
};

export default function AboutLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
