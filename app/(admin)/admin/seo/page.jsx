'use client';
import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { AdminCard, AdminSection, FormField, inputClass, textareaClass } from '@/components/admin/AdminCard';

export default function SEOAdmin() {
  const [seo, setSEO] = useState({
    siteTitle: '', siteDescription: '', keywords: '', twitterHandle: '',
    googleVerification: '', robotsTxt: 'User-agent: *\nAllow: /', ogImage: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/content?section=seo')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.seo) {
          setSEO({ ...json.data.seo, keywords: json.data.seo.keywords?.join(', ') || '' });
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        seo: { ...seo, keywords: seo.keywords ? seo.keywords.split(',').map((k) => k.trim()).filter(Boolean) : [] },
      };
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) toast.success('SEO settings saved!');
      else toast.error(json.error);
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <AdminSection title="SEO Settings" description="Configure your website's SEO metadata and search visibility.">
        <AdminCard className="space-y-5">
          <FormField label="Site Title">
            <input value={seo.siteTitle} onChange={(e) => setSEO((s) => ({ ...s, siteTitle: e.target.value }))} className={inputClass} placeholder="Horizon Web Labs — Premium Digital Agency" />
          </FormField>
          <FormField label="Meta Description" hint="150-160 characters recommended">
            <textarea value={seo.siteDescription} onChange={(e) => setSEO((s) => ({ ...s, siteDescription: e.target.value }))} className={textareaClass} rows={3} placeholder="Premium digital agency specializing in..." />
            <p className="text-slate-600 text-xs mt-1">{seo.siteDescription?.length || 0} chars</p>
          </FormField>
          <FormField label="Keywords" hint="Comma-separated">
            <input value={seo.keywords} onChange={(e) => setSEO((s) => ({ ...s, keywords: e.target.value }))} className={inputClass} placeholder="web development, digital agency, Next.js" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Twitter Handle">
              <input value={seo.twitterHandle} onChange={(e) => setSEO((s) => ({ ...s, twitterHandle: e.target.value }))} className={inputClass} placeholder="@horizonweblabs" />
            </FormField>
            <FormField label="Google Verification">
              <input value={seo.googleVerification} onChange={(e) => setSEO((s) => ({ ...s, googleVerification: e.target.value }))} className={inputClass} placeholder="google-site-verification=..." />
            </FormField>
          </div>
          <FormField label="OG Image URL">
            <input value={seo.ogImage} onChange={(e) => setSEO((s) => ({ ...s, ogImage: e.target.value }))} className={inputClass} placeholder="https://..." />
          </FormField>
          <FormField label="Robots.txt Content">
            <textarea value={seo.robotsTxt} onChange={(e) => setSEO((s) => ({ ...s, robotsTxt: e.target.value }))} className={textareaClass} rows={4} />
          </FormField>
          <Button onClick={handleSave} loading={saving} icon={<Save className="w-4 h-4" />}>Save SEO Settings</Button>
        </AdminCard>
      </AdminSection>
    </div>
  );
}
