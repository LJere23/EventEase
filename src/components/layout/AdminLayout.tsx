'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AnimatedLogo from './AnimatedLogo';
import {
  LayoutDashboard, Store, CreditCard, Users, Calendar,
  BarChart2, Settings, LogOut, Menu, X, Bell, ShieldCheck,
  ChevronRight, Sun, Moon, AlertTriangle,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview',     href: '/admin' },
  { icon: Store,           label: 'Vendors',       href: '/admin/vendors',   badge: 4 },
  { icon: CreditCard,      label: 'Payments',      href: '/admin/payments',  badge: 7 },
  { icon: Users,           label: 'Users',         href: '/admin/users' },
  { icon: Calendar,        label: 'Events',        href: '/admin/events' },
  { icon: BarChart2,       label: 'Analytics',     href: '/admin/analytics' },
  { icon: Settings,        label: 'Settings',      href: '/admin/settings' },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-secondary)' }}>
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        style={{ background: '#071015', borderRight: '1px solid rgba(28,182,187,0.15)' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(28,182,187,0.15)' }}>
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--teal-deep)' }}>
              <ShieldCheck size={16} className="text-white" />
            </div>
            <div>
              <AnimatedLogo size={28} showWordmark={false} />
              <p className="text-xs" style={{ color: 'rgba(160,229,229,0.6)', lineHeight: 1 }}>Admin Panel</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60">
            <X size={18} />
          </button>
        </div>

        {/* Admin badge */}
        <div className="mx-4 my-3 px-3 py-2.5 rounded-xl flex items-center gap-3"
          style={{ background: 'rgba(28,182,187,0.1)', border: '1px solid rgba(28,182,187,0.2)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #024F5B, #741353)' }}>
            A
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Admin</p>
            <p className="text-xs" style={{ color: '#A0E5E5' }}>Super Administrator</p>
          </div>
          <ShieldCheck size={14} style={{ color: '#1CB6BB', flexShrink: 0 }} />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all group"
                style={{
                  background: active ? 'rgba(28,182,187,0.15)' : 'transparent',
                  color: active ? '#1CB6BB' : 'rgba(255,255,255,0.55)',
                  border: active ? '1px solid rgba(28,182,187,0.25)' : '1px solid transparent',
                }}
              >
                <Icon size={17} className="flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: '#E9409B', color: 'white', minWidth: '18px', textAlign: 'center' }}>
                    {item.badge}
                  </span>
                ) : active ? <ChevronRight size={13} /> : null}
              </Link>
            );
          })}
        </nav>

        {/* Quick alerts */}
        <div className="mx-4 mb-3 p-3 rounded-xl" style={{ background: 'rgba(233,64,155,0.1)', border: '1px solid rgba(233,64,155,0.2)' }}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={13} style={{ color: '#E9409B' }} />
            <span className="text-xs font-semibold" style={{ color: '#E9409B' }}>Action Required</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>4 vendors pending approval · 7 payments to verify</p>
        </div>

        <div className="px-3 pb-4 border-t pt-3" style={{ borderColor: 'rgba(28,182,187,0.15)' }}>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm mb-1 transition-colors hover:bg-white/5"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            <LayoutDashboard size={15} /> View Site
          </Link>
          <button onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 rounded-xl w-full text-sm transition-colors hover:bg-white/5"
            style={{ color: 'rgba(239,68,68,0.7)' }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/60" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b"
          style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg" style={{ color: 'var(--text-primary)' }}>
            <Menu size={20} />
          </button>
          <div className="hidden lg:flex items-center gap-2">
            <ShieldCheck size={15} style={{ color: 'var(--teal)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>EventEase Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E9409B]" />
            </button>
            <button onClick={toggle} className="theme-toggle">
              <div className="theme-toggle-thumb">
                {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
              </div>
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #024F5B, #741353)' }}>
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
