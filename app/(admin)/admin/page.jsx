'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FolderOpen, Briefcase, Mail, FileText,
  ArrowRight, TrendingUp,
} from 'lucide-react';
import { staggerContainer, fadeUp } from '@/animations/variants';
import { formatDateTime } from '@/utils/helpers';

function StatCard({ label, value, icon: Icon, color, href }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -2 }}>
      <Link
        href={href || '#'}
        className="glass rounded-2xl p-5 flex items-center gap-4 group block border border-white/10 hover:border-violet-500/40 transition-all duration-200"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-white text-2xl font-black leading-tight">{value ?? '—'}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 transition-colors shrink-0" />
      </Link>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setStats(json.data.stats);
          setRecentMessages(json.data.recentMessages || []);
          setRecentProjects(json.data.recentProjects || []);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-white text-xl font-bold">Welcome back! 👋</h2>
        <p className="text-slate-400 text-sm mt-1">Here's what's happening with your website today.</p>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <StatCard label="Total Projects" value={stats?.totalProjects} icon={FolderOpen} color="#7c3aed" href="/admin/projects" />
        <StatCard label="Active Services" value={stats?.totalServices} icon={Briefcase} color="#06b6d4" href="/admin/services" />
        <StatCard label="Unread Messages" value={stats?.unreadMessages} icon={Mail} color="#f59e0b" href="/admin/messages" />
        <StatCard label="Published Blogs" value={stats?.totalBlogs} icon={FileText} color="#10b981" href="/admin/blogs" />
      </motion.div>

      {/* Recent panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-5 border border-white/10"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold">Recent Messages</h3>
            <Link
              href="/admin/messages"
              className="text-violet-400 hover:text-violet-300 text-xs font-medium inline-flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">No messages yet.</p>
          ) : (
            <div className="space-y-2">
              {recentMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {msg.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-medium truncate">{msg.name}</p>
                      {!msg.isRead && <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />}
                    </div>
                    <p className="text-slate-400 text-xs truncate">{msg.message}</p>
                    <p className="text-slate-600 text-xs mt-0.5">{formatDateTime(msg.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-5 border border-white/10"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold">Recent Projects</h3>
            <Link
              href="/admin/projects"
              className="text-violet-400 hover:text-violet-300 text-xs font-medium inline-flex items-center gap-1 transition-colors"
            >
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentProjects.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">No projects yet.</p>
          ) : (
            <div className="space-y-2">
              {recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {project.title?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{project.title}</p>
                    <p className="text-slate-400 text-xs">{project.category}</p>
                  </div>
                  {project.isFeatured && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-violet-500/20 text-violet-400 border border-violet-500/30 shrink-0">
                      Featured
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-5 border border-white/10"
      >
        <h3 className="text-white font-bold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-2.5">
          {[
            { label: 'Add Project', href: '/admin/projects', color: '#7c3aed' },
            { label: 'Add Service', href: '/admin/services', color: '#06b6d4' },
            { label: 'Write Blog', href: '/admin/blogs', color: '#10b981' },
            { label: 'Edit Hero', href: '/admin/hero', color: '#f59e0b' },
            { label: 'View Messages', href: '/admin/messages', color: '#f43f5e' },
            { label: 'Edit Footer', href: '/admin/footer', color: '#8b5cf6' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-white/10 border"
              style={{ color: action.color, borderColor: `${action.color}30` }}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
