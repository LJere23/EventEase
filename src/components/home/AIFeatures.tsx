'use client';
import { useEffect, useRef } from 'react';
import { Sparkles, MessageSquare, Calendar, DollarSign, Users, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Event Checklist',
    description: 'Get a tailored, categorised checklist based on your event type, scale, and timeline — generated in seconds.',
    color: '#006D77',
  },
  {
    icon: Calendar,
    title: 'Smart Timeline',
    description: 'Phase-by-phase planning from months out to day-of. Never miss a critical deadline again.',
    color: '#C9A84C',
  },
  {
    icon: DollarSign,
    title: 'Budget Allocator',
    description: 'AI suggests realistic budget splits across all vendor categories using Zimbabwe market pricing.',
    color: '#00c4ce',
  },
  {
    icon: Users,
    title: 'Vendor Matching',
    description: 'Claude scores and ranks vendors against your specific event parameters — instant shortlist.',
    color: '#8B5CF6',
  },
  {
    icon: MessageSquare,
    title: 'AI Event Assistant',
    description: 'A chat-based assistant that knows your event and answers questions, drafts messages, and takes actions.',
    color: '#E91E8C',
  },
  {
    icon: BarChart3,
    title: 'Post-Event Insights',
    description: 'After your event, get a summary of what happened, who attended, and what was spent — automatically.',
    color: '#F59E0B',
  },
];

export function AIFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.ai-feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      });
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="badge badge-teal mb-4 inline-flex">
            <Sparkles size={12} /> Powered by Claude AI
          </span>
          <h2 className="font-poppins font-bold text-4xl sm:text-5xl mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            AI at Every{' '}
            <span className="text-gradient">Touchpoint</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            EventEase isn&apos;t just a directory — the Anthropic Claude API is woven into every step of your planning journey.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="ai-feature-card card p-6 group hover:border-[var(--teal)] transition-all"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${feat.color}15` }}
                >
                  <Icon size={22} style={{ color: feat.color }} />
                </div>
                <h3 className="font-poppins font-semibold text-base mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  {feat.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Animated demo panel */}
        <div className="mt-16 glass-card p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="badge badge-teal mb-4 inline-flex">Live Demo</span>
              <h3 className="font-poppins font-bold text-3xl mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Watch AI Plan Your Wedding in Seconds
              </h3>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Enter your event details and watch our Claude-powered engine generate a complete plan — checklist, timeline, vendor recommendations, and budget breakdown — instantly.
              </p>
              <a href="/register" className="btn-glow btn-ripple inline-flex">
                Try It Free <Sparkles size={16} />
              </a>
            </div>

            {/* Simulated AI output */}
            <div className="card p-5 font-mono text-sm" style={{ background: 'var(--bg-secondary)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-xs" style={{ color: 'var(--text-secondary)' }}>AI Planning Engine</span>
              </div>
              <div style={{ color: 'var(--teal)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{'>'} </span>
                Event: <span style={{ color: 'var(--gold)' }}>Wedding · 120 guests · June 2026</span>
              </div>
              <div className="mt-3" style={{ color: 'var(--text-primary)' }}>
                <div>✅ <span style={{ color: '#10b981' }}>Checklist generated</span> — 42 tasks across 8 categories</div>
                <div>✅ <span style={{ color: '#10b981' }}>Timeline built</span> — 4 planning phases</div>
                <div>✅ <span style={{ color: '#10b981' }}>Budget allocated</span> — $4,200 across 7 categories</div>
                <div>✅ <span style={{ color: '#10b981' }}>Vendors matched</span> — 6 recommendations</div>
              </div>
              <div className="mt-3 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <div className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse" />
                AI ready for questions...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
