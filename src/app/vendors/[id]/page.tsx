import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PlanningBubble } from '@/components/layout/PlanningBubble';
import { Star, MapPin, CheckCircle, MessageSquare, ArrowLeft, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { createClient as createServerSupabaseClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

const CATEGORY_EMOJI: Record<string, string> = {
  Venue: '🏛️', Catering: '🍽️', Photography: '📸', Videography: '🎥',
  'DJ & Entertainment': '🎧', MC: '🎤', Florist: '🌸', Decoration: '✨',
  'Hair & Makeup': '💄', 'Equipment Hire': '🔊', Other: '⭐',
};

const CATEGORY_COLOR: Record<string, string> = {
  Venue: '#024F5B', Catering: '#741353', Photography: '#1CB6BB',
  Florist: '#E9409B', 'DJ & Entertainment': '#8B920A', 'Equipment Hire': '#024F5B',
  'Hair & Makeup': '#741353', MC: '#1CB6BB', Decoration: '#E9409B',
};

export default async function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: vendor } = await supabase
    .from('vendor_profiles')
    .select('id, business_name, category, city, description, address, whatsapp, email, price_range, rating, review_count, verified')
    .eq('id', id)
    .single();

  if (!vendor) notFound();

  const color = CATEGORY_COLOR[vendor.category] ?? '#741353';
  const emoji = CATEGORY_EMOJI[vendor.category] ?? '⭐';

  const priceMap: Record<string, string> = {
    'Budget (USD 0–200)': '$',
    'Mid-range (USD 200–800)': '$$',
    'Premium (USD 800+)': '$$$',
  };
  const priceLabel = priceMap[vendor.price_range ?? ''] ?? '$$';

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
              {/* Hero banner */}
              <div className="h-64 sm:h-80 rounded-2xl flex items-center justify-center text-8xl mb-6"
                style={{ background: `${color}18`, border: '1px solid var(--border)' }}>
                {emoji}
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-poppins font-bold text-3xl mb-1"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    {vendor.business_name}
                  </h1>
                  <p className="font-medium" style={{ color }}>{vendor.category}</p>
                </div>
                {(vendor.review_count ?? 0) > 0 && (
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 justify-end mb-1">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="#C9A84C" color="#C9A84C" />)}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {vendor.rating} · {vendor.review_count} review{vendor.review_count !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                {vendor.city && (
                  <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <MapPin size={13} /> {vendor.city}
                    {vendor.address && ` · ${vendor.address}`}
                  </span>
                )}
                <span className="badge badge-teal">{priceLabel}</span>
                {vendor.verified && (
                  <span className="badge badge-green flex items-center gap-1">
                    <ShieldCheck size={11} /> Verified
                  </span>
                )}
              </div>

              {vendor.description && (
                <div className="card p-6 mb-6">
                  <h2 className="font-poppins font-semibold text-lg mb-3"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>About</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{vendor.description}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="card p-6 sticky top-24">
                <h3 className="font-poppins font-semibold text-lg mb-4"
                  style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Request a Quote
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Tell {vendor.business_name} about your event and they&apos;ll get back to you within 24 hours.
                </p>
                <Link href="/register" className="btn-glow btn-ripple w-full justify-center mb-3">
                  <MessageSquare size={15} /> Send Quote Request
                </Link>
                {(vendor.whatsapp || vendor.email) && (
                  <Link href="/register" className="btn-ghost w-full justify-center">
                    <Phone size={15} /> View Contact
                  </Link>
                )}
                <div className="mt-4 pt-4 border-t flex items-center gap-2 text-xs"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={12} style={{ color: '#16a34a' }} /> Sign in to send a quote request
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <PlanningBubble />
    </>
  );
}
