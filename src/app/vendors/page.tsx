import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FeaturedVendors } from '@/components/home/FeaturedVendors';
import { Search, Filter, MapPin, Star, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Venue', 'Catering', 'Photography', 'Decoration', 'DJ & Entertainment', 'Florist', 'Equipment Hire', 'MC', 'Hair & Makeup'];
const CITIES = ['All Zimbabwe', 'Harare', 'Bulawayo', 'Gweru', 'Mutare', 'Masvingo'];

export default function VendorsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="hero-gradient py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <span className="badge badge-teal mb-4 inline-flex">Vendor Marketplace</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Zimbabwe&apos;s Best Event{' '}
              <span className="text-gradient">Vendors</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
              Every vendor is vetted, reviewed, and ready to make your event extraordinary.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto flex gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input
                  className="input-field pl-10"
                  placeholder="Search vendors, services, or locations..."
                />
              </div>
              <button className="btn-glow px-6 flex-shrink-0">
                <Search size={16} /> Search
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)', fontFamily: "'Poppins', sans-serif" }}>
              <SlidersHorizontal size={15} /> Filter by:
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className="badge badge-teal cursor-pointer hover:bg-[var(--teal)] hover:text-white transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <MapPin size={14} style={{ color: 'var(--text-secondary)' }} />
              <select className="input-field py-1.5 px-3 text-sm w-auto" style={{ width: 'auto' }}>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Vendors grid */}
        <FeaturedVendors />

        {/* CTA for vendors */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="glass-card p-8 text-center">
            <h2 className="font-poppins font-bold text-2xl mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Are you a service provider?
            </h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              List your business on EventEase and connect with thousands of event organisers across Zimbabwe.
            </p>
            <a href="/register?role=vendor" className="btn-3d inline-flex">
              List My Business — It&apos;s Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
