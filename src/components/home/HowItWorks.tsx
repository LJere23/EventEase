'use client';
import { useEffect, useRef } from 'react';
import { Sparkles, Search, CalendarCheck, PartyPopper } from 'lucide-react';

const steps = [
  {
    icon: Sparkles,
    number: '01',
    title: 'Describe Your Event',
    description: 'Tell our AI about your event type, date, guest count, and budget. The more detail, the smarter the plan.',
    color: '#006D77',
  },
  {
    icon: Search,
    number: '02',
    title: 'AI Builds Your Plan',
    description: 'Instantly receive a custom checklist, timeline, budget breakdown, and a curated vendor shortlist.',
    color: '#C9A84C',
  },
  {
    icon: CalendarCheck,
    number: '03',
    title: 'Connect & Book',
    description: 'Browse AI-matched vendors, send quote requests, manage bookings, and track everything in one dashboard.',
    color: '#00c4ce',
  },
  {
    icon: PartyPopper,
    number: '04',
    title: 'Celebrate Perfectly',
    description: 'Enjoy your event knowing every detail was planned and coordinated — stress-free, from start to finish.',
    color: '#006D77',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.step-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.section-heading', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      });
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-heading text-center mb-16">
          <span className="badge badge-teal mb-4 inline-flex">How It Works</span>
          <h2 className="font-poppins font-bold text-4xl sm:text-5xl mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            From Idea to{' '}
            <span className="text-gradient">Unforgettable</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            EventEase takes you from event concept to celebration in four simple steps — powered by AI at every turn.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="step-card card p-6 hover:border-[var(--teal)] transition-all group relative">
                {/* Connector line (hidden on last) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 left-full w-full h-px z-10"
                    style={{ background: `linear-gradient(90deg, ${step.color} 0%, transparent 100%)`, opacity: 0.3, width: 'calc(100% - 24px)', left: '100%' }}
                  />
                )}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${step.color}18` }}
                >
                  <Icon size={22} style={{ color: step.color }} />
                </div>
                <span
                  className="font-poppins font-bold text-4xl absolute top-4 right-6 opacity-10 select-none"
                  style={{ color: step.color, fontFamily: "'Poppins', sans-serif" }}
                >
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
