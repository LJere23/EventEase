'use client';
import { useRef } from 'react';
import { Search, CalendarCheck, PartyPopper, LayoutDashboard } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const steps = [
  { icon: LayoutDashboard, number: '01', title: 'Create Your Event',    description: 'Tell us about your event type, date, guest count, and budget. Takes under 2 minutes.',                                                       color: '#024F5B' },
  { icon: Search,          number: '02', title: 'Get Your Plan',        description: 'Receive a custom checklist, timeline, budget breakdown, and a curated list of vetted vendors — instantly.',                                    color: '#8B920A' },
  { icon: CalendarCheck,   number: '03', title: 'Connect & Book',       description: 'Browse vendors, send quote requests, manage bookings, and track payments — all in your dashboard.',                                            color: '#1CB6BB' },
  { icon: PartyPopper,     number: '04', title: 'Celebrate Perfectly',  description: 'Enjoy your event knowing every detail was coordinated — stress-free, from the first vendor booking to the final toast.',                      color: '#E9409B' },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef, '.step-card', { staggerMs: 140, durationMs: 650, yPx: 36 });

  return (
    <section ref={sectionRef} className="py-24 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge badge-teal mb-4 inline-flex">How It Works</span>
          <h2 className="font-poppins font-bold text-4xl sm:text-5xl mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            From Idea to <span className="text-gradient">Unforgettable</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            EventEase takes you from concept to celebration in four simple steps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="step-card card p-6 hover:border-[var(--teal)] transition-all group relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 h-px z-10"
                    style={{ background: `linear-gradient(90deg, ${step.color}60 0%, transparent 100%)`, width: 'calc(100% - 24px)', left: '100%' }} />
                )}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${step.color}15` }}>
                  <Icon size={22} style={{ color: step.color }} />
                </div>
                <span className="font-poppins font-bold text-4xl absolute top-4 right-6 select-none"
                  style={{ color: step.color, opacity: 0.12, fontFamily: "'Poppins', sans-serif" }}>
                  {step.number}
                </span>
                <h3 className="font-poppins font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
