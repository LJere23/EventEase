'use client';
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Search, MapPin, Star, ArrowRight, CheckCircle, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = ['All', 'Venue', 'Catering', 'Photography', 'Decoration', 'DJ & Entertainment', 'Florist', 'Equipment Hire', 'MC', 'Hair & Makeup'];
const CITIES = ['All Zimbabwe', 'Harare', 'Bulawayo', 'Gweru', 'Mutare', 'Masvingo'];

const vendors = [
  { id: '1', name: 'Harare Grand Events', category: 'Venue', location: 'Harare North', rating: 4.9, reviews: 48, price: '$$', badge: 'Verified', specialty: 'Weddings & Corporate', color: '#024F5B', emoji: '🏛️' },
  { id: '2', name: 'Royal Cuisine Catering', category: 'Catering', location: 'Avenues, Harare', rating: 4.8, reviews: 62, price: '$$', badge: 'Top Rated', specialty: 'African & Continental', color: '#741353', emoji: '🍽️' },
  { id: '3', name: 'Lens & Light Photography', category: 'Photography', location: 'Borrowdale', rating: 5.0, reviews: 31, price: '$$$', badge: 'Premium', specialty: 'Weddings & Portraits', color: '#1CB6BB', emoji: '📸' },
  { id: '4', name: 'Blooms & Beyond', category: 'Florist', location: 'Eastlea, Harare', rating: 4.7, reviews: 55, price: '$', badge: 'Best Value', specialty: 'Floral & Decoration', color: '#E9409B', emoji: '💐' },
  { id: '5', name: 'DJ Madzibaba', category: 'DJ & Entertainment', location: 'Harare CBD', rating: 4.9, reviews: 89, price: '$', badge: 'Popular', specialty: 'All Genres · All Events', color: '#8B920A', emoji: '🎧' },
  { id: '6', name: 'Marquee Masters Hire', category: 'Equipment Hire', location: 'Msasa, Harare', rating: 4.6, reviews: 40, price: '$$', badge: 'Verified', specialty: 'Tents, Chairs, Sound', color: '#024F5B', emoji: '⛺' },
  { id: '7', name: 'Glamour Touch Studio', category: 'Hair & Makeup', location: 'Avondale', rating: 4.8, reviews: 37, price: '$$', badge: 'Verified', specialty: 'Bridal & Event', color: '#741353', emoji: '💄' },
  { id: '8', name: 'Elite MC Services', category: 'MC', location: 'Harare', rating: 4.7, reviews: 24, price: '$', badge: 'Popular', specialty: 'Weddings & Corporates', color: '#1CB6BB', emoji: '🎤' },
  { id: '9', name: 'Garden View Venue', category: 'Venue', location: 'Avondale, Harare', rating: 4.6, reviews: 19, price: '$', badge: 'Verified', specialty: 'Outdoor Events', color: '#8B920A', emoji: '🌿' },
];

export default function VendorsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCity, setActiveCity] = useState('All Zimbabwe');
  const [search, setSearch] = useState('');

  const filtered = vendors.filter(v => {
    const matchCat = activeCategory === 'All' || v.category === activeCategory;
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

            {/* Search bar — fixed icon overlap */}
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
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> vendor{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && <> in <strong style={{ color: 'var(--text-primary)' }}>{activeCategory}</strong></>}
          </p>
        </section>

        {/* Vendor grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {filtered.length === 0 ? (
            <div className="card p-16 text-center">
              <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No vendors found</p>
              <p style={{ color: 'var(--text-secondary)' }}>Try a different category or city.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(vendor => (
                <Link key={vendor.id} href={`/vendors/${vendor.id}`}>
                  <div className="vendor-card cursor-pointer h-full">
                    {/* Image area */}
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
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star size={13} fill="#C9A84C" color="#C9A84C" />
                          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{vendor.rating}</span>
                          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>({vendor.reviews})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                        <span className="flex items-center gap-1"><MapPin size={11} /> {vendor.location}</span>
                        <span className="flex items-center gap-1"><CheckCircle size={11} /> {vendor.specialty}</span>
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
    </>
  );
}
