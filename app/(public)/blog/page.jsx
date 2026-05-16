'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';
import AnimatedBlogCards from '@/components/ui/AnimatedBlogCards';

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
      <section className="pt-28 pb-12 bg-white">
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

          {/* Category filters — only shown when multiple categories exist */}
          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-2 mb-10 pt-4"
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

          {/* Loading skeleton */}
          {loading ? (
            <div className="max-w-5xl mx-auto py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 animate-pulse">
                <div className="h-80 bg-zinc-200 rounded-2xl" />
                <div className="flex flex-col gap-4 py-4">
                  <div className="h-3 bg-zinc-200 rounded w-24" />
                  <div className="h-8 bg-zinc-200 rounded w-3/4" />
                  <div className="h-8 bg-zinc-200 rounded w-1/2" />
                  <div className="h-4 bg-zinc-200 rounded w-full" />
                  <div className="h-4 bg-zinc-200 rounded w-5/6" />
                  <div className="h-4 bg-zinc-200 rounded w-4/6" />
                </div>
              </div>
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatedBlogCards blogs={filtered} autoplay={filtered.length > 1} />
            </motion.div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
