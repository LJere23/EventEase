'use client';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const testimonials = [
  { name: 'Tendai M.',   role: 'Bride · Wedding, March 2026',       text: 'EventEase found us the perfect venue in Harare within minutes. The planning checklist kept us on track for 3 months. Our wedding was flawless!',           rating: 5, avatar: 'TM', color: '#024F5B' },
  { name: 'Farai N.',    role: 'HR Manager · Corporate Event',       text: 'We used EventEase for our company annual dinner — 200 guests. The vendor matching saved us 2 weeks of searching. Absolutely recommend.',                   rating: 5, avatar: 'FN', color: '#8B920A' },
  { name: 'Rudo C.',     role: 'Event Planner · Freelance',          text: 'As a planner, I manage 8–10 events monthly. EventEase\'s dashboard and smart tools have cut my admin time by 60%. Game changer for Zimbabwe.',            rating: 5, avatar: 'RC', color: '#741353' },
  { name: 'Blessing T.', role: 'Parent · Graduation Party',          text: 'I had no idea where to start planning my son\'s graduation. EventEase gave me a complete plan and connected me with amazing caterers. Perfect!',          rating: 5, avatar: 'BT', color: '#E9409B' },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef, '.testimonial-card', { staggerMs: 110, durationMs: 650, yPx: 28 });

  return (
    <section ref={sectionRef} className="py-24 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge badge-gold mb-4 inline-flex">Testimonials</span>
          <h2 className="font-poppins font-bold text-4xl sm:text-5xl" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Loved by Event <span className="text-gradient">Organisers</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="testimonial-card card p-6 flex flex-col gap-4">
              <Quote size={24} style={{ color: t.color, opacity: 0.7 }} />
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} fill="#8B920A" color="#8B920A" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: t.color, fontFamily: "'Poppins', sans-serif" }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm font-poppins" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
