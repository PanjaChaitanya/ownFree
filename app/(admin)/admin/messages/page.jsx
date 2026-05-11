'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, CheckCircle, Archive, Eye, EyeOff, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminCard, AdminSection } from '@/components/admin/AdminCard';
import { formatDateTime } from '@/utils/helpers';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ total: 0, unread: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const fetchMessages = () => {
    const url = filter === 'all' ? '/api/contact' : `/api/contact?isRead=${filter === 'read'}`;
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setMessages(json.data.messages);
          setStats({ total: json.data.total, unread: json.data.unread });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, [filter]);

  const handleMarkRead = async (id, currentStatus) => {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: !currentStatus }),
    });
    const json = await res.json();
    if (json.success) {
      fetchMessages();
      if (selected?._id === id) setSelected({ ...selected, isRead: !currentStatus });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      toast.success('Message deleted');
      if (selected?._id === id) setSelected(null);
      fetchMessages();
    }
  };

  const filtered = messages.filter((m) =>
    search ? m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()) || m.message.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <AdminCard className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Mail className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Messages</p>
            <p className="text-white text-2xl font-black">{stats.total}</p>
          </div>
        </AdminCard>
        <AdminCard className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center">
            <EyeOff className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Unread</p>
            <p className="text-white text-2xl font-black">{stats.unread}</p>
          </div>
        </AdminCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Messages list */}
        <div className="lg:col-span-2 space-y-3">
          {/* Filters & search */}
          <div className="flex gap-2">
            {['all', 'unread', 'read'].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${filter === f ? 'bg-violet-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search messages..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/60" />
          </div>

          {loading ? (
            <p className="text-slate-400 text-sm text-center py-8">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">No messages found.</p>
          ) : (
            <div className="space-y-2 max-h-[60vh] overflow-y-auto no-scrollbar">
              {filtered.map((msg) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => { setSelected(msg); if (!msg.isRead) handleMarkRead(msg._id, false); }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${selected?._id === msg._id ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/5 glass hover:bg-white/5'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {!msg.isRead && <div className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />}
                      <p className="text-white text-sm font-medium">{msg.name}</p>
                    </div>
                    <p className="text-slate-600 text-xs">{formatDateTime(msg.createdAt)}</p>
                  </div>
                  <p className="text-slate-400 text-xs mb-1">{msg.email}</p>
                  {msg.service && <p className="text-violet-400 text-xs mb-1">{msg.service}</p>}
                  <p className="text-slate-500 text-xs line-clamp-2">{msg.message}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Message detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <AdminCard>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-white font-bold text-lg">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-violet-400 text-sm hover:underline">{selected.email}</a>
                  {selected.phone && <p className="text-slate-400 text-sm">{selected.phone}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleMarkRead(selected._id, selected.isRead)}
                    className="p-2 rounded-lg glass text-slate-400 hover:text-violet-400 transition-colors" title={selected.isRead ? 'Mark unread' : 'Mark read'}>
                    {selected.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(selected._id)} className="p-2 rounded-lg glass text-slate-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {selected.service && (
                    <span className="px-3 py-1 rounded-full text-xs bg-violet-500/20 text-violet-400 border border-violet-500/30">
                      {selected.service}
                    </span>
                  )}
                  {selected.budget && (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                      Budget: {selected.budget}
                    </span>
                  )}
                  {selected.subject && (
                    <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-slate-300">
                      {selected.subject}
                    </span>
                  )}
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-slate-400 text-xs mb-2 font-medium uppercase tracking-widest">Message</p>
                  <p className="text-white leading-relaxed">{selected.message}</p>
                </div>

                <p className="text-slate-600 text-xs">{formatDateTime(selected.createdAt)}</p>

                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your inquiry'}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors">
                  <Mail className="w-4 h-4" /> Reply via Email
                </a>
              </div>
            </AdminCard>
          ) : (
            <AdminCard className="flex flex-col items-center justify-center h-48 text-center">
              <Mail className="w-8 h-8 text-slate-600 mb-3" />
              <p className="text-slate-400">Select a message to read</p>
            </AdminCard>
          )}
        </div>
      </div>
    </div>
  );
}
