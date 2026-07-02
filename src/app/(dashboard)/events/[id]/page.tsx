'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import {
  Calendar, Users, DollarSign, MapPin, CheckCircle, Clock,
  ArrowLeft, Package, ChevronRight, Store, Loader2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface TaskItem { task: string; done: boolean; }
interface ChecklistCat { category: string; tasks: TaskItem[]; }
interface VendorRec { name: string; category: string; reason: string; }

interface DBEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  guests: number;
  budget: number | null;
  venue: string | null;
  city: string | null;
  description: string | null;
  status: string;
  ai_plan: {
    checklist?: ChecklistCat[];
    timeline?: { phase: string; tasks: string[] }[];
    budgetAllocation?: Record<string, number>;
    vendors?: VendorRec[];
  } | null;
}

const typeEmoji: Record<string, string> = {
  wedding: '💍', birthday: '🎂', corporate: '🏢', graduation: '🎓',
  'baby-shower': '🎀', church: '⛪', funeral: '🕊️', other: '🎉',
};
const typeColor: Record<string, string> = {
  wedding: '#E9409B', birthday: '#E9409B', corporate: '#024F5B',
  graduation: '#1CB6BB', 'baby-shower': '#741353', church: '#8B920A', other: '#E9409B',
};

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [event, setEvent] = useState<DBEvent | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const sb = createClient();
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { window.location.href = '/login'; return; }
      const { data, error } = await sb
        .from('events')
        .select('id, title, type, date, guests, budget, venue, city, description, status, ai_plan')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();
      if (error || !data) { setNotFound(true); }
      else { setEvent(data as DBEvent); }
    });
  }, [id]);

  if (notFound) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-20">
          <h2 className="font-poppins font-bold text-2xl mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Event not found
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>This event doesn't exist or was deleted.</p>
          <Link href="/events" className="btn-glow btn-ripple inline-flex">
            <ArrowLeft size={14} /> Back to My Events
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  if (!event) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto py-20 text-center">
          <Loader2 size={28} className="animate-spin inline-block" style={{ color: 'var(--teal)' }} />
        </div>
      </DashboardLayout>
    );
  }

  const checklist = event.ai_plan?.checklist ?? [];
  const vendors = event.ai_plan?.vendors ?? [];
  const timeline = event.ai_plan?.timeline ?? [];
  const budgetAllocation = event.ai_plan?.budgetAllocation ?? {};
  const allTasks = checklist.flatMap(c => c.tasks);
  const doneCount = allTasks.filter(t => t.done).length;
  const budgetNum = event.budget ?? 0;
  const color = typeColor[event.type] ?? '#E9409B';
  const emoji = typeEmoji[event.type] ?? '🎉';

  const browsVendors = () => {
    sessionStorage.setItem('ee-planning-event', event.id);
    window.location.href = '/vendors';
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Back + Browse Vendors */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/events" className="flex items-center gap-1 text-sm hover:underline" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={14} /> Back to My Events
          </Link>
          <button onClick={browsVendors} className="btn-glow btn-ripple">
            <Store size={14} /> Browse Vendors
          </button>
        </div>

        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{emoji}</div>
              <div>
                <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="badge badge-teal text-xs capitalize">{event.type}</span>
                  <span className="badge text-xs capitalize" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                    {event.status}
                  </span>
                </div>
                {event.description && (
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
            {[
              { icon: Calendar, label: 'Date', value: event.date || 'TBD', c: '#024F5B' },
              { icon: Users, label: 'Guests', value: `${event.guests} guests`, c: '#E9409B' },
              { icon: MapPin, label: 'Venue', value: event.venue ? `${event.venue}${event.city ? ', ' + event.city : ''}` : 'TBD', c: '#1CB6BB' },
              { icon: DollarSign, label: 'Budget', value: budgetNum > 0 ? `USD ${budgetNum.toLocaleString()}` : '—', c: '#8B920A' },
            ].map(({ icon: Icon, label, value, c }) => (
              <div key={label}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={13} style={{ color: c }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Budget tracker */}
          {budgetNum > 0 && (
            <div className="card p-5">
              <h2 className="font-poppins font-semibold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Budget Allocation
              </h2>
              {Object.keys(budgetAllocation).length > 0 ? (
                <div className="flex flex-col gap-3">
                  {Object.entries(budgetAllocation).map(([cat, pct]) => (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize" style={{ color: 'var(--text-primary)' }}>{cat}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {pct}% · USD {Math.round((budgetNum * pct) / 100).toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min(pct * 2.86, 100)}%`, background: 'var(--teal-deep)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total budget: USD {budgetNum.toLocaleString()}</p>
              )}
            </div>
          )}

          {/* Checklist */}
          {checklist.length > 0 && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Planning Checklist
                </h2>
                <span className="text-xs" style={{ color: 'var(--teal)' }}>
                  {doneCount}/{allTasks.length} done
                </span>
              </div>
              <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                {checklist.map(cat => (
                  <div key={cat.category}>
                    <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--teal)' }}>{cat.category}</p>
                    {cat.tasks.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-0.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? '' : 'border-2'}`}
                          style={{ background: item.done ? 'var(--teal-deep)' : 'transparent', borderColor: item.done ? 'transparent' : 'var(--border)' }}>
                          {item.done && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <span className="text-sm" style={{ color: item.done ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: item.done ? 'line-through' : 'none' }}>
                          {item.task}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <button onClick={browsVendors} className="w-full mt-4 text-xs font-semibold py-2 rounded-xl transition-all"
                style={{ background: 'var(--teal-light)', color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>
                <Store size={11} className="inline mr-1" /> Browse Vendors While Checking Off Tasks
              </button>
            </div>
          )}

          {/* Timeline */}
          {timeline.length > 0 && (
            <div className="card p-5">
              <h2 className="font-poppins font-semibold mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                <Clock size={16} className="inline mr-2" style={{ color: color }} />
                Planning Timeline
              </h2>
              <div className="flex flex-col gap-4">
                {timeline.map((phase, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={12} style={{ color }} />
                      <span className="text-xs font-bold uppercase tracking-wide" style={{ color }}>{phase.phase}</span>
                    </div>
                    <ul className="flex flex-col gap-1 pl-5">
                      {phase.tasks.map((t, ti) => (
                        <li key={ti} className="text-xs" style={{ color: 'var(--text-secondary)' }}>• {t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vendors */}
          {vendors.length > 0 && (
            <div className="card p-5 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Recommended Vendors
                </h2>
                <button onClick={browsVendors} className="text-xs flex items-center gap-0.5" style={{ color: 'var(--teal)' }}>
                  Find vendors <ChevronRight size={12} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {vendors.map((v, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary-light)' }}>
                        <Package size={14} style={{ color: 'var(--teal-deep)' }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{v.name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{v.category}</p>
                      </div>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{v.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
