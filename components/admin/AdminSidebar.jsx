'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Navigation, Star, Info, Briefcase, FolderOpen,
  MessageSquare, HelpCircle, Mail, Settings, FileText, AlignLeft,
  ChevronLeft, ChevronRight, LogOut, Zap, Globe, X,
} from 'lucide-react';
import toast from 'react-hot-toast';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Navbar', href: '/admin/navbar', icon: Navigation },
  { label: 'Hero Section', href: '/admin/hero', icon: Star },
  { label: 'About Section', href: '/admin/about', icon: Info },
  { label: 'Services', href: '/admin/services', icon: Briefcase },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Messages', href: '/admin/messages', icon: Mail },
  { label: 'Blogs', href: '/admin/blogs', icon: FileText },
  { label: 'Footer', href: '/admin/footer', icon: AlignLeft },
  { label: 'SEO Settings', href: '/admin/seo', icon: Globe },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

function NavItem({ item, collapsed }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
  const Icon = item.icon;

  return (
    <Link href={item.href} title={collapsed ? item.label : undefined}>
      <motion.div
        whileHover={{ x: collapsed ? 0 : 2 }}
        className={`flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer ${
          collapsed ? 'justify-center px-2 py-3' : 'px-3 py-2.5'
        } ${
          isActive
            ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
            : 'text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent'
        }`}
      >
        <Icon className="shrink-0" style={{ width: 18, height: 18 }} />
        {!collapsed && (
          <span className="text-sm font-medium truncate flex-1">{item.label}</span>
        )}
        {!collapsed && isActive && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
        )}
      </motion.div>
    </Link>
  );
}

function SidebarContent({ collapsed, setCollapsed, onClose }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    toast.success('Logged out');
    router.push('/admin/login');
  };

  return (
    <div className={`flex flex-col h-full transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 py-5 border-b border-white/10 ${collapsed ? 'px-3 justify-center' : 'px-4'}`}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm truncate">Horizon Web Labs</p>
            <p className="text-slate-500 text-xs">Admin Panel</p>
          </div>
        )}
        {onClose && (
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors ml-auto">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 no-scrollbar">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Bottom actions */}
      <div className={`p-2 border-t border-white/10 space-y-0.5`}>
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`flex items-center gap-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors py-2.5 ${collapsed ? 'justify-center px-2' : 'px-3'}`}
        >
          <LogOut style={{ width: 18, height: 18 }} className="shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>

        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setCollapsed?.(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`hidden lg:flex items-center gap-3 w-full rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-colors py-2.5 ${collapsed ? 'justify-center px-2' : 'px-3'}`}
        >
          {collapsed
            ? <ChevronRight style={{ width: 18, height: 18 }} />
            : (
              <>
                <ChevronLeft style={{ width: 18, height: 18 }} />
                <span className="text-sm">Collapse</span>
              </>
            )
          }
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar({ mobileOpen, setMobileOpen }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-screen sticky top-0 glass border-r border-white/10 overflow-hidden shrink-0">
        <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute left-0 top-0 h-full w-64 bg-[#050816] border-r border-white/10 overflow-hidden"
            >
              <SidebarContent
                collapsed={false}
                setCollapsed={null}
                onClose={() => setMobileOpen(false)}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
