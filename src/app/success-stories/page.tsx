import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Star } from 'lucide-react';
import Link from 'next/link';

const stories = [
  {
    name: 'Chipo M.',
    event: 'Wedding – 350 guests, Harare',
    quote: 'EventEase helped us find our caterer, florist, and DJ in one place. We saved hours of calling around and the whole day went perfectly.',
    rating: 5,
    emoji: '💍',
    color: '#E9409B',
  },
  {
    name: 'TechZim Ltd',
    event: 'Annual Corporate Dinner – 120 guests',
    quote: 'The vendor marketplace made vendor shortlisting incredibly fast. We got 6 quotes in 48 hours and booked the venue we wanted.',
    rating: 5,
    emoji: '🏢',
    color: '#024F5B',
  },
  {
    name: 'Tafadzwa N.',
    event: 'Graduation Party – 80 guests, Bulawayo',
    quote: 'I had never planned an event before. The planning tools guided me through everything, and the RSVP feature was a game-changer.',
    rating: 5,
    emoji: '🎓',
    color: '#1CB6BB',
  },
  {
    name: 'Ruvimbo C.',
    event: 'Baby Shower – 45 guests, Harare',
    quote: 'Found an amazing decorator within my budget. The budget tracker kept me from overspending. Will definitely use again!',
    rating: 5,
    emoji: '🎀',
    color: '#741353',
  },
  {
    name: 'Sunflower Events (Vendor)',
    event: 'Vendor since 2026',
    quote: 'Listing on EventEase tripled our enquiries within the first month. The platform is professional and clients come in ready to book.',
    rating: 5,
    emoji: '🌻',
    color: '#8B920A',
  },
  {
    name: 'Pastor Blessing Dube',
    event: 'Church Anniversary – 500 guests',
    quote: 'Managing ticket sales and RSVPs for a large church event used to be chaos. EventEase made it simple and stress-free.',
    rating: 5,
    emoji: '⛪',
    color: '#024F5B',
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <section className="hero-gradient py-16 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="badge badge-teal mb-4 inline-flex">Success Stories</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Real Events, <span className="text-gradient">Real Results</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Hear from event organisers and vendors who rely on EventEase every day.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {stories.map(story => (
              <div key={story.name} className="card p-6 flex flex-col">
                <div className="text-4xl mb-4">{story.emoji}</div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <Star key={i} size={14} fill={story.color} style={{ color: story.color }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>
                  &ldquo;{story.quote}&rdquo;
                </p>
                <div>
                  <p className="font-poppins font-semibold text-sm"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{story.name}</p>
                  <p className="text-xs" style={{ color: story.color }}>{story.event}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="mb-6 text-lg" style={{ color: 'var(--text-secondary)' }}>Ready to create your own success story?</p>
            <Link href="/register" className="btn-glow btn-ripple inline-flex">
              Start Planning Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
