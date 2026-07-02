'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CheckCircle, XCircle, Eye, MapPin, Star, Search, X, Loader2, AlertCircle, Store } from 'lucide-react';

interface Vendor {
  id: string;
  business_name: string;
  category: string;
  city: string;
  email: string | null;
  whatsapp: string | null;
  description: string | null;
  verified: boolean;
  rating: number;
  review_count: number;
  created_at: string;
}

type Tab = 'all' | 'pending' | 'verified';

const statusColor = { pending: '#8B920A', verified: '#1CB6BB', rejected: '#E9409B' };
const statusBg    = { pending: '#8B920A15', verified: '#1CB6BB15', rejected: '#E9409B15' };

const DEMO_VENDORS: Vendor[] = [
  { id: 'v1', business_name: 'Sunshine Caterers',     category: 'Catering',    city: 'Bulawayo', email: 'chipo@sunshine.co.zw',    whatsapp: '+263 77 111 2233', description: 'Full-service catering for all events.', verified: false, rating: 0, review_count: 0, created_at: '2026-06-28' },
  { id: 'v2', business_name: 'Pixel Perfect Studios', category: 'Photography', city: 'Harare',   email: 'tin@pixel.co.zw',          whatsapp: '+263 71 222 3344', description: 'Wedding and event photography.', verified: false, rating: 0, review_count: 0, created_at: '2026-06-25' },
  { id: 'v5', business_name: 'Harare Grand Events',   category: 'Venue',       city: 'Harare',   email: 'farai@harare.co.zw',       whatsapp: '+263 77 555 6677', description: 'Premium venue for 500+ guests.', verified: true,  rating: 4.9, review_count: 48, created_at: '2026-05-01' },
  { id: 'v6', business_name: 'Royal Cuisine',         category: 'Catering',    city: 'Harare',   email: 'taf@royalcuisine.co.zw',   whatsapp: '+263 71 666 7788', description: 'African and continental cuisine.', verified: true,  rating: 4.8, review_count: 62, created_at: '2026-04-15' },
];

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Vendor | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/vendors')
      .then(r => r.json())
      .then(data => {
        if (data.error) { setUsingDemo(true); setVendors(DEMO_VENDORS); }
        else setVendors(data.vendors);
      })
      .catch(() => { setUsingDemo(true); setVendors(DEMO_VENDORS); })
      .finally(() => setLoading(false));
  }, []);

  const setVerified = async (id: string, verified: boolean) => {
    setSaving(true);
    if (!usingDemo) {
      await fetch('/api/admin/vendors', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, verified }) });
    }
    setVendors(prev => prev.map(v => v.id === id ? { ...v, verified } : v));
    setSelected(null);
    setSaving(false);
  };

  const filtered = vendors.filter(v => {
    const matchTab = tab === 'all' || (tab === 'pending' ? !v.verified : v.verified);
    const matchSearch = v.business_name.toLowerCase().includes(search.toLowerCase()) ||
                        v.category.toLowerCase().includes(search.toLowerCase()) ||
                        v.city.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    all: vendors.length,
    pending: vendors.filter(v => !v.verified).length,
    verified: vendors.filter(v => v.verified).length,
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Vendor Management
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {usingDemo ? 'Demo data — add SUPABASE_SERVICE_ROLE_KEY for live vendor records.' : 'Live data from Supabase.'}
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

        {/* Tabs + search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
            {(['all', 'pending', 'verified'] as Tab[]).map(t => (
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
                  {['Vendor', 'Category', 'City', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: 'var(--text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => {
                  const status = v.verified ? 'verified' : 'pending';
                  return (
                    <tr key={v.id} className="border-b transition-colors hover:bg-[var(--bg-secondary)]"
                      style={{ borderColor: 'var(--border)' }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: v.verified ? '#1CB6BB15' : '#8B920A15', color: v.verified ? '#1CB6BB' : '#8B920A' }}>
                            <Store size={14} />
                          </div>
                          <div>
                            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{v.business_name}</p>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{v.email ?? '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{v.category}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <MapPin size={10} /> {v.city}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {new Date(v.created_at).toLocaleDateString('en-ZW', { month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full font-semibold capitalize"
                          style={{ background: statusBg[status], color: statusColor[status] }}>
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSelected(v)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                            style={{ background: 'var(--primary-light)', color: 'var(--teal-deep)' }}>
                            <Eye size={13} />
                          </button>
                          {!v.verified && (
                            <button onClick={() => setVerified(v.id, true)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{ background: '#1CB6BB15', color: '#1CB6BB' }}>
                              <CheckCircle size={13} />
                            </button>
                          )}
                          {v.verified && (
                            <span className="flex items-center gap-1 text-xs" style={{ color: '#1CB6BB' }}>
                              <Star size={10} fill="#1CB6BB" /> {v.rating} ({v.review_count})
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && !loading && (
                  <tr><td colSpan={6} className="py-12 text-center" style={{ color: 'var(--text-secondary)' }}>No vendors found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="card w-full max-w-lg p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-poppins font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  {selected.business_name}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full capitalize font-semibold"
                  style={{ background: selected.verified ? statusBg.verified : statusBg.pending, color: selected.verified ? statusColor.verified : statusColor.pending }}>
                  {selected.verified ? 'verified' : 'pending'}
                </span>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: 'var(--text-secondary)' }}><X size={18} /></button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              {[
                ['Category', selected.category],
                ['City', selected.city],
                ['Email', selected.email ?? '—'],
                ['WhatsApp', selected.whatsapp ?? '—'],
                ['Rating', selected.rating > 0 ? `${selected.rating} (${selected.review_count} reviews)` : 'No reviews yet'],
                ['Joined', new Date(selected.created_at).toLocaleDateString()],
              ].map(([k, val]) => (
                <div key={k}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-secondary)' }}>{k}</p>
                  <p style={{ color: 'var(--text-primary)' }}>{val}</p>
                </div>
              ))}
            </div>

            {selected.description && (
              <div className="mb-4">
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Description</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{selected.description}</p>
              </div>
            )}

            <div className="flex gap-3">
              {!selected.verified ? (
                <button onClick={() => setVerified(selected.id, true)} disabled={saving}
                  className="btn-glow btn-ripple flex-1 justify-center">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                  Approve Vendor
                </button>
              ) : (
                <button onClick={() => setVerified(selected.id, false)} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                  style={{ background: '#E9409B15', color: '#E9409B', border: '1px solid #E9409B30' }}>
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                  Revoke Verification
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
