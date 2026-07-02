'use client';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { TrendingUp, Users, Store, Calendar, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const userGrowth = [
  { month: 'Jan', users: 120 }, { month: 'Feb', users: 285 }, { month: 'Mar', users: 440 },
  { month: 'Apr', users: 620 }, { month: 'May', users: 890 }, { month: 'Jun', users: 1284 },
];

const revenue = [
  { month: 'Jan', amount: 0 }, { month: 'Feb', amount: 450 }, { month: 'Mar', amount: 960 },
  { month: 'Apr', amount: 1680 }, { month: 'May', amount: 2340 }, { month: 'Jun', amount: 3185 },
];

const eventTypes = [
  { name: 'Wedding', value: 38, color: '#024F5B' },
  { name: 'Corporate', value: 24, color: '#1CB6BB' },
  { name: 'Birthday', value: 17, color: '#E9409B' },
  { name: 'Graduation', value: 12, color: '#8B920A' },
  { name: 'Other', value: 9,  color: '#741353' },
];

const vendorCategories = [
  { name: 'Catering',     count: 18 },
  { name: 'Photography',  count: 14 },
  { name: 'Décor',        count: 11 },
  { name: 'DJ & Audio',   count: 9  },
  { name: 'Venue',        count: 7  },
  { name: 'Transport',    count: 4  },
];

const kpis = [
  { label: 'Monthly Revenue',   value: 'USD 3,185', delta: '+36% vs May', up: true,  color: '#024F5B', icon: DollarSign },
  { label: 'New Users (Jun)',    value: '394',        delta: '+28% vs May', up: true,  color: '#1CB6BB', icon: Users },
  { label: 'Events Created',    value: '89',         delta: '+22% vs May', up: true,  color: '#8B920A', icon: Calendar },
  { label: 'Active Vendors',    value: '63',         delta: '+5 this month', up: true, color: '#E9409B', icon: Store },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 shadow-lg text-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
      <p className="font-semibold mb-1">{label}</p>
      <p style={{ color: 'var(--teal)' }}>{payload[0].name}: {payload[0].value}</p>
    </div>
  );
};

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Platform Analytics</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Platform growth, revenue, and engagement metrics since launch.</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map(({ label, value, delta, up, color, icon: Icon }) => (
            <div key={label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: up ? '#1CB6BB' : '#E9409B' }}>
                  <TrendingUp size={11} className="inline mr-0.5" />{delta}
                </span>
              </div>
              <div className="font-poppins font-bold text-xl mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{value}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* User growth */}
          <div className="card p-5">
            <h2 className="font-poppins font-semibold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              User Growth (Cumulative)
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={userGrowth} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="users" name="Users" stroke="#024F5B" strokeWidth={2.5} dot={{ fill: '#024F5B', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue */}
          <div className="card p-5">
            <h2 className="font-poppins font-semibold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Revenue (USD) — Cumulative
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenue} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" name="USD" fill="#1CB6BB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Event types pie */}
          <div className="card p-5">
            <h2 className="font-poppins font-semibold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Event Types Breakdown
            </h2>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={eventTypes} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                    {eventTypes.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2">
                {eventTypes.map(e => (
                  <div key={e.name} className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: e.color }} />
                    <span style={{ color: 'var(--text-primary)' }}>{e.name}</span>
                    <span className="ml-auto font-semibold" style={{ color: 'var(--text-secondary)' }}>{e.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vendor categories bar */}
          <div className="card p-5">
            <h2 className="font-poppins font-semibold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Vendors by Category
            </h2>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={vendorCategories} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Vendors" fill="#E9409B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
