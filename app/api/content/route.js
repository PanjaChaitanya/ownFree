import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, serverError } from '@/lib/response';
import SiteContent from '@/models/SiteContent';

const DEFAULT_CONTENT = {
  key: 'main',
  navbar: {
    logo: 'Horizon Web Labs',
    links: [
      { label: 'Home', href: '/', order: 0, isActive: true },
      { label: 'About', href: '/about', order: 1, isActive: true },
      { label: 'Services', href: '/services', order: 2, isActive: true },
      { label: 'Projects', href: '/projects', order: 3, isActive: true },
      { label: 'Blog', href: '/blog', order: 4, isActive: true },
      { label: 'Contact', href: '/contact', order: 5, isActive: true },
    ],
    ctaLabel: 'Get Started',
    ctaHref: '/contact',
  },
  hero: {
    badge: 'Premium Digital Agency',
    heading: 'We Build Digital Experiences That Matter',
    subheading: 'Full-stack development, SEO, and design solutions crafted for startups and growing businesses.',
    primaryCta: { label: 'Start a Project', href: '/contact' },
    secondaryCta: { label: 'View Our Work', href: '/projects' },
    stats: [
      { value: '50+', label: 'Projects Delivered' },
      { value: '30+', label: 'Happy Clients' },
      { value: '3+', label: 'Years Experience' },
      { value: '100%', label: 'Satisfaction Rate' },
    ],
  },
  whyUs: {
    heading: 'Why Choose Horizon Web Labs?',
    subheading: 'We combine technical excellence with creative vision to deliver results that exceed expectations.',
    items: [
      { icon: 'Zap', title: 'Lightning Fast', description: 'Optimized for performance and speed across all devices.', color: '#f59e0b' },
      { icon: 'Shield', title: 'Secure by Default', description: 'Built with security best practices and production-grade standards.', color: '#10b981' },
      { icon: 'Palette', title: 'Premium Design', description: 'Stunning, modern UI that converts visitors into customers.', color: '#7c3aed' },
      { icon: 'TrendingUp', title: 'SEO Optimized', description: 'Rank higher and drive organic traffic from day one.', color: '#06b6d4' },
      { icon: 'Code2', title: 'Clean Code', description: 'Scalable, maintainable code that grows with your business.', color: '#f43f5e' },
      { icon: 'Headphones', title: '24/7 Support', description: 'Dedicated support whenever you need it.', color: '#8b5cf6' },
    ],
  },
  process: {
    heading: 'Our Process',
    subheading: 'A streamlined approach that delivers exceptional results on time, every time.',
    steps: [
      { step: '01', title: 'Discovery', description: 'We start by understanding your business, goals, and target audience.', icon: 'Search' },
      { step: '02', title: 'Strategy', description: 'We craft a detailed roadmap and design strategy tailored to your needs.', icon: 'Map' },
      { step: '03', title: 'Design', description: 'Premium UI/UX design with interactive prototypes for your approval.', icon: 'Palette' },
      { step: '04', title: 'Development', description: 'Full-stack development with clean, scalable, and tested code.', icon: 'Code2' },
      { step: '05', title: 'Launch', description: 'Deployment, testing, and performance optimization for a smooth launch.', icon: 'Rocket' },
      { step: '06', title: 'Support', description: 'Ongoing maintenance, updates, and support to keep you ahead.', icon: 'Headphones' },
    ],
  },
  technologies: {
    heading: 'Technologies We Master',
    items: [
      { name: 'Next.js', icon: 'nextjs', category: 'Frontend', color: '#ffffff' },
      { name: 'React', icon: 'react', category: 'Frontend', color: '#61dafb' },
      { name: 'TypeScript', icon: 'typescript', category: 'Language', color: '#3178c6' },
      { name: 'Node.js', icon: 'nodejs', category: 'Backend', color: '#339933' },
      { name: 'MongoDB', icon: 'mongodb', category: 'Database', color: '#47a248' },
      { name: 'PostgreSQL', icon: 'postgresql', category: 'Database', color: '#336791' },
      { name: 'Tailwind CSS', icon: 'tailwind', category: 'Styling', color: '#06b6d4' },
      { name: 'Framer Motion', icon: 'framer', category: 'Animation', color: '#0055ff' },
      { name: 'AWS', icon: 'aws', category: 'Cloud', color: '#ff9900' },
      { name: 'Docker', icon: 'docker', category: 'DevOps', color: '#2496ed' },
      { name: 'Figma', icon: 'figma', category: 'Design', color: '#f24e1e' },
      { name: 'GraphQL', icon: 'graphql', category: 'API', color: '#e10098' },
    ],
  },
  cta: {
    heading: "Ready to Build Something Amazing?",
    subheading: "Let's transform your vision into a powerful digital reality. Get a free consultation today.",
    primaryCta: { label: 'Start Your Project', href: '/contact' },
    secondaryCta: { label: 'View Pricing', href: '/pricing' },
  },
  contact: {
    email: 'hello@horizonweblabs.com',
    phone: '+1 (555) 000-0000',
    whatsapp: '+15550000000',
    address: 'Remote — Worldwide',
  },
  footer: {
    tagline: 'Building the future of the web, one pixel at a time.',
    copyright: '© 2025 Horizon Web Labs. All rights reserved.',
    socials: { twitter: '#', linkedin: '#', github: '#', instagram: '#' },
    columns: [
      {
        heading: 'Services',
        links: [
          { label: 'Web Development', href: '/services' },
          { label: 'SEO Services', href: '/services' },
          { label: 'Landing Pages', href: '/services' },
          { label: 'Portfolio Sites', href: '/services' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Projects', href: '/projects' },
          { label: 'Blog', href: '/blog' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
  },
  seo: {
    siteTitle: 'Horizon Web Labs — Premium Digital Agency',
    siteDescription: 'We build premium web applications, landing pages, and digital experiences for startups and businesses worldwide.',
    keywords: ['web development', 'digital agency', 'Next.js', 'SEO', 'full-stack'],
    twitterHandle: '@horizonweblabs',
  },
  about: {
    heading: 'About Horizon Web Labs',
    story: 'Founded with a passion for building exceptional digital experiences, Horizon Web Labs has grown into a premium digital agency serving clients worldwide. We combine technical excellence with creative vision to deliver results that matter.',
    mission: 'To empower businesses with world-class digital solutions that drive growth, enhance brand identity, and create meaningful user experiences.',
    vision: 'To become the most trusted digital partner for startups and businesses seeking premium web development and design services.',
    journey: [
      { year: '2022', title: 'Founded', description: 'Started as a freelance studio with a focus on modern web development.' },
      { year: '2023', title: 'First 20 Clients', description: 'Grew to serve 20+ clients across different industries.' },
      { year: '2024', title: 'Agency Expansion', description: 'Expanded services and team, launched the premium agency model.' },
      { year: '2025', title: 'Going Global', description: 'Serving clients worldwide with a full suite of digital services.' },
    ],
    team: [],
  },
};

// Public: get site content
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    let content = await SiteContent.findOne({ key: 'main' });
    if (!content) {
      content = await SiteContent.create(DEFAULT_CONTENT);
    }

    if (section && content[section] !== undefined) {
      return ok({ [section]: content[section] });
    }

    return ok({ content });
  } catch (err) {
    return serverError(err);
  }
}

// Admin: update site content
async function updateContent(request) {
  try {
    await connectDB();
    const body = await request.json();
    const content = await SiteContent.findOneAndUpdate(
      { key: 'main' },
      { $set: body },
      { new: true, upsert: true }
    );
    return ok({ content });
  } catch (err) {
    return serverError(err);
  }
}

export const PUT = withAuth(updateContent);
