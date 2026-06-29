'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, CalendarCheck, Users, ShieldCheck } from 'lucide-react';

// Pre-computed bloom line coordinates (fixed precision = no hydration mismatch)
const BLOOM_LINES_MAIN = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2;
  const len = i % 4 === 0 ? 340 : i % 2 === 0 ? 280 : 220;
  const isGold = i % 4 === 0;
  return {
    x2: parseFloat((Math.cos(angle) * len).toFixed(3)),
    y2: parseFloat((Math.sin(angle) * len).toFixed(3)),
    isGold,
    stroke: isGold ? '#E9409B' : '#1CB6BB',
    strokeWidth: isGold ? 1.5 : 1,
  };
});
const BLOOM_CORNER_1 = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2;
  return { x2: parseFloat((Math.cos(a) * 60).toFixed(3)), y2: parseFloat((Math.sin(a) * 60).toFixed(3)) };
});
const BLOOM_CORNER_2 = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2;
  return { x2: parseFloat((Math.cos(a) * 60).toFixed(3)), y2: parseFloat((Math.sin(a) * 60).toFixed(3)) };
});

export function HeroSection() {
  const bloomRef = useRef<SVGSVGElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Bloom lines entrance
      if (bloomRef.current) {
        const lines = bloomRef.current.querySelectorAll('.bloom-line');
        gsap.from(lines, {
          opacity: 0, scale: 0, transformOrigin: 'center center',
          duration: 0.9, stagger: { each: 0.05, from: 'center' }, ease: 'power3.out', delay: 0.3,
        });
      }

      // Hero content
      gsap.from('.hero-content > *', {
        y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.15,
      });

      // Floating cards
      gsap.to('.float-card-1', { y: -10, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('.float-card-2', { y: -7, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.6 });
      gsap.to('.float-card-3', { y: -9, duration: 3.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.1 });
    };
    init();

    // Magnetic CTA
    const initMagnetic = async () => {
      const { gsap } = await import('gsap');
      const btn = document.querySelector('.hero-cta') as HTMLElement;
      if (!btn) return;
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < rect.width * 0.9) {
          gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, ease: 'power2.out', duration: 0.4 });
        } else {
          gsap.to(btn, { x: 0, y: 0, ease: 'elastic.out(1,0.4)', duration: 0.7 });
        }
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    };
    initMagnetic();

    // Particle burst on CTA click
    const handleClick = async (e: Event) => {
      const me = e as MouseEvent;
      const { animate } = await import('animejs');
      const count = 14;
      const particles: HTMLElement[] = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const dist = 45 + Math.random() * 65;
        const el = document.createElement('div');
        const colors = ['#1CB6BB', '#E9409B', '#741353', '#C9A84C', '#A0E5E5'];
        el.style.cssText = `position:fixed;left:${me.clientX}px;top:${me.clientY}px;width:6px;height:6px;border-radius:50%;background:${colors[i % colors.length]};pointer-events:none;z-index:9999;transform:translate(-50%,-50%)`;
        el.dataset.tx = String(parseFloat((Math.cos(angle) * dist).toFixed(2)));
        el.dataset.ty = String(parseFloat((Math.sin(angle) * dist).toFixed(2)));
        document.body.appendChild(el);
        particles.push(el);
      }
      particles.forEach((p, idx) => {
        animate(p, {
          translateX: parseFloat(p.dataset.tx ?? '0'),
          translateY: parseFloat(p.dataset.ty ?? '0'),
          opacity: [1, 0], scale: [1, 0],
          duration: 550, delay: idx * 18, easing: 'easeOutExpo',
          complete: () => p.remove(),
        });
      });
    };
    const btn = document.querySelector('.hero-cta');
    btn?.addEventListener('click', handleClick as EventListener);
    return () => btn?.removeEventListener('click', handleClick as EventListener);
  }, [mounted]);

  return (
    <section ref={heroRef} className="hero-gradient relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">

      {/* Bloom SVG — client-only render prevents hydration mismatch */}
      {mounted && (
        <svg
          ref={bloomRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          viewBox="0 0 1440 900"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.5 }}
          aria-hidden
        >
          <g transform="translate(720,420)">
            {BLOOM_LINES_MAIN.map((l, i) => (
              <line key={i} className="bloom-line" x1="0" y1="0"
                x2={l.x2} y2={l.y2}
                stroke={l.stroke} strokeWidth={l.strokeWidth} strokeLinecap="round"
              />
            ))}
          </g>
          <g transform="translate(110,110)">
            {BLOOM_CORNER_1.map((l, i) => (
              <line key={i} className="bloom-line" x1="0" y1="0"
                x2={l.x2} y2={l.y2}
                stroke="#1CB6BB" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"
              />
            ))}
          </g>
          <g transform="translate(1330,790)">
            {BLOOM_CORNER_2.map((l, i) => (
              <line key={i} className="bloom-line" x1="0" y1="0"
                x2={l.x2} y2={l.y2}
                stroke="#E9409B" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"
              />
            ))}
          </g>
        </svg>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Copy */}
        <div className="hero-content flex flex-col gap-6">
          <div className="badge badge-teal w-fit">
            Zimbabwe&apos;s All-In-One Event Platform
          </div>

          <h1
            className="font-poppins font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
          >
            Your Perfect Event,{' '}
            <span className="text-gradient">Made Simple</span>
          </h1>

          <p className="text-lg leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }}>
            EventEase brings Zimbabwe&apos;s best vendors together with smart planning tools and seamless booking — all in one place. Plan your event in minutes, not months.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/register" className="btn-glow btn-ripple hero-cta">
              Start Planning Free
              <ArrowRight size={18} />
            </Link>
            <Link href="/vendors" className="btn-ghost">
              Browse Vendors
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            {[
              { icon: Users, label: '500+ Events Planned' },
              { icon: ShieldCheck, label: '50+ Vetted Vendors' },
              { icon: CalendarCheck, label: 'Personalised Checklists' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--primary-light)' }}>
                  <Icon size={14} style={{ color: 'var(--teal-deep)' }} />
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)', fontFamily: "'Poppins', sans-serif" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Floating UI cards */}
        <div className="hidden lg:block relative h-[520px]">
          {/* Main glass card — checklist */}
          <div className="float-card-1 glass-card absolute top-8 right-0 w-80 p-6" style={{ boxShadow: '0 20px 60px rgba(2,79,91,0.18)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--teal-deep)' }}>
                <CalendarCheck size={18} color="white" />
              </div>
              <div>
                <p className="font-semibold text-sm font-poppins" style={{ color: 'var(--text-primary)' }}>Event Checklist</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Wedding · 15 Jul 2026</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {['Confirm venue booking', 'Send RSVP invites', 'Finalise caterer quote', 'Book photographer'].map((task, i) => (
                <div key={task} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0`}
                    style={i < 2 ? { background: '#16a34a' } : { border: '1.5px solid var(--border)' }}>
                    {i < 2 && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={i < 2 ? 'line-through opacity-50' : ''} style={{ color: 'var(--text-primary)' }}>{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor match card */}
          <div className="float-card-2 glass-card absolute top-52 right-56 w-62 p-4" style={{ boxShadow: '0 16px 40px rgba(233,64,155,0.12)' }}>
            <p className="text-xs font-semibold mb-2 font-poppins" style={{ color: 'var(--pink)' }}>⭐ Top Vendor Match</p>
            <p className="text-sm font-semibold font-poppins" style={{ color: 'var(--text-primary)' }}>Harare Grand Venue</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Indoor · 200+ guests</p>
            <div className="flex items-center gap-1 mt-2">
              {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="#C9A84C" color="#C9A84C" />)}
              <span className="text-xs ml-1" style={{ color: 'var(--text-secondary)' }}>4.9 (48 reviews)</span>
            </div>
          </div>

          {/* Budget card */}
          <div className="float-card-3 glass-card absolute bottom-16 right-12 w-64 p-4" style={{ boxShadow: '0 16px 40px rgba(28,182,187,0.12)' }}>
            <p className="text-xs font-semibold mb-3 font-poppins" style={{ color: 'var(--teal-deep)' }}>💰 Budget Breakdown</p>
            {[
              { label: 'Catering', pct: 35, color: '#024F5B' },
              { label: 'Venue',    pct: 25, color: '#1CB6BB' },
              { label: 'Decor',    pct: 20, color: '#E9409B' },
            ].map(({ label, pct, color }) => (
              <div key={label} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--text-primary)' }}>{label}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct * 2.86}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
