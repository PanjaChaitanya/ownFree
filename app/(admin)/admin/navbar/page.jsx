'use client';
import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { AdminCard, AdminSection, FormField, inputClass } from '@/components/admin/AdminCard';

const defaultNavbar = {
  logo: 'Horizon Web Labs',
  ctaLabel: 'Get Started',
  ctaHref: '/contact',
  links: [
    { label: 'Home', href: '/', order: 0, isActive: true },
    { label: 'About', href: '/about', order: 1, isActive: true },
    { label: 'Services', href: '/services', order: 2, isActive: true },
    { label: 'Projects', href: '/projects', order: 3, isActive: true },
    { label: 'Blog', href: '/blog', order: 4, isActive: true },
    { label: 'Contact', href: '/contact', order: 5, isActive: true },
  ],
};

export default function NavbarAdmin() {
  const [navbar, setNavbar] = useState(defaultNavbar);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/content?section=navbar')
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.navbar) setNavbar({ ...defaultNavbar, ...json.data.navbar }); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navbar }),
      });
      const json = await res.json();
      if (json.success) toast.success('Navbar saved!');
      else toast.error(json.error);
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const updateLink = (i, field, val) => {
    const links = [...navbar.links];
    links[i] = { ...links[i], [field]: val };
    setNavbar((n) => ({ ...n, links }));
  };

  const addLink = () => setNavbar((n) => ({ ...n, links: [...n.links, { label: '', href: '', order: n.links.length, isActive: true }] }));
  const removeLink = (i) => setNavbar((n) => ({ ...n, links: n.links.filter((_, j) => j !== i) }));

  return (
    <div className="space-y-6 max-w-2xl">
      <AdminSection title="Navbar Management" description="Configure your website navigation.">
        <AdminCard className="space-y-5">
          {/* Logo */}
          <FormField label="Logo Text">
            <input value={navbar.logo} onChange={(e) => setNavbar((n) => ({ ...n, logo: e.target.value }))} className={inputClass} placeholder="Horizon Web Labs" />
          </FormField>

          {/* CTA */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="CTA Button Label">
              <input value={navbar.ctaLabel} onChange={(e) => setNavbar((n) => ({ ...n, ctaLabel: e.target.value }))} className={inputClass} placeholder="Get Started" />
            </FormField>
            <FormField label="CTA Button Link">
              <input value={navbar.ctaHref} onChange={(e) => setNavbar((n) => ({ ...n, ctaHref: e.target.value }))} className={inputClass} placeholder="/contact" />
            </FormField>
          </div>

          {/* Links */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-300">Navigation Links</p>
              <button type="button" onClick={addLink} className="text-violet-400 hover:text-violet-300 text-xs font-medium flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add link
              </button>
            </div>
            <div className="space-y-2">
              {navbar.links.map((link, i) => (
                <div key={i} className="flex items-center gap-2 glass rounded-xl p-3">
                  <GripVertical className="w-4 h-4 text-slate-600 shrink-0" />
                  <input value={link.label} onChange={(e) => updateLink(i, 'label', e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500/60" placeholder="Label" />
                  <input value={link.href} onChange={(e) => updateLink(i, 'href', e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500/60" placeholder="/path" />
                  <button type="button" onClick={() => updateLink(i, 'isActive', !link.isActive)} className={`p-1.5 rounded-lg transition-colors shrink-0 ${link.isActive ? 'text-green-400 bg-green-400/10' : 'text-slate-500 hover:text-green-400'}`}>
                    {link.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button type="button" onClick={() => removeLink(i)} className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition-colors shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} loading={saving} icon={<Save className="w-4 h-4" />}>Save Navbar</Button>
        </AdminCard>
      </AdminSection>
    </div>
  );
}
