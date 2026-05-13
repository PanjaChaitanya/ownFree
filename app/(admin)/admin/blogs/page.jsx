'use client';
import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import { AdminCard, AdminSection, FormField, inputClass, textareaClass, selectClass } from '@/components/admin/AdminCard';
import AdminModal from '@/components/admin/AdminModal';
import { slugify, formatDate } from '@/utils/helpers';

const CATEGORIES = ['General', 'Web Development', 'Design', 'SEO', 'Business', 'Tutorial', 'News'];

const emptyForm = {
  title: '', slug: '', excerpt: '', content: '', category: 'General',
  tags: '', thumbnail: '', thumbnailPublicId: '', author: 'Horizon Web Labs',
  isPublished: false, isFeatured: false, readTime: 5,
  seo: { metaTitle: '', metaDescription: '', keywords: '' },
};

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchBlogs = (includeUnpublished = true) => {
    setLoading(true);
    fetch('/api/blogs?limit=50' + (includeUnpublished ? '&all=true' : ''))
      .then((r) => r.json())
      .then((json) => { if (json.success) setBlogs(json.data.blogs); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBlogs(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (blog) => {
    setForm({ ...blog, tags: blog.tags?.join(', ') || '', seo: { ...blog.seo, keywords: blog.seo?.keywords?.join(', ') || '' } });
    setEditId(blog._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete blog post?')) return;
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) { toast.success('Deleted'); fetchBlogs(); }
  };

  const handleToggle = async (blog, field) => {
    const res = await fetch(`/api/blogs/${blog._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !blog[field] }),
    });
    const json = await res.json();
    if (json.success) { toast.success('Updated'); fetchBlogs(); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      seo: { ...form.seo, keywords: form.seo.keywords ? form.seo.keywords.split(',').map((k) => k.trim()) : [] },
    };
    try {
      const url = editId ? `/api/blogs/${editId}` : '/api/blogs';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (json.success) { toast.success(editId ? 'Updated!' : 'Created!'); setShowForm(false); fetchBlogs(); }
      else toast.error(json.error);
    } catch { toast.error('Something went wrong'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <AdminSection
        title="Blog Posts"
        description="Create and manage blog content."
        action={<Button onClick={openCreate} icon={<Plus className="w-4 h-4" />} size="sm">New Post</Button>}
      >
        {loading ? <p className="text-slate-400 text-sm">Loading...</p> :
          blogs.length === 0 ? <AdminCard><p className="text-center text-slate-400 py-8">No blog posts yet.</p></AdminCard> :
          <div className="space-y-3">
            {blogs.map((blog) => (
              <div key={blog._id} className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm truncate">{blog.title}</h3>
                    {blog.isFeatured && <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-400">Featured</span>}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${blog.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'}`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs">{blog.category} · {blog.readTime} min · {blog.publishedAt ? formatDate(blog.publishedAt) : 'Not published'}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => handleToggle(blog, 'isPublished')} className={`p-1.5 rounded-lg transition-colors ${blog.isPublished ? 'text-green-400 bg-green-400/10' : 'text-slate-500 hover:text-green-400'}`}>
                    {blog.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => openEdit(blog)} className="p-1.5 text-slate-400 hover:text-violet-400 rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(blog._id)} className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        }
      </AdminSection>

      <AdminModal open={showForm} onClose={() => setShowForm(false)} title={editId ? 'Edit Post' : 'New Blog Post'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Title" required>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))} className={inputClass} required />
            </FormField>
            <FormField label="Slug">
              <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inputClass} />
            </FormField>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Category">
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={selectClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Author">
              <input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} className={inputClass} />
            </FormField>
            <FormField label="Read Time (min)">
              <input type="number" value={form.readTime} onChange={(e) => setForm((f) => ({ ...f, readTime: +e.target.value }))} className={inputClass} />
            </FormField>
          </div>
          <FormField label="Excerpt">
            <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} className={textareaClass} rows={2} placeholder="Brief excerpt shown in listings..." />
          </FormField>
          <FormField label="Content (Markdown/HTML)" required>
            <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} className={textareaClass} rows={8} required placeholder="Write your blog content here..." />
          </FormField>
          <FormField label="Tags" hint="Comma-separated">
            <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} className={inputClass} placeholder="Next.js, Tutorial, Web Dev" />
          </FormField>
          <ImageUpload value={form.thumbnail} publicId={form.thumbnailPublicId} folder="blogs" label="Featured Image"
            onChange={({ url, publicId }) => setForm((f) => ({ ...f, thumbnail: url, thumbnailPublicId: publicId }))} />
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))} className="w-4 h-4 accent-violet-500 rounded" />
              <span className="text-sm text-slate-300">Publish</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))} className="w-4 h-4 accent-violet-500 rounded" />
              <span className="text-sm text-slate-300">Featured</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={saving} icon={<Save className="w-4 h-4" />}>{editId ? 'Update Post' : 'Create Post'}</Button>
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
