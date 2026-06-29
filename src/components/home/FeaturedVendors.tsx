'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Star, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

const vendors = [
  {
    id: '1',
    name: 'Harare Grand Events',
    category: 'Venue',
    location: 'Harare North',
    rating: 4.9,
    reviews: 48,
    price: '$$',
    badge: 'Verified',
    specialty: 'Weddings & Corporate',
    color: '#006D77',
    emoji: '🏛️',
  },
  {
    id: '2',
    name: 'Royal Cuisine Catering',
    category: 'Catering',
    location: 'Avenues, Harare',
    rating: 4.8,
    reviews: 62,
    price: '$$',
    badge: 'Top Rated',
    specialty: 'African & Continental',
    color: '#C9A84C',
    emoji: '🍽️',
  },
  {
    id: '3',
    name: 'Lens & Light Photography',
    category: 'Photography',
    location: 'Borrowdale',
    rating: 5.0,
    reviews: 31,
    price: '$$$',
    badge: 'Premium',
    specialty: 'Weddings & Portraits',
    color: '#00c4ce',
    emoji: '📸',
  },
  {
    id: '4',
    name: 'Blooms & Beyond',
    category: 'Florist & Decor',
    location: 'Eastlea, Harare',
    rating: 4.7,
    reviews: 55,
    price: '$',
    badge: 'Best Value',
    specialty: 'Floral & Decoration',
    color: '#E91E8C',
    emoji: '💐',
  },
  {
    id: '5',
    name: 'DJ Madzibaba',
    category: 'DJ & Entertainment',
    location: 'Harare CBD',
    rating: 4.9,
    reviews: 89,
    price: '$',
    badge: 'Popular',
    specialty: 'All Genres · All Events',
    color: '#8B5CF6',
    emoji: '🎧',
  },
  {
    id: '6',
    name: 'Marquee Masters Hire',
    category: 'Equipment Hire',
    location: 'Msasa, Harare',
    rating: 4.6,
    reviews: 40,
    price: '$$',
    badge: 'Verified',
    specialty: 'Tents, Chairs, Sound',
    color: '#F59E0B',
    emoji: '⛺',
  },
];

export function FeaturedVendors() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.vendor-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      });
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <span className="badge badge-gold mb-3 inline-flex">Featured Vendors</span>
            <h2 className="font-poppins font-bold text-4xl sm:text-5xl" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Zimbabwe&apos;s Best{' '}
              <span className="text-gradient">Vendors</span>
            </h2>
            <p className="mt-3 text-base" style={{ color: 'var(--text-secondary)' }}>
              Every vendor is vetted, reviewed, and ready to make your event extraordinary.
            </p>
          </div>
          <Link href="/vendors" className="btn-ghost flex-shrink-0">
            See All Vendors <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Link key={vendor.id} href={`/vendors/${vendor.id}`}>
              <div className="vendor-card cursor-pointer">
                {/* Card image placeholder */}
                <div
                  className="h-44 flex items-center justify-center text-5xl relative"
                  style={{ background: `${vendor.color}15` }}
                >
                  <span>{vendor.emoji}</span>
                  <div className="absolute top-3 right-3">
                    <span
                      className="badge text-xs"
                      style={{
                        background: `${vendor.color}20`,
                        color: vendor.color,
                        border: `1px solid ${vendor.color}40`,
                      }}
                    >
                      {vendor.badge}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-poppins font-semibold text-base" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                        {vendor.name}
                      </h3>
                      <p className="text-sm" style={{ color: vendor.color }}>
                        {vendor.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star size={13} fill="#C9A84C" color="#C9A84C" />
                      <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{vendor.rating}</span>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>({vendor.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {vendor.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle size={11} /> {vendor.specialty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                    <span className="font-poppins font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                      {vendor.price} · Request Quote
                    </span>
                    <ArrowRight size={16} style={{ color: 'var(--teal)' }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
