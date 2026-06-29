'use client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 'USD 0',
    period: '/month',
    features: ['3 active events', 'Basic vendor search', 'RSVP management (up to 50 guests)', 'Email support'],
    current: true,
    color: '#1CB6BB',
  },
  {
    name: 'Premium',
    price: 'USD 15',
    period: '/month',
    features: [
      'Unlimited events',
      'Priority vendor quotes',
      'Unlimited RSVP & ticketing',
      'Budget tracker',
      'QR code check-in',
      'Smart planning checklists',
      'Priority support',
    ],
    current: false,
    color: '#741353',
    highlight: true,
  },
  {
    name: 'Pro Planner',
    price: 'USD 35',
    period: '/month',
    features: [
      'Everything in Premium',
      'Up to 5 client accounts',
      'White-label event pages',
      'Analytics dashboard',
      'Dedicated account manager',
    ],
    current: false,
    color: '#8B920A',
  },
];

export default function UpgradePage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Upgrade Your Plan
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Choose the plan that fits your needs.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div
              key={plan.name}
              className="card p-6 flex flex-col"
              style={plan.highlight ? {
                borderColor: plan.color,
                boxShadow: `0 0 0 1px ${plan.color}40`,
              } : {}}
            >
              {plan.highlight && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start"
                  style={{ background: `${plan.color}15`, color: plan.color }}>
                  Most Popular
                </span>
              )}
              <h2 className="font-poppins font-bold text-xl mb-1"
                style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                {plan.name}
              </h2>
              <div className="mb-6">
                <span className="font-poppins font-bold text-3xl" style={{ color: plan.color, fontFamily: "'Poppins', sans-serif" }}>
                  {plan.price}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-2 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              {plan.current ? (
                <div className="text-center text-sm font-semibold py-2 rounded-xl"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                  Current Plan
                </div>
              ) : (
                <button
                  className="btn-glow btn-ripple w-full justify-center"
                  style={plan.highlight ? {} : { background: `${plan.color}`, boxShadow: 'none' }}
                  onClick={() => alert('Payment instructions will be sent to your email.')}
                >
                  <Zap size={14} /> Upgrade to {plan.name}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="card p-6 mt-8" style={{ background: 'var(--primary-light)' }}>
          <h3 className="font-poppins font-semibold mb-2"
            style={{ color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>
            How to Pay
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            We accept EcoCash, InnBucks, and bank transfers. After selecting a plan, you&apos;ll receive payment instructions via email. Your upgrade is activated within 2 business hours of payment confirmation.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
