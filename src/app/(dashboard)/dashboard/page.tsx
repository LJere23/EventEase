import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CalendarPlus, Calendar, Users, CheckCircle, Clock, Star, TrendingUp, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const recentEvents = [
  { id: '1', title: 'Tendai & Rudo Wedding', type: 'Wedding', date: 'Jul 15, 2026', status: 'planning', vendors: 4, tasks: 18, done: 7 },
  { id: '2', title: 'Corporate Year-End Dinner', type: 'Corporate', date: 'Dec 5, 2026', status: 'planning', vendors: 2, tasks: 12, done: 2 },
];

const quickStats = [
  { label: 'Active Events', value: '2', icon: Calendar, color: 'var(--teal-deep)', lightBg: 'rgba(28,182,187,0.1)' },
  { label: 'Vendor Bookings', value: '6', icon: Users, color: 'var(--pink)', lightBg: 'rgba(233,64,155,0.1)' },
  { label: 'Tasks Done', value: '18', icon: CheckCircle, color: '#16a34a', lightBg: 'rgba(22,163,74,0.1)' },
  { label: 'Days to Event', value: '16', icon: Clock, color: 'var(--plum)', lightBg: 'rgba(116,19,83,0.1)' },
];

const quickActions = [
  { label: 'Create an Event', href: '/events/new', icon: CalendarPlus, desc: 'Start planning something new' },
  { label: 'Browse Vendors', href: '/vendors', icon: Users, desc: 'Find the right services' },
  { label: 'Go Premium', href: '/upgrade', icon: TrendingUp, desc: 'Unlock RSVP & ticket tools' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-2xl sm:text-3xl mb-1"
          style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
          Good morning, Tendai 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          You have 2 upcoming events. 3 vendor quotes are waiting for your review.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
                style={{ background: stat.lightBg }}>
                <Icon size={19} style={{ color: stat.color }} />
              </div>
              <div className="font-poppins font-bold text-2xl" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* My Events */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins font-semibold text-lg" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              My Events
            </h2>
            <Link href="/events" className="text-sm flex items-center gap-1 font-medium"
              style={{ color: 'var(--teal-deep)' }}>
              See all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            {recentEvents.map(event => (
              <div key={event.id} className="card p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--text-primary)' }}>{event.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge badge-teal text-xs">{event.type}</span>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{event.date}</span>
                    </div>
                  </div>
                  <span className="badge badge-green text-xs flex-shrink-0">{event.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span>{event.vendors} vendors</span>
                    <span>{event.done}/{event.tasks} tasks</span>
                  </div>
                  <Link href={`/events/${event.id}`}
                    className="text-sm font-medium flex items-center gap-1"
                    style={{ color: 'var(--teal-deep)' }}>
                    View <ArrowRight size={13} />
                  </Link>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.round((event.done / event.tasks) * 100)}%`, background: 'var(--teal-deep)' }} />
                </div>
              </div>
            ))}
          </div>

          <Link href="/events/new" className="btn-glow btn-ripple inline-flex">
            <CalendarPlus size={16} /> Plan a New Event
          </Link>
        </div>

        {/* Quick actions + AI assistant */}
        <div className="flex flex-col gap-4">
          {/* Quick actions */}
          <div>
            <h2 className="font-poppins font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Quick Actions
            </h2>
            <div className="flex flex-col gap-2">
              {quickActions.map(a => {
                const Icon = a.icon;
                return (
                  <Link key={a.label} href={a.href} className="card p-4 flex items-center gap-3 hover:border-[var(--teal)] transition-all group">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--primary-light)' }}>
                      <Icon size={16} style={{ color: 'var(--teal-deep)' }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm font-poppins" style={{ color: 'var(--text-primary)' }}>{a.label}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{a.desc}</p>
                    </div>
                    <ArrowRight size={14} className="ml-auto flex-shrink-0" style={{ color: 'var(--teal-deep)' }} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* AI assistant preview */}
          <div>
            <h2 className="font-poppins font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Planning Assistant
            </h2>
            <div className="card p-4 flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--teal-deep)' }}>
                  <Sparkles size={13} color="white" />
                </div>
                <div className="text-sm p-3 rounded-xl rounded-tl-none flex-1"
                  style={{ background: 'var(--primary-light)', color: 'var(--text-primary)' }}>
                  Hi Tendai! Ask me anything about your upcoming events.
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {['What should I book first for my wedding?', 'How many waiters for 150 guests?'].map(q => (
                  <button key={q} className="text-left text-xs px-3 py-2 rounded-lg border transition-colors hover:border-[var(--teal)]"
                    style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <input className="input-field flex-1 text-sm py-2 pl-3" placeholder="Ask a question..." />
                <button className="btn-glow py-2 px-3 text-sm flex-shrink-0">
                  <MessageSquare size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade prompt */}
      <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderColor: 'rgba(233,64,155,0.3)', background: 'rgba(233,64,155,0.04)' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Star size={16} style={{ color: 'var(--pink)' }} />
            <p className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              You&apos;re on the Free Plan
            </p>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Upgrade to Premium for RSVP management, ticket sales, unlimited vendor quotes, and more.
          </p>
        </div>
        <Link href="/upgrade" className="btn-3d flex-shrink-0 py-2 px-5 text-sm flex items-center gap-2">
          <TrendingUp size={14} /> Upgrade Now
        </Link>
      </div>
    </DashboardLayout>
  );
}
