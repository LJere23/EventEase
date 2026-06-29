'use client';
import { useEffect, useRef } from 'react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const stats = [
  { value: 500, suffix: '+', label: 'Events Planned', description: 'Across Zimbabwe' },
  { value: 50,  suffix: '+', label: 'Vetted Vendors',  description: 'In every category' },
  { value: 12,  suffix: '',  label: 'Event Categories', description: 'From weddings to corporate' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction', description: 'Based on post-event surveys' },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef, '.stat-card', { staggerMs: 120, durationMs: 650, yPx: 32 });

  // Counter animation — runs after cards are visible
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const runCounters = () => {
      stats.forEach(stat => {
        const el = section.querySelector<HTMLElement>(`[data-target="${stat.value}"]`);
        if (!el) return;
        let start = 0;
        const step = stat.value / 60;
        const tick = () => {
          start = Math.min(start + step, stat.value);
          el.textContent = Math.round(start).toLocaleString() + stat.suffix;
          if (start < stat.value) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    };

    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { runCounters(); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="stat-card card p-6 text-center">
              <div
                className="text-4xl sm:text-5xl font-bold font-poppins mb-2"
                style={{ color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}
                data-target={stat.value}
              >
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="font-semibold font-poppins mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                {stat.label}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
