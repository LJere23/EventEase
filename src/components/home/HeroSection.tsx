'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star, CalendarCheck, Users } from 'lucide-react';

export function HeroSection() {
  const bloomRef = useRef<SVGSVGElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let gsap: typeof import('gsap').gsap | undefined;
    let DrawSVGPlugin: unknown;

    const init = async () => {
      const gsapMod = await import('gsap');
      gsap = gsapMod.gsap;
      const scrollTriggerMod = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(scrollTriggerMod.ScrollTrigger);

      if (!bloomRef.current) return;
      const lines = bloomRef.current.querySelectorAll('.bloom-line');

      // Draw-in bloom lines on load
      const tl = gsap.timeline({ delay: 0.4 });
      tl.from(lines, {
        opacity: 0,
        scale: 0,
        transformOrigin: 'center center',
        duration: 0.8,
        stagger: { each: 0.06, from: 'center' },
        ease: 'power3.out',
      })
      .to(lines, {
        opacity: 0.15,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '>0.3');

      // Hero content fade in
      gsap.from('.hero-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Floating cards
      gsap.to('.float-card-1', { y: -12, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('.float-card-2', { y: -8, duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.5 });
      gsap.to('.float-card-3', { y: -10, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 });
    };

    init();

    // Bloom on mouse click
    const handleClick = async (e: Event) => {
      const me = e as MouseEvent;
      const { animate } = await import('animejs');
      const count = 12;
      const fragment = document.createDocumentFragment();
      const particles: HTMLElement[] = [];

      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        const angle = (i / count) * Math.PI * 2;
        const dist = 50 + Math.random() * 60;
        el.style.cssText = `
          position:fixed;left:${me.clientX}px;top:${me.clientY}px;
          width:5px;height:5px;border-radius:50%;
          background:${i % 3 === 0 ? '#C9A84C' : '#006D77'};
          pointer-events:none;z-index:9999;transform:translate(-50%,-50%);
        `;
        el.dataset.tx = String(Math.cos(angle) * dist);
        el.dataset.ty = String(Math.sin(angle) * dist);
        fragment.appendChild(el);
        particles.push(el);
      }
      document.body.appendChild(fragment);

      particles.forEach((particle, idx) => {
        animate(particle, {
          translateX: parseFloat(particle.dataset.tx ?? '0'),
          translateY: parseFloat(particle.dataset.ty ?? '0'),
          opacity: [1, 0],
          scale: [1, 0],
          duration: 600,
          delay: idx * 20,
          easing: 'easeOutExpo',
          complete: () => particle.remove(),
        });
      });
    };

    const btn = document.querySelector('.hero-cta');
    btn?.addEventListener('click', handleClick);
    return () => btn?.removeEventListener('click', handleClick);
  }, []);

  // Magnetic effect on CTA
  useEffect(() => {
    const initMagnetic = async () => {
      const { gsap } = await import('gsap');
      const btn = document.querySelector('.hero-cta') as HTMLElement;
      if (!btn) return;

      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const zone = rect.width * 0.9;

        if (dist < zone) {
          gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, ease: 'power2.out', duration: 0.4 });
        } else {
          gsap.to(btn, { x: 0, y: 0, ease: 'elastic.out(1,0.4)', duration: 0.7 });
        }
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    };
    initMagnetic();
  }, []);

  return (
    <section ref={heroRef} className="hero-gradient relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Liquid glass SVG filter */}
      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves="3" seed="2" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
            <feSpecularLighting in="noise" surfaceScale="4" specularConstant="1.5" specularExponent="120" lightingColor="rgba(255,255,255,0.7)" result="specular">
              <fePointLight x="50%" y="-30%" z="200"/>
            </feSpecularLighting>
            <feComposite in="specular" in2="displaced" operator="in" result="highlight"/>
            <feComposite in="displaced" in2="highlight" operator="over"/>
          </filter>
        </defs>
      </svg>

      {/* Bloom SVG background */}
      <svg
        ref={bloomRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.6 }}
      >
        <g transform="translate(720,420)">
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const len = i % 4 === 0 ? 340 : i % 2 === 0 ? 280 : 220;
            const isGold = i % 4 === 0;
            return (
              <line
                key={i}
                className="bloom-line"
                x1="0" y1="0"
                x2={Math.cos(angle) * len}
                y2={Math.sin(angle) * len}
                stroke={isGold ? '#C9A84C' : '#006D77'}
                strokeWidth={isGold ? 1.5 : 1}
                strokeLinecap="round"
              />
            );
          })}
        </g>
        {/* Corner accents */}
        <g transform="translate(100,100)">
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <line key={i} className="bloom-line" x1="0" y1="0"
                x2={Math.cos(angle) * 60} y2={Math.sin(angle) * 60}
                stroke="#006D77" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"
              />
            );
          })}
        </g>
        <g transform="translate(1340,800)">
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <line key={i} className="bloom-line" x1="0" y1="0"
                x2={Math.cos(angle) * 60} y2={Math.sin(angle) * 60}
                stroke="#C9A84C" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"
              />
            );
          })}
        </g>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Copy */}
        <div className="hero-content flex flex-col gap-6">
          <div className="badge badge-teal w-fit">
            <Sparkles size={12} />
            AI-Powered Event Planning · Zimbabwe&apos;s First
          </div>

          <h1
            ref={titleRef}
            className="font-poppins font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
          >
            Plan Your{' '}
            <span className="text-gradient">
              Perfect Event
            </span>{' '}
            with AI
          </h1>

          <p className="text-lg leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }}>
            EventEase brings Zimbabwe&apos;s best vendors, AI-powered planning tools, and seamless booking into one beautiful platform. Your event, simplified.
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
          <div className="flex flex-wrap items-center gap-6 pt-4">
            {[
              { icon: Users, label: '500+ Events Planned' },
              { icon: Star, label: '50+ Vetted Vendors' },
              { icon: CalendarCheck, label: 'AI-Generated Checklists' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--teal-light)' }}>
                  <Icon size={14} style={{ color: 'var(--teal)' }} />
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)', fontFamily: "'Poppins', sans-serif" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Floating cards */}
        <div className="hidden lg:block relative h-[520px]">
          {/* Main glass card */}
          <div
            className="float-card-1 glass-card absolute top-8 right-0 w-80 p-6"
            style={{ boxShadow: '0 20px 60px rgba(0,109,119,0.15)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--teal)' }}>
                <Sparkles size={18} color="white" />
              </div>
              <div>
                <p className="font-semibold text-sm font-poppins" style={{ color: 'var(--text-primary)' }}>AI Planning Engine</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Generating your checklist...</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {['Book venue by June 15', 'Confirm caterer quote', 'Send RSVP links', 'Arrange photographer'].map((task, i) => (
                <div key={task} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${i < 2 ? 'bg-[#10b981]' : ''}`}
                    style={i >= 2 ? { border: '1.5px solid var(--border)' } : {}}>
                    {i < 2 && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={i < 2 ? 'line-through opacity-60' : ''}>{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor match card */}
          <div
            className="float-card-2 glass-card absolute top-52 right-56 w-60 p-4"
            style={{ boxShadow: '0 16px 40px rgba(201,168,76,0.12)' }}
          >
            <p className="text-xs font-semibold mb-3 font-poppins" style={{ color: 'var(--gold)' }}>⭐ Top Match</p>
            <p className="text-sm font-semibold font-poppins" style={{ color: 'var(--text-primary)' }}>Harare Grand Venue</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Indoor · 200+ guests · $$</p>
            <div className="flex items-center gap-1 mt-2">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={10} fill="#C9A84C" color="#C9A84C" />
              ))}
              <span className="text-xs ml-1" style={{ color: 'var(--text-secondary)' }}>4.9 (48)</span>
            </div>
          </div>

          {/* Budget card */}
          <div
            className="float-card-3 glass-card absolute bottom-16 right-12 w-64 p-4"
            style={{ boxShadow: '0 16px 40px rgba(0,109,119,0.1)' }}
          >
            <p className="text-xs font-semibold mb-3 font-poppins" style={{ color: 'var(--teal)' }}>💰 Budget Tracker</p>
            {[
              { label: 'Catering', pct: 35, color: '#006D77' },
              { label: 'Venue', pct: 25, color: '#C9A84C' },
              { label: 'Decor', pct: 20, color: '#00c4ce' },
            ].map(({ label, pct, color }) => (
              <div key={label} className="mb-2">
                <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <span>{label}</span><span>{pct}%</span>
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
