'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';
import { staggerContainer, fadeUp } from '@/animations/variants';
import { formatDate } from '@/utils/helpers';

const categoryColors = {
  'Development': '#6d28d9',
  'Design': '#be185d',
  'SEO': '#b45309',
  'Business': '#0369a1',
  'Tutorial': '#15803d',
  'News': '#0d9488',
};

function BlogCard({ blog }) {
  const color = categoryColors[blog.category] || '#6d28d9';

  return (
    <motion.div variants={fadeUp} className="group">
      <div className="card card-brand overflow-hidden flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden shrink-0">
          {blog.thumbnail ? (
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                style={{ background: `linear-gradient(135deg, ${color}cc, ${color})` }}
              >
                {blog.title?.[0]}
              </div>
            </div>
          )}
          {blog.category && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: color }}>
                {blog.category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-xs text-zinc-400 mb-3">
            {blog.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {blog.readTime} min read
              </span>
            )}
            {blog.publishedAt && (
              <span>{formatDate(blog.publishedAt)}</span>
            )}
          </div>
          <h3 className="text-[17px] font-bold text-zinc-900 mb-2 line-clamp-2 group-hover:text-violet-700 transition-colors flex-1">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
          )}
          <Link
            href={`/blog/${blog.slug || blog._id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
          >
            Read more <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((json) => { if (json.success) setBlogs(json.data.blogs); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(blogs.map((b) => b.category).filter(Boolean))];
  const filtered = filter === 'All' ? blogs : blogs.filter((b) => b.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Blog
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-5"
          >
            Insights &amp;
            <span className="gradient-text"> Resources</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65 }}
            className="text-xl text-zinc-500 max-w-2xl mx-auto"
          >
            Thoughts on web development, design, and building successful digital products.
          </motion.p>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    filter === cat
                      ? 'bg-violet-700 text-white shadow-sm'
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="h-48 bg-zinc-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-zinc-100 rounded w-1/3" />
                    <div className="h-5 bg-zinc-100 rounded w-full" />
                    <div className="h-5 bg-zinc-100 rounded w-3/4" />
                    <div className="h-3 bg-zinc-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto mb-5">
                <BookOpen className="w-7 h-7 text-zinc-400" />
              </div>
              <p className="text-zinc-500 text-lg font-medium mb-2">
                {blogs.length === 0 ? 'No posts yet' : 'No posts in this category'}
              </p>
              <p className="text-zinc-400 text-sm">Check back soon for new content.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
