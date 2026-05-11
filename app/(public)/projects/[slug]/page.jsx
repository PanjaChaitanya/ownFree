'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, GitFork, ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { staggerContainer, fadeUp } from '@/animations/variants';
import Button from '@/components/ui/Button';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/projects/${slug}`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setProject(json.data.project); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center mb-5">
          <Tag className="w-7 h-7 text-zinc-400" />
        </div>
        <h1 className="text-2xl font-black text-zinc-900 mb-3">Project Not Found</h1>
        <p className="text-zinc-500 mb-6">This project doesn't exist or has been removed.</p>
        <Button href="/projects" variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
          All Projects
        </Button>
      </div>
    );
  }

  const stack = Array.isArray(project.techStack) ? project.techStack : [];
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];

  return (
    <>
      {/* Back */}
      <div className="pt-24 pb-2 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-violet-700 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> All Projects
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {project.category && (
              <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-5">
                {project.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 leading-tight tracking-tight mb-5">
              {project.title}
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed mb-8 max-w-3xl">
              {project.description || project.shortDescription}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-zinc-500 mb-8">
              {project.clientName && (
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-zinc-400" /> {project.clientName}
                </span>
              )}
              {project.completionDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  {new Date(project.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 text-zinc-700 text-sm font-semibold rounded-xl hover:bg-zinc-50 transition-colors"
                >
                  <GitFork className="w-4 h-4" /> GitHub
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Thumbnail */}
      {project.thumbnail && (
        <section className="pb-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative h-64 sm:h-96 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm"
            >
              <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
            </motion.div>
          </div>
        </section>
      )}

      {/* Details */}
      <section className="py-12 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tech stack */}
            {stack.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-zinc-100 rounded-lg text-zinc-700 text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Project Type</h3>
              <p className="text-zinc-900 font-semibold">{project.category}</p>
              {project.clientName && (
                <>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-5 mb-2">Client</h3>
                  <p className="text-zinc-900 font-semibold">{project.clientName}</p>
                </>
              )}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card p-6 bg-violet-700 border-violet-700 text-white"
            >
              <h3 className="font-black text-lg mb-2">Want Something Similar?</h3>
              <p className="text-violet-200 text-sm mb-5">Let's discuss your project and see how we can help.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-violet-700 text-sm font-bold rounded-xl hover:bg-violet-50 transition-colors"
              >
                Get a Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-zinc-900 mb-8">Gallery</h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {gallery.map((img, i) => (
                <motion.div key={i} variants={fadeUp} className="relative h-56 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm group">
                  <Image src={img} alt={`${project.title} screenshot ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
