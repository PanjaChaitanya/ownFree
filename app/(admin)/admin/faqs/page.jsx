'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { AdminCard, AdminSection, FormField, inputClass, textareaClass, selectClass } from '@/components/admin/AdminCard';

const CATEGORIES = ['General', 'Pricing', 'Process', 'Technical', 'Support'];
const emptyForm = { question: '', answer: '', category: 'General', order: 0, isActive: true };

export default function FAQsAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchFAQs = () => {
    setLoading(true);
    fetch('/api/faqs')
      .then((r) => r.json())
      .then((json) => { if (json.success) setFaqs(json.data.faqs); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchFAQs(); }, []);

  const openCreate = () => { setForm({ ...emptyForm, order: faqs.length }); setEditId(null); setShowForm(true); };
  const openEdit = (faq) => { setForm(faq); setEditId(faq._id); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!confirm('Delete FAQ?')) return;
    const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) { toast.success('Deleted'); fetchFAQs(); }
  };

  const handleToggle = async (faq) => {
    const res = await fetch(`/api/faqs/${faq._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !faq.isActive }),
    });
    const json = await res.json();
    if (json.success) { toast.success('Updated'); fetchFAQs(); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editId ? `/api/faqs/${editId}` : '/api/faqs';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const json = await res.json();
      if (json.success) { toast.success(editId ? 'Updated!' : 'Created!'); setShowForm(false); fetchFAQs(); }
      else toast.error(json.error);
    } catch { toast.error('Something went wrong'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <AdminSection
        title="FAQs"
        description="Manage frequently asked questions."
        action={<Button onClick={openCreate} icon={<Plus className="w-4 h-4" />} size="sm">Add FAQ</Button>}
      >
        {loading ? <p className="text-slate-400 text-sm">Loading...</p> :
          faqs.length === 0 ? <AdminCard><p className="text-center text-slate-400 py-8">No FAQs yet.</p></AdminCard> :
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={faq._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <GripVertical className="w-4 h-4 text-slate-600 mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold">{faq.question}</p>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-violet-500/20 text-violet-400">{faq.category}</span>
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => handleToggle(faq)} className={`p-1.5 rounded-lg transition-colors text-xs ${faq.isActive ? 'text-green-400 bg-green-400/10' : 'text-slate-500 hover:text-green-400'}`}>
                      {faq.isActive ? '●' : '○'}
                    </button>
                    <button onClick={() => openEdit(faq)} className="p-1.5 text-slate-400 hover:text-violet-400 rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(faq._id)} className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        }
      </AdminSection>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-lg glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editId ? 'Edit' : 'New'} FAQ</h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Category">
                    <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={selectClass}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Order">
                    <input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: +e.target.value }))} className={inputClass} />
                  </FormField>
                </div>
                <FormField label="Question" required>
                  <input value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} className={inputClass} required />
                </FormField>
                <FormField label="Answer" required>
                  <textarea value={form.answer} onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))} className={textareaClass} rows={4} required />
                </FormField>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} className="w-4 h-4 accent-violet-500 rounded" />
                  <span className="text-sm text-slate-300">Active</span>
                </label>
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
