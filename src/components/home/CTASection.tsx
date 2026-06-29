'use client';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div
          className="glass-card p-12 sm:p-16 relative overflow-hidden"
          style={{ boxShadow: '0 32px 80px rgba(0,109,119,0.15)' }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 50%, #006D77 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <span className="badge badge-teal mb-6 inline-flex">
              <Sparkles size={12} /> Start Free · No Credit Card
            </span>
            <h2 className="font-poppins font-bold text-4xl sm:text-5xl mb-6" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Ready to Plan Your{' '}
              <span className="text-gradient">Perfect Event?</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Join hundreds of Zimbabweans already using EventEase to plan smarter, connect with amazing vendors, and celebrate in style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-glow btn-ripple text-center justify-center">
                Start Planning Free
                <ArrowRight size={18} />
              </Link>
              <Link href="/register?role=vendor" className="btn-3d text-center justify-center">
                List Your Business
              </Link>
            </div>

            <p className="mt-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Free plan · No credit card required · Setup in 2 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
