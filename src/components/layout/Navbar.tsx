'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedLogo from './AnimatedLogo';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'py-2 backdrop-blur-xl border-b'
        : 'py-4',
    )}
    style={{
      background: scrolled ? 'var(--glass-bg)' : 'transparent',
      borderColor: scrolled ? 'var(--border)' : 'transparent',
    }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AnimatedLogo size={44} showWordmark={false} />
          <span style={{
            fontFamily: "'BlackEcho', serif",
            fontSize: '1.65rem',
            fontWeight: 400,
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}>
            <span style={{ color: '#741353' }}>Event</span>
            <span style={{ color: '#E9409B' }}>Ease</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-[var(--teal)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
            <div className="theme-toggle-thumb">
              {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
            </div>
          </button>
          <Link href="/login" className="btn-ghost py-2 px-5 text-sm">
            Sign In
          </Link>
          <Link href="/register" className="btn-glow py-2 px-5 text-sm btn-ripple">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
            <div className="theme-toggle-thumb">
              {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
            </div>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-2"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border)',
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <Link href="/login" className="btn-ghost text-center text-sm">Sign In</Link>
            <Link href="/register" className="btn-glow text-center text-sm justify-center">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
