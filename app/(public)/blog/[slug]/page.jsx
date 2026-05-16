'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';
import { formatDate } from '@/utils/helpers';

const ease = [0.22, 1, 0.36, 1];

function ArticleSkeleton() {
  return (
    <div className="animate-pulse space-y-6 max-w-3xl mx-auto px-4 sm:px-6 py-24">
      <div className="h-4 bg-zinc-100 rounded w-24" />
      <div className="h-10 bg-zinc-100 rounded w-3/4" />
      <div className="h-10 bg-zinc-100 rounded w-1/2" />
      <div className="h-64 bg-zinc-100 rounded-2xl" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-zinc-100 rounded" style={{ width: `${75 + Math.random() * 25}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blogs/${slug}`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setBlog(json.data.blog); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-white"><ArticleSkeleton /></div>;

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center mb-5">
          <Tag className="w-7 h-7 text-zinc-400" />
        </div>
        <h1 className="text-2xl font-black text-zinc-900 mb-3">Post Not Found</h1>
        <p className="text-zinc-500 mb-6">This article doesn't exist or has been removed.</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-200 text-zinc-700 text-sm font-semibold rounded-xl hover:bg-zinc-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <>
      <article className="bg-white">
        {/* Back */}
        <div className="pt-24 pb-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-violet-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> All Posts
            </Link>
          </div>
        </div>

        {/* Header */}
        <header className="pt-8 pb-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              {blog.category && (
                <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-5">
                  {blog.category}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-zinc-900 leading-tight tracking-tight mb-5">
                {blog.title}
              </h1>

              {blog.excerpt && (
                <p className="text-xl text-zinc-500 leading-relaxed mb-6">{blog.excerpt}</p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 pb-8 border-b border-zinc-100">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {blog.author || 'Horizon Web Labs'}
                </span>
                {blog.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(blog.publishedAt)}
                  </span>
                )}
                {blog.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTime} min read
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </header>

        {/* Thumbnail */}
        {blog.thumbnail && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10"
          >
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
              <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" />
            </div>
          </motion.div>
        )}

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-10 border-t border-zinc-100 mt-12">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-zinc-100 rounded-lg text-zinc-600 text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </article>

      {/* CTA */}
      <CTASection />
    </>
  );
}
