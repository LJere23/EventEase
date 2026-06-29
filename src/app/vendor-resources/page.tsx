import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, TrendingUp, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    icon: BookOpen,
    title: 'Getting Started Guide',
    desc: 'Set up your vendor profile, upload photos, and list your services in under 10 minutes.',
    color: '#024F5B',
    link: '#',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Bookings',
    desc: 'Best practices for writing compelling service descriptions, pricing, and responding to quote requests.',
    color: '#1CB6BB',
    link: '#',
  },
  {
    icon: Shield,
    title: 'Vendor Standards & Vetting',
    desc: 'Learn about EventEase quality standards and how we verify vendors to maintain client trust.',
    color: '#741353',
    link: '#',
  },
  {
    icon: HelpCircle,
    title: 'FAQs for Vendors',
    desc: 'Answers to common questions about commissions, payment timelines, disputes, and profile management.',
    color: '#E9409B',
    link: '#',
  },
];

export default function VendorResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <section className="hero-gradient py-16 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="badge badge-teal mb-4 inline-flex">Vendor Resources</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Guides, tips, and tools to help your business thrive on the EventEase marketplace.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {resources.map(({ icon: Icon, title, desc, color, link }) => (
              <div key={title} className="card p-6 group">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-poppins font-semibold text-lg mb-2"
                  style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                <a href={link} className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                  style={{ color }}>
                  Read guide <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 text-center">
            <h2 className="font-poppins font-semibold text-2xl mb-3"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Not Yet a Vendor?
            </h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              List your business for free and start receiving quote requests from real clients.
            </p>
            <Link href="/register?role=vendor" className="btn-glow btn-ripple inline-flex">
              List My Business Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
