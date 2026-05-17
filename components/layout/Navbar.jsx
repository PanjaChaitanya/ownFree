'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import HorizonIcon from '@/components/ui/HorizonIcon';

const defaultLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Resume Checker', href: '/resume-checker' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navContent, setNavContent] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/content?section=navbar')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setNavContent(json.data.navbar);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = (navContent?.links || defaultLinks).filter(
    (link) => link.isActive !== false
  );

  const ctaLabel = navContent?.ctaLabel || 'Get Started';
  const ctaHref = navContent?.ctaHref || '/contact';

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-[0_6px_30px_rgba(0,0,0,0.06)]'
            : 'bg-white border-b border-zinc-100'
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex h-[76px] items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">

            {/* LOGO */}
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-700 shadow-sm">
                <HorizonIcon size={18} />
              </div>
              <div className="flex flex-col leading-none gap-[3px]" style={{ fontFamily: 'var(--font-logo), sans-serif' }}>
                <span className="text-[21px] font-bold text-zinc-900 whitespace-nowrap" style={{ letterSpacing: '-0.04em' }}>
                  Horizon
                </span>
                <span className="text-[10px] font-semibold text-zinc-400 uppercase whitespace-nowrap" style={{ letterSpacing: '0.22em' }}>
                  Web Labs
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV — centered pill */}
            <nav className="hidden lg:flex items-center gap-1 rounded-full border border-zinc-200 bg-white/70 p-1.5 shadow-sm">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative inline-flex items-center justify-center rounded-full px-4 py-2 text-[14px] font-medium leading-none whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? 'text-violet-700'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        className="absolute inset-0 rounded-full bg-violet-50 border border-violet-100"
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href={ctaHref}
                className="hidden lg:inline-flex items-center gap-2 rounded-full bg-violet-700 py-2.5 pl-5 pr-2.5 text-[13.5px] font-semibold leading-none text-white shadow-[0_8px_20px_rgba(124,58,237,0.25)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-violet-800"
              >
                <span>{ctaLabel}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              {/* MOBILE BUTTON */}
              <button
                type="button"
                aria-label="Toggle Menu"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-colors duration-200 hover:bg-zinc-50"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-[320px] max-w-[88%] flex-col bg-white shadow-2xl"
            >
              <div className="flex h-[76px] items-center justify-between border-b border-zinc-100 px-5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-700">
                    <HorizonIcon size={18} />
                  </div>
                  <div className="flex flex-col leading-none gap-[3px]" style={{ fontFamily: 'var(--font-logo), sans-serif' }}>
                    <span className="text-[21px] font-bold text-zinc-900" style={{ letterSpacing: '-0.04em' }}>Horizon</span>
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase" style={{ letterSpacing: '0.22em' }}>Web Labs</span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-600 transition hover:bg-zinc-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-6">
                <div className="space-y-2">
                  {links.map((link, index) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== '/' && pathname.startsWith(link.href));

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors duration-200 ${
                            isActive
                              ? 'bg-violet-50 border border-violet-100'
                              : 'border border-transparent hover:bg-zinc-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`h-2 w-2 rounded-full transition-colors ${
                                isActive
                                  ? 'bg-violet-600'
                                  : 'bg-zinc-300 group-hover:bg-zinc-400'
                              }`}
                            />
                            <span
                              className={`text-[15px] font-medium ${
                                isActive ? 'text-violet-700' : 'text-zinc-700'
                              }`}
                            >
                              {link.label}
                            </span>
                          </div>
                          <ArrowRight
                            className={`h-4 w-4 transition-colors ${
                              isActive
                                ? 'text-violet-500'
                                : 'text-zinc-400 group-hover:text-zinc-600'
                            }`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              <div className="border-t border-zinc-100 p-5">
                <Link
                  href={ctaHref}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-violet-700 px-5 py-4 text-[14px] font-semibold text-white shadow-[0_10px_25px_rgba(124,58,237,0.25)] transition-colors duration-200 hover:bg-violet-800"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}