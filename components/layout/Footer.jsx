'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import HorizonIcon from '@/components/ui/HorizonIcon';
import { FaXTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa6';

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
        { label: 'Resume Checker', href: '/resume-checker' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],
};

const defaultContact = {
  email: 'weblabshorizon@gmail.com',
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
                <HorizonIcon size={16} />
              </div>
              <div className="flex flex-col leading-none gap-[3px]" style={{ fontFamily: 'var(--font-logo), sans-serif' }}>
                <span className="font-bold text-white text-[21px]" style={{ letterSpacing: '-0.04em' }}>Horizon</span>
                <span className="text-[10px] font-semibold text-violet-300 uppercase" style={{ letterSpacing: '0.22em' }}>Web Labs</span>
              </div>
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
              <li>
                <a
                  href="https://wa.me/918985844558"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 group-hover:bg-[#25D366]/20 flex items-center justify-center shrink-0 transition-colors">
                    <FaWhatsapp className="w-3.5 h-3.5" />
                  </div>
                  WhatsApp Us
                </a>
              </li>
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

        {/* Location links — internal SEO links */}
        <div className="mt-10 pt-8 border-t border-zinc-800/60">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-3">We Serve</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              { label: 'Web Developer in Hyderabad', href: '/web-developer-hyderabad' },
              { label: 'Web Developer in Andhra Pradesh', href: '/web-developer-andhra-pradesh' },
              { label: 'Web Developer in Vizag', href: '/web-developer-vizag' },
              { label: 'Web Developer in Vijayawada', href: '/web-developer-vijayawada' },
              { label: 'Web Developer in India', href: '/web-developer-india' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-zinc-500 hover:text-violet-400 text-xs transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
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
