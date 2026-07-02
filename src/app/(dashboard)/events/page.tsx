'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { CalendarPlus, Calendar, ArrowRight, Users, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface DBEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  guests: number;
  status: string;
  ai_plan: { checklist?: { category: string; tasks: { done: boolean }[] }[] } | null;
}

const typeEmoji: Record<string, string> = {
  wedding: '💍', birthday: '🎂', corporate: '🏢', graduation: '🎓',
  'baby-shower': '🎀', church: '⛪', funeral: '🕊️', other: '🎉',
  Wedding: '💍', Birthday: '🎂', Corporate: '🏢', Graduation: '🎓',
};

export default function EventsPage() {
  const [events, setEvents] = useState<DBEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sb = createClient();
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      const { data, error: err } = await sb
        .from('events')
        .select('id, title, type, date, guests, status, ai_plan')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (err) { setError(true); }
      else if (data) { setEvents(data as DBEvent[]); }
      setLoading(false);
    });
  }, []);

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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin" style={{ color: 'var(--teal)' }} />
        </div>
      ) : error ? (
        <div className="card p-12 text-center">
          <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Couldn&apos;t load events</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Make sure the database schema has been applied in Supabase.
          </p>
        </div>
      ) : events.length === 0 ? (
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
          {events.map(event => {
            const tasks = event.ai_plan?.checklist?.flatMap(c => c.tasks) ?? [];
            const done = tasks.filter(t => t.done).length;
            const emoji = typeEmoji[event.type] ?? '🎉';
            return (
              <div key={event.id} className="card p-5 hover:border-[var(--teal)] transition-all group">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-poppins font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                      <span>{emoji}</span> {event.title}
                    </h3>
                    <span className="badge badge-teal text-xs mt-1 capitalize">{event.type}</span>
                  </div>
                  <span className="badge badge-green text-xs flex-shrink-0 capitalize">{event.status}</span>
                </div>

                <div className="flex flex-col gap-2 text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {event.date && (
                    <span className="flex items-center gap-2">
                      <Calendar size={13} /> {event.date}
                    </span>
                  )}
                  {event.guests > 0 && (
                    <span className="flex items-center gap-2">
                      <Users size={13} /> {event.guests} guests
                    </span>
                  )}
                  {tasks.length > 0 && (
                    <span className="text-xs" style={{ color: 'var(--teal)' }}>
                      {done}/{tasks.length} tasks done
                    </span>
                  )}
                </div>

                {tasks.length > 0 && (
                  <div className="h-1.5 rounded-full mb-3" style={{ background: 'var(--border)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.round((done / tasks.length) * 100)}%`, background: 'var(--teal-deep)' }} />
                  </div>
                )}

                <Link
                  href={`/events/${event.id}`}
                  className="flex items-center justify-between text-sm font-medium pt-3 border-t"
                  style={{ color: 'var(--teal)', borderColor: 'var(--border)' }}
                >
                  View Event <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}

          <Link href="/events/new" className="card p-5 border-dashed flex flex-col items-center justify-center gap-3 hover:border-[var(--teal)] transition-all min-h-44 group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--teal-light)' }}>
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
