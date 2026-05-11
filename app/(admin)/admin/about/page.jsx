'use client';
import { useEffect, useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import { AdminCard, AdminSection, FormField, inputClass, textareaClass } from '@/components/admin/AdminCard';

const defaultAbout = {
  heading: 'About Horizon Web Labs',
  story: '',
  mission: '',
  vision: '',
  image: '',
  imagePublicId: '',
  journey: [{ year: '', title: '', description: '' }],
  team: [],
};

export default function AboutAdmin() {
  const [about, setAbout] = useState(defaultAbout);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content?section=about')
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.about) setAbout({ ...defaultAbout, ...json.data.about }); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ about }),
      });
      const json = await res.json();
      if (json.success) toast.success('About section saved!');
      else toast.error(json.error);
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const updateJourney = (i, field, val) => {
    const journey = [...about.journey];
    journey[i] = { ...journey[i], [field]: val };
    setAbout((a) => ({ ...a, journey }));
  };

  const updateTeamMember = (i, field, val) => {
    const team = [...(about.team || [])];
    team[i] = { ...team[i], [field]: val };
    setAbout((a) => ({ ...a, team }));
  };

  if (loading) return <p className="text-slate-400">Loading...</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <AdminSection title="About Section" description="Edit your company's story, mission, and team.">
        <AdminCard className="space-y-5">
          <FormField label="Page Heading">
            <input value={about.heading} onChange={(e) => setAbout((a) => ({ ...a, heading: e.target.value }))} className={inputClass} />
          </FormField>
          <FormField label="Company Story">
            <textarea value={about.story} onChange={(e) => setAbout((a) => ({ ...a, story: e.target.value }))} className={textareaClass} rows={4} placeholder="Your company's story..." />
          </FormField>
          <div className="grid grid-cols-1 gap-4">
            <FormField label="Mission">
              <textarea value={about.mission} onChange={(e) => setAbout((a) => ({ ...a, mission: e.target.value }))} className={textareaClass} rows={3} />
            </FormField>
            <FormField label="Vision">
              <textarea value={about.vision} onChange={(e) => setAbout((a) => ({ ...a, vision: e.target.value }))} className={textareaClass} rows={3} />
            </FormField>
          </div>

          <ImageUpload value={about.image} publicId={about.imagePublicId} folder="about" label="About Image"
            onChange={({ url, publicId }) => setAbout((a) => ({ ...a, image: url, imagePublicId: publicId }))} />

          {/* Journey */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-300">Journey Timeline</p>
              <button type="button" onClick={() => setAbout((a) => ({ ...a, journey: [...(a.journey || []), { year: '', title: '', description: '' }] }))}
                className="text-violet-400 hover:text-violet-300 text-xs font-medium flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add milestone
              </button>
            </div>
            <div className="space-y-3">
              {(about.journey || []).map((item, i) => (
                <div key={i} className="glass rounded-xl p-4 space-y-2">
                  <div className="flex gap-2">
                    <input value={item.year} onChange={(e) => updateJourney(i, 'year', e.target.value)} className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500/60" placeholder="2024" />
                    <input value={item.title} onChange={(e) => updateJourney(i, 'title', e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500/60" placeholder="Milestone title" />
                    <button type="button" onClick={() => setAbout((a) => ({ ...a, journey: a.journey.filter((_, j) => j !== i) }))} className="text-red-400 hover:text-red-300 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <input value={item.description} onChange={(e) => updateJourney(i, 'description', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500/60" placeholder="Description" />
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-300">Team Members</p>
              <button type="button" onClick={() => setAbout((a) => ({ ...a, team: [...(a.team || []), { name: '', position: '', bio: '', avatar: '', socials: {} }] }))}
                className="text-violet-400 hover:text-violet-300 text-xs font-medium flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add member
              </button>
            </div>
            <div className="space-y-4">
              {(about.team || []).map((member, i) => (
                <div key={i} className="glass rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-medium">{member.name || `Team Member ${i + 1}`}</p>
                    <button type="button" onClick={() => setAbout((a) => ({ ...a, team: a.team.filter((_, j) => j !== i) }))} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input value={member.name} onChange={(e) => updateTeamMember(i, 'name', e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-violet-500/60" placeholder="Full name" />
                    <input value={member.position} onChange={(e) => updateTeamMember(i, 'position', e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-violet-500/60" placeholder="Position" />
                  </div>
                  <textarea value={member.bio} onChange={(e) => updateTeamMember(i, 'bio', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-violet-500/60 resize-none" rows={2} placeholder="Short bio" />
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} loading={saving} icon={<Save className="w-4 h-4" />}>Save About Section</Button>
        </AdminCard>
      </AdminSection>
    </div>
  );
}
