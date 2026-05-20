const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: `${BASE}/projects` },
  ],
};

export const metadata = {
  title: 'Our Portfolio — Web Development Projects | Horizon Web Labs',
  description:
    'Browse the portfolio of Horizon Web Labs, a web development company in Hyderabad. We have built 50+ websites, web apps, SaaS products, and landing pages for clients across India and globally.',
  keywords: [
    'web development portfolio Hyderabad',
    'web developer projects India',
    'React projects portfolio',
    'Next.js project examples India',
    'SaaS projects Hyderabad',
    'website portfolio web agency India',
  ],
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Portfolio — Web Development Projects by Horizon Web Labs Hyderabad',
    description:
      '50+ projects delivered — websites, web apps, SaaS, and landing pages. View the portfolio of Horizon Web Labs, Hyderabad.',
    url: '/projects',
  },
};

export default function ProjectsLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
