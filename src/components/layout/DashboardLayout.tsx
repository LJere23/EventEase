'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, CalendarPlus, Calendar, Users, Bookmark,
  Ticket, Settings, LogOut, Menu, X, Bell, Sparkles, Sun, Moon,
  ChevronRight, TrendingUp
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: CalendarPlus, label: 'Create Event', href: '/events/new' },
  { icon: Calendar, label: 'My Events', href: '/events' },
  { icon: Users, label: 'Vendor Bookings', href: '/bookings' },
  { icon: Bookmark, label: 'Saved Vendors', href: '/vendors/saved' },
  { icon: Ticket, label: 'My Tickets', href: '/tickets' },
  { icon: TrendingUp, label: 'Upgrade', href: '/upgrade', accent: true },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <Link href="/">
            <span className="font-poppins font-bold text-xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span style={{ color: 'var(--teal)' }}>Event</span>
              <span style={{ color: 'var(--gold)' }}>Ease</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden" style={{ color: 'var(--text-secondary)' }}>
            <X size={18} />
          </button>
        </div>

        {/* User badge */}
        <div className="p-4 m-4 rounded-xl" style={{ background: 'var(--teal-light)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
              style={{ background: 'var(--teal)', fontFamily: "'Poppins', sans-serif" }}>
              TC
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate font-poppins" style={{ color: 'var(--text-primary)' }}>Tendai Chari</p>
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
                  active
                    ? 'text-white'
                    : item.accent
                    ? 'font-semibold'
                    : ''
                )}
                style={{
                  background: active ? 'var(--teal)' : 'transparent',
                  color: active ? 'white' : item.accent ? 'var(--gold)' : 'var(--text-secondary)',
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
          <button
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-sm transition-colors hover:bg-red-50"
            style={{ color: '#ef4444', fontFamily: "'Poppins', sans-serif" }}
          >
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden bg-black/40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b"
          style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            <Menu size={20} />
          </button>

          <div className="hidden lg:flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <Sparkles size={15} style={{ color: 'var(--teal)' }} />
            AI Planning Ready
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--teal)]" />
            </button>
            <button onClick={toggle} className="theme-toggle">
              <div className="theme-toggle-thumb">
                {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
              </div>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
