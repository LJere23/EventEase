'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowLeft, Building2, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeProvider';
import { Suspense } from 'react';

function RegisterForm() {
  const { theme, toggle } = useTheme();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') === 'vendor' ? 'vendor' : 'user';

  const [role, setRole] = useState<'user' | 'vendor'>(defaultRole);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', businessName: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: 'var(--bg-primary)' }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #006D77 100%)' }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 600 800">
          <g transform="translate(300,400)">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              return (
                <line key={i} x1="0" y1="0"
                  x2={Math.cos(angle) * 300} y2={Math.sin(angle) * 300}
                  stroke="#C9A84C" strokeWidth="1" strokeLinecap="round"
                />
              );
            })}
          </g>
        </svg>

        <Link href="/" className="relative z-10">
          <span className="font-poppins font-bold text-2xl text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Event<span style={{ color: '#C9A84C' }}>Ease</span>
          </span>
        </Link>

        <div className="relative z-10">
          <h2 className="font-poppins font-bold text-4xl text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {role === 'vendor' ? 'Grow Your Event Business' : 'Plan Better Events'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)' }}>
            {role === 'vendor'
              ? 'List your services, receive booking requests, and grow your business with Zimbabwe\'s premier event platform.'
              : 'AI-powered checklists, smart vendor matching, and everything you need for a perfect event — free to start.'
            }
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {(role === 'vendor'
              ? ['Free vendor listing', 'Receive quote requests', 'AI profile optimisation', 'Booking management dashboard']
              : ['AI event checklist & timeline', 'Smart vendor recommendations', 'RSVP management tools', 'Budget tracker & allocator']
            ).map(item => (
              <div key={item} className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#C9A84C' }}>
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
          © 2026 EventEase (Pvt) Ltd · Zimbabwe
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={16} /> Back
          </Link>
          <button onClick={toggle} className="theme-toggle">
            <div className="theme-toggle-thumb">
              {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
            </div>
          </button>
        </div>

        <div className="w-full max-w-md">
          <h1 className="font-poppins font-bold text-3xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Create your account
          </h1>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Already have one?{' '}
            <Link href="/login" style={{ color: 'var(--teal)' }} className="font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          {/* Role toggle */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: 'var(--bg-secondary)' }}>
            {(['user', 'vendor'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: role === r ? 'var(--teal)' : 'transparent',
                  color: role === r ? 'white' : 'var(--text-secondary)',
                }}
              >
                {r === 'user' ? <User size={15} /> : <Building2 size={15} />}
                {r === 'user' ? 'Event Organiser' : 'Service Vendor'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Full name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Tendai Moyo"
                  className="input-field pl-10"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
            </div>

            {role === 'vendor' && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Business name
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                  <input
                    type="text"
                    placeholder="Your Business Name"
                    className="input-field pl-10"
                    value={form.businessName}
                    onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Email address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input-field pl-10"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  className="input-field pl-10 pr-10"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-glow btn-ripple justify-center w-full mt-2"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>
                  <Sparkles size={16} />
                  {role === 'vendor' ? 'List My Business' : 'Start Planning Free'}
                </>
              )}
            </button>

            <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
              By creating an account you agree to our{' '}
              <Link href="/terms" style={{ color: 'var(--teal)' }} className="hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" style={{ color: 'var(--teal)' }} className="hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: 'var(--bg-primary)' }} />}>
      <RegisterForm />
    </Suspense>
  );
}
