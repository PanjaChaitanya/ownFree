import { Inter, Space_Grotesk } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import ClickSpark from '@/components/ui/ClickSpark';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-logo', weight: ['500', '600', '700'] });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Horizon Web Labs — Web Development Company in Hyderabad, India',
    template: '%s | Horizon Web Labs',
  },
  description:
    'Horizon Web Labs is a top-rated web development company in Hyderabad, India. We build custom websites, React & Next.js web apps, SEO solutions, and SaaS products for startups and businesses across Andhra Pradesh, Telangana, and India.',
  keywords: [
    // Primary — Hyderabad local
    'web developer in Hyderabad',
    'web development company Hyderabad',
    'best web developer Hyderabad',
    'website developer Hyderabad',
    'web design company Hyderabad',
    'web developer near me Hyderabad',
    'website development Hyderabad',
    'web development agency Hyderabad',
    'best website developer Hyderabad',
    'top web development company Hyderabad',
    'freelance web developer Hyderabad',
    // AP cities
    'web developer in Andhra Pradesh',
    'web development company Andhra Pradesh',
    'web developer AP',
    'web developer Vizag',
    'web developer Visakhapatnam',
    'web developer Vijayawada',
    'web developer Tirupati',
    'web developer Guntur',
    'best web development company AP',
    // Telangana
    'web developer Telangana',
    'web development company Telangana',
    // Tech stack — Hyderabad
    'React developer Hyderabad',
    'Next.js developer Hyderabad',
    'MERN stack developer Hyderabad',
    'full stack developer Hyderabad',
    'Node.js developer Hyderabad',
    // India-wide
    'web development company India',
    'best web developer India',
    'top web development company India',
    'affordable web development India',
    'startup website developer India',
    'Next.js developer India',
    'React developer India',
    'SaaS development India',
    // Services
    'SEO company Hyderabad',
    'digital marketing Hyderabad',
    'ecommerce website developer Hyderabad',
    'landing page developer India',
    'UI UX design company Hyderabad',
    'custom web application development India',
    'SEO services Hyderabad',
    // Trust
    'top rated web developer India',
    'professional web developer India',
    'best web development agency India',
    'Horizon Web Labs',
  ],
  authors: [{ name: 'Horizon Web Labs', url: BASE_URL }],
  creator: 'Horizon Web Labs',
  publisher: 'Horizon Web Labs',
  category: 'Technology',
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Horizon Web Labs',
    title: 'Horizon Web Labs — Web Development Company in Hyderabad, India',
    description:
      'Top-rated web development company in Hyderabad, India. Custom websites, React & Next.js apps, SEO, and digital solutions for startups and businesses across India.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Horizon Web Labs — Web Development Company Hyderabad, India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@horizonweblabs',
    creator: '@horizonweblabs',
    title: 'Horizon Web Labs — Web Development Company Hyderabad',
    description:
      'Top-rated web development in Hyderabad. React, Next.js, MERN stack, SEO & UI/UX for businesses across India.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google832773e43b8eecfd',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
      '@id': `${BASE_URL}/#organization`,
      name: 'Horizon Web Labs',
      legalName: 'Horizon Web Labs',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        '@id': `${BASE_URL}/#logo`,
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
        caption: 'Horizon Web Labs',
      },
      image: { '@id': `${BASE_URL}/#logo` },
      description:
        'Horizon Web Labs is a top-rated web development company in Hyderabad, India. We specialize in React, Next.js, MERN stack development, SEO, UI/UX design, and custom digital solutions for startups and growing businesses.',
      email: 'weblabshorizon@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '17.3850',
        longitude: '78.4867',
      },
      areaServed: [
        { '@type': 'City', name: 'Hyderabad' },
        { '@type': 'City', name: 'Secunderabad' },
        { '@type': 'City', name: 'Visakhapatnam' },
        { '@type': 'City', name: 'Vijayawada' },
        { '@type': 'City', name: 'Guntur' },
        { '@type': 'City', name: 'Tirupati' },
        { '@type': 'State', name: 'Telangana' },
        { '@type': 'State', name: 'Andhra Pradesh' },
        { '@type': 'Country', name: 'India' },
      ],
      priceRange: '$$',
      currenciesAccepted: 'INR, USD',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web Development & Digital Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web Application Development',
              description: 'Custom full-stack web apps built with React, Next.js, and Node.js',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Landing Page Design',
              description: 'Conversion-focused landing pages that turn visitors into customers',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'SEO Services',
              description: 'Data-driven SEO strategies to rank higher on Google',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'UI/UX Design',
              description: 'Beautiful, intuitive interfaces users love — from wireframes to Figma',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'E-Commerce Development',
              description: 'Scalable online stores with Shopify, WooCommerce, or custom builds',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Portfolio & Business Websites',
              description: 'Professional websites for businesses, startups, and freelancers',
            },
          },
        ],
      },
      sameAs: [
        'https://twitter.com/horizonweblabs',
        'https://linkedin.com/company/horizonweblabs',
        'https://instagram.com/horizonweblabs',
        'https://github.com/horizonweblabs',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '30',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Horizon Web Labs',
      description: 'Web Development Company in Hyderabad, India',
      publisher: { '@id': `${BASE_URL}/#organization` },
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white text-zinc-900 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ClickSpark />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              border: '1px solid #e4e4e7',
              color: '#18181b',
              borderRadius: '12px',
              fontSize: '14px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            },
            success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  );
}
