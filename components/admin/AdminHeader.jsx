'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader({ onMenuClick, title = 'Dashboard' }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((json) => { if (json.success) setUser(json.data.user); })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/8 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">{title}</h1>
            <p className="text-slate-500 text-xs hidden sm:block">Horizon Web Labs CMS</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white glass hover:bg-white/10 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Site
          </Link>

          {user && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-sm font-medium leading-none">{user.name}</p>
                <p className="text-slate-500 text-xs capitalize">{user.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
