'use client';
import { VendorDashboardLayout } from '@/components/layout/VendorDashboardLayout';
import { Eye, MessageCircle, Calendar, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const viewData = [
  { month: 'Jan', views: 42 }, { month: 'Feb', views: 58 }, { month: 'Mar', views: 71 },
  { month: 'Apr', views: 95 }, { month: 'May', views: 88 }, { month: 'Jun', views: 128 },
];
const quoteData = [
  { month: 'Jan', quotes: 2 }, { month: 'Feb', quotes: 3 }, { month: 'Mar', quotes: 5 },
  { month: 'Apr', quotes: 8 }, { month: 'May', quotes: 6 }, { month: 'Jun', quotes: 14 },
];

const stats = [
  { label: 'Profile Views', value: '128', change: '+35%', up: true, icon: Eye, color: '#024F5B' },
  { label: 'Quote Requests', value: '14', change: '+133%', up: true, icon: MessageCircle, color: '#E9409B' },
  { label: 'Bookings', value: '6', change: '+20%', up: true, icon: Calendar, color: '#1CB6BB' },
  { label: 'Avg. Rating', value: '4.9', change: '+0.1', up: true, icon: Star, color: '#8B920A' },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-3 py-2 text-sm shadow-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
        <p className="font-semibold">{label}</p>
        <p>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function VendorAnalyticsPage() {
  return (
    <VendorDashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Analytics</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track your profile performance and enquiry trends.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, change, up, icon: Icon, color }) => (
            <div key={label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-semibold"
                  style={{ color: up ? '#1CB6BB' : '#E9409B' }}>
                  {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {change}
                </span>
              </div>
              <div className="font-poppins font-bold text-2xl mb-0.5"
                style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{value}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-5">
            <h3 className="font-poppins font-semibold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Profile Views (6 months)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={viewData}>
                <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="views" fill="#024F5B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-5">
            <h3 className="font-poppins font-semibold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Quote Requests (6 months)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={quoteData}>
                <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="quotes" stroke="#E9409B" strokeWidth={2.5} dot={{ fill: '#E9409B', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
