const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Resume Checker', item: `${BASE}/resume-checker` },
  ],
};

export const metadata = {
  title: 'Free Resume ATS Score Checker | Instant Resume Analysis — Horizon Web Labs',
  description:
    'Check your resume ATS score for free in seconds. Get instant keyword gap analysis, section-by-section feedback, bullet point quality check, and actionable tips to help you get shortlisted. No sign-up required.',
  keywords: [
    'free resume checker',
    'ATS score checker',
    'resume ATS score',
    'resume scorer online',
    'check resume score free',
    'resume analysis tool',
    'resume keyword checker',
    'ATS friendly resume checker',
    'resume score checker India',
    'fresher resume checker',
    'student resume checker',
    'resume feedback tool',
    'resume optimization tool',
    'check resume online free India',
  ],
  alternates: { canonical: '/resume-checker' },
  openGraph: {
    title: 'Free Resume ATS Score Checker — Instant Analysis | Horizon Web Labs',
    description:
      'Upload your resume and get an instant ATS score, keyword gaps, section analysis, and improvement tips — completely free. No account needed.',
    url: '/resume-checker',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume ATS Score Checker | Horizon Web Labs',
    description:
      'Instant ATS score, keyword gap analysis, and resume tips — free, no sign-up required.',
  },
};

export default function ResumeCheckerLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
