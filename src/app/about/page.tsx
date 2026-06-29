import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Heart, Target, Lightbulb, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <section className="hero-gradient py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge badge-teal mb-4 inline-flex">About EventEase</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-6"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Built for Zimbabwe,{' '}
              <span className="text-gradient">Designed for Everyone</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              EventEase was created to solve a real problem: planning an event in Zimbabwe means calling dozens of people, scrolling Facebook groups, and hoping for the best. We built the platform we always wished existed.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <span className="badge badge-pink mb-4 inline-flex">Our Story</span>
              <h2 className="font-poppins font-bold text-3xl mb-4"
                style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Founded by Vimbai S. Chari
              </h2>
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                EventEase (Pvt) Ltd was founded with a clear mission: to ease the burden of event coordination by creating a platform that is easy to use, affordable, and delivers real results.
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Zimbabwe&apos;s event industry is vibrant and active — weddings, graduations, corporate dinners, church events. Yet there was no centralised, trusted platform connecting organisers with service providers. EventEase fills that gap.
              </p>
            </div>
            <div className="glass-card p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Events Planned', value: '500+' },
                  { label: 'Vetted Vendors', value: '50+' },
                  { label: 'Event Categories', value: '12' },
                  { label: 'Client Satisfaction', value: '98%' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="font-poppins font-bold text-3xl mb-1"
                      style={{ color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>{s.value}</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {[
              { icon: Target, title: 'Our Mission', body: 'To ease the burden of event coordination through an easy-to-use, affordable platform that delivers real-time results.', color: '#024F5B' },
              { icon: Lightbulb, title: 'Our Vision', body: 'To become Zimbabwe\'s leading event planning platform and expand into broader African markets.', color: '#1CB6BB' },
              { icon: Heart, title: 'Our Values', body: 'Simplicity, reliability, and putting our users first — every feature we build starts with a real need.', color: '#E9409B' },
              { icon: Users, title: 'Our Community', body: 'Serving individuals, professional event planners, and corporations across Zimbabwe with equal care.', color: '#741353' },
            ].map(({ icon: Icon, title, body, color }) => (
              <div key={title} className="card p-6">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-poppins font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/register" className="btn-glow btn-ripple inline-flex">Join EventEase Today</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
