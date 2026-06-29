'use client';
import { useRef } from 'react';
import { Sparkles, MessageSquare, Calendar, DollarSign, Users, BarChart3 } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const features = [
  { icon: Sparkles,     title: 'Smart Planning Checklists', description: 'Get a tailored, categorised checklist based on your event type, scale, and timeline — built to match your exact event.', color: '#024F5B' },
  { icon: Calendar,     title: 'Timeline Builder',          description: 'Phase-by-phase planning from months out to day-of. Map every task, deadline, and milestone in one place.',             color: '#8B920A' },
  { icon: DollarSign,   title: 'Budget Tracker',            description: 'Set your total budget, allocate per category, and track actual spend vs estimates in real time.',                       color: '#1CB6BB' },
  { icon: Users,        title: 'Vendor Marketplace',        description: 'Browse vetted local vendors, request quotes, compare offers, and manage all bookings in one dashboard.',                color: '#741353' },
  { icon: MessageSquare,title: 'Quote & Booking System',    description: 'Send quote requests directly to vendors, negotiate, and confirm bookings — no WhatsApp back-and-forth needed.',         color: '#E9409B' },
  { icon: BarChart3,    title: 'RSVP & Ticket Management',  description: 'Send digital invites, track guest responses, sell tickets, and run QR code check-in on the day.',                      color: '#024F5B' },
];

export function AIFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef, '.feature-card', { staggerMs: 90, durationMs: 600, yPx: 32 });

  return (
    <section ref={sectionRef} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="badge badge-teal mb-4 inline-flex">Platform Features</span>
          <h2 className="font-poppins font-bold text-4xl sm:text-5xl mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Everything You Need, <span className="text-gradient">In One Place</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            No more juggling spreadsheets, WhatsApp groups, and paper lists. EventEase brings every part of event planning into a single, easy-to-use platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map(feat => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="feature-card card p-6 group hover:border-[var(--teal)] transition-all">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${feat.color}15` }}>
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

        {/* Demo panel */}
        <div className="glass-card p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="badge badge-teal mb-4 inline-flex"><Sparkles size={12} /> Powered by AI</span>
              <h3 className="font-poppins font-bold text-3xl mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Let AI Handle the Heavy Lifting
              </h3>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Describe your event and our AI engine generates a complete plan — checklist, timeline, vendor recommendations, and budget breakdown — instantly.
              </p>
              <a href="/register" className="btn-glow btn-ripple inline-flex">
                Try It Free <Sparkles size={16} />
              </a>
            </div>
            <div className="card p-5 font-mono text-sm" style={{ background: 'var(--bg-secondary)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-xs" style={{ color: 'var(--text-secondary)' }}>EventEase AI Planner</span>
              </div>
              <div style={{ color: 'var(--teal)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{'> '}</span>
                Event: <span style={{ color: '#8B920A' }}>Wedding · 120 guests · June 2026</span>
              </div>
              <div className="mt-3 flex flex-col gap-1" style={{ color: 'var(--text-primary)' }}>
                <div>✅ <span style={{ color: '#1CB6BB' }}>Checklist generated</span> — 42 tasks, 8 categories</div>
                <div>✅ <span style={{ color: '#1CB6BB' }}>Timeline built</span> — 4 planning phases</div>
                <div>✅ <span style={{ color: '#1CB6BB' }}>Budget allocated</span> — USD 4,200 across 7 categories</div>
                <div>✅ <span style={{ color: '#1CB6BB' }}>Vendors matched</span> — 6 recommendations</div>
              </div>
              <div className="mt-3 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--teal)' }} />
                Ready for your next event...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
