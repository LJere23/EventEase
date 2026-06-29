'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CheckCircle, XCircle, Eye, MapPin, Star, Search, Filter, X } from 'lucide-react';

type Status = 'pending' | 'verified' | 'rejected';

interface Vendor {
  id: string; name: string; owner: string; category: string; city: string;
  email: string; phone: string; description: string; applied: string;
  status: Status; rating: number; reviews: number; logo: string;
}

const initialVendors: Vendor[] = [
  { id: 'v1', name: 'Sunshine Caterers',     owner: 'Chipo Moyo',      category: 'Catering',     city: 'Bulawayo', email: 'chipo@sunshine.co.zw',   phone: '+263 77 111 2233', description: 'Full-service catering for all events. 8 years experience in Bulawayo.', applied: '2 hrs ago',   status: 'pending',  rating: 0, reviews: 0, logo: '🍽️' },
  { id: 'v2', name: 'Pixel Perfect Studios', owner: 'Tinashe Dube',     category: 'Photography',  city: 'Harare',   email: 'tin@pixel.co.zw',        phone: '+263 71 222 3344', description: 'Wedding and event photography. 5 years professional experience.', applied: '5 hrs ago',   status: 'pending',  rating: 0, reviews: 0, logo: '📸' },
  { id: 'v3', name: 'GlowUp Events Décor',   owner: 'Rumbi Chikomba',  category: 'Décor',        city: 'Harare',   email: 'rumbi@glowup.co.zw',     phone: '+263 73 333 4455', description: 'Floral arrangements and full event decoration. Weddings our specialty.', applied: '1 day ago',   status: 'pending',  rating: 0, reviews: 0, logo: '💐' },
  { id: 'v4', name: 'Royal Sound Systems',   owner: 'Blessing Ncube',  category: 'DJ & Audio',   city: 'Mutare',   email: 'blessing@royal.co.zw',   phone: '+263 77 444 5566', description: 'Professional DJ and sound hire for all events. Full PA system available.', applied: '2 days ago',  status: 'pending',  rating: 0, reviews: 0, logo: '🎧' },
  { id: 'v5', name: 'Harare Grand Events',   owner: 'Farai Nkomo',     category: 'Venue',        city: 'Harare',   email: 'farai@haralegrand.co.zw', phone: '+263 77 555 6677', description: 'Premium venue for weddings and corporate events. Capacity 500+.', applied: '1 week ago',  status: 'verified', rating: 4.9, reviews: 48, logo: '🏛️' },
  { id: 'v6', name: 'Royal Cuisine',         owner: 'Tafadzwa Phiri',  category: 'Catering',     city: 'Harare',   email: 'taf@royalcuisine.co.zw', phone: '+263 71 666 7788', description: 'African and continental cuisine. 10 years in corporate catering.', applied: '2 weeks ago', status: 'verified', rating: 4.8, reviews: 62, logo: '🍽️' },
  { id: 'v7', name: 'FastCatering ZW',       owner: 'Anonymous',       category: 'Catering',     city: 'Harare',   email: 'info@fast.co.zw',        phone: '+263 77 000 0000', description: 'Fast cheap food for events.', applied: '3 days ago',  status: 'rejected', rating: 0, reviews: 0, logo: '🍔' },
];

const statusColor: Record<Status, string> = { pending: '#8B920A', verified: '#1CB6BB', rejected: '#E9409B' };
const statusBg:    Record<Status, string> = { pending: '#8B920A15', verified: '#1CB6BB15', rejected: '#E9409B15' };

type Tab = 'all' | Status;

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Vendor | null>(null);
  const [rejectionNote, setRejectionNote] = useState('');

  const filtered = vendors.filter(v => {
    const matchTab = tab === 'all' || v.status === tab;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
                        v.category.toLowerCase().includes(search.toLowerCase()) ||
                        v.city.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const approve = (id: string) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'verified' as Status } : v));
    setSelected(null);
  };
  const reject = (id: string) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'rejected' as Status } : v));
    setSelected(null);
    setRejectionNote('');
  };

  const counts = { all: vendors.length, pending: vendors.filter(v => v.status === 'pending').length, verified: vendors.filter(v => v.status === 'verified').length, rejected: vendors.filter(v => v.status === 'rejected').length };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Vendor Management</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Review applications, approve listings, and manage the vendor directory.</p>
          </div>
        </div>

        {/* Tabs + search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
            {(['all', 'pending', 'verified', 'rejected'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
                style={{
                  background: tab === t ? 'var(--bg-card)' : 'transparent',
                  color: tab === t ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                }}>
                {t} <span className="ml-1 text-xs opacity-60">({counts[t]})</span>
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
            <input className="input-field text-sm" style={{ paddingLeft: '36px' }}
              placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                  {['Vendor', 'Category', 'City', 'Applied', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: 'var(--text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => (
                  <tr key={v.id} className="border-b transition-colors hover:bg-[var(--bg-secondary)]"
                    style={{ borderColor: 'var(--border)' }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{v.logo}</span>
                        <div>
                          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{v.name}</p>
                          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{v.owner}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{v.category}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <MapPin size={10} /> {v.city}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{v.applied}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-full font-semibold capitalize"
                        style={{ background: statusBg[v.status], color: statusColor[v.status] }}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelected(v)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          style={{ background: 'var(--primary-light)', color: 'var(--teal-deep)' }}>
                          <Eye size={13} />
                        </button>
                        {v.status === 'pending' && (
                          <>
                            <button onClick={() => approve(v.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{ background: '#1CB6BB15', color: '#1CB6BB' }}>
                              <CheckCircle size={13} />
                            </button>
                            <button onClick={() => { setSelected(v); }}
                              className="w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{ background: '#E9409B15', color: '#E9409B' }}>
                              <XCircle size={13} />
                            </button>
                          </>
                        )}
                        {v.status === 'verified' && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: '#1CB6BB' }}>
                            <Star size={10} fill="#1CB6BB" /> {v.rating} ({v.reviews})
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center" style={{ color: 'var(--text-secondary)' }}>No vendors found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="card w-full max-w-lg p-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selected.logo}</span>
                <div>
                  <h2 className="font-poppins font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    {selected.name}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full capitalize font-semibold"
                    style={{ background: statusBg[selected.status], color: statusColor[selected.status] }}>
                    {selected.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: 'var(--text-secondary)' }}><X size={18} /></button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              {[
                ['Owner', selected.owner], ['Category', selected.category],
                ['City', selected.city], ['Applied', selected.applied],
                ['Email', selected.email], ['Phone', selected.phone],
              ].map(([k, val]) => (
                <div key={k}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-secondary)' }}>{k}</p>
                  <p style={{ color: 'var(--text-primary)' }}>{val}</p>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Business Description</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{selected.description}</p>
            </div>

            {selected.status === 'pending' && (
              <>
                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Rejection note (optional)
                  </label>
                  <textarea className="input-field resize-none h-20 text-sm"
                    placeholder="Reason for rejection (shown to vendor)..."
                    value={rejectionNote} onChange={e => setRejectionNote(e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => approve(selected.id)}
                    className="btn-glow btn-ripple flex-1 justify-center">
                    <CheckCircle size={14} /> Approve Vendor
                  </button>
                  <button onClick={() => reject(selected.id)}
                    className="flex-1 justify-center flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                    style={{ background: '#E9409B15', color: '#E9409B', border: '1px solid #E9409B30' }}>
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
