import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle, X, Sparkles, Building2, Star } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for individuals planning a single event.',
    cta: 'Get Started Free',
    href: '/register',
    features: [
      { label: 'Create up to 3 events', included: true },
      { label: 'AI checklist & timeline', included: true, note: 'Basic' },
      { label: 'AI event assistant', included: true, note: 'Limited (10 messages)' },
      { label: 'Browse vendor marketplace', included: true },
      { label: 'Send 3 quote requests/month', included: true },
      { label: 'RSVP management', included: false },
      { label: 'Ticket sales', included: false },
      { label: 'Budget tracker', included: false },
      { label: 'Priority support', included: false },
    ],
    color: '#006D77',
    popular: false,
  },
  {
    name: 'Premium',
    price: 'Admin-set',
    period: '/month',
    description: 'For event organisers who need the full suite of tools.',
    cta: 'Go Premium',
    href: '/register?plan=premium',
    features: [
      { label: 'Unlimited events', included: true },
      { label: 'AI checklist & timeline', included: true, note: 'Full' },
      { label: 'AI event assistant', included: true, note: 'Unlimited' },
      { label: 'Browse vendor marketplace', included: true },
      { label: 'Unlimited quote requests', included: true },
      { label: 'RSVP management', included: true },
      { label: 'Ticket sales with QR codes', included: true },
      { label: 'Budget tracker & allocator', included: true },
      { label: 'Priority support', included: false },
    ],
    color: '#C9A84C',
    popular: true,
  },
  {
    name: 'Corporate',
    price: 'Admin-set',
    period: '/month',
    description: 'For organisations running multiple events and teams.',
    cta: 'Contact Us',
    href: '/contact?plan=corporate',
    features: [
      { label: 'Everything in Premium', included: true },
      { label: 'Multiple team members', included: true },
      { label: 'Dedicated account manager', included: true },
      { label: 'Custom branding', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'API access', included: true },
      { label: 'SLA guarantee', included: true },
      { label: 'Priority support', included: true },
    ],
    color: '#1A1A2E',
    popular: false,
  },
];

const vendorPlans = [
  {
    name: 'Vendor Basic',
    description: 'List your business and receive quote requests.',
    features: ['Business profile listing', 'Receive unlimited quote requests', 'Booking management', 'Review system', 'Performance analytics'],
  },
  {
    name: 'Vendor Pro',
    description: 'Enhanced visibility with featured placement and AI tools.',
    features: ['Everything in Basic', 'Featured placement in search', 'Homepage feature slot', 'AI profile optimisation', 'Priority in vendor recommendations', 'Advanced analytics dashboard'],
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="hero-gradient py-16 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="badge badge-teal mb-4 inline-flex">Pricing</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Simple, Transparent{' '}
              <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Start free. Upgrade when you&apos;re ready. All prices set by admin and always shown transparently.
            </p>
          </div>
        </section>

        {/* User Plans */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-poppins font-bold text-2xl text-center mb-10" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            For Event Organisers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`card p-7 flex flex-col relative ${plan.popular ? 'ring-2' : ''}`}
                style={{ borderColor: plan.popular ? 'var(--gold)' : undefined, outline: plan.popular ? '2px solid var(--gold)' : undefined, outlineOffset: '-2px' }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge badge-gold text-xs flex items-center gap-1">
                      <Star size={10} fill="var(--gold)" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="font-poppins font-semibold text-sm mb-1" style={{ color: plan.color, fontFamily: "'Poppins', sans-serif" }}>
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-poppins font-bold text-4xl" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                      {plan.price}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{plan.period}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{plan.description}</p>
                </div>

                <ul className="flex flex-col gap-3 flex-1 mb-6">
                  {plan.features.map(feat => (
                    <li key={feat.label} className="flex items-start gap-2 text-sm">
                      {feat.included
                        ? <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#10b981' }} />
                        : <X size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--text-secondary)' }} />
                      }
                      <span style={{ color: feat.included ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {feat.label}
                        {feat.note && <span className="ml-1 text-xs" style={{ color: 'var(--text-secondary)' }}>({feat.note})</span>}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`w-full text-center justify-center ${plan.popular ? 'btn-3d' : 'btn-ghost'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Payment methods */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="card p-6">
            <h3 className="font-poppins font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Zimbabwe-Friendly Payment Methods
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              We accept local payment methods. Pay and upload proof — admin verifies within 4 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['EcoCash', 'InnBucks', 'Bank Transfer', 'ZimSwitch', 'USD Cash'].map(method => (
                <span key={method} className="badge badge-teal">{method}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Vendor Plans */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Building2 size={20} style={{ color: 'var(--teal)' }} />
            <h2 className="font-poppins font-bold text-2xl" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              For Vendors & Service Providers
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {vendorPlans.map(plan => (
              <div key={plan.name} className="card p-7">
                <p className="font-poppins font-bold text-xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  {plan.name}
                </p>
                <p className="text-sm mb-2" style={{ color: 'var(--teal)' }}>Pricing set by admin</p>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>{plan.description}</p>
                <ul className="flex flex-col gap-2.5 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                      <CheckCircle size={15} style={{ color: '#10b981' }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register?role=vendor" className="btn-ghost w-full justify-center">
                  List My Business
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Commission note */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 text-center">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            <Sparkles size={13} className="inline mr-1" style={{ color: 'var(--teal)' }} />
            Commission rates on vendor bookings are configurable by admin and vary by category. Contact us for current rates.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
