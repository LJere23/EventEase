'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Calendar, Users, MapPin, Search, Eye, Trash2, X } from 'lucide-react';

type EventStatus = 'planning' | 'confirmed' | 'completed' | 'cancelled';

interface PlatformEvent {
  id: string; title: string; type: string; organiser: string; email: string;
  date: string; guests: number; city: string; status: EventStatus;
  vendors: number; budget: string; created: string;
}

const allEvents: PlatformEvent[] = [
  { id: 'e1',  title: 'Chipo & Takudzwa Wedding',    type: 'Wedding',    organiser: 'Chipo M.',     email: 'chipo@email.com',    date: 'Jul 15, 2026', guests: 350, city: 'Harare',   status: 'planning',   vendors: 4,  budget: 'USD 5,000', created: '2 wks ago' },
  { id: 'e2',  title: 'TechZim Annual Awards 2026',  type: 'Corporate',  organiser: 'TechZim Ltd',  email: 'admin@techzim.co.zw', date: 'Aug 22, 2026', guests: 250, city: 'Harare',   status: 'confirmed',  vendors: 6,  budget: 'USD 8,500', created: '1 mo ago' },
  { id: 'e3',  title: 'Graduation Party – UZ 2026',  type: 'Graduation', organiser: 'Tafadzwa N.', email: 'taf@email.com',       date: 'May 3, 2026',  guests: 80,  city: 'Harare',   status: 'completed',  vendors: 3,  budget: 'USD 1,200', created: '2 mo ago' },
  { id: 'e4',  title: 'Harare Food Festival',        type: 'Festival',   organiser: 'Admin',       email: 'admin@ee.co.zw',      date: 'Sep 10, 2026', guests: 1000, city: 'Harare',  status: 'planning',   vendors: 12, budget: 'USD 25,000', created: '3 wks ago' },
  { id: 'e5',  title: 'Baby Shower – Ruvimbo C.',    type: 'Baby Shower',organiser: 'Ruvimbo C.',  email: 'ruvimbo@email.com',   date: 'Jul 28, 2026', guests: 45,  city: 'Harare',   status: 'planning',   vendors: 2,  budget: 'USD 400', created: '1 wk ago' },
  { id: 'e6',  title: 'Church Anniversary – 5yrs',  type: 'Church',     organiser: 'Pastor Dube', email: 'bdube@church.co.zw',  date: 'Aug 10, 2026', guests: 500, city: 'Bulawayo', status: 'confirmed',  vendors: 5,  budget: 'USD 3,000', created: '1 mo ago' },
  { id: 'e7',  title: 'Year-End Corporate Dinner',  type: 'Corporate',  organiser: 'TechZim Ltd', email: 'admin@techzim.co.zw', date: 'Dec 5, 2026',  guests: 120, city: 'Harare',   status: 'planning',   vendors: 3,  budget: 'USD 4,500', created: '3 days ago' },
  { id: 'e8',  title: 'Shamiso Sweet 16',           type: 'Birthday',   organiser: 'Shamiso M.', email: 'shams@email.com',      date: 'Aug 30, 2026', guests: 60,  city: 'Bulawayo', status: 'planning',   vendors: 2,  budget: 'USD 800', created: '5 days ago' },
];

const statusColor: Record<EventStatus, string> = { planning: '#8B920A', confirmed: '#1CB6BB', completed: '#024F5B', cancelled: '#E9409B' };
const typeEmoji: Record<string, string> = { Wedding: '💍', Corporate: '🏢', Graduation: '🎓', Festival: '🎉', 'Baby Shower': '🎀', Church: '⛪', Birthday: '🎂', Other: '🌟' };

export default function AdminEventsPage() {
  const [events] = useState<PlatformEvent[]>(allEvents);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<EventStatus | 'all'>('all');
  const [selected, setSelected] = useState<PlatformEvent | null>(null);

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.organiser.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = { all: events.length, planning: events.filter(e => e.status === 'planning').length, confirmed: events.filter(e => e.status === 'confirmed').length, completed: events.filter(e => e.status === 'completed').length, cancelled: 0 };
  const totalGuests = events.reduce((a, e) => a + e.guests, 0);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>All Events</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Every event created on the platform. Monitor activity and moderate when needed.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Events', value: counts.all, color: '#024F5B', icon: Calendar },
            { label: 'Planning', value: counts.planning, color: '#8B920A', icon: Calendar },
            { label: 'Confirmed', value: counts.confirmed, color: '#1CB6BB', icon: Calendar },
            { label: 'Total Guests', value: totalGuests.toLocaleString(), color: '#E9409B', icon: Users },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={14} style={{ color }} />
                </div>
              </div>
              <div className="font-poppins font-bold text-xl mb-0.5" style={{ color, fontFamily: "'Poppins', sans-serif" }}>{value}</div>
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
                  {['Event', 'Type', 'Organiser', 'Date', 'Guests', 'Vendors', 'Budget', 'Status', ''].map(h => (
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
                      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{ev.organiser}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <Calendar size={10} /> {ev.date}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                      <span className="flex items-center gap-1"><Users size={10} style={{ color: 'var(--teal)' }} /> {ev.guests}</span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{ev.vendors}</td>
                    <td className="px-4 py-3 text-xs font-semibold" style={{ color: 'var(--teal-deep)' }}>{ev.budget}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                        style={{ background: `${statusColor[ev.status]}15`, color: statusColor[ev.status] }}>
                        {ev.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setSelected(ev)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: 'var(--primary-light)', color: 'var(--teal-deep)' }}>
                          <Eye size={12} />
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                          style={{ color: '#ef4444' }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                ['Organiser', selected.organiser], ['Email', selected.email],
                ['Date', selected.date], ['City', selected.city],
                ['Guests', selected.guests.toString()], ['Vendors', selected.vendors.toString()],
                ['Budget', selected.budget], ['Created', selected.created],
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
