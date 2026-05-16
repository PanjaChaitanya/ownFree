'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils/helpers';

const categoryColors = {
  'Development': '#6d28d9',
  'Web Development': '#6d28d9',
  'Design': '#be185d',
  'SEO': '#b45309',
  'Business': '#0369a1',
  'Tutorial': '#15803d',
  'News': '#0d9488',
  'General': '#52525b',
};

function randomRotate() {
  return Math.floor(Math.random() * 21) - 10;
}

export default function AnimatedBlogCards({ blogs = [], autoplay = false }) {
  const [active, setActive] = useState(0);
  const [rotations] = useState(() => blogs.map(() => randomRotate()));

  const handleNext = () => setActive((p) => (p + 1) % blogs.length);
  const handlePrev = () => setActive((p) => (p - 1 + blogs.length) % blogs.length);

  useEffect(() => {
    if (!autoplay || blogs.length < 2) return;
    const t = setInterval(handleNext, 5000);
    return () => clearInterval(t);
  }, [autoplay, blogs.length]);

  if (!blogs.length) return null;

  const blog = blogs[active];
  const color = categoryColors[blog.category] || '#6d28d9';

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">

        {/* ── Stacked image cards ── */}
        <div className="relative h-72 sm:h-80 md:h-96 w-full">
          <AnimatePresence>
            {blogs.map((b, i) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, scale: 0.9, rotate: rotations[i] }}
                animate={{
                  opacity: i === active ? 1 : 0.65,
                  scale: i === active ? 1 : 0.94,
                  rotate: i === active ? 0 : rotations[i],
                  zIndex: i === active ? 40 : blogs.length + 2 - i,
                  y: i === active ? [0, -16, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, rotate: rotations[i] }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute inset-0 origin-bottom rounded-2xl overflow-hidden shadow-lg border border-zinc-200"
              >
                {b.thumbnail ? (
                  <Image
                    src={b.thumbnail}
                    alt={b.title}
                    fill
                    draggable={false}
                    className="object-cover object-center select-none"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-6xl font-black select-none"
                    style={{ background: `linear-gradient(135deg, ${color}cc, ${color})` }}
                  >
                    {b.title?.[0]}
                  </div>
                )}

                {/* Category pill overlay */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    {b.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col justify-between h-full py-2">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-4"
          >
            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              {blog.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(blog.publishedAt)}
                </span>
              )}
              {blog.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTime} min read
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 leading-tight tracking-tight">
              {blog.title}
            </h2>

            {/* Excerpt — word-by-word blur reveal */}
            {blog.excerpt && (
              <motion.p className="text-zinc-500 text-[15px] leading-relaxed">
                {blog.excerpt.split(' ').map((word, i) => (
                  <motion.span
                    key={`${active}-${i}`}
                    initial={{ filter: 'blur(8px)', opacity: 0, y: 4 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut', delay: 0.015 * i }}
                    className="inline-block mr-[0.28em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            )}

            {/* Read more */}
            <Link
              href={`/blog/${blog.slug || blog._id}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
            >
              Read article
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Navigation + counter */}
          <div className="flex items-center gap-4 pt-10">
            <button
              onClick={handlePrev}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-violet-50 hover:text-violet-700 text-zinc-700 transition-all duration-200 border border-zinc-200 hover:border-violet-200"
              aria-label="Previous post"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-violet-50 hover:text-violet-700 text-zinc-700 transition-all duration-200 border border-zinc-200 hover:border-violet-200"
              aria-label="Next post"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-1.5 ml-1">
              {blogs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-6 bg-violet-600' : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                  aria-label={`Go to post ${i + 1}`}
                />
              ))}
            </div>

            <span className="ml-auto text-xs text-zinc-400 tabular-nums">
              {active + 1} / {blogs.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
