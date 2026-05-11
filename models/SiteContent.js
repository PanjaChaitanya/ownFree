import mongoose from 'mongoose';

// Single-document model for all dynamic site content (CMS)
const SiteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },

    // NAVBAR
    navbar: {
      logo: { type: String, default: 'Horizon Web Labs' },
      logoImage: { type: String, default: '' },
      links: [
        {
          label: { type: String },
          href: { type: String },
          order: { type: Number },
          isActive: { type: Boolean, default: true },
          isExternal: { type: Boolean, default: false },
        },
      ],
      ctaLabel: { type: String, default: 'Get Started' },
      ctaHref: { type: String, default: '/contact' },
    },

    // HERO
    hero: {
      badge: { type: String, default: 'Premium Digital Agency' },
      heading: { type: String, default: 'We Build Digital Experiences That Matter' },
      subheading: { type: String, default: 'Full-stack development agency specializing in premium web applications.' },
      primaryCta: { label: String, href: String },
      secondaryCta: { label: String, href: String },
      image: { type: String, default: '' },
      stats: [
        {
          value: { type: String },
          label: { type: String },
        },
      ],
    },

    // ABOUT
    about: {
      heading: { type: String, default: 'About Horizon Web Labs' },
      story: { type: String, default: '' },
      mission: { type: String, default: '' },
      vision: { type: String, default: '' },
      image: { type: String, default: '' },
      imagePublicId: { type: String, default: '' },
      teamHeading: { type: String, default: 'Meet the Team' },
      team: [
        {
          name: String,
          position: String,
          avatar: String,
          avatarPublicId: String,
          bio: String,
          socials: {
            linkedin: String,
            twitter: String,
            github: String,
          },
        },
      ],
      journey: [
        {
          year: String,
          title: String,
          description: String,
        },
      ],
      technologies: [{ name: String, icon: String, category: String }],
    },

    // WHY CHOOSE US
    whyUs: {
      heading: { type: String, default: 'Why Choose Horizon Web Labs?' },
      subheading: { type: String, default: '' },
      items: [
        {
          icon: String,
          title: String,
          description: String,
          color: String,
        },
      ],
    },

    // PROCESS
    process: {
      heading: { type: String, default: 'Our Process' },
      subheading: { type: String, default: '' },
      steps: [
        {
          step: String,
          title: String,
          description: String,
          icon: String,
        },
      ],
    },

    // TECHNOLOGIES
    technologies: {
      heading: { type: String, default: 'Technologies We Use' },
      items: [
        {
          name: String,
          icon: String,
          category: String,
          color: String,
        },
      ],
    },

    // CTA SECTION
    cta: {
      heading: { type: String, default: "Ready to Build Something Amazing?" },
      subheading: { type: String, default: '' },
      primaryCta: { label: String, href: String },
      secondaryCta: { label: String, href: String },
    },

    // CONTACT INFO
    contact: {
      email: { type: String, default: 'hello@horizonweblabs.com' },
      phone: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
      address: { type: String, default: '' },
      mapEmbed: { type: String, default: '' },
    },

    // FOOTER
    footer: {
      tagline: { type: String, default: 'Building the future, one line at a time.' },
      copyright: { type: String, default: '© 2025 Horizon Web Labs. All rights reserved.' },
      socials: {
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        instagram: { type: String, default: '' },
        youtube: { type: String, default: '' },
      },
      columns: [
        {
          heading: String,
          links: [{ label: String, href: String }],
        },
      ],
    },

    // SEO
    seo: {
      siteTitle: { type: String, default: 'Horizon Web Labs - Premium Digital Agency' },
      siteDescription: { type: String, default: 'Premium web development agency specializing in modern, scalable digital solutions.' },
      keywords: [{ type: String }],
      ogImage: { type: String, default: '' },
      twitterHandle: { type: String, default: '@horizonweblabs' },
      googleVerification: { type: String, default: '' },
      robotsTxt: { type: String, default: 'User-agent: *\nAllow: /' },
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema);
