'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronDown, ChevronUp, X, Calendar, DollarSign,
  ArrowUpRight, Search, ChevronRight,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const CATEGORY_VENDOR_MAP: Record<string, string> = {
  venue: 'Venue',
  catering: 'Catering',
  photography: 'Photography',
  videography: 'Photography',
  décor: 'Decoration',
  decor: 'Decoration',
  florist: 'Florist',
  flowers: 'Florist',
  entertainment: 'DJ & Entertainment',
  dj: 'DJ & Entertainment',
  hair: 'Hair & Makeup',
  makeup: 'Hair & Makeup',
  mc: 'MC',
  equipment: 'Equipment Hire',
};

function getVendorCategory(checklistCategory: string): string | null {
  const lower = checklistCategory.toLowerCase();
  for (const [key, vendor] of Object.entries(CATEGORY_VENDOR_MAP)) {
    if (lower.includes(key)) return vendor;
  }
  return null;
}

interface TaskItem { task: string; done: boolean; }
interface ChecklistCat { category: string; tasks: TaskItem[]; }

interface PlanningEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  guests: number;
  budget: number | null;
  status: string;
  ai_plan: {
    checklist?: ChecklistCat[];
    budgetAllocation?: Record<string, number>;
    vendors?: unknown[];
  } | null;
}

const TYPE_EMOJI: Record<string, string> = {
  wedding: '💍', birthday: '🎂', corporate: '🏢', graduation: '🎓',
  'baby-shower': '🎀', church: '⛪', funeral: '🕊️', other: '🎉',
};

