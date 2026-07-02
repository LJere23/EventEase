'use client';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PlanningBubble } from '@/components/layout/PlanningBubble';
import { Search, MapPin, Star, ArrowRight, CheckCircle, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const CATEGORIES = ['All', 'Venue', 'Catering', 'Photography', 'Decoration', 'DJ & Entertainment', 'Florist', 'Equipment Hire', 'MC', 'Hair & Makeup'];
const CITIES = ['All Zimbabwe', 'Harare', 'Bulawayo', 'Gweru', 'Mutare', 'Masvingo'];

const CATEGORY_EMOJI: Record<string, string> = {
  Venue: '🏛️', Catering: '🍽️', Photography: '📸', Videography: '🎥',
  'DJ & Entertainment': '🎧', 'Décor & Flowers': '💐', MC: '🎤',
  'Cake & Pastry': '🎂', Transport: '🚗', 'Makeup & Beauty': '💄',
  'Hair & Makeup': '💄', Florist: '🌸', Decoration: '✨',
  'Printing & Stationery': '🖨️', 'Tent & Furniture Hire': '⛺',
  Equipment: '🔊', Other: '⭐',
};

const CATEGORY_COLOR: Record<string, string> = {
  Venue: '#024F5B', Catering: '#741353', Photography: '#1CB6BB',
  Florist: '#E9409B', 'DJ & Entertainment': '#8B920A', 'Equipment Hire': '#024F5B',
  'Hair & Makeup': '#741353', MC: '#1CB6BB', Decoration: '#E9409B',
};

interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  badge: string;
  specialty: string;
  color: string;
  emoji: string;
}

function toVendor(row: {
  id: string; business_name: string; category: string; city: string;
  description: string | null; price_range: string | null; rating: number;
  review_count: number; verified: boolean;
}): Vendor {
  const color = CATEGORY_COLOR[row.category] ?? '#741353';
  const emoji = CATEGORY_EMOJI[row.category] ?? '⭐';
  const priceMap: Record<string, string> = {
    'Budget (USD 0–200)': '$',
    'Mid-range (USD 200–800)': '$$',
    'Premium (USD 800+)': '$$$',
  };
  return {
    id: row.id,
    name: row.business_name,
    category: row.category,
    location: row.city,
    rating: row.rating || 4.8,
    reviews: row.review_count || 0,
    price: priceMap[row.price_range ?? ''] ?? '$$',
    badge: row.verified ? 'Verified' : 'New',
    specialty: row.description?.slice(0, 40) ?? row.category,
    color,
    emoji,
  };
}

export default function VendorsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCity, setActiveCity] = useState('All Zimbabwe');
  const [search, setSearch] = useState('');
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read ?category= from URL to support Planning Bubble quick-filter links
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) setActiveCategory(cat);

    const supabase = createClient();
    supabase
      .from('vendor_profiles')
      .select('id, business_name, category, city, description, price_range, rating, review_count, verified')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setVendors(data.map(toVendor));
        }
        setLoading(false);
      });
  }, []);

  const filtered = vendors.filter(v => {
    const matchCat = activeCategory === 'All' || v.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchCity = activeCity === 'All Zimbabwe' || v.location.includes(activeCity);
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.specialty.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchCity && matchSearch;
  });

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        {/* Header */}
        <section className="hero-gradient py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <span className="badge badge-teal mb-4 inline-flex">Vendor Marketplace</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Zimbabwe&apos;s Best Event{' '}
              <span className="text-gradient">Vendors</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
              Every vendor is vetted, reviewed, and ready to make your event extraordinary.
            </p>

            <div className="max-w-2xl mx-auto flex gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
                  style={{ left: '14px', color: 'var(--text-secondary)' }} />
                <input
                  className="input-field w-full"
                  style={{ paddingLeft: '42px' }}
                  placeholder="Search vendors, services, or categories..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="btn-glow px-5 flex-shrink-0 flex items-center gap-2">
                <Search size={16} /> Search
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold flex-shrink-0"
              style={{ color: 'var(--text-secondary)', fontFamily: "'Poppins', sans-serif" }}>
              <SlidersHorizontal size={15} /> Category:
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="badge cursor-pointer transition-all text-xs"
                  style={{
                    background: activeCategory === cat ? 'var(--teal-deep)' : 'var(--primary-light)',
                    color: activeCategory === cat ? 'white' : 'var(--teal-deep)',
                    border: `1px solid ${activeCategory === cat ? 'var(--teal-deep)' : 'rgba(28,182,187,0.3)'}`,
                  }}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <MapPin size={14} style={{ color: 'var(--text-secondary)' }} />
              <select className="input-field text-sm py-1.5"
                style={{ width: 'auto', minWidth: '140px' }}
                value={activeCity} onChange={e => setActiveCity(e.target.value)}>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Results count */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          {loading ? (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading vendors...</p>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> vendor{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' && <> in <strong style={{ color: 'var(--text-primary)' }}>{activeCategory}</strong></>}
            </p>
          )}
        </section>

        {/* Vendor grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="card h-64 animate-pulse" style={{ background: 'var(--bg-secondary)' }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="card p-16 text-center">
              <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {vendors.length === 0 ? 'No vendors have joined yet' : 'No vendors found'}
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                {vendors.length === 0
                  ? 'Be the first to list your business on EventEase!'
                  : 'Try a different category or city.'}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(vendor => (
                <Link key={vendor.id} href={`/vendors/${vendor.id}`}>
                  <div className="vendor-card cursor-pointer h-full">
                    <div className="h-44 flex items-center justify-center text-5xl relative"
                      style={{ background: `${vendor.color}18` }}>
                      <span>{vendor.emoji}</span>
                      <div className="absolute top-3 right-3">
                        <span className="badge text-xs"
                          style={{ background: `${vendor.color}22`, color: vendor.color, border: `1px solid ${vendor.color}44` }}>
                          {vendor.badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-poppins font-semibold text-base"
                            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                            {vendor.name}
                          </h3>
                          <p className="text-sm font-medium" style={{ color: vendor.color }}>{vendor.category}</p>
                        </div>
                        {vendor.reviews > 0 && (
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Star size={13} fill="#C9A84C" color="#C9A84C" />
                            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{vendor.rating}</span>
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>({vendor.reviews})</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                        <span className="flex items-center gap-1"><MapPin size={11} /> {vendor.location}</span>
                        <span className="flex items-center gap-1 flex-1 min-w-0 truncate"><CheckCircle size={11} /> {vendor.specialty}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t"
                        style={{ borderColor: 'var(--border)' }}>
                        <span className="font-poppins font-semibold text-sm"
                          style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                          {vendor.price} · Request Quote
                        </span>
                        <ArrowRight size={16} style={{ color: 'var(--teal-deep)' }} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* CTA for vendors */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
          <div className="glass-card p-8 text-center">
            <h2 className="font-poppins font-bold text-2xl mb-3"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Are you a service provider?
            </h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              List your business on EventEase and connect with thousands of event organisers across Zimbabwe.
            </p>
            <Link href="/register?role=vendor" className="btn-3d inline-flex">
              List My Business — It&apos;s Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <PlanningBubble />
    </>
  );
}
