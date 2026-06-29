import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Star, MapPin, CheckCircle, MessageSquare, ArrowLeft, Phone } from 'lucide-react';
import Link from 'next/link';

const mockVendors: Record<string, { name: string; category: string; location: string; rating: number; reviews: number; price: string; specialty: string; color: string; emoji: string; description: string; services: string[] }> = {
  '1': { name: 'Harare Grand Events', category: 'Venue', location: 'Harare North', rating: 4.9, reviews: 48, price: '$$', specialty: 'Weddings & Corporate', color: '#024F5B', emoji: '🏛️', description: 'Harare\'s premier indoor venue for weddings, corporate events, and private celebrations. Capacity for up to 300 guests with full catering facilities.', services: ['Full venue hire', 'Catering packages', 'Décor setup', 'AV equipment', 'Parking for 100+ vehicles'] },
  '2': { name: 'Royal Cuisine Catering', category: 'Catering', location: 'Avenues, Harare', rating: 4.8, reviews: 62, price: '$$', specialty: 'African & Continental', color: '#741353', emoji: '🍽️', description: 'Award-winning catering specialists serving Harare for over 10 years. We cater for all event types with custom menus to suit every taste and budget.', services: ['Buffet catering', 'Plated dinners', 'Cocktail canapés', 'Children\'s menus', 'Halal options available'] },
  '3': { name: 'Lens & Light Photography', category: 'Photography', location: 'Borrowdale', rating: 5.0, reviews: 31, price: '$$$', specialty: 'Weddings & Portraits', color: '#1CB6BB', emoji: '📸', description: 'Professional wedding and event photography capturing your most precious moments. Full-day coverage with digital gallery delivery within 2 weeks.', services: ['Full-day wedding coverage', 'Engagement shoots', 'Corporate headshots', 'Photo albums', 'Video reels'] },
};

export default async function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vendor = mockVendors[id] ?? mockVendors['1'];

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link href="/vendors" className="inline-flex items-center gap-2 text-sm mb-6 font-medium"
            style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={15} /> Back to Vendors
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Hero image */}
              <div className="h-64 sm:h-80 rounded-2xl flex items-center justify-center text-8xl mb-6"
                style={{ background: `${vendor.color}18`, border: '1px solid var(--border)' }}>
                {vendor.emoji}
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-poppins font-bold text-3xl mb-1"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    {vendor.name}
                  </h1>
                  <p className="font-medium" style={{ color: vendor.color }}>{vendor.category}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#C9A84C" color="#C9A84C" />)}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{vendor.rating} · {vendor.reviews} reviews</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <MapPin size={13} /> {vendor.location}
                </span>
                <span className="badge badge-teal">{vendor.price} · {vendor.specialty}</span>
                <span className="badge badge-green"><CheckCircle size={11} /> Verified</span>
              </div>

              <div className="card p-6 mb-6">
                <h2 className="font-poppins font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>About</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{vendor.description}</p>
              </div>

              <div className="card p-6">
                <h2 className="font-poppins font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Services Offered</h2>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {vendor.services.map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <CheckCircle size={14} style={{ color: '#16a34a', flexShrink: 0 }} /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="card p-6 sticky top-24">
                <h3 className="font-poppins font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Request a Quote
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Tell {vendor.name} about your event and they&apos;ll get back to you within 24 hours.
                </p>
                <Link href="/register" className="btn-glow btn-ripple w-full justify-center mb-3">
                  <MessageSquare size={15} /> Send Quote Request
                </Link>
                <Link href="/register" className="btn-ghost w-full justify-center">
                  <Phone size={15} /> View Contact
                </Link>
                <div className="mt-4 pt-4 border-t flex items-center gap-2 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={12} style={{ color: '#16a34a' }} /> Sign in to send a quote request
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
