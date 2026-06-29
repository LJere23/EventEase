import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { CalendarPlus, Calendar, ArrowRight, MapPin, Users } from 'lucide-react';

const events = [
  { id: '1', title: 'Tendai & Rudo Wedding', type: 'Wedding', date: 'Jul 15, 2026', guests: 150, status: 'planning', vendors: 4 },
  { id: '2', title: 'Q4 Corporate Dinner', type: 'Corporate', date: 'Dec 5, 2026', guests: 80, status: 'planning', vendors: 2 },
];

export default function EventsPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            My Events
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>All your upcoming and past events</p>
        </div>
        <Link href="/events/new" className="btn-glow btn-ripple">
          <CalendarPlus size={16} /> Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="card p-16 text-center">
          <Calendar size={48} className="mx-auto mb-4" style={{ color: 'var(--teal)', opacity: 0.4 }} />
          <h3 className="font-poppins font-semibold text-xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            No events yet
          </h3>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Create your first event and let AI build your complete plan.
          </p>
          <Link href="/events/new" className="btn-glow btn-ripple inline-flex">
            Create Your First Event
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map(event => (
            <div key={event.id} className="card p-5 hover:border-[var(--teal)] transition-all group">
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    {event.title}
                  </h3>
                  <span className="badge badge-teal text-xs mt-1">{event.type}</span>
                </div>
                <span className="badge badge-green text-xs flex-shrink-0">{event.status}</span>
              </div>

              <div className="flex flex-col gap-2 text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-2">
                  <Calendar size={13} /> {event.date}
                </span>
                <span className="flex items-center gap-2">
                  <Users size={13} /> {event.guests} guests
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={13} /> {event.vendors} vendors booked
                </span>
              </div>

              <Link
                href={`/events/${event.id}`}
                className="flex items-center justify-between text-sm font-medium pt-3 border-t"
                style={{ color: 'var(--teal)', borderColor: 'var(--border)' }}
              >
                View Event <ArrowRight size={14} />
              </Link>
            </div>
          ))}

          {/* New event card */}
          <Link href="/events/new" className="card p-5 border-dashed flex flex-col items-center justify-center gap-3 hover:border-[var(--teal)] transition-all min-h-44 group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'var(--teal-light)' }}>
              <CalendarPlus size={22} style={{ color: 'var(--teal)' }} />
            </div>
            <span className="font-poppins font-semibold text-sm" style={{ color: 'var(--teal)', fontFamily: "'Poppins', sans-serif" }}>
              Create New Event
            </span>
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
