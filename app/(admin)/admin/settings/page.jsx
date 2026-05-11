'use client';
import { useEffect, useState } from 'react';
import { Save, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { AdminCard, AdminSection, FormField, inputClass } from '@/components/admin/AdminCard';

export default function SettingsAdmin() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);
  const [setupForm, setSetupForm] = useState({ name: '', email: '', password: '' });
  const [setupDone, setSetupDone] = useState(false);
  const [settingUp, setSettingUp] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((json) => { if (json.success) setUser(json.data.user); })
      .catch(() => {});
  }, []);

  const handleSetup = async (e) => {
    e.preventDefault();
    setSettingUp(true);
    try {
      const res = await fetch('/api/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(setupForm),
      });
      const json = await res.json();
      if (json.success) { toast.success('Admin created!'); setSetupDone(true); }
      else toast.error(json.error);
    } catch { toast.error('Setup failed'); }
    finally { setSettingUp(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Profile */}
      <AdminSection title="Profile" description="Update your admin profile information.">
        <AdminCard className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-white/10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-white font-bold">{user.name}</p>
              <p className="text-slate-400 text-sm">{user.email}</p>
              <p className="text-violet-400 text-xs capitalize mt-0.5">{user.role}</p>
            </div>
          </div>
          <FormField label="Name">
            <input value={user.name || ''} onChange={(e) => setUser((u) => ({ ...u, name: e.target.value }))} className={inputClass} />
          </FormField>
          <FormField label="Email">
            <input type="email" value={user.email || ''} onChange={(e) => setUser((u) => ({ ...u, email: e.target.value }))} className={inputClass} />
          </FormField>
          <Button onClick={() => toast.success('Profile update coming soon!')} size="sm" variant="outline">Update Profile</Button>
        </AdminCard>
      </AdminSection>

      {/* Create new admin */}
      <AdminSection title="Create Admin User" description="Set up a new admin account for first-time use.">
        <AdminCard className="space-y-4">
          {setupDone ? (
            <p className="text-green-400 text-sm">Admin user created successfully.</p>
          ) : (
            <form onSubmit={handleSetup} className="space-y-4">
              <FormField label="Name">
                <input value={setupForm.name} onChange={(e) => setSetupForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} required />
              </FormField>
              <FormField label="Email">
                <input type="email" value={setupForm.email} onChange={(e) => setSetupForm((f) => ({ ...f, email: e.target.value }))} className={inputClass} required />
              </FormField>
              <FormField label="Password">
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={setupForm.password} onChange={(e) => setSetupForm((f) => ({ ...f, password: e.target.value }))} className={inputClass + ' pr-10'} required minLength={6} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </FormField>
              <Button type="submit" loading={settingUp} size="sm">Create Admin</Button>
            </form>
          )}
        </AdminCard>
      </AdminSection>
    </div>
  );
}