export function PlanningBubble() {
  const [events, setEvents] = useState<PlanningEvent[]>([]);
  const [activeEvent, setActiveEvent] = useState<PlanningEvent | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const sbRef = useRef(createClient());

  useEffect(() => {
    const sb = sbRef.current;
    sb.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      const { data } = await sb
        .from('events')
        .select('id, title, type, date, guests, budget, status, ai_plan')
        .eq('user_id', user.id)
        .in('status', ['planning', 'confirmed'])
        .order('created_at', { ascending: false });
      if (!data || data.length === 0) { setLoading(false); return; }
      const typed = data as PlanningEvent[];
      setEvents(typed);
      const storedId = sessionStorage.getItem('ee-planning-event');
      const active = storedId ? (typed.find(e => e.id === storedId) ?? typed[0]) : typed[0];
      setActiveEvent(active);
      setLoading(false);
    });
  }, []);

  const toggleTask = useCallback(async (catIdx: number, taskIdx: number) => {
    if (!activeEvent?.ai_plan?.checklist) return;
    const newChecklist = activeEvent.ai_plan.checklist.map((cat, ci) =>
      ci !== catIdx ? cat : {
        ...cat,
        tasks: cat.tasks.map((t, ti) => ti !== taskIdx ? t : { ...t, done: !t.done }),
      }
    );
    const newAiPlan = { ...activeEvent.ai_plan, checklist: newChecklist };
    const updated = { ...activeEvent, ai_plan: newAiPlan };
    setActiveEvent(updated);
    setEvents(all => all.map(e => e.id === updated.id ? updated : e));
    sbRef.current
      .from('events')
      .update({ ai_plan: newAiPlan as Record<string, unknown> })
      .eq('id', updated.id)
      .then(() => {});
  }, [activeEvent]);

  const switchEvent = (id: string) => {
    const found = events.find(e => e.id === id);
    if (found) { setActiveEvent(found); sessionStorage.setItem('ee-planning-event', id); }
  };

  const toggleCat = (cat: string) => {
    setExpandedCats(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  };

  if (loading || !activeEvent || dismissed) return null;

  const checklist = activeEvent.ai_plan?.checklist ?? [];
  const allTasks = checklist.flatMap(c => c.tasks);
  const doneTasks = allTasks.filter(t => t.done).length;
  const progress = allTasks.length > 0 ? Math.round((doneTasks / allTasks.length) * 100) : 0;
  const emoji = TYPE_EMOJI[activeEvent.type] ?? '🎉';
  const pendingCats = checklist.filter(c => c.tasks.some(t => !t.done)).length;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 rounded-2xl shadow-2xl overflow-hidden"
      style={{
        width: '292px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
      }}
    >
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-3 py-2.5 text-white gap-2"
        style={{ background: 'linear-gradient(135deg, var(--teal-deep) 0%, #013a44 100%)' }}
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-base leading-none">{emoji}</span>
          <div className="flex-1 min-w-0 text-left">
            <p className="font-poppins font-semibold text-xs truncate leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {activeEvent.title}
            </p>
            <p className="text-xs opacity-60 leading-snug">
              {pendingCats === 0 ? 'All done!' : `${pendingCats} section${pendingCats !== 1 ? 's' : ''} to sort`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {expanded ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          <div
            role="button"
            onClick={e => { e.stopPropagation(); setDismissed(true); }}
            className="ml-0.5 p-1 rounded-md hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            <X size={11} />
          </div>
        </div>
      </button>

      {expanded && (
        <div className="overflow-y-auto" style={{ maxHeight: '460px' }}>
          {/* Progress + meta */}
          <div className="px-3 pt-3 pb-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              <span>{doneTasks} of {allTasks.length} tasks done</span>
              <span style={{ color: progress === 100 ? '#16a34a' : 'var(--teal)', fontWeight: 600 }}>{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: progress === 100 ? '#16a34a' : 'var(--teal-deep)' }}
              />
            </div>
            <div className="flex flex-wrap gap-3 mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              {activeEvent.date && (
                <span className="flex items-center gap-1">
                  <Calendar size={10} /> {activeEvent.date}
                </span>
              )}
              {activeEvent.budget && (
                <span className="flex items-center gap-1">
                  <DollarSign size={10} /> USD {Number(activeEvent.budget).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Checklist */}
          {checklist.length > 0 && (
            <div className="px-3 pt-2.5 pb-1">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-secondary)', fontFamily: "'Poppins', sans-serif", fontSize: '10px' }}>
                Planning Checklist
              </p>
              <div className="flex flex-col gap-0.5">
                {checklist.map((cat, catIdx) => {
                  const catDone = cat.tasks.filter(t => t.done).length;
                  const allCatDone = catDone === cat.tasks.length && cat.tasks.length > 0;
                  const isOpen = expandedCats.has(cat.category);
                  const vendorCat = getVendorCategory(cat.category);

                  return (
                    <div key={cat.category}>
                      <div
                        className="flex items-center gap-1.5 py-1.5 px-1.5 rounded-xl transition-colors"
                        style={{ background: isOpen ? 'var(--bg-secondary)' : 'transparent' }}
                      >
                        {/* Checkbox indicator */}
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: allCatDone ? '#16a34a' : 'transparent',
                            border: allCatDone ? 'none' : '2px solid var(--border)',
                          }}
                        >
                          {allCatDone && (
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>

                        <button
                          className="flex items-center gap-1 flex-1 min-w-0 text-left"
                          onClick={() => toggleCat(cat.category)}
                        >
                          <span
                            className="text-xs flex-1 truncate"
                            style={{
                              color: allCatDone ? 'var(--text-secondary)' : 'var(--text-primary)',
                              textDecoration: allCatDone ? 'line-through' : 'none',
                              fontWeight: allCatDone ? 400 : 500,
                            }}
                          >
                            {cat.category}
                          </span>
                          <span
                            className="text-xs flex-shrink-0 mx-1"
                            style={{ color: allCatDone ? '#16a34a' : 'var(--text-secondary)' }}
                          >
                            {catDone}/{cat.tasks.length}
                          </span>
                          <ChevronRight
                            size={10}
                            className="flex-shrink-0 transition-transform duration-150"
                            style={{
                              color: 'var(--text-secondary)',
                              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                            }}
                          />
                        </button>

                        {/* Find vendor quick-link */}
                        {!allCatDone && vendorCat && (
                          <Link
                            href={`/vendors?category=${encodeURIComponent(vendorCat)}`}
                            title={`Find ${vendorCat} vendors`}
                            className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-lg transition-colors"
                            style={{ background: 'var(--teal-light)', color: 'var(--teal-deep)' }}
                            onClick={e => e.stopPropagation()}
                          >
                            <Search size={9} />
                          </Link>
                        )}
                      </div>

                      {/* Tasks */}
                      {isOpen && (
                        <div className="ml-4 mb-1 flex flex-col gap-0.5">
                          {cat.tasks.map((task, taskIdx) => (
                            <button
                              key={taskIdx}
                              onClick={() => toggleTask(catIdx, taskIdx)}
                              className="flex items-start gap-2 text-left py-1 px-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors w-full"
                            >
                              <div
                                className="w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 mt-px transition-all"
                                style={{
                                  borderColor: task.done ? 'var(--teal)' : 'var(--border)',
                                  background: task.done ? 'var(--teal)' : 'transparent',
                                }}
                              >
                                {task.done && (
                                  <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                                    <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                              <span
                                className="text-xs leading-snug"
                                style={{
                                  color: task.done ? 'var(--text-secondary)' : 'var(--text-primary)',
                                  textDecoration: task.done ? 'line-through' : 'none',
                                  opacity: task.done ? 0.55 : 1,
                                }}
                              >
                                {task.task}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Event switcher */}
          {events.length > 1 && (
            <div className="px-3 py-2.5" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--text-secondary)', fontFamily: "'Poppins', sans-serif", fontSize: '10px' }}>
                Switch Event
              </p>
              <select
                className="text-xs w-full rounded-xl px-2 py-1.5 border outline-none"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                value={activeEvent.id}
                onChange={e => switchEvent(e.target.value)}
              >
                {events.map(ev => (
                  <option key={ev.id} value={ev.id}>
                    {TYPE_EMOJI[ev.type] ?? '🎉'} {ev.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Footer */}
          <div className="px-3 pb-3 pt-2" style={{ borderTop: events.length > 1 ? 'none' : '1px solid var(--border)' }}>
            <Link
              href={`/events/${activeEvent.id}`}
              className="flex items-center justify-center gap-1.5 w-full text-xs font-semibold py-2 rounded-xl transition-all hover:opacity-90"
              style={{ background: 'var(--teal-light)', color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}
            >
              Full Event Details <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
