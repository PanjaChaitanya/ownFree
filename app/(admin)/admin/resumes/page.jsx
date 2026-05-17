'use client';
import { useEffect, useState } from 'react';
import {
  FileCheck2, Loader2, RefreshCw, Phone, FolderOpen,
  Calendar, Mail, PhoneCall, CheckCircle2, Circle,
} from 'lucide-react';
import { formatDate } from '@/utils/helpers';

function StatCard({ label, value }) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="text-white font-bold text-xl">{value}</p>
    </div>
  );
}

export default function AdminResumesPage() {
  const [submissions, setSubmissions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/resume');
      const json = await res.json();
      if (json.success) {
        setSubmissions(json.data.submissions);
        setTotal(json.data.total);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleContacted = async (id) => {
    setToggling(id);
    try {
      const res = await fetch('/api/resume', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmissions((prev) =>
          prev.map((s) => s._id === id ? { ...s, contacted: json.data.contacted } : s)
        );
      }
    } finally {
      setToggling(null);
    }
  };

  const withPhone = submissions.filter((s) => s.phone).length;
  const withEmail = submissions.filter((s) => s.email).length;
  const contacted = submissions.filter((s) => s.contacted).length;
  const avgProjects = submissions.length
    ? (submissions.reduce((s, r) => s + (r.projectCount || 0), 0) / submissions.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Uploads" value={total} />
        <StatCard label="With Phone" value={withPhone} />
        <StatCard label="With Email" value={withEmail} />
        <StatCard label="Contacted" value={`${contacted}/${total}`} />
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-violet-400" />
            <span className="text-white font-semibold text-sm">Resume Uploads</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-white/10 text-xs text-slate-300">{total}</span>
          </div>
          <button onClick={load} disabled={loading} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-16">
            <FileCheck2 className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No uploads yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {submissions.map((sub) => (
              <div
                key={sub._id}
                className="flex items-center gap-4 px-5 py-3.5"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-violet-400" />
                </div>

                {/* Email + phone + projects */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">
                    {sub.email || <span className="text-slate-500 italic font-normal">No email</span>}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-0.5 text-xs text-slate-500">
                    {sub.phone ? (
                      <a
                        href={`tel:${sub.phone}`}
                        className="flex items-center gap-1 text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        <PhoneCall className="w-3 h-3" />
                        {sub.phone}
                      </a>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-600">
                        <Phone className="w-3 h-3" />
                        No phone
                      </span>
                    )}
                    {sub.projectCount > 0 && (
                      <span className="flex items-center gap-1 text-cyan-400">
                        <FolderOpen className="w-3 h-3" />
                        {sub.projectCount} project{sub.projectCount !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>

                {/* Date */}
                <div className="shrink-0 flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" />
                  {formatDate(sub.createdAt)}
                </div>

                {/* Contacted toggle */}
                <button
                  onClick={() => toggleContacted(sub._id)}
                  disabled={toggling === sub._id}
                  title={sub.contacted ? 'Mark as not contacted' : 'Mark as contacted'}
                  className={`shrink-0 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
                    sub.contacted
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'
                      : 'bg-white/5 border-white/10 text-slate-500 hover:text-white hover:bg-white/10'
                  } ${toggling === sub._id ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {sub.contacted
                    ? <CheckCircle2 className="w-3.5 h-3.5" />
                    : <Circle className="w-3.5 h-3.5" />
                  }
                  {sub.contacted ? 'Contacted' : 'Pending'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
