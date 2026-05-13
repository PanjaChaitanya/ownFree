'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import { AdminCard, AdminSection, FormField, inputClass, textareaClass, selectClass } from '@/components/admin/AdminCard';
import AdminModal from '@/components/admin/AdminModal';
import { staggerContainer, fadeUp } from '@/animations/variants';
import { slugify } from '@/utils/helpers';

const ICONS = ['Code2', 'Globe', 'Search', 'FileText', 'User', 'Briefcase', 'Smartphone', 'Layout', 'Star', 'Rocket', 'Zap', 'TrendingUp', 'Palette', 'Shield'];
const PRICING_TYPES = ['fixed', 'hourly', 'monthly', 'custom'];

const emptyForm = {
  title: '', slug: '', description: '', shortDescription: '', icon: 'Code2', color: '#7c3aed',
  features: [''], pricing: { startingAt: 0, currency: 'USD', type: 'fixed' },
  isActive: true, isFeatured: false, order: 0,
  image: '', imagePublicId: '',
  seo: { metaTitle: '', metaDescription: '', keywords: '' },
};

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchServices = () => {
    setLoading(true);
    fetch('/api/services')
      .then((r) => r.json())
      .then((json) => { if (json.success) setServices(json.data.services); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchServices(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (service) => {
    setForm({
      ...service,
      features: service.features?.length > 0 ? service.features : [''],
      seo: { ...service.seo, keywords: service.seo?.keywords?.join(', ') || '' },
    });
    setEditId(service._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) { toast.success('Service deleted'); fetchServices(); }
    else toast.error(json.error);
  };

  const handleToggle = async (service, field) => {
    const res = await fetch(`/api/services/${service._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !service[field] }),
    });
    const json = await res.json();
    if (json.success) { toast.success('Updated'); fetchServices(); }
    else toast.error(json.error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      features: form.features.filter(Boolean),
      seo: { ...form.seo, keywords: form.seo.keywords ? form.seo.keywords.split(',').map((k) => k.trim()) : [] },
    };
    try {
      const url = editId ? `/api/services/${editId}` : '/api/services';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(editId ? 'Service updated!' : 'Service created!');
        setShowForm(false);
        fetchServices();
      } else {
        toast.error(json.error);
      }
    } catch { toast.error('Something went wrong'); }
    finally { setSaving(false); }
  };

  const setFeature = (i, val) => {
    const features = [...form.features];
    features[i] = val;
    setForm((f) => ({ ...f, features }));
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <AdminSection
        title="Services"
        description="Manage the services displayed on your website."
        action={<Button onClick={openCreate} icon={<Plus className="w-4 h-4" />} size="sm">Add Service</Button>}
      >
        {loading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : services.length === 0 ? (
          <AdminCard>
            <p className="text-center text-slate-400 py-8">No services yet. Click "Add Service" to get started.</p>
          </AdminCard>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <motion.div key={service._id} variants={fadeUp} className="glass rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${service.color}20`, border: `1px solid ${service.color}40` }}>
                      <span className="text-lg font-bold" style={{ color: service.color }}>{service.title[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{service.title}</h3>
                      <p className="text-slate-500 text-xs">{service.slug}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleToggle(service, 'isFeatured')} className={`text-xs p-1.5 rounded-lg transition-colors ${service.isFeatured ? 'text-yellow-400 bg-yellow-400/10' : 'text-slate-500 hover:text-yellow-400'}`}>
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleToggle(service, 'isActive')} className={`text-xs p-1.5 rounded-lg transition-colors ${service.isActive ? 'text-green-400 bg-green-400/10' : 'text-slate-500 hover:text-green-400'}`}>
                      {service.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => openEdit(service)} className="text-slate-400 hover:text-violet-400 p-1.5 rounded-lg hover:bg-violet-400/10 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(service._id)} className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-400/10 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-slate-400 text-sm line-clamp-2">{service.shortDescription || service.description}</p>
                {service.pricing?.startingAt > 0 && (
                  <p className="text-xs text-slate-500 mt-2">From ${service.pricing.startingAt} / {service.pricing.type}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AdminSection>

      {/* Form Modal */}
      <AdminModal open={showForm} onClose={() => setShowForm(false)} title={editId ? 'Edit Service' : 'New Service'}>
        <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Title" required>
                    <input value={form.title} onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) })); }} className={inputClass} placeholder="SEO Services" required />
                  </FormField>
                  <FormField label="Slug">
                    <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inputClass} placeholder="seo-services" />
                  </FormField>
                </div>

                <FormField label="Short Description">
                  <input value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} className={inputClass} placeholder="One-line summary" />
                </FormField>

                <FormField label="Description" required>
                  <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={textareaClass} rows={3} placeholder="Detailed description..." required />
                </FormField>

                <div className="grid grid-cols-3 gap-4">
                  <FormField label="Icon">
                    <select value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} className={selectClass}>
                      {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Color">
                    <div className="flex gap-2">
                      <input type="color" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))} className="w-12 h-[46px] rounded-lg border border-white/10 bg-transparent cursor-pointer" />
                      <input value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))} className={inputClass} placeholder="#7c3aed" />
                    </div>
                  </FormField>
                  <FormField label="Order">
                    <input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: +e.target.value }))} className={inputClass} />
                  </FormField>
                </div>

                {/* Features */}
                <FormField label="Features">
                  <div className="space-y-2">
                    {form.features.map((feat, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={feat} onChange={(e) => setFeature(i, e.target.value)} className={inputClass} placeholder={`Feature ${i + 1}`} />
                        {form.features.length > 1 && (
                          <button type="button" onClick={() => setForm((f) => ({ ...f, features: f.features.filter((_, j) => j !== i) }))} className="text-red-400 hover:text-red-300 p-2">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => setForm((f) => ({ ...f, features: [...f.features, ''] }))} className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                      + Add feature
                    </button>
                  </div>
                </FormField>

                {/* Pricing */}
                <div className="grid grid-cols-3 gap-4">
                  <FormField label="Starting Price">
                    <input type="number" value={form.pricing.startingAt} onChange={(e) => setForm((f) => ({ ...f, pricing: { ...f.pricing, startingAt: +e.target.value } }))} className={inputClass} />
                  </FormField>
                  <FormField label="Currency">
                    <input value={form.pricing.currency} onChange={(e) => setForm((f) => ({ ...f, pricing: { ...f.pricing, currency: e.target.value } }))} className={inputClass} placeholder="USD" />
                  </FormField>
                  <FormField label="Pricing Type">
                    <select value={form.pricing.type} onChange={(e) => setForm((f) => ({ ...f, pricing: { ...f.pricing, type: e.target.value } }))} className={selectClass}>
                      {PRICING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </FormField>
                </div>

                {/* Image */}
                <ImageUpload
                  value={form.image}
                  publicId={form.imagePublicId}
                  folder="services"
                  label="Service Image"
                  onChange={({ url, publicId }) => setForm((f) => ({ ...f, image: url, imagePublicId: publicId }))}
                />

                {/* Toggles */}
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
                  <Button type="submit" loading={saving} icon={<Save className="w-4 h-4" />}>
                    {editId ? 'Update Service' : 'Create Service'}
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
        </form>
      </AdminModal>
    </div>
  );
}
