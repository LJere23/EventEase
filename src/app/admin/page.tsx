'use client';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Users, Store, CreditCard, Calendar, TrendingUp, TrendingDown, ChevronRight, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Total Users',          value: '1,284', delta: '+48 this week',  up: true,  color: '#024F5B', icon: Users },
  { label: 'Active Vendors',       value: '63',    delta: '+5 this month',  up: true,  color: '#1CB6BB', icon: Store },
  { label: 'Pending Verifications',value: '11',    delta: '4 vendors · 7 payments', up: false, color: '#E9409B', icon: AlertCircle },
  { label: 'Events This Month',    value: '89',    delta: '+22% vs last month', up: true, color: '#8B920A', icon: Calendar },
];

const pendingVendors = [
  { id: 'v1', name: 'Sunshine Caterers',    category: 'Catering',    city: 'Bulawayo',  applied: '2 hrs ago',  risk: 'low' },
  { id: 'v2', name: 'Pixel Perfect Studios',category: 'Photography', city: 'Harare',    applied: '5 hrs ago',  risk: 'low' },
  { id: 'v3', name: 'GlowUp Events Décor',  category: 'Décor',       city: 'Harare',    applied: '1 day ago',  risk: 'medium' },
  { id: 'v4', name: 'Royal Sound Systems',  category: 'DJ & Audio',  city: 'Mutare',    applied: '2 days ago', risk: 'low' },
];

const pendingPayments = [
  { id: 'p1', user: 'Chipo M.',    plan: 'Premium', amount: 'USD 15', method: 'EcoCash',     submitted: '1 hr ago' },
  { id: 'p2', user: 'TechZim Ltd', plan: 'Pro',     amount: 'USD 35', method: 'Bank Transfer', submitted: '3 hrs ago' },
  { id: 'p3', user: 'Blessing T.', plan: 'Premium', amount: 'USD 15', method: 'InnBucks',    submitted: '6 hrs ago' },
];

const recentActivity = [
  { text: 'Harare Catering Co. approved',     time: '10 min ago', type: 'approve' },
  { text: 'Payment from Farai N. verified',   time: '28 min ago', type: 'payment' },
  { text: 'New vendor: Bloom & Co. applied',  time: '1 hr ago',   type: 'new' },
  { text: 'User Tendai M. upgraded to Premium', time: '2 hrs ago', type: 'upgrade' },
  { text: 'Vendor "FastCatering" rejected',   time: '3 hrs ago',  type: 'reject' },
];

const activityIcon = { approve: CheckCircle, payment: CreditCard, new: Store, upgrade: TrendingUp, reject: XCircle };
const activityColor = { approve: '#1CB6BB', payment: '#8B920A', new: '#024F5B', upgrade: '#E9409B', reject: '#ef4444' };

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
          Admin Overview
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome back. Here's what needs your attention today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, delta, up, color, icon: Icon }) => (
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
            <div className="font-poppins font-bold text-2xl mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{value}</div>
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
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: '#E9409B15', color: '#E9409B' }}>4</span>
            </h2>
            <Link href="/admin/vendors" className="text-xs flex items-center gap-0.5" style={{ color: 'var(--teal)' }}>
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {pendingVendors.map(v => (
              <div key={v.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{v.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{v.category} · {v.city} · {v.applied}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: v.risk === 'medium' ? '#8B920A15' : '#1CB6BB15', color: v.risk === 'medium' ? '#8B920A' : '#1CB6BB' }}>
                    {v.risk} risk
                  </span>
                  <Link href="/admin/vendors" className="btn-glow text-xs py-1.5 px-3">Review</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pending payments */}
          <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Pending Payments
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: '#E9409B15', color: '#E9409B' }}>7</span>
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

        {/* Recent activity */}
        <div className="card p-5">
          <h2 className="font-poppins font-semibold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Recent Activity
          </h2>
          <div className="flex flex-col gap-4">
            {recentActivity.map((a, i) => {
              const Icon = activityIcon[a.type as keyof typeof activityIcon];
              const color = activityColor[a.type as keyof typeof activityColor];
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
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
