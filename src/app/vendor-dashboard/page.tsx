'use client';
import { VendorDashboardLayout } from '@/components/layout/VendorDashboardLayout';
import { Eye, MessageCircle, Calendar, Star, ChevronRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Profile Views', value: '128', delta: '+12% this week', color: '#024F5B', icon: Eye },
  { label: 'Quote Requests', value: '14', delta: '3 new today', color: '#E9409B', icon: MessageCircle },
  { label: 'Bookings', value: '6', delta: 'This month', color: '#1CB6BB', icon: Calendar },
  { label: 'Avg. Rating', value: '4.9', delta: '31 reviews', color: '#8B920A', icon: Star },
];

const recentQuotes = [
  { id: 'q1', name: 'Chipo M.', event: 'Wedding – 350 guests', date: 'Jul 15', status: 'new' },
  { id: 'q2', name: 'TechZim Ltd', event: 'Corporate Dinner – 120 guests', date: 'Aug 3', status: 'replied' },
  { id: 'q3', name: 'Ruvimbo C.', event: 'Baby Shower – 45 guests', date: 'Jul 28', status: 'booked' },
];

const statusStyle: Record<string, { label: string; color: string }> = {
  new: { label: 'New', color: '#E9409B' },
  replied: { label: 'Replied', color: '#1CB6BB' },
  booked: { label: 'Booked', color: '#024F5B' },
};

export default function VendorDashboardPage() {
  return (
    <VendorDashboardLayout>
      <div className="mb-6">
        <h1 className="font-poppins font-bold text-2xl mb-1"
          style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
          Welcome back
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Your profile is live and receiving enquiries.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, delta, color, icon: Icon }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <TrendingUp size={12} style={{ color }} />
            </div>
            <div className="font-poppins font-bold text-2xl mb-0.5"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              {value}
            </div>
            <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>{label}</div>
            <div className="text-xs" style={{ color }}>{delta}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent quote requests */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins font-semibold"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Recent Quote Requests
            </h2>
            <Link href="/vendor-dashboard/quotes" className="text-xs flex items-center gap-0.5"
              style={{ color: 'var(--teal)' }}>
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="flex flex-col divide-y" style={{ borderColor: 'var(--border)' }}>
            {recentQuotes.map(q => {
              const s = statusStyle[q.status];
              return (
                <Link key={q.id} href="/vendor-dashboard/quotes"
                  className="flex items-center justify-between py-3 hover:bg-[var(--bg-secondary)] -mx-2 px-2 rounded-lg transition-colors">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{q.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{q.event} · {q.date}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: `${s.color}15`, color: s.color }}>
                    {s.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="card p-5">
          <h2 className="font-poppins font-semibold mb-4"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Update my services & pricing', color: '#024F5B', href: '/vendor-dashboard/services' },
              { label: 'View & respond to quotes', color: '#E9409B', href: '/vendor-dashboard/quotes' },
              { label: 'Check my analytics', color: '#1CB6BB', href: '/vendor-dashboard/analytics' },
              { label: 'Edit my public profile', color: '#741353', href: '/vendor-dashboard/settings' },
            ].map(a => (
              <Link key={a.label} href={a.href}
                className="flex items-center justify-between p-3 rounded-xl transition-all"
                style={{ background: `${a.color}08`, border: `1px solid ${a.color}20` }}>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{a.label}</span>
                <ChevronRight size={14} style={{ color: a.color }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
