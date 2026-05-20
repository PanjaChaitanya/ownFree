const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
  ],
};

export const metadata = {
  title: 'Web Development Blog — Tips, SEO & Digital Growth | Horizon Web Labs',
  description:
    'Read the Horizon Web Labs blog for web development tips, SEO strategies, React tutorials, and digital growth insights. Written by our team in Hyderabad for developers and business owners across India.',
  keywords: [
    'web development blog India',
    'React tutorials Hyderabad',
    'Next.js tips India',
    'SEO blog Hyderabad',
    'digital marketing tips India',
    'web developer blog Andhra Pradesh',
    'startup website tips India',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Web Development Blog by Horizon Web Labs, Hyderabad',
    description:
      'Web development tips, SEO strategies, React tutorials, and digital growth insights from the Horizon Web Labs team.',
    url: '/blog',
  },
};

export default function BlogLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
