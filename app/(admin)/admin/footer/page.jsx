'use client';
import { useEffect, useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { AdminCard, AdminSection, FormField, inputClass } from '@/components/admin/AdminCard';

export default function FooterAdmin() {
  const [footer, setFooter] = useState({ tagline: '', copyright: '', socials: {}, columns: [] });
  const [contact, setContact] = useState({ email: '', phone: '', whatsapp: '', address: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.content) {
          if (json.data.content.footer) setFooter(json.data.content.footer);
          if (json.data.content.contact) setContact(json.data.content.contact);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ footer, contact }),
      });
      const json = await res.json();
      if (json.success) toast.success('Footer saved!');
      else toast.error(json.error);
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const updateSocial = (key, val) => setFooter((f) => ({ ...f, socials: { ...f.socials, [key]: val } }));
  const updateColumn = (ci, field, val) => {
    const cols = [...(footer.columns || [])];
    cols[ci] = { ...cols[ci], [field]: val };
    setFooter((f) => ({ ...f, columns: cols }));
  };
  const updateColumnLink = (ci, li, field, val) => {
    const cols = [...(footer.columns || [])];
    const links = [...(cols[ci].links || [])];
    links[li] = { ...links[li], [field]: val };
    cols[ci] = { ...cols[ci], links };
    setFooter((f) => ({ ...f, columns: cols }));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <AdminSection title="Footer Settings" description="Configure footer content, socials, and links.">
        <AdminCard className="space-y-5">
          <FormField label="Tagline">
            <input value={footer.tagline} onChange={(e) => setFooter((f) => ({ ...f, tagline: e.target.value }))} className={inputClass} />
          </FormField>
          <FormField label="Copyright Text">
            <input value={footer.copyright} onChange={(e) => setFooter((f) => ({ ...f, copyright: e.target.value }))} className={inputClass} />
          </FormField>

          {/* Socials */}
          <div>
            <p className="text-sm font-medium text-slate-300 mb-3">Social Links</p>
            <div className="grid grid-cols-2 gap-3">
              {['twitter', 'linkedin', 'github', 'instagram', 'youtube'].map((key) => (
                <div key={key}>
                  <label className="text-xs text-slate-500 capitalize mb-1 block">{key}</label>
                  <input value={footer.socials?.[key] || ''} onChange={(e) => updateSocial(key, e.target.value)} className={inputClass} placeholder={`https://${key}.com/...`} />
                </div>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-sm font-medium text-slate-300 mb-3">Contact Info</p>
            <div className="grid grid-cols-2 gap-3">
              {[['email', 'Email'], ['phone', 'Phone'], ['whatsapp', 'WhatsApp Number'], ['address', 'Address']].map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs text-slate-500 mb-1 block">{label}</label>
                  <input value={contact[key] || ''} onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))} className={inputClass} />
                </div>
              ))}
            </div>
          </div>

          {/* Footer columns */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-300">Footer Columns</p>
              <button type="button" onClick={() => setFooter((f) => ({ ...f, columns: [...(f.columns || []), { heading: '', links: [] }] }))}
                className="text-violet-400 hover:text-violet-300 text-xs font-medium flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add column
              </button>
            </div>
            <div className="space-y-4">
              {(footer.columns || []).map((col, ci) => (
                <div key={ci} className="glass rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <input value={col.heading} onChange={(e) => updateColumn(ci, 'heading', e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-semibold focus:outline-none focus:border-violet-500/60 mr-2" placeholder="Column heading" />
                    <button type="button" onClick={() => setFooter((f) => ({ ...f, columns: f.columns.filter((_, i) => i !== ci) }))} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-2">
                    {(col.links || []).map((link, li) => (
                      <div key={li} className="flex gap-2">
                        <input value={link.label} onChange={(e) => updateColumnLink(ci, li, 'label', e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-violet-500/60" placeholder="Link text" />
                        <input value={link.href} onChange={(e) => updateColumnLink(ci, li, 'href', e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-violet-500/60" placeholder="/path" />
                        <button type="button" onClick={() => { const cols = [...footer.columns]; cols[ci].links = cols[ci].links.filter((_, i) => i !== li); setFooter((f) => ({ ...f, columns: cols })); }} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                    <button type="button" onClick={() => { const cols = [...footer.columns]; cols[ci].links = [...(cols[ci].links || []), { label: '', href: '' }]; setFooter((f) => ({ ...f, columns: cols })); }}
                      className="text-violet-400 hover:text-violet-300 text-xs font-medium flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} loading={saving} icon={<Save className="w-4 h-4" />}>Save Footer</Button>
        </AdminCard>
      </AdminSection>
    </div>
  );
}
