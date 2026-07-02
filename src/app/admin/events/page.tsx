'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Calendar, Users, MapPin, Search, Eye, X, Loader2, AlertCircle } from 'lucide-react';

type EventStatus = 'planning' | 'confirmed' | 'completed' | 'cancelled';

interface PlatformEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  guests: number;
  city: string | null;
  status: EventStatus;
  budget: number | null;
  created_at: string;
  user_id: string;
}

const statusColor: Record<EventStatus, string> = {
  planning: '#8B920A', confirmed: '#1CB6BB', completed: '#024F5B', cancelled: '#E9409B',
};
const typeEmoji: Record<string, string> = {
  Wedding: '💍', Corporate: '🏢', Graduation: '🎓', Festival: '🎉',
  'Baby Shower': '🎀', Church: '⛪', Birthday: '🎂', Other: '🌟',
};

const DEMO_EVENTS: PlatformEvent[] = [
  { id: 'e1', title: 'Chipo & Takudzwa Wedding',  type: 'Wedding',   date: '2026-07-15', guests: 350, city: 'Harare',   status: 'planning',   budget: 5000,  created_at: '2026-06-01', user_id: '' },
  { id: 'e2', title: 'TechZim Annual Awards 2026', type: 'Corporate', date: '2026-08-22', guests: 250, city: 'Harare',   status: 'confirmed',  budget: 8500,  created_at: '2026-05-20', user_id: '' },
  { id: 'e3', title: 'Graduation Party – UZ 2026', type: 'Graduation',date: '2026-05-03', guests: 80,  city: 'Harare',   status: 'completed',  budget: 1200,  created_at: '2026-04-01', user_id: '' },
  { id: 'e4', title: 'Harare Food Festival',       type: 'Festival',  date: '2026-09-10', guests: 1000,city: 'Harare',   status: 'planning',   budget: 25000, created_at: '2026-06-10', user_id: '' },
  { id: 'e5', title: 'Baby Shower – Ruvimbo C.',   type: 'Baby Shower',date: '2026-07-28',guests: 45,  city: 'Harare',   status: 'planning',   budget: 400,   created_at: '2026-06-25', user_id: '' },
];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<PlatformEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<EventStatus | 'all'>('all');
  const [selected, setSelected] = useState<PlatformEvent | null>(null);

  useEffect(() => {
    fetch('/api/admin/events')
      .then(r => r.json())
      .then(data => {
        if (data.error) { setUsingDemo(true); setEvents(DEMO_EVENTS); }
        else setEvents(data.events);
      })
      .catch(() => { setUsingDemo(true); setEvents(DEMO_EVENTS); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: events.length,
    planning: events.filter(e => e.status === 'planning').length,
    confirmed: events.filter(e => e.status === 'confirmed').length,
    completed: events.filter(e => e.status === 'completed').length,
    cancelled: events.filter(e => e.status === 'cancelled').length,
  };
  const totalGuests = events.reduce((a, e) => a + (e.guests ?? 0), 0);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>All Events</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {usingDemo ? 'Demo data — add SUPABASE_SERVICE_ROLE_KEY for live event records.' : 'Live data from Supabase.'}
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Events',  value: counts.all,                     color: '#024F5B', icon: Calendar },
            { label: 'Planning',      value: counts.planning,                 color: '#8B920A', icon: Calendar },
            { label: 'Confirmed',     value: counts.confirmed,                color: '#1CB6BB', icon: Calendar },
            { label: 'Total Guests',  value: totalGuests.toLocaleString(),    color: '#E9409B', icon: Users },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={14} style={{ color }} />
                </div>
              </div>
              <div className="font-poppins font-bold text-xl mb-0.5" style={{ color, fontFamily: "'Poppins', sans-serif" }}>
                {loading ? '—' : value}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
            <input className="input-field text-sm" style={{ paddingLeft: '36px' }}
              placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
            {(['all', 'planning', 'confirmed', 'completed'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={{ background: statusFilter === s ? 'var(--bg-card)' : 'transparent', color: statusFilter === s ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {s} ({counts[s]})
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
                  {['Event', 'Type', 'Date', 'Guests', 'City', 'Budget', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(ev => (
                  <tr key={ev.id} className="border-b hover:bg-[var(--bg-secondary)] transition-colors" style={{ borderColor: 'var(--border)' }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span>{typeEmoji[ev.type] ?? '🎉'}</span>
                        <p className="font-semibold truncate max-w-[160px]" style={{ color: 'var(--text-primary)' }}>{ev.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{ev.type}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <Calendar size={10} /> {new Date(ev.date).toLocaleDateString('en-ZW', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                      <span className="flex items-center gap-1"><Users size={10} style={{ color: 'var(--teal)' }} /> {ev.guests}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <MapPin size={10} /> {ev.city ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold" style={{ color: 'var(--teal-deep)' }}>
                      {ev.budget ? `USD ${ev.budget.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                        style={{ background: `${statusColor[ev.status]}15`, color: statusColor[ev.status] }}>
                        {ev.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(ev)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: 'var(--primary-light)', color: 'var(--teal-deep)' }}>
                        <Eye size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && !loading && (
                  <tr><td colSpan={8} className="py-12 text-center" style={{ color: 'var(--text-secondary)' }}>No events found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="card w-full max-w-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{typeEmoji[selected.type] ?? '🎉'}</span>
                  <h2 className="font-poppins font-bold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{selected.title}</h2>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                  style={{ background: `${statusColor[selected.status]}15`, color: statusColor[selected.status] }}>
                  {selected.status}
                </span>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: 'var(--text-secondary)' }}><X size={18} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Type', selected.type],
                ['Date', new Date(selected.date).toLocaleDateString()],
                ['City', selected.city ?? '—'],
                ['Guests', selected.guests.toString()],
                ['Budget', selected.budget ? `USD ${selected.budget.toLocaleString()}` : '—'],
                ['Created', new Date(selected.created_at).toLocaleDateString()],
              ].map(([k, val]) => (
                <div key={k}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-secondary)' }}>{k}</p>
                  <p style={{ color: 'var(--text-primary)' }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
