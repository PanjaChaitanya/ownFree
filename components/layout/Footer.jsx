'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { FaXTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa6';

const socialIcons = {
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

const defaultFooter = {
  tagline: 'Building premium digital experiences for startups and growing businesses worldwide.',
  copyright: '© 2025 Horizon Web Labs. All rights reserved.',
  socials: { twitter: '', linkedin: '', github: '', instagram: '' },
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
};

const defaultContact = {
  email: 'hello@horizonweblabs.com',
  phone: '+1 (555) 000-0000',
};

export default function Footer() {
  const [footer, setFooter] = useState(defaultFooter);
  const [contact, setContact] = useState(defaultContact);

  useEffect(() => {
    fetch('/api/content?section=footer')
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.footer) setFooter(json.data.footer); })
      .catch(() => {});
    fetch('/api/content?section=contact')
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.contact) setContact(json.data.contact); })
      .catch(() => {});
  }, []);

  const activeSocials = Object.entries(footer.socials || {}).filter(([, url]) => url && url !== '#');

  return (
    <footer className="bg-zinc-950 text-white">
      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit group">
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shrink-0 group-hover:bg-violet-500 transition-colors">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-[15px] tracking-tight">Horizon Web Labs</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-xs">
              {footer.tagline}
            </p>
            {activeSocials.length > 0 && (
              <div className="flex items-center gap-2">
                {activeSocials.map(([key, url]) => {
                  const Icon = socialIcons[key];
                  if (!Icon) return null;
                  return (
                    <motion.a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-violet-600 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Link columns */}
          {(footer.columns || []).map((col, i) => (
            <div key={i}>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {(col.links || []).map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm transition-colors group">
                    <div className="w-7 h-7 rounded-lg bg-zinc-800 group-hover:bg-violet-600/20 flex items-center justify-center shrink-0 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm transition-colors group">
                    <div className="w-7 h-7 rounded-lg bg-zinc-800 group-hover:bg-violet-600/20 flex items-center justify-center shrink-0 transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-3 text-zinc-400 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  {contact.address}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">{footer.copyright}</p>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
