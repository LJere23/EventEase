'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import AnimatedLogo from '@/components/layout/AnimatedLogo';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) { setError(updateError.message); return; }
    setDone(true);
    setTimeout(() => router.push('/login'), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <AnimatedLogo size={80} showWordmark={false} />
        </div>

        <div className="card p-8">
          {done ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #024F5B, #1CB6BB)' }}>
                <CheckCircle size={28} color="white" />
              </div>
              <h2 className="font-poppins font-bold text-xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Password updated!
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>Redirecting you to sign in…</p>
            </div>
          ) : (
            <>
              <h1 className="font-poppins font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Set new password
              </h1>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Choose a strong password for your account.</p>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: '#E9409B15', color: '#E9409B', border: '1px solid #E9409B30' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>New password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ left: '14px', color: 'var(--text-secondary)' }} />
                    <input type={showPass ? 'text' : 'password'} required minLength={8} placeholder="At least 8 characters"
                      className="input-field" style={{ paddingLeft: '42px', paddingRight: '44px' }}
                      value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute top-1/2 -translate-y-1/2" style={{ right: '14px', color: 'var(--text-secondary)' }}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Confirm password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ left: '14px', color: 'var(--text-secondary)' }} />
                    <input type={showPass ? 'text' : 'password'} required minLength={8} placeholder="Repeat password"
                      className="input-field" style={{ paddingLeft: '42px' }}
                      value={confirm} onChange={e => setConfirm(e.target.value)} />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-glow btn-ripple justify-center w-full mt-1"
                  style={{ opacity: loading ? 0.75 : 1 }}>
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" style={{ animation: 'spin 0.7s linear infinite' }} /> Updating...</>
                    : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
