'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { User, Bell, Lock, Trash2, Save, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Harare');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      setEmail(user.email ?? '');
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, phone, city')
        .eq('id', user.id)
        .single();
      if (profile) {
        setName(profile.full_name ?? user.user_metadata?.full_name ?? '');
        setPhone(profile.phone ?? '');
        setCity(profile.city ?? 'Harare');
      } else {
        setName(user.user_metadata?.full_name ?? '');
      }
      setLoading(false);
    });
  }, []);

  const saveProfile = async () => {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('profiles').update({ full_name: name, phone: phone || null, city }).eq('id', user.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Account Settings
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your profile, notifications, and security.</p>
        </div>

        {/* Profile */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-light)' }}>
              <User size={16} style={{ color: 'var(--teal-deep)' }} />
            </div>
            <h2 className="font-poppins font-semibold"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Profile Information
            </h2>
          </div>
          {loading ? (
            <div className="flex items-center gap-2 py-4" style={{ color: 'var(--text-secondary)' }}>
              <Loader2 size={16} className="animate-spin" /> Loading your profile…
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Full Name</label>
                  <input type="text" className="input-field" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Email</label>
                  <input type="email" className="input-field" value={email} disabled
                    style={{ opacity: 0.7, cursor: 'not-allowed' }} />
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Email cannot be changed here.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Phone</label>
                  <input type="tel" className="input-field" placeholder="+263 77 000 0000" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>City</label>
                  <select className="input-field" value={city} onChange={e => setCity(e.target.value)}>
                    <option>Harare</option>
                    <option>Bulawayo</option>
                    <option>Mutare</option>
                    <option>Gweru</option>
                    <option>Masvingo</option>
                  </select>
                </div>
              </div>
              <button className="btn-glow btn-ripple mt-5" onClick={saveProfile} disabled={saving}>
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saved ? 'Saved!' : saving ? 'Saving…' : 'Save Changes'}
              </button>
            </>
          )}
        </div>

        {/* Notifications */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#E9409B15' }}>
              <Bell size={16} style={{ color: '#E9409B' }} />
            </div>
            <h2 className="font-poppins font-semibold"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Notifications
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Email notifications', sub: 'Booking updates, quote responses, reminders', value: emailNotifs, set: setEmailNotifs },
              { label: 'SMS notifications', sub: 'Booking confirmations only', value: smsNotifs, set: setSmsNotifs },
            ].map(({ label, sub, value, set }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{sub}</p>
                </div>
                <button
                  onClick={() => set(!value)}
                  className="w-12 h-6 rounded-full transition-all relative flex-shrink-0"
                  style={{ background: value ? 'var(--teal-deep)' : 'var(--border)' }}
                >
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm"
                    style={{ left: value ? '26px' : '2px' }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#8B920A15' }}>
              <Lock size={16} style={{ color: '#8B920A' }} />
            </div>
            <h2 className="font-poppins font-semibold"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Security
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Current Password</label>
              <input type="password" placeholder="••••••••" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>New Password</label>
              <input type="password" placeholder="••••••••" className="input-field" />
            </div>
          </div>
          <button className="btn-ghost mt-5" onClick={() => alert('Password updated!')}>
            <Lock size={14} /> Update Password
          </button>
        </div>

        {/* Danger zone */}
        <div className="card p-6" style={{ borderColor: '#E9409B40' }}>
          <div className="flex items-center gap-3 mb-3">
            <Trash2 size={16} style={{ color: '#E9409B' }} />
            <h2 className="font-poppins font-semibold"
              style={{ color: '#E9409B', fontFamily: "'Poppins', sans-serif" }}>
              Danger Zone
            </h2>
          </div>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Deleting your account is permanent and cannot be undone. All your events and data will be erased.
          </p>
          <button
            className="text-sm font-semibold px-4 py-2 rounded-xl border transition-colors"
            style={{ color: '#E9409B', borderColor: '#E9409B40' }}
            onClick={() => alert('Please contact hello@eventease.co.zw to delete your account.')}
          >
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
