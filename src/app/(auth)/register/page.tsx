'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Building2, Sun, Moon, CheckCircle } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeProvider';
import { createClient } from '@/lib/supabase/client';
import AnimatedLogo from '@/components/layout/AnimatedLogo';

function RegisterForm() {
  const { theme, toggle } = useTheme();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') === 'vendor' ? 'vendor' : 'user';

  const [role, setRole] = useState<'user' | 'vendor'>(defaultRole);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', businessName: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
          role: role === 'vendor' ? 'vendor' : 'organiser',
        },
      },
    });
    if (authError) { setError(authError.message); setLoading(false); return; }
    if (role === 'vendor' && data.user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from('vendor_profiles').insert({
        user_id: data.user.id,
        business_name: form.businessName || form.name,
        category: 'Other',
        city: 'Harare',
      });
    }
    setLoading(false);
    setSubmittedEmail(form.email);
    setSubmitted(true);
  };

  const userFeatures = ['Personalised checklists & timelines', 'Smart vendor recommendations', 'RSVP management tools', 'Budget planner & tracker'];
  const vendorFeatures = ['Free business listing', 'Receive unlimited quote requests', 'Booking management dashboard', 'Customer review system'];

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: 'var(--bg-primary)' }}>
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #024F5B 0%, #741353 100%)' }}>
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 600 800">
          <g transform="translate(300,400)">
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return <line key={i} x1="0" y1="0"
                x2={parseFloat((Math.cos(a)*280).toFixed(2))} y2={parseFloat((Math.sin(a)*280).toFixed(2))}
                stroke="white" strokeWidth="1" strokeLinecap="round" />;
            })}
          </g>
        </svg>
        <AnimatedLogo size={80} showWordmark={false} />
        <div className="relative z-10">
          <h2 className="font-poppins font-bold text-4xl text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {role === 'vendor' ? 'Grow Your Event Business' : 'Plan Better Events'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>
            {role === 'vendor'
              ? "List your services, receive booking requests, and grow with Zimbabwe's leading event platform."
              : "Find vetted vendors, build your plan, and manage everything — free to start."}
          </p>
          <div className="mt-10 flex flex-col gap-3">
            {(role === 'vendor' ? vendorFeatures : userFeatures).map(item => (
              <div key={item} className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.9)' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1CB6BB' }}>
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs relative z-10" style={{ color: 'rgba(255,255,255,0.45)' }}>© 2026 EventEase (Pvt) Ltd · Zimbabwe</p>
      </div>

      {/* Right form / success */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={16} /> Back home
          </Link>
          <div className="flex items-center gap-3">
            <span className="lg:hidden"><AnimatedLogo size={32} showWordmark={false} /></span>
            <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
              <div className="theme-toggle-thumb">{theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}</div>
            </button>
          </div>
        </div>

        {submitted ? (
          /* ── Email verification notice ── */
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #024F5B, #1CB6BB)' }}>
              <Mail size={36} color="white" />
            </div>
            <h1 className="font-poppins font-bold text-2xl mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Check your inbox
            </h1>
            <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>
              We've sent a verification link to:
            </p>
            <p className="font-semibold text-lg mb-6" style={{ color: 'var(--teal-deep)' }}>{submittedEmail}</p>
            <div className="card p-5 text-left mb-6">
              {[
                { step: '1', text: 'Open the email from EventEase' },
                { step: '2', text: 'Click "Confirm your account"' },
                { step: '3', text: 'You\'ll be redirected to sign in' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-center gap-3 py-2.5" style={{ borderBottom: step !== '3' ? '1px solid var(--border)' : 'none' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'var(--teal-deep)' }}>{step}</div>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{text}</p>
                </div>
              ))}
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Didn't receive it? Check your spam folder, or{' '}
              <button onClick={() => setSubmitted(false)} className="font-semibold hover:underline" style={{ color: 'var(--teal-deep)' }}>
                try again
              </button>.
            </p>
            <Link href="/login" className="btn-glow btn-ripple justify-center w-full">
              Go to Sign In
            </Link>
          </div>
        ) : (
          /* ── Registration form ── */
          <div className="w-full max-w-md">
            <h1 className="font-poppins font-bold text-3xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Create your account
            </h1>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Already have one?{' '}
              <Link href="/login" className="font-semibold hover:underline" style={{ color: 'var(--teal-deep)' }}>Sign in</Link>
            </p>

            <div className="flex rounded-xl p-1 mb-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              {(['user', 'vendor'] as const).map(r => (
                <button key={r} onClick={() => setRole(r)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    background: role === r ? 'var(--teal-deep)' : 'transparent',
                    color: role === r ? 'white' : 'var(--text-secondary)',
                  }}>
                  {r === 'user' ? <User size={15} /> : <Building2 size={15} />}
                  {r === 'user' ? 'Event Organiser' : 'Service Vendor'}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: '#E9409B15', color: '#E9409B', border: '1px solid #E9409B30' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Full name</label>
                <div className="relative">
                  <User size={16} className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ left: '14px', color: 'var(--text-secondary)' }} />
                  <input type="text" placeholder="Leslie Jere" required className="input-field" style={{ paddingLeft: '42px' }}
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
              </div>

              {role === 'vendor' && (
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Business name</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ left: '14px', color: 'var(--text-secondary)' }} />
                    <input type="text" placeholder="Your Business Name" required className="input-field" style={{ paddingLeft: '42px' }}
                      value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))} />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Email address</label>
                <div className="relative">
                  <Mail size={16} className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ left: '14px', color: 'var(--text-secondary)' }} />
                  <input type="email" placeholder="you@example.com" required className="input-field" style={{ paddingLeft: '42px' }}
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ left: '14px', color: 'var(--text-secondary)' }} />
                  <input type={showPass ? 'text' : 'password'} placeholder="At least 8 characters" required minLength={8}
                    className="input-field" style={{ paddingLeft: '42px', paddingRight: '44px' }}
                    value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute top-1/2 -translate-y-1/2" style={{ right: '14px', color: 'var(--text-secondary)' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-glow btn-ripple justify-center w-full mt-1"
                style={{ opacity: loading ? 0.75 : 1 }}>
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" style={{ animation: 'spin 0.7s linear infinite' }} /> Creating account...</>
                  : role === 'vendor' ? 'List My Business' : 'Start Planning Free'}
              </button>

              <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
                By creating an account you agree to our{' '}
                <Link href="/terms" className="hover:underline" style={{ color: 'var(--teal-deep)' }}>Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="hover:underline" style={{ color: 'var(--teal-deep)' }}>Privacy Policy</Link>.
              </p>
            </form>
          </div>
        )}
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
