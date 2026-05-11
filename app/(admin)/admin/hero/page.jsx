'use client';
import { useEffect, useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { AdminCard, AdminSection, FormField, inputClass, textareaClass } from '@/components/admin/AdminCard';

const defaultHero = {
  badge: 'Premium Digital Agency',
  heading: 'We Build Digital Experiences That Matter',
  subheading: 'Full-stack development, SEO, and design solutions crafted for startups and growing businesses worldwide.',
  primaryCta: { label: 'Start a Project', href: '/contact' },
  secondaryCta: { label: 'View Our Work', href: '/projects' },
  stats: [
    { value: '50+', label: 'Projects' },
    { value: '30+', label: 'Clients' },
    { value: '3+', label: 'Years' },
    { value: '100%', label: 'Satisfaction' },
  ],
};

export default function HeroAdmin() {
  const [hero, setHero] = useState(defaultHero);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content?section=hero')
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.hero) setHero({ ...defaultHero, ...json.data.hero }); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero }),
      });
      const json = await res.json();
      if (json.success) toast.success('Hero section saved!');
      else toast.error(json.error);
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const updateStat = (i, field, val) => {
    const stats = [...hero.stats];
    stats[i] = { ...stats[i], [field]: val };
    setHero((h) => ({ ...h, stats }));
  };

  if (loading) return <p className="text-slate-400">Loading...</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <AdminSection title="Hero Section" description="Edit the main hero section content.">
        <AdminCard className="space-y-5">
          <FormField label="Badge Text">
            <input value={hero.badge} onChange={(e) => setHero((h) => ({ ...h, badge: e.target.value }))} className={inputClass} placeholder="Premium Digital Agency" />
          </FormField>
          <FormField label="Heading" required>
            <textarea value={hero.heading} onChange={(e) => setHero((h) => ({ ...h, heading: e.target.value }))} className={textareaClass} rows={2} />
          </FormField>
          <FormField label="Subheading">
            <textarea value={hero.subheading} onChange={(e) => setHero((h) => ({ ...h, subheading: e.target.value }))} className={textareaClass} rows={2} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-300 mb-2">Primary CTA</p>
              <div className="space-y-2">
                <input value={hero.primaryCta?.label || ''} onChange={(e) => setHero((h) => ({ ...h, primaryCta: { ...h.primaryCta, label: e.target.value } }))} className={inputClass} placeholder="Button label" />
                <input value={hero.primaryCta?.href || ''} onChange={(e) => setHero((h) => ({ ...h, primaryCta: { ...h.primaryCta, href: e.target.value } }))} className={inputClass} placeholder="/contact" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-2">Secondary CTA</p>
              <div className="space-y-2">
                <input value={hero.secondaryCta?.label || ''} onChange={(e) => setHero((h) => ({ ...h, secondaryCta: { ...h.secondaryCta, label: e.target.value } }))} className={inputClass} placeholder="Button label" />
                <input value={hero.secondaryCta?.href || ''} onChange={(e) => setHero((h) => ({ ...h, secondaryCta: { ...h.secondaryCta, href: e.target.value } }))} className={inputClass} placeholder="/projects" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-300">Stats</p>
              <button type="button" onClick={() => setHero((h) => ({ ...h, stats: [...(h.stats || []), { value: '', label: '' }] }))}
                className="text-violet-400 hover:text-violet-300 text-xs font-medium flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add stat
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(hero.stats || []).map((stat, i) => (
                <div key={i} className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <input value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)} className={inputClass} placeholder="50+" />
                    <input value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} className={inputClass} placeholder="Projects" />
                  </div>
                  <button type="button" onClick={() => setHero((h) => ({ ...h, stats: h.stats.filter((_, j) => j !== i) }))} className="text-red-400 hover:text-red-300 p-1 mt-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} loading={saving} icon={<Save className="w-4 h-4" />}>Save Hero Section</Button>
        </AdminCard>
      </AdminSection>
    </div>
  );
}
