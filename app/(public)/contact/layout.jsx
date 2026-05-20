const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE}/contact` },
  ],
};

export const metadata = {
  title: 'Hire a Web Developer in Hyderabad — Get a Free Quote',
  description:
    'Contact Horizon Web Labs to hire a web developer in Hyderabad. Get a free project quote within 24 hours. We serve businesses across Andhra Pradesh, Telangana, and India. Email: weblabshorizon@gmail.com',
  keywords: [
    'hire web developer Hyderabad',
    'contact web developer Hyderabad',
    'web development quote India',
    'get website quote Hyderabad',
    'web developer contact AP',
    'hire React developer Hyderabad',
    'web design quote Hyderabad',
    'website developer contact number India',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Horizon Web Labs — Hire a Web Developer in Hyderabad',
    description:
      'Get a free project quote from Horizon Web Labs, Hyderabad. Response within 24 hours. Serving businesses across India.',
    url: '/contact',
  },
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
