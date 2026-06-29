'use client';
import { useEffect, useRef } from 'react';

const stats = [
  { value: 500, suffix: '+', label: 'Events Planned', description: 'Across Zimbabwe' },
  { value: 50, suffix: '+', label: 'Vetted Vendors', description: 'In every category' },
  { value: 12, suffix: '', label: 'Event Categories', description: 'From weddings to corporate' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', description: 'Based on post-event surveys' },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      stats.forEach((stat, i) => {
        const el = document.querySelector(`[data-target="${stat.value}"]`) as HTMLElement;
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate() {
            el.textContent = Math.round(obj.val).toLocaleString() + stat.suffix;
          },
        });
      });

      gsap.from('.stat-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
      });
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div
                className="text-4xl sm:text-5xl font-bold font-poppins mb-1"
                style={{ color: 'var(--teal)', fontFamily: "'Poppins', sans-serif" }}
                data-target={stat.value}
              >
                0{stat.suffix}
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
