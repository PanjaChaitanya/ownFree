import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import ClickSpark from '@/components/ui/ClickSpark';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Horizon Web Labs — Premium Digital Agency',
    template: '%s | Horizon Web Labs',
  },
  description: 'Premium digital agency specializing in Next.js web development, SEO, landing pages, and full-stack solutions for startups and businesses.',
  keywords: ['web development', 'digital agency', 'Next.js', 'SEO', 'full-stack developer', 'landing pages', 'portfolio websites'],
  authors: [{ name: 'Horizon Web Labs' }],
  creator: 'Horizon Web Labs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Horizon Web Labs',
    title: 'Horizon Web Labs — Premium Digital Agency',
    description: 'Premium digital agency specializing in modern web development and digital solutions.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horizon Web Labs — Premium Digital Agency',
    description: 'Premium digital agency specializing in modern web development.',
    creator: '@horizonweblabs',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-zinc-900 font-sans antialiased">
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
