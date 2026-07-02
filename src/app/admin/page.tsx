'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Users, Store, CreditCard, Calendar, TrendingUp, TrendingDown, ChevronRight, Clock, CheckCircle, AlertCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  pendingVendors: number;
  totalEvents: number;
  recentVendors: { id: string; business_name: string; category: string; city: string; verified: boolean; created_at: string }[];
  recentProfiles: { id: string; full_name: string | null; role: string; created_at: string }[];
}

const DEMO_VENDORS = [
  { id: 'v1', business_name: 'Sunshine Caterers',    category: 'Catering',    city: 'Bulawayo',  verified: false, created_at: '' },
  { id: 'v2', business_name: 'Pixel Perfect Studios',category: 'Photography', city: 'Harare',    verified: false, created_at: '' },
  { id: 'v3', business_name: 'GlowUp Events Décor',  category: 'Décor',       city: 'Harare',    verified: false, created_at: '' },
];

const pendingPayments = [
  { id: 'p1', user: 'Chipo M.',    plan: 'Premium', amount: 'USD 15', method: 'EcoCash',      submitted: '1 hr ago' },
  { id: 'p2', user: 'TechZim Ltd', plan: 'Pro',     amount: 'USD 35', method: 'Bank Transfer', submitted: '3 hrs ago' },
  { id: 'p3', user: 'Blessing T.', plan: 'Premium', amount: 'USD 15', method: 'InnBucks',     submitted: '6 hrs ago' },
];

const recentActivity = [
  { text: 'Harare Grand Events profile updated',     time: '10 min ago', type: 'approve' as const },
  { text: 'SoundWave DJ joined the platform',        time: '1 hr ago',   type: 'new' as const },
  { text: 'Petal & Bloom verified',                  time: '2 hrs ago',  type: 'approve' as const },
  { text: 'New event created: Wedding - 350 guests', time: '3 hrs ago',  type: 'upgrade' as const },
  { text: 'New vendor: Glamour Studio applied',      time: '5 hrs ago',  type: 'new' as const },
];

const activityIcon = { approve: CheckCircle, payment: CreditCard, new: Store, upgrade: TrendingUp, reject: XCircle };
const activityColor = { approve: '#1CB6BB', payment: '#8B920A', new: '#024F5B', upgrade: '#E9409B', reject: '#ef4444' };

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(data => {
        if (data.error === 'service_role_key_missing') {
          setUsingDemo(true);
        } else {
          setStats(data);
        }
      })
      .catch(() => setUsingDemo(true))
      .finally(() => setLoading(false));
  }, []);

  const displayStats = [
    { label: 'Total Users',           value: stats ? stats.totalUsers.toLocaleString() : '—',   delta: 'Registered accounts',      up: true,  color: '#024F5B', icon: Users },
    { label: 'Active Vendors',        value: stats ? stats.totalVendors.toLocaleString() : '—', delta: 'Vendor profiles',           up: true,  color: '#1CB6BB', icon: Store },
    { label: 'Pending Verifications', value: stats ? stats.pendingVendors.toLocaleString() : '—', delta: 'Unverified vendors',      up: false, color: '#E9409B', icon: AlertCircle },
    { label: 'Total Events',          value: stats ? stats.totalEvents.toLocaleString() : '—',  delta: 'All-time events',           up: true,  color: '#8B920A', icon: Calendar },
  ];

  const pendingVendorList = stats?.recentVendors ?? DEMO_VENDORS;

  return (
    <AdminLayout>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Admin Overview
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {usingDemo ? 'Demo data — add SUPABASE_SERVICE_ROLE_KEY to .env.local for live stats.' : "Live data from Supabase."}
          </p>
        </div>
        {loading && <Loader2 size={18} className="animate-spin mt-1 flex-shrink-0" style={{ color: 'var(--teal)' }} />}
      </div>

      {usingDemo && (
        <div className="mb-6 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
          style={{ background: '#E9409B10', border: '1px solid #E9409B30', color: '#E9409B' }}>
          <AlertCircle size={15} />
          Live data unavailable — add your <code className="font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code> to <code className="font-mono text-xs">.env.local</code>.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {displayStats.map(({ label, value, delta, up, color, icon: Icon }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-semibold"
                style={{ color: up ? '#1CB6BB' : '#E9409B' }}>
                {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              </span>
            </div>
            <div className="font-poppins font-bold text-2xl mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              {loading ? <Loader2 size={20} className="animate-spin" style={{ color: 'var(--border)' }} /> : value}
            </div>
            <div className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{label}</div>
            <div className="text-xs" style={{ color }}>{delta}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending vendors */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Pending Vendor Approvals
              {stats && <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: '#E9409B15', color: '#E9409B' }}>{stats.pendingVendors}</span>}
            </h2>
            <Link href="/admin/vendors" className="text-xs flex items-center gap-0.5" style={{ color: 'var(--teal)' }}>
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {pendingVendorList.map(v => (
              <div key={v.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{v.business_name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{v.category} · {v.city}</p>
                </div>
                <Link href="/admin/vendors" className="btn-glow text-xs py-1.5 px-3">Review</Link>
              </div>
            ))}
            {pendingVendorList.length === 0 && (
              <p className="text-sm text-center py-4" style={{ color: 'var(--text-secondary)' }}>No pending approvals</p>
            )}
          </div>

          {/* Pending payments */}
          <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Pending Payments
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: '#E9409B15', color: '#E9409B' }}>3</span>
              </h2>
              <Link href="/admin/payments" className="text-xs flex items-center gap-0.5" style={{ color: 'var(--teal)' }}>
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {pendingPayments.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{p.user}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{p.plan} · {p.method} · {p.submitted}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-poppins font-bold text-sm" style={{ color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>{p.amount}</span>
                    <Link href="/admin/payments" className="btn-glow text-xs py-1.5 px-3">Verify</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent signups + activity */}
        <div className="card p-5">
          <h2 className="font-poppins font-semibold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            {stats?.recentProfiles?.length ? 'Recent Sign-Ups' : 'Recent Activity'}
          </h2>
          <div className="flex flex-col gap-4">
            {stats?.recentProfiles?.length ? (
              stats.recentProfiles.map(p => (
                <div key={p.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                    style={{ background: p.role === 'vendor' ? '#E9409B' : '#024F5B' }}>
                    {(p.full_name ?? p.role)[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{p.full_name ?? 'Anonymous'}</p>
                    <p className="text-xs flex items-center gap-1 mt-0.5 capitalize" style={{ color: 'var(--text-secondary)' }}>
                      <Clock size={9} /> {p.role} · {new Date(p.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              recentActivity.map((a, i) => {
                const Icon = activityIcon[a.type];
                const color = activityColor[a.type];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${color}15` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{a.text}</p>
                      <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                        <Clock size={9} /> {a.time}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
