'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, CalendarPlus, Calendar, Users, Bookmark,
  Ticket, Settings, LogOut, Menu, X, Bell, Sparkles, Sun, Moon,
  ChevronRight, TrendingUp, Store
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import AnimatedLogo from './AnimatedLogo';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',      href: '/dashboard' },
  { icon: CalendarPlus,    label: 'Create Event',   href: '/events/new' },
  { icon: Calendar,        label: 'My Events',      href: '/events' },
  { icon: Users,           label: 'Vendor Bookings',href: '/bookings' },
  { icon: Bookmark,        label: 'Saved Vendors',  href: '/vendors/saved' },
  { icon: Ticket,          label: 'My Tickets',     href: '/tickets' },
  { icon: TrendingUp,      label: 'Upgrade',        href: '/upgrade', accent: true },
  { icon: Settings,        label: 'Settings',       href: '/settings' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const name: string =
        user.user_metadata?.full_name ||
        user.email?.split('@')[0] ||
        'User';
      setUserName(name);
      const parts = name.trim().split(' ');
      setUserInitials(
        parts.length >= 2
          ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
          : name.slice(0, 2).toUpperCase()
      );
    });
  }, []);

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
        style={{ background: 'var(--bg-primary)', borderRight: '1px solid var(--border)' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <AnimatedLogo size={36} showWordmark={false} />
            <span style={{ fontFamily: "'BlackEcho', serif", fontSize: '1.35rem', fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1 }}>
              <span style={{ color: '#741353' }}>Event</span>
              <span style={{ color: '#E9409B' }}>Ease</span>
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden" style={{ color: 'var(--text-secondary)' }}>
            <X size={18} />
          </button>
        </div>

        {/* User badge */}
        <div className="p-4 m-4 rounded-xl" style={{ background: 'var(--primary-light)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
              style={{ background: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>
              {userInitials || '…'}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate font-poppins" style={{ color: 'var(--text-primary)' }}>
                {userName || 'Loading…'}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Free Plan</p>
            </div>
          </div>
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
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all group',
                  active ? 'text-white' : item.accent ? 'font-semibold' : ''
                )}
                style={{
                  background: active ? 'var(--teal-deep)' : 'transparent',
                  color: active ? 'white' : item.accent ? 'var(--pink)' : 'var(--text-secondary)',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <Icon size={17} className="flex-shrink-0" />
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <Link
            href="/vendor-dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm mb-1 transition-colors hover:bg-[var(--bg-secondary)]"
            style={{ color: 'var(--text-secondary)', fontFamily: "'Poppins', sans-serif" }}
          >
            <Store size={16} /> Vendor Dashboard
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-sm transition-colors hover:bg-red-50"
            style={{ color: '#ef4444', fontFamily: "'Poppins', sans-serif" }}
          >
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b"
          style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
        >
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg" style={{ color: 'var(--text-primary)' }}>
            <Menu size={20} />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <Sparkles size={15} style={{ color: 'var(--teal)' }} />
            Event Planning Dashboard
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--teal)]" />
            </button>
            <button onClick={toggle} className="theme-toggle">
              <div className="theme-toggle-thumb">{theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}</div>
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
