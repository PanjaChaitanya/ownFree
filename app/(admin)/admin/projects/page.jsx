'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X, Save, ExternalLink, GitFork } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import { AdminCard, AdminSection, FormField, inputClass, textareaClass, selectClass } from '@/components/admin/AdminCard';
import { slugify } from '@/utils/helpers';

const CATEGORIES = ['Web App', 'SaaS', 'E-Commerce', 'Portfolio', 'Landing Page', 'Business Website', 'Mobile App', 'Other'];

const emptyForm = {
  title: '', slug: '', description: '', shortDescription: '',
  thumbnail: '', thumbnailPublicId: '',
  websiteUrl: '', githubUrl: '', techStack: '', category: 'Web App',
  isFeatured: false, isActive: true, order: 0,
  clientName: '', completionDate: '',
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProjects = () => {
    setLoading(true);
    fetch('/api/projects')
      .then((r) => r.json())
      .then((json) => { if (json.success) setProjects(json.data.projects); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (project) => {
    setForm({ ...project, techStack: project.techStack?.join(', ') || '', completionDate: project.completionDate ? project.completionDate.split('T')[0] : '' });
    setEditId(project._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) { toast.success('Project deleted'); fetchProjects(); }
    else toast.error(json.error);
  };

  const handleToggle = async (project, field) => {
    const res = await fetch(`/api/projects/${project._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !project[field] }),
    });
    const json = await res.json();
    if (json.success) { toast.success('Updated'); fetchProjects(); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      techStack: form.techStack ? form.techStack.split(',').map((t) => t.trim()).filter(Boolean) : [],
      completionDate: form.completionDate || undefined,
    };
    try {
      const url = editId ? `/api/projects/${editId}` : '/api/projects';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (json.success) { toast.success(editId ? 'Updated!' : 'Created!'); setShowForm(false); fetchProjects(); }
      else toast.error(json.error);
    } catch { toast.error('Something went wrong'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <AdminSection
        title="Projects"
        description="Manage your portfolio projects."
        action={<Button onClick={openCreate} icon={<Plus className="w-4 h-4" />} size="sm">Add Project</Button>}
      >
        {loading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : projects.length === 0 ? (
          <AdminCard>
            <p className="text-center text-slate-400 py-8">No projects yet.</p>
          </AdminCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project._id} className="glass rounded-2xl overflow-hidden">
                <div className="relative h-36 bg-gradient-to-br from-violet-900/30 to-cyan-900/30">
                  {project.thumbnail && <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    {project.isFeatured && <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-500/80 text-white">Featured</span>}
                    <span className="px-2 py-0.5 rounded-full text-xs bg-black/50 text-slate-300">{project.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1 line-clamp-1">{project.title}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-3">{project.shortDescription || project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {project.websiteUrl && <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-violet-400 p-1"><ExternalLink className="w-3.5 h-3.5" /></a>}
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-violet-400 p-1"><GitFork className="w-3.5 h-3.5" /></a>}
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleToggle(project, 'isFeatured')} className={`p-1.5 rounded-lg transition-colors ${project.isFeatured ? 'text-yellow-400' : 'text-slate-500 hover:text-yellow-400'}`}><Star className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleToggle(project, 'isActive')} className={`p-1.5 rounded-lg transition-colors ${project.isActive ? 'text-green-400' : 'text-slate-500 hover:text-green-400'}`}>{project.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}</button>
                      <button onClick={() => openEdit(project)} className="text-slate-400 hover:text-violet-400 p-1.5 rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(project._id)} className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminSection>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-2xl glass-strong rounded-2xl p-6 mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editId ? 'Edit Project' : 'New Project'}</h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Title" required>
                    <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} className={inputClass} placeholder="Project Title" required />
                  </FormField>
                  <FormField label="Slug">
                    <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inputClass} placeholder="project-slug" />
                  </FormField>
                </div>

                <FormField label="Short Description">
                  <input value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} className={inputClass} placeholder="Brief summary" />
                </FormField>

                <FormField label="Description" required>
                  <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={textareaClass} rows={3} required />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Website URL">
                    <input value={form.websiteUrl} onChange={(e) => setForm((f) => ({ ...f, websiteUrl: e.target.value }))} className={inputClass} placeholder="https://..." />
                  </FormField>
                  <FormField label="GitHub URL">
                    <input value={form.githubUrl} onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))} className={inputClass} placeholder="https://github.com/..." />
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Category">
                    <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={selectClass}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Completion Date">
                    <input type="date" value={form.completionDate} onChange={(e) => setForm((f) => ({ ...f, completionDate: e.target.value }))} className={inputClass} />
                  </FormField>
                </div>

                <FormField label="Tech Stack" hint="Comma-separated: Next.js, MongoDB, Tailwind">
                  <input value={form.techStack} onChange={(e) => setForm((f) => ({ ...f, techStack: e.target.value }))} className={inputClass} placeholder="Next.js, MongoDB, Tailwind CSS" />
                </FormField>

                <FormField label="Client Name">
                  <input value={form.clientName} onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))} className={inputClass} placeholder="Client or company name" />
                </FormField>

                <ImageUpload
                  value={form.thumbnail}
                  publicId={form.thumbnailPublicId}
                  folder="projects"
                  label="Project Thumbnail"
                  onChange={({ url, publicId }) => setForm((f) => ({ ...f, thumbnail: url, thumbnailPublicId: publicId }))}
                />

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
                    {editId ? 'Update Project' : 'Create Project'}
                  </Button>
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
