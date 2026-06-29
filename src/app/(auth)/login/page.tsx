'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function LoginPage() {
  const { theme, toggle } = useTheme();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Supabase auth
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: 'var(--bg-primary)' }}>
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #006D77 0%, #004a52 100%)' }}
      >
        {/* Bloom decoration */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 600 800">
          <g transform="translate(300,400)">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              return (
                <line key={i} x1="0" y1="0"
                  x2={Math.cos(angle) * 300} y2={Math.sin(angle) * 300}
                  stroke="white" strokeWidth="1" strokeLinecap="round"
                />
              );
            })}
          </g>
        </svg>

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <span className="font-poppins font-bold text-2xl text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Event<span style={{ color: '#C9A84C' }}>Ease</span>
          </span>
        </Link>

        <div className="relative z-10">
          <div className="badge mb-6 inline-flex" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
            <Sparkles size={12} /> AI-Powered Planning
          </div>
          <h2 className="font-poppins font-bold text-4xl text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Welcome back to EventEase
          </h2>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Your events, vendors, and AI planning tools are waiting for you.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {['500+ events planned', '50+ vetted vendors', 'AI checklist generator', 'Zimbabwe\'s #1 platform'].map(item => (
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

      {/* Right panel — form */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        {/* Mobile logo + controls */}
        <div className="w-full max-w-md flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="flex items-center gap-3">
            <span className="lg:hidden font-poppins font-bold text-xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span style={{ color: 'var(--teal)' }}>Event</span>
              <span style={{ color: 'var(--gold)' }}>Ease</span>
            </span>
            <button onClick={toggle} className="theme-toggle">
              <div className="theme-toggle-thumb">
                {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
              </div>
            </button>
          </div>
        </div>

        <div className="w-full max-w-md">
          <h1 className="font-poppins font-bold text-3xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Sign in
          </h1>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: 'var(--teal)' }} className="font-semibold hover:underline">
              Create one free
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
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

            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-sm hover:underline" style={{ color: 'var(--teal)' }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-glow btn-ripple justify-center w-full"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="relative flex items-center my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="px-4 text-xs" style={{ color: 'var(--text-secondary)' }}>or continue as</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <Link
            href="/register?role=vendor"
            className="btn-ghost w-full justify-center"
          >
            Sign in as a Vendor
          </Link>
        </div>
      </div>
    </div>
  );
}
