import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle, Calendar, Users, DollarSign, Bell, QrCode } from 'lucide-react';
import Link from 'next/link';

const features = [
  { icon: Calendar, title: 'Event Timeline Builder', desc: 'Map out every task, deadline, and milestone with an intuitive drag-and-drop timeline.', color: '#024F5B' },
  { icon: Users, title: 'Vendor Coordination', desc: 'Request quotes, compare offers, and manage all vendor communications in one place.', color: '#1CB6BB' },
  { icon: DollarSign, title: 'Budget Tracker', desc: 'Set a budget, allocate per category, and track actual spend versus estimates in real time.', color: '#741353' },
  { icon: Bell, title: 'RSVP Management', desc: 'Send digital invites and track guest responses, meal preferences, and seating assignments.', color: '#E9409B' },
  { icon: QrCode, title: 'Ticket Sales & Check-in', desc: 'Sell tickets online and use QR code scanning for fast, paperless check-in on the day.', color: '#8B920A' },
  { icon: CheckCircle, title: 'Smart Checklists', desc: 'Smart planning checklists tailored to your event type, size, and timeline to keep you on track.', color: '#1CB6BB' },
];

export default function PlannerPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <section className="hero-gradient py-20 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="badge badge-teal mb-4 inline-flex">Event Planner</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-6"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Plan Any Event,{' '}
              <span className="text-gradient">Start to Finish</span>
            </h1>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Whether it&apos;s an intimate dinner or a 500-guest wedding, EventEase gives you all the tools to plan with confidence — without the chaos.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register" className="btn-glow btn-ripple inline-flex">Start Planning Free</Link>
              <Link href="/vendors" className="btn-ghost inline-flex">Browse Vendors</Link>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl mb-3"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Everything in One Platform
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              No more juggling spreadsheets, WhatsApp groups, and paper lists.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-6">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-poppins font-semibold mb-2"
                  style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-10 text-center">
            <h2 className="font-poppins font-bold text-2xl mb-3"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Ready to get started?
            </h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Create your free account and start planning your next event today.
            </p>
            <Link href="/register" className="btn-glow btn-ripple inline-flex">
              Create Free Account
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
