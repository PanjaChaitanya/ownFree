'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, Plus, Trash2, Save, Loader2,
  Eye, EyeOff, Star,
} from 'lucide-react';
import toast from 'react-hot-toast';

const ICON_OPTIONS = ['FileText', 'Globe', 'Package', 'Zap', 'Star', 'BookOpen', 'Linkedin', 'GraduationCap'];

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-violet-600' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </div>
      <span className="text-sm text-slate-300">{label}</span>
    </label>
  );
}

function Field({ label, value, onChange, multiline, placeholder }) {
  const cls = "w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition";
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</label>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={cls} />
        : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}

export default function AdminStudentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    isEnabled: true,
    barText: '',
    barCta: '',
    heroTitle: '',
    heroSubtitle: '',
    services: [],
    resumeCtaText: '',
    resumeCtaButton: '',
  });

  useEffect(() => {
    fetch('/api/student')
      .then((r) => r.json())
      .then((json) => { if (json.success) setForm(json.data.offer); })
      .finally(() => setLoading(false));
  }, []);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const updateService = (i, key, val) => {
    const updated = form.services.map((s, idx) =>
      idx === i ? { ...s, [key]: val } : s
    );
    set('services', updated);
  };

  const addService = () => {
    set('services', [
      ...form.services,
      { icon: 'FileText', title: '', description: '', highlight: false },
    ]);
  };

  const removeService = (i) => {
    set('services', form.services.filter((_, idx) => idx !== i));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/student', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Student page saved');
        setForm(json.data.offer);
      } else {
        toast.error('Failed to save');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <GraduationCap className="w-4.5 h-4.5 text-violet-400" style={{ width: 18, height: 18 }} />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Student Offers</h1>
            <p className="text-slate-500 text-xs">Manage the student bar and landing page</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      {/* Visibility toggle */}
      <div className="glass rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-semibold mb-0.5">Student Bar & Page</p>
          <p className="text-slate-400 text-xs">Show the floating student bar and enable the /student-special page</p>
        </div>
        <Toggle
          checked={form.isEnabled}
          onChange={(v) => set('isEnabled', v)}
          label={form.isEnabled ? 'Enabled' : 'Disabled'}
        />
      </div>

      {/* Floating bar settings */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-violet-500" />
          <p className="text-white text-sm font-bold">Floating Bar</p>
        </div>
        <Field label="Bar Text" value={form.barText} onChange={(v) => set('barText', v)} placeholder="Are you a student or fresher? 🎓" />
        <Field label="CTA Label" value={form.barCta} onChange={(v) => set('barCta', v)} placeholder="See Student Offers" />

        {/* Preview */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Preview</p>
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl border border-violet-200 shadow px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-800">{form.barText || 'Bar text here'}</p>
              <p className="text-xs font-bold text-violet-700 mt-0.5">{form.barCta || 'CTA label'} →</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero settings */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <p className="text-white text-sm font-bold">Page Hero</p>
        </div>
        <Field label="Hero Title" value={form.heroTitle} onChange={(v) => set('heroTitle', v)} />
        <Field label="Hero Subtitle" value={form.heroSubtitle} onChange={(v) => set('heroSubtitle', v)} multiline />
      </div>

      {/* Services */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <p className="text-white text-sm font-bold">Service Cards</p>
          </div>
          <button
            onClick={addService}
            className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Service
          </button>
        </div>

        <div className="space-y-4">
          {form.services.map((svc, i) => (
            <motion.div
              key={i}
              layout
              className="bg-white/[0.04] rounded-xl border border-white/[0.08] p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Service {i + 1}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateService(i, 'highlight', !svc.highlight)}
                    title="Toggle Best Value badge"
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ${
                      svc.highlight
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-white/5 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Star className="w-3 h-3" />
                    {svc.highlight ? 'Best Value' : 'Normal'}
                  </button>
                  <button
                    onClick={() => removeService(i)}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Icon</label>
                  <select
                    value={svc.icon}
                    onChange={(e) => updateService(i, 'icon', e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                  >
                    {ICON_OPTIONS.map((ic) => (
                      <option key={ic} value={ic}>{ic}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Title</label>
                  <input
                    type="text"
                    value={svc.title}
                    onChange={(e) => updateService(i, 'title', e.target.value)}
                    placeholder="Service title"
                    className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description</label>
                <textarea
                  value={svc.description}
                  onChange={(e) => updateService(i, 'description', e.target.value)}
                  placeholder="Service description"
                  rows={2}
                  className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition resize-none"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resume CTA */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <p className="text-white text-sm font-bold">Resume Checker CTA</p>
        </div>
        <Field label="CTA Text" value={form.resumeCtaText} onChange={(v) => set('resumeCtaText', v)} multiline />
        <Field label="Button Label" value={form.resumeCtaButton} onChange={(v) => set('resumeCtaButton', v)} />
      </div>

      <div className="flex gap-3 pb-6">
        <a
          href="/student-special"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> Preview student page
        </a>
      </div>
    </div>
  );
}
