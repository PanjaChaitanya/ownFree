'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import { AdminCard, AdminSection, FormField, inputClass, textareaClass } from '@/components/admin/AdminCard';

const emptyForm = { name: '', position: '', company: '', review: '', rating: 5, isActive: true, isFeatured: false, avatar: '', avatarPublicId: '', projectRef: '' };

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetch_ = () => {
    setLoading(true);
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((json) => { if (json.success) setTestimonials(json.data.testimonials); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch_(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (t) => { setForm(t); setEditId(t._id); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!confirm('Delete testimonial?')) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) { toast.success('Deleted'); fetch_(); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editId ? `/api/testimonials/${editId}` : '/api/testimonials';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const json = await res.json();
      if (json.success) { toast.success(editId ? 'Updated!' : 'Created!'); setShowForm(false); fetch_(); }
      else toast.error(json.error);
    } catch { toast.error('Something went wrong'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <AdminSection
        title="Testimonials"
        description="Manage client reviews and testimonials."
        action={<Button onClick={openCreate} icon={<Plus className="w-4 h-4" />} size="sm">Add Testimonial</Button>}
      >
        {loading ? <p className="text-slate-400 text-sm">Loading...</p> :
          testimonials.length === 0 ? <AdminCard><p className="text-center text-slate-400 py-8">No testimonials yet.</p></AdminCard> :
          <div className="space-y-3">
            {testimonials.map((t) => (
              <div key={t._id} className="glass rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold shrink-0">
                  {t.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-semibold">{t.name}</p>
                    <div className="flex">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-violet-400 text-sm">{t.position}{t.company ? ` — ${t.company}` : ''}</p>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">{t.review}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(t)} className="p-2 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-violet-400/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(t._id)} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        }
      </AdminSection>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-lg glass-strong rounded-2xl p-6 overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editId ? 'Edit' : 'New'} Testimonial</h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Client Name" required>
                  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} required />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Position">
                    <input value={form.position} onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))} className={inputClass} placeholder="CEO" />
                  </FormField>
                  <FormField label="Company">
                    <input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} className={inputClass} placeholder="Company Inc." />
                  </FormField>
                </div>
                <FormField label="Review" required>
                  <textarea value={form.review} onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))} className={textareaClass} rows={3} required />
                </FormField>
                <FormField label="Rating (1-5)">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button key={r} type="button" onClick={() => setForm((f) => ({ ...f, rating: r }))}
                        className={`w-8 h-8 rounded-lg transition-colors ${form.rating >= r ? 'text-yellow-400' : 'text-slate-600 hover:text-slate-400'}`}>
                        <Star className={`w-5 h-5 mx-auto ${form.rating >= r ? 'fill-yellow-400' : ''}`} />
                      </button>
                    ))}
                  </div>
                </FormField>
                <ImageUpload value={form.avatar} publicId={form.avatarPublicId} folder="testimonials" label="Client Photo" aspect="1:1"
                  onChange={({ url, publicId }) => setForm((f) => ({ ...f, avatar: url, avatarPublicId: publicId }))} />
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} className="w-4 h-4 accent-violet-500 rounded" />
                    <span className="text-sm text-slate-300">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))} className="w-4 h-4 accent-violet-500 rounded" />
                    <span className="text-sm text-slate-300">Featured</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" loading={saving} icon={<Save className="w-4 h-4" />}>{editId ? 'Update' : 'Create'}</Button>
                  <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
