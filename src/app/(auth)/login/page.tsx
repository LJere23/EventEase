'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Sun, Moon, ArrowRight, CheckCircle } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeProvider';
import { createClient } from '@/lib/supabase/client';
import AnimatedLogo from '@/components/layout/AnimatedLogo';

type View = 'login' | 'forgot' | 'reset-sent';

export default function LoginPage() {
  const { theme, toggle } = useTheme();
  const router = useRouter();
  const [view, setView] = useState<View>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (authError) {
      if (authError.message.toLowerCase().includes('email not confirmed')) {
        setError('Please verify your email first — check your inbox for the confirmation link.');
      } else if (authError.message.toLowerCase().includes('invalid')) {
        setError('Incorrect email or password. Try again or use "Forgot password?" below.');
      } else {
        setError(authError.message);
      }
      return;
    }
    // Read role from user metadata first (always available), then fall back to profiles table
    const metaRole = data.user.user_metadata?.role as string | undefined;
    let role = metaRole;
    if (!role) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
      role = (profileData as { role?: string } | null)?.role;
    }
    if (role === 'vendor') router.push('/vendor-dashboard');
    else if (role === 'admin') router.push('/admin');
    else router.push('/dashboard');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setLoading(false);
    if (resetError) { setError(resetError.message); return; }
    setView('reset-sent');
  };

  const branding = (
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
      <AnimatedLogo size={80} showWordmark={false} className="mb-2" />
      <div className="relative z-10">
        <h2 className="font-poppins font-bold text-4xl text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Welcome back to EventEase
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>
          Your events, vendors, and planning tools are ready for you.
        </p>
        <div className="mt-10 flex flex-col gap-3">
          {["500+ events successfully planned", "50+ vetted vendors on the platform", "Personalised checklists & timelines", "Zimbabwe's leading event platform"].map(item => (
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
  );

  const topBar = (
    <div className="w-full max-w-md flex items-center justify-between mb-8">
      {view !== 'login' ? (
        <button onClick={() => { setView('login'); setError(''); }}
          className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} /> Back to sign in
        </button>
      ) : (
        <Link href="/" className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} /> Back home
        </Link>
      )}
      <div className="flex items-center gap-3">
        <span className="lg:hidden">
          <AnimatedLogo size={32} showWordmark={false} />
        </span>
        <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
          <div className="theme-toggle-thumb">{theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}</div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: 'var(--bg-primary)' }}>
      {branding}

      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        {topBar}

        {/* ── Login form ── */}
        {view === 'login' && (
          <div className="w-full max-w-md">
            <h1 className="font-poppins font-bold text-3xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Sign in
            </h1>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
              No account?{' '}
              <Link href="/register" className="font-semibold hover:underline" style={{ color: 'var(--teal-deep)' }}>Create one free</Link>
            </p>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: '#E9409B15', color: '#E9409B', border: '1px solid #E9409B30' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" required className="input-field"
                    style={{ paddingLeft: '42px', paddingRight: '44px' }}
                    value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute top-1/2 -translate-y-1/2" style={{ right: '14px', color: 'var(--text-secondary)' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="text-right -mt-2">
                <button type="button" onClick={() => { setView('forgot'); setResetEmail(form.email); setError(''); }}
                  className="text-sm hover:underline" style={{ color: 'var(--teal-deep)' }}>
                  Forgot password?
                </button>
              </div>

              <button type="submit" disabled={loading} className="btn-glow btn-ripple justify-center w-full"
                style={{ opacity: loading ? 0.75 : 1 }}>
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" style={{ animation: 'spin 0.7s linear infinite' }} /> Signing in...</>
                  : 'Sign In'}
              </button>
            </form>

            <div className="relative flex items-center my-6">
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <span className="px-4 text-xs" style={{ color: 'var(--text-secondary)' }}>or</span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>
            <Link href="/register?role=vendor" className="btn-ghost w-full justify-center">Join as a Vendor</Link>
          </div>
        )}

        {/* ── Forgot password form ── */}
        {view === 'forgot' && (
          <div className="w-full max-w-md">
            <h1 className="font-poppins font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Reset your password
            </h1>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
              Enter your account email and we&apos;ll send you a reset link.
            </p>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: '#E9409B15', color: '#E9409B', border: '1px solid #E9409B30' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Email address</label>
                <div className="relative">
                  <Mail size={16} className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ left: '14px', color: 'var(--text-secondary)' }} />
                  <input type="email" placeholder="you@example.com" required className="input-field" style={{ paddingLeft: '42px' }}
                    value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-glow btn-ripple justify-center w-full"
                style={{ opacity: loading ? 0.75 : 1 }}>
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" style={{ animation: 'spin 0.7s linear infinite' }} /> Sending...</>
                  : <><ArrowRight size={15} /> Send Reset Link</>}
              </button>
            </form>
          </div>
        )}

        {/* ── Reset email sent ── */}
        {view === 'reset-sent' && (
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #024F5B, #1CB6BB)' }}>
              <CheckCircle size={36} color="white" />
            </div>
            <h1 className="font-poppins font-bold text-2xl mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Reset link sent!
            </h1>
            <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>We emailed a password reset link to:</p>
            <p className="font-semibold text-lg mb-6" style={{ color: 'var(--teal-deep)' }}>{resetEmail}</p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Click the link in that email to set a new password. Check your spam folder if you don&apos;t see it.
            </p>
            <button onClick={() => { setView('login'); setError(''); }}
              className="btn-glow btn-ripple justify-center w-full">
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
