'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import PageLoader from '@/components/ui/LoadingSkeleton';

const titleMap = {
  '/admin': 'Dashboard',
  '/admin/navbar': 'Navbar Management',
  '/admin/hero': 'Hero Section',
  '/admin/about': 'About Section',
  '/admin/services': 'Services',
  '/admin/projects': 'Projects',
  '/admin/testimonials': 'Testimonials',
  '/admin/faqs': 'FAQs',
  '/admin/messages': 'Contact Messages',
  '/admin/blogs': 'Blog Posts',
  '/admin/resumes': 'Resume Submissions',
  '/admin/student': 'Student Offers',
  '/admin/footer': 'Footer Settings',
  '/admin/seo': 'SEO Settings',
  '/admin/settings': 'General Settings',
};

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthChecked(true);
      return;
    }
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setAuthed(true);
        } else {
          router.replace('/admin/login');
        }
      })
      .catch(() => router.replace('/admin/login'))
      .finally(() => setAuthChecked(true));
  }, [pathname, router]);

  if (!authChecked) return <PageLoader />;
  if (pathname === '/admin/login') return children;
  if (!authed) return <PageLoader />;

  const title = titleMap[pathname] || 'Admin';

  return (
    <div className="flex h-screen bg-[#030712] overflow-hidden">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
