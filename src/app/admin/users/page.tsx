'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Search, ShieldCheck, ShieldOff, Store, User, Shield, X, MoreVertical, Loader2, AlertCircle } from 'lucide-react';

type Role = 'organiser' | 'vendor' | 'admin';

interface AppUser {
  id: string;
  full_name: string | null;
  role: Role;
  city: string | null;
  created_at: string;
  active: boolean;
}

const roleIcon = { organiser: User, vendor: Store, admin: Shield };
const roleColor = { organiser: '#024F5B', vendor: '#E9409B', admin: '#741353' };

const DEMO_USERS: AppUser[] = [
  { id: 'u1', full_name: 'Chipo Moyo',    role: 'organiser', city: 'Harare',   created_at: '2026-01-10', active: true },
  { id: 'u2', full_name: 'TechZim Ltd',   role: 'organiser', city: 'Harare',   created_at: '2026-02-05', active: true },
  { id: 'u3', full_name: 'Blessing Ncube',role: 'vendor',    city: 'Mutare',   created_at: '2026-03-12', active: true },
  { id: 'u4', full_name: 'Ruvimbo Chari', role: 'organiser', city: 'Harare',   created_at: '2026-03-20', active: true },
  { id: 'u5', full_name: 'Farai Nkomo',   role: 'vendor',    city: 'Harare',   created_at: '2026-01-28', active: true },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [selected, setSelected] = useState<AppUser | null>(null);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(data => {
        if (data.error) { setUsingDemo(true); setUsers(DEMO_USERS); }
        else setUsers(data.users);
      })
      .catch(() => { setUsingDemo(true); setUsers(DEMO_USERS); })
      .finally(() => setLoading(false));
  }, []);

  const changeRole = async (id: string, role: Role) => {
    if (!usingDemo) {
      await fetch('/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, role }) });
    }
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    setSelected(null);
  };

  const toggleActive = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
    setSelected(null);
  };

  const filtered = users.filter(u => {
    const name = u.full_name ?? '';
    const matchSearch = name.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const counts = {
    all: users.length,
    organiser: users.filter(u => u.role === 'organiser').length,
    vendor: users.filter(u => u.role === 'vendor').length,
    admin: users.filter(u => u.role === 'admin').length,
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              User Management
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {usingDemo ? 'Demo data — add SUPABASE_SERVICE_ROLE_KEY for live user records.' : 'Live data from Supabase.'}
            </p>
          </div>
          {loading && <Loader2 size={18} className="animate-spin mt-1" style={{ color: 'var(--teal)' }} />}
        </div>

        {usingDemo && (
          <div className="mb-6 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
            style={{ background: '#E9409B10', border: '1px solid #E9409B30', color: '#E9409B' }}>
            <AlertCircle size={15} />
            Live data unavailable — add <code className="font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code> to <code className="font-mono text-xs">.env.local</code>.
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Users', value: counts.all, color: '#024F5B' },
            { label: 'Organisers',  value: counts.organiser, color: '#1CB6BB' },
            { label: 'Vendors',     value: counts.vendor, color: '#E9409B' },
            { label: 'Admins',      value: counts.admin, color: '#741353' },
          ].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <div className="font-poppins font-bold text-2xl mb-0.5" style={{ color: s.color, fontFamily: "'Poppins', sans-serif" }}>
                {loading ? '—' : s.value}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
            <input className="input-field text-sm" style={{ paddingLeft: '36px' }}
              placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
            {(['all', 'organiser', 'vendor', 'admin'] as const).map(r => (
              <button key={r} onClick={() => setRoleFilter(r)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={{ background: roleFilter === r ? 'var(--bg-card)' : 'transparent', color: roleFilter === r ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                  {['User', 'Role', 'City', 'Joined', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => {
                  const RoleIcon = roleIcon[u.role];
                  return (
                    <tr key={u.id} className="border-b hover:bg-[var(--bg-secondary)] transition-colors"
                      style={{ borderColor: 'var(--border)', opacity: u.active ? 1 : 0.5 }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: roleColor[u.role] }}>
                            {(u.full_name ?? u.role)[0]?.toUpperCase()}
                          </div>
                          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{u.full_name ?? 'Anonymous'}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs font-semibold capitalize" style={{ color: roleColor[u.role] }}>
                          <RoleIcon size={11} /> {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{u.city ?? '—'}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {new Date(u.created_at).toLocaleDateString('en-ZW', { month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: u.active ? '#1CB6BB15' : '#ef444415', color: u.active ? '#1CB6BB' : '#ef4444' }}>
                          {u.active ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelected(u)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                          <MoreVertical size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && !loading && (
                  <tr><td colSpan={6} className="py-12 text-center" style={{ color: 'var(--text-secondary)' }}>No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="card w-full max-w-sm p-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: roleColor[selected.role] }}>
                  {(selected.full_name ?? selected.role)[0]?.toUpperCase()}
                </div>
                <div>
                  <h2 className="font-poppins font-bold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    {selected.full_name ?? 'Anonymous'}
                  </h2>
                  <p className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>{selected.role}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: 'var(--text-secondary)' }}><X size={18} /></button>
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Change Role</p>
              <div className="flex gap-2">
                {(['organiser', 'vendor', 'admin'] as Role[]).map(r => (
                  <button key={r} onClick={() => changeRole(selected.id, r)}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold capitalize border transition-all"
                    style={{
                      background: selected.role === r ? `${roleColor[r]}15` : 'transparent',
                      color: selected.role === r ? roleColor[r] : 'var(--text-secondary)',
                      borderColor: selected.role === r ? `${roleColor[r]}40` : 'var(--border)',
                    }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => toggleActive(selected.id)}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold border transition-all"
              style={selected.active
                ? { background: '#ef444415', color: '#ef4444', border: '1px solid #ef444430' }
                : { background: '#1CB6BB15', color: '#1CB6BB', border: '1px solid #1CB6BB30' }}>
              {selected.active ? <><ShieldOff size={14} /> Suspend</> : <><ShieldCheck size={14} /> Reactivate</>}
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
