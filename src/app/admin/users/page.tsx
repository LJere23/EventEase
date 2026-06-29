'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Search, ShieldCheck, ShieldOff, Store, User, Shield, X, MoreVertical } from 'lucide-react';

type Role = 'organiser' | 'vendor' | 'admin';
type Plan = 'free' | 'premium' | 'pro';

interface AppUser {
  id: string; name: string; email: string; role: Role; plan: Plan;
  city: string; joined: string; events: number; active: boolean;
}

const initialUsers: AppUser[] = [
  { id: 'u1',  name: 'Chipo Moyo',       email: 'chipo@email.com',      role: 'organiser', plan: 'premium', city: 'Harare',   joined: 'Jan 2026', events: 3,  active: true },
  { id: 'u2',  name: 'TechZim Ltd',       email: 'admin@techzim.co.zw',  role: 'organiser', plan: 'pro',     city: 'Harare',   joined: 'Feb 2026', events: 12, active: true },
  { id: 'u3',  name: 'Blessing Ncube',    email: 'blessing@royal.co.zw', role: 'vendor',    plan: 'free',    city: 'Mutare',   joined: 'Mar 2026', events: 0,  active: true },
  { id: 'u4',  name: 'Ruvimbo Chari',     email: 'ruvimbo@email.com',    role: 'organiser', plan: 'free',    city: 'Harare',   joined: 'Mar 2026', events: 1,  active: true },
  { id: 'u5',  name: 'Farai Nkomo',       email: 'farai@corp.co.zw',     role: 'vendor',    plan: 'pro',     city: 'Harare',   joined: 'Jan 2026', events: 0,  active: true },
  { id: 'u6',  name: 'Tafadzwa Phiri',    email: 'taf@royalcuisine.co.zw', role: 'vendor', plan: 'premium', city: 'Harare',   joined: 'Feb 2026', events: 0,  active: true },
  { id: 'u7',  name: 'Tendai Chari',      email: 'tendai@email.com',     role: 'organiser', plan: 'premium', city: 'Harare',   joined: 'Jan 2026', events: 5,  active: true },
  { id: 'u8',  name: 'Shamiso Mwale',     email: 'shams@email.com',      role: 'organiser', plan: 'free',    city: 'Bulawayo', joined: 'Apr 2026', events: 2,  active: true },
  { id: 'u9',  name: 'Blessing Dube',     email: 'bdube@church.co.zw',   role: 'organiser', plan: 'free',    city: 'Harare',   joined: 'May 2026', events: 1,  active: true },
  { id: 'u10', name: 'Fake Account',      email: 'fake123@temp.com',     role: 'organiser', plan: 'free',    city: 'Unknown',  joined: 'Jun 2026', events: 0,  active: false },
  { id: 'u11', name: 'Admin User',        email: 'admin@eventease.co.zw', role: 'admin',    plan: 'pro',     city: 'Harare',   joined: 'Jan 2026', events: 0,  active: true },
];

const roleIcon = { organiser: User, vendor: Store, admin: Shield };
const roleColor = { organiser: '#024F5B', vendor: '#E9409B', admin: '#741353' };
const planColor = { free: '#8B920A', premium: '#1CB6BB', pro: '#741353' };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [selected, setSelected] = useState<AppUser | null>(null);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleActive = (id: string) => setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
  const changeRole = (id: string, role: Role) => { setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u)); setSelected(null); };

  const counts = { all: users.length, organiser: users.filter(u => u.role === 'organiser').length, vendor: users.filter(u => u.role === 'vendor').length, admin: users.filter(u => u.role === 'admin').length };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>User Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View all registered users, manage roles, and suspend accounts.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Users', value: counts.all, color: '#024F5B' },
            { label: 'Organisers', value: counts.organiser, color: '#1CB6BB' },
            { label: 'Vendors', value: counts.vendor, color: '#E9409B' },
            { label: 'Admins', value: counts.admin, color: '#741353' },
          ].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <div className="font-poppins font-bold text-2xl mb-0.5" style={{ color: s.color, fontFamily: "'Poppins', sans-serif" }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
            <input className="input-field text-sm" style={{ paddingLeft: '36px' }}
              placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
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
                  {['User', 'Role', 'Plan', 'City', 'Events', 'Joined', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => {
                  const RoleIcon = roleIcon[u.role];
                  return (
                    <tr key={u.id} className="border-b hover:bg-[var(--bg-secondary)] transition-colors" style={{ borderColor: 'var(--border)', opacity: u.active ? 1 : 0.5 }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: roleColor[u.role] }}>
                            {u.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{u.name}</p>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs font-semibold capitalize"
                          style={{ color: roleColor[u.role] }}>
                          <RoleIcon size={11} /> {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                          style={{ background: `${planColor[u.plan]}15`, color: planColor[u.plan] }}>
                          {u.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{u.city}</td>
                      <td className="px-4 py-3 text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{u.events}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{u.joined}</td>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User action modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="card w-full max-w-sm p-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: roleColor[selected.role] }}>
                  {selected.name[0]}
                </div>
                <div>
                  <h2 className="font-poppins font-bold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{selected.name}</h2>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{selected.email}</p>
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

            <div className="flex gap-3">
              <button onClick={() => { toggleActive(selected.id); setSelected(null); }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold border transition-all"
                style={selected.active
                  ? { background: '#ef444415', color: '#ef4444', border: '1px solid #ef444430' }
                  : { background: '#1CB6BB15', color: '#1CB6BB', border: '1px solid #1CB6BB30' }}>
                {selected.active ? <><ShieldOff size={14} /> Suspend</> : <><ShieldCheck size={14} /> Reactivate</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
