'use client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heart, MapPin, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const saved = [
  { id: '1', name: 'Harare Catering Co.', category: 'Catering', city: 'Harare', rating: 4.9, reviews: 47, emoji: '🍽️', color: '#024F5B' },
  { id: '2', name: 'Lens & Light Photography', category: 'Photography', city: 'Harare', rating: 5.0, reviews: 31, emoji: '📸', color: '#741353' },
  { id: '3', name: 'Bloom Decor', category: 'Décor & Flowers', city: 'Bulawayo', rating: 4.8, reviews: 22, emoji: '💐', color: '#E9409B' },
];

export default function SavedVendorsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Saved Vendors
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Vendors you&apos;ve bookmarked for later.</p>
        </div>

        {saved.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {saved.map(vendor => (
              <div key={vendor.id} className="card overflow-hidden group">
                <div className="h-28 flex items-center justify-center text-5xl relative"
                  style={{ background: `${vendor.color}12` }}>
                  {vendor.emoji}
                  <button className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--bg-card)' }}>
                    <Heart size={13} fill="#E9409B" style={{ color: '#E9409B' }} />
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-xs px-2 py-0.5 rounded-full mb-2 inline-block"
                    style={{ background: `${vendor.color}12`, color: vendor.color }}>
                    {vendor.category}
                  </span>
                  <h3 className="font-poppins font-semibold mb-1"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    {vendor.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                      <MapPin size={10} /> {vendor.city}
                    </span>
                    <span className="flex items-center gap-1" style={{ color: '#8B920A' }}>
                      <Star size={10} fill="#8B920A" /> {vendor.rating} ({vendor.reviews})
                    </span>
                  </div>
                  <Link href={`/vendors/${vendor.id}`}
                    className="flex items-center justify-between text-xs font-semibold"
                    style={{ color: vendor.color }}>
                    View Profile <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <Heart size={40} className="mx-auto mb-4" style={{ color: 'var(--teal)' }} />
            <h3 className="font-poppins font-semibold mb-2"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              No saved vendors yet
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Browse vendors and tap the heart icon to save them here.
            </p>
            <Link href="/vendors" className="btn-glow btn-ripple inline-flex">Browse Vendors</Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
