import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CalendarCheck, Users, Ticket, MessageSquare, BarChart3, Bell, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  { icon: CalendarCheck, title: 'Event Planning Tools', description: 'Build a personalised checklist, timeline, and budget plan the moment you create your event. Guided, structured, and always up to date.', color: '#024F5B', badge: 'Core Feature' },
  { icon: Users, title: 'Vendor Marketplace', description: 'Browse and connect with 50+ vetted vendors across catering, venues, photography, decoration, DJs, florists, and more — all in one place.', color: '#1CB6BB', badge: 'Marketplace' },
  { icon: MessageSquare, title: 'Quote & Booking System', description: 'Send quote requests to vendors with one click. Track responses, accept quotes, and manage all bookings from your dashboard.', color: '#741353', badge: 'Booking' },
  { icon: Bell, title: 'RSVP Management', description: 'Create shareable RSVP links for your guests. Track confirmations, send automated reminders, and export your guest list — Premium feature.', color: '#E9409B', badge: 'Premium' },
  { icon: Ticket, title: 'Ticket Sales & QR Codes', description: 'Sell tickets for your event through EventEase. Buyers receive QR-coded tickets by email. Scan at the door with your phone — Premium feature.', color: '#8B920A', badge: 'Premium' },
  { icon: BarChart3, title: 'Budget Tracker', description: 'Set your total budget and allocate it across vendor categories. Track spending against your plan and stay in control throughout — Premium feature.', color: '#024F5B', badge: 'Premium' },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <section className="hero-gradient py-16 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="badge badge-teal mb-4 inline-flex">What We Offer</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Everything You Need to{' '}
              <span className="text-gradient">Plan with Confidence</span>
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              EventEase brings together planning tools, a vetted vendor marketplace, and guest management — all under one roof.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="card p-6 group hover:border-[var(--teal)] transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${s.color}15` }}>
                      <Icon size={22} style={{ color: s.color }} />
                    </div>
                    <span className="badge text-xs"
                      style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}33` }}>
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="font-poppins font-semibold text-base mb-2"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link href="/register" className="btn-glow btn-ripple inline-flex">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <p className="mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>Free plan · No credit card required</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
