import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CalendarPlus, Calendar, Users, Sparkles, ArrowRight, CheckCircle, Clock, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const recentEvents = [
  { id: '1', title: 'Tendai & Rudo Wedding', type: 'Wedding', date: 'Jul 15, 2026', status: 'planning', vendors: 4 },
  { id: '2', title: 'Corporate Year-End', type: 'Corporate', date: 'Dec 5, 2026', status: 'planning', vendors: 2 },
];

const quickStats = [
  { label: 'Active Events', value: '2', icon: Calendar, color: '#006D77' },
  { label: 'Vendor Bookings', value: '6', icon: Users, color: '#C9A84C' },
  { label: 'Tasks Completed', value: '18', icon: CheckCircle, color: '#10b981' },
  { label: 'Days to Next Event', value: '16', icon: Clock, color: '#8B5CF6' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-2xl sm:text-3xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
          Good morning, Tendai 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>You have 2 upcoming events and 3 vendor quotes waiting.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
              </div>
              <div className="font-poppins font-bold text-2xl" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Events */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins font-semibold text-lg" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              My Events
            </h2>
            <Link href="/events" className="text-sm flex items-center gap-1" style={{ color: 'var(--teal)' }}>
              See all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            {recentEvents.map(event => (
              <div key={event.id} className="card p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--text-primary)' }}>{event.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{event.type}</span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>·</span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{event.date}</span>
                    <span className="badge badge-teal text-xs">{event.vendors} vendors</span>
                  </div>
                </div>
                <Link href={`/events/${event.id}`} className="flex-shrink-0">
                  <ArrowRight size={18} style={{ color: 'var(--teal)' }} />
                </Link>
              </div>
            ))}
          </div>

          <Link href="/events/new" className="btn-glow btn-ripple inline-flex">
            <CalendarPlus size={16} /> Create New Event
          </Link>
        </div>

        {/* AI Assistant */}
        <div>
          <h2 className="font-poppins font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            AI Event Assistant
          </h2>
          <div className="card p-5 flex flex-col gap-3 h-80">
            <div className="flex-1 overflow-y-auto flex flex-col gap-3">
              <div
                className="flex gap-3"
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--teal)' }}>
                  <Sparkles size={13} color="white" />
                </div>
                <div className="text-sm p-3 rounded-xl rounded-tl-none flex-1" style={{ background: 'var(--teal-light)', color: 'var(--text-primary)' }}>
                  Hi Tendai! I&apos;m your AI event assistant. Ask me anything about your upcoming wedding or corporate event. 🎉
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-10">
                {['What should I book first?', 'How many waiters do I need?', 'Draft my RSVP message'].map(q => (
                  <button key={q} className="text-left text-xs px-3 py-2 rounded-lg border transition-colors hover:border-[var(--teal)]"
                    style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <input
                className="input-field flex-1 text-sm py-2"
                placeholder="Ask the AI assistant..."
              />
              <button className="btn-glow py-2 px-3 text-sm flex-shrink-0">
                <Sparkles size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade prompt */}
      <div className="mt-6 card p-6 flex items-center justify-between gap-4" style={{ borderColor: 'var(--gold)', background: 'rgba(201,168,76,0.05)' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Star size={16} style={{ color: 'var(--gold)' }} />
            <p className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              You&apos;re on the Free Plan
            </p>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Upgrade to Premium for RSVP management, ticket sales, unlimited vendor quotes, and more.
          </p>
        </div>
        <Link href="/upgrade" className="btn-3d flex-shrink-0 py-2 px-4 text-sm flex items-center gap-2">
          <TrendingUp size={14} /> Upgrade
        </Link>
      </div>
    </DashboardLayout>
  );
}
