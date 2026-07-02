'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Sparkles, Calendar, Users, DollarSign, MapPin, ChevronRight,
  ChevronLeft, CheckCircle, Clock, Loader2, Plus, Trash2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const EVENT_TYPES = [
  { value: 'wedding', label: 'Wedding', emoji: '💍' },
  { value: 'birthday', label: 'Birthday', emoji: '🎂' },
  { value: 'corporate', label: 'Corporate', emoji: '🏢' },
  { value: 'graduation', label: 'Graduation', emoji: '🎓' },
  { value: 'baby-shower', label: 'Baby Shower', emoji: '👶' },
  { value: 'church', label: 'Church Event', emoji: '⛪' },
  { value: 'funeral', label: 'Memorial', emoji: '🕊️' },
  { value: 'other', label: 'Other', emoji: '🎉' },
];

const VENUE_PREFS = [
  { value: 'indoor', label: 'Indoor venue', emoji: '🏛️' },
  { value: 'outdoor', label: 'Outdoor/garden', emoji: '🌿' },
  { value: 'own', label: 'I have a venue', emoji: '🏠' },
  { value: 'find', label: 'Help me find one', emoji: '🔍' },
];

interface ChecklistItem { task: string; done: boolean; }
interface ChecklistCategory { category: string; tasks: ChecklistItem[]; }

interface AIResult {
  checklist: ChecklistCategory[];
  timeline: { phase: string; tasks: string[] }[];
  budget: Record<string, number>;
  vendors: { name: string; category: string; reason: string }[];
}

const FALLBACK: AIResult = {
  checklist: [
    { category: 'Venue & Logistics', tasks: [{ task: 'Confirm venue booking', done: false }, { task: 'Arrange parking', done: false }, { task: 'Check accessibility', done: false }] },
    { category: 'Catering', tasks: [{ task: 'Finalize menu', done: false }, { task: 'Confirm dietary requirements', done: false }, { task: 'Arrange serving staff', done: false }] },
    { category: 'Décor & Flowers', tasks: [{ task: 'Book decorator', done: false }, { task: 'Choose colour scheme', done: false }, { task: 'Order floral arrangements', done: false }] },
    { category: 'Entertainment', tasks: [{ task: 'Book DJ or band', done: false }, { task: 'Create playlist', done: false }, { task: 'Arrange MC', done: false }] },
    { category: 'Photography', tasks: [{ task: 'Book photographer', done: false }, { task: 'Brief on key shots', done: false }, { task: 'Plan photo timeline', done: false }] },
  ],
  timeline: [
    { phase: '3 Months Out', tasks: ['Book venue', 'Book caterer', 'Send save-the-dates'] },
    { phase: '1 Month Out', tasks: ['Confirm all vendors', 'Send invitations', 'Plan seating'] },
    { phase: '1 Week Out', tasks: ['Final vendor briefs', 'Confirm guest count', 'Prepare payment'] },
    { phase: 'Day Of', tasks: ['Vendor arrival check', 'Run of show', 'Enjoy your event!'] },
  ],
  budget: { venue: 35, catering: 30, photography: 15, decor: 12, entertainment: 8 },
  vendors: [
    { name: 'Harare Grand Events', category: 'Venue', reason: 'Top-rated indoor venue for your guest count' },
    { name: 'Royal Cuisine Catering', category: 'Catering', reason: 'Specialises in your event type and cuisine style' },
    { name: 'Lens & Light Photography', category: 'Photography', reason: 'Award-winning wedding photography in Harare' },
  ],
};

export default function CreateEventPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [newTask, setNewTask] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    title: '',
    eventType: '',
    date: '',
    guestCount: '',
    budget: '',
    venuePreference: '',
    theme: '',
    requirements: '',
  });

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const generatePlan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-event-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      // Validate response has expected shape; fall back if not
      if (data?.checklist && Array.isArray(data.checklist)) {
        // Normalise tasks to {task, done} objects
        const normalised: AIResult = {
          ...data,
          checklist: data.checklist.map((cat: { category: string; tasks: (string | ChecklistItem)[] }) => ({
            category: cat.category,
            tasks: cat.tasks.map((t: string | ChecklistItem) =>
              typeof t === 'string' ? { task: t, done: false } : t
            ),
          })),
        };
        setAiResult(normalised);
      } else {
        setAiResult(FALLBACK);
      }
    } catch {
      setAiResult(FALLBACK);
    }
    setLoading(false);
    setStep(4);
  };

  const toggleTask = (catIdx: number, taskIdx: number) => {
    setAiResult(prev => {
      if (!prev) return prev;
      const checklist = prev.checklist.map((cat, ci) =>
        ci !== catIdx ? cat : {
          ...cat,
          tasks: cat.tasks.map((t, ti) => ti !== taskIdx ? t : { ...t, done: !t.done }),
        }
      );
      return { ...prev, checklist };
    });
  };

  const addTask = (catIdx: number) => {
    const text = (newTask[catIdx] || '').trim();
    if (!text) return;
    setAiResult(prev => {
      if (!prev) return prev;
      const checklist = prev.checklist.map((cat, ci) =>
        ci !== catIdx ? cat : { ...cat, tasks: [...cat.tasks, { task: text, done: false }] }
      );
      return { ...prev, checklist };
    });
    setNewTask(n => ({ ...n, [catIdx]: '' }));
  };

  const removeTask = (catIdx: number, taskIdx: number) => {
    setAiResult(prev => {
      if (!prev) return prev;
      const checklist = prev.checklist.map((cat, ci) =>
        ci !== catIdx ? cat : { ...cat, tasks: cat.tasks.filter((_, ti) => ti !== taskIdx) }
      );
      return { ...prev, checklist };
    });
  };

  const STEPS = ['Event Details', 'Preferences', 'Budget', 'AI Plan'];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl sm:text-3xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Create New Event
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Tell us about your event and AI will build your complete plan.</p>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {STEPS.map((label, i) => {
            const num = i + 1;
            const done = step > num;
            const active = step === num;
            return (
              <div key={label} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold font-poppins transition-all"
                    style={{
                      background: done ? '#10b981' : active ? 'var(--teal)' : 'var(--border)',
                      color: done || active ? 'white' : 'var(--text-secondary)',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {done ? <CheckCircle size={16} /> : num}
                  </div>
                  <span className="text-sm font-medium font-poppins hidden sm:block"
                    style={{ color: active ? 'var(--teal)' : done ? '#10b981' : 'var(--text-secondary)', fontFamily: "'Poppins', sans-serif" }}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-8 h-px flex-shrink-0" style={{ background: done ? '#10b981' : 'var(--border)' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Event Details */}
        {step === 1 && (
          <div className="card p-6 sm:p-8">
            <h2 className="font-poppins font-semibold text-xl mb-6" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              What kind of event are you planning?
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Event name (optional)
              </label>
              <input
                className="input-field"
                placeholder="e.g. Tendai & Rudo Wedding"
                value={form.title}
                onChange={e => update('title', e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Event type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EVENT_TYPES.map(et => (
                  <button
                    key={et.value}
                    onClick={() => update('eventType', et.value)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all"
                    style={{
                      borderColor: form.eventType === et.value ? 'var(--teal)' : 'var(--border)',
                      background: form.eventType === et.value ? 'var(--teal-light)' : 'var(--bg-card)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span className="text-2xl">{et.emoji}</span>
                    <span className="text-xs font-medium font-poppins" style={{ fontFamily: "'Poppins', sans-serif" }}>{et.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  <Calendar size={14} className="inline mr-1" /> Event date *
                </label>
                <input type="date" className="input-field" value={form.date} onChange={e => update('date', e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  <Users size={14} className="inline mr-1" /> Number of guests *
                </label>
                <input type="number" className="input-field" placeholder="e.g. 150" min="1" value={form.guestCount} onChange={e => update('guestCount', e.target.value)} required />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.eventType || !form.date || !form.guestCount}
              className="btn-glow btn-ripple w-full justify-center"
              style={{ opacity: (!form.eventType || !form.date || !form.guestCount) ? 0.5 : 1 }}
            >
              Next: Preferences <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: Preferences */}
        {step === 2 && (
          <div className="card p-6 sm:p-8">
            <h2 className="font-poppins font-semibold text-xl mb-6" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Tell us your preferences
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                <MapPin size={14} className="inline mr-1" /> Venue preference *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {VENUE_PREFS.map(vp => (
                  <button
                    key={vp.value}
                    onClick={() => update('venuePreference', vp.value)}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left"
                    style={{
                      borderColor: form.venuePreference === vp.value ? 'var(--teal)' : 'var(--border)',
                      background: form.venuePreference === vp.value ? 'var(--teal-light)' : 'var(--bg-card)',
                    }}
                  >
                    <span className="text-xl">{vp.emoji}</span>
                    <span className="text-sm font-medium font-poppins" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{vp.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Theme or style (optional)
              </label>
              <input
                className="input-field"
                placeholder="e.g. Garden elegance, Traditional Shona, Modern minimalist..."
                value={form.theme}
                onChange={e => update('theme', e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Special requirements (optional)
              </label>
              <textarea
                className="input-field h-24 resize-none"
                placeholder="e.g. Halal catering required, wheelchair accessibility needed, outdoor ceremony..."
                value={form.requirements}
                onChange={e => update('requirements', e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost flex-1 justify-center">
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.venuePreference}
                className="btn-glow btn-ripple flex-1 justify-center"
                style={{ opacity: !form.venuePreference ? 0.5 : 1 }}
              >
                Next: Budget <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="card p-6 sm:p-8">
            <h2 className="font-poppins font-semibold text-xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              What&apos;s your budget?
            </h2>
            <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Optional — AI will use this to provide realistic cost recommendations. Leave blank to get general guidance.
            </p>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                <DollarSign size={14} className="inline mr-1" /> Total budget (USD)
              </label>
              <input
                type="number"
                className="input-field text-lg"
                placeholder="e.g. 5000"
                min="0"
                value={form.budget}
                onChange={e => update('budget', e.target.value)}
              />
              <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                AI will suggest how to split this across categories like venue, catering, photography, etc.
              </p>
            </div>

            {/* Event summary */}
            <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--teal-light)' }}>
              <p className="text-sm font-semibold mb-3 font-poppins" style={{ color: 'var(--teal)', fontFamily: "'Poppins', sans-serif" }}>
                ✨ Generating plan for:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                <div>Type: <strong>{form.eventType}</strong></div>
                <div>Date: <strong>{form.date}</strong></div>
                <div>Guests: <strong>{form.guestCount}</strong></div>
                <div>Venue: <strong>{form.venuePreference}</strong></div>
                {form.budget && <div>Budget: <strong>${parseInt(form.budget).toLocaleString()}</strong></div>}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-ghost flex-1 justify-center">
                <ChevronLeft size={16} /> Back
              </button>
              <button
                onClick={generatePlan}
                disabled={loading}
                className="btn-glow btn-ripple flex-1 justify-center"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Generating Plan...</>
                ) : (
                  <><Sparkles size={16} /> Generate My Plan</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: AI Results */}
        {step === 4 && aiResult && (
          <div className="flex flex-col gap-6">
            <div className="card p-6" style={{ borderColor: 'var(--teal)', background: 'rgba(0,109,119,0.04)' }}>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles size={20} style={{ color: 'var(--teal)' }} />
                <h2 className="font-poppins font-bold text-xl" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Your AI Event Plan is Ready!
                </h2>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Here&apos;s your personalised plan. All items are saved to your dashboard and can be edited.
              </p>
            </div>

            {/* Checklist */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-poppins font-semibold text-lg" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  📋 Event Checklist
                </h3>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--primary-light)', color: 'var(--teal-deep)' }}>
                  {aiResult.checklist.flatMap(c => c.tasks).filter(t => t.done).length} / {aiResult.checklist.flatMap(c => c.tasks).length} done
                </span>
              </div>
              <div className="flex flex-col gap-5">
                {aiResult.checklist.map((cat, catIdx) => (
                  <div key={cat.category}>
                    <p className="font-semibold text-sm mb-2 font-poppins" style={{ color: 'var(--teal)', fontFamily: "'Poppins', sans-serif" }}>
                      {cat.category}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {cat.tasks.map((t, taskIdx) => (
                        <div key={taskIdx} className="flex items-center gap-2 group">
                          <button onClick={() => toggleTask(catIdx, taskIdx)}
                            className="w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all"
                            style={{ borderColor: t.done ? 'var(--teal)' : 'var(--border)', background: t.done ? 'var(--teal)' : 'transparent' }}>
                            {t.done && <CheckCircle size={12} className="text-white" />}
                          </button>
                          <span className="text-sm flex-1" style={{ color: 'var(--text-secondary)', textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.5 : 1 }}>
                            {t.task}
                          </span>
                          <button onClick={() => removeTask(catIdx, taskIdx)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: '#ef4444' }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                      {/* Add task input */}
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-4 h-4 flex-shrink-0" />
                        <input
                          className="text-sm flex-1 bg-transparent border-b outline-none"
                          style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                          placeholder="+ Add a task…"
                          value={newTask[catIdx] || ''}
                          onChange={e => setNewTask(n => ({ ...n, [catIdx]: e.target.value }))}
                          onKeyDown={e => e.key === 'Enter' && addTask(catIdx)}
                        />
                        {(newTask[catIdx] || '').trim() && (
                          <button onClick={() => addTask(catIdx)} style={{ color: 'var(--teal)' }}>
                            <Plus size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="card p-6">
              <h3 className="font-poppins font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                <Clock size={18} className="inline mr-2" style={{ color: 'var(--gold)' }} />
                Planning Timeline
              </h3>
              <div className="flex flex-col gap-4">
                {aiResult.timeline.map((phase, i) => (
                  <div key={phase.phase} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: 'var(--teal)', fontFamily: "'Poppins', sans-serif" }}>
                        {i + 1}
                      </div>
                      {i < aiResult.timeline.length - 1 && (
                        <div className="w-px flex-1 mt-2" style={{ background: 'var(--border)' }} />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-semibold text-sm font-poppins mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                        {phase.phase}
                      </p>
                      <ul className="text-sm flex flex-col gap-1" style={{ color: 'var(--text-secondary)' }}>
                        {phase.tasks.map(t => <li key={t}>• {t}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget */}
            {form.budget && (
              <div className="card p-6">
                <h3 className="font-poppins font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  💰 Budget Allocation
                </h3>
                <div className="flex flex-col gap-3">
                  {Object.entries(aiResult.budget).map(([cat, pct]) => (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize" style={{ color: 'var(--text-primary)' }}>{cat}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {pct}% · ${Math.round((parseInt(form.budget) * pct) / 100).toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: 'var(--border)' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct * 2.86}%`, background: 'var(--teal)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vendor matches */}
            <div className="card p-6">
              <h3 className="font-poppins font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                ⭐ Recommended Vendors
              </h3>
              <div className="flex flex-col gap-3">
                {aiResult.vendors.map(v => (
                  <div key={v.name} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                    <div>
                      <p className="font-semibold text-sm font-poppins" style={{ color: 'var(--text-primary)' }}>{v.name}</p>
                      <p className="text-xs" style={{ color: 'var(--teal)' }}>{v.category}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>AI: {v.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={saving}
              onClick={async () => {
                if (!aiResult) return;
                setSaving(true);
                const sb = createClient();
                const { data: { user } } = await sb.auth.getUser();
                if (!user) { window.location.href = '/login'; return; }
                await sb.from('events').insert({
                  user_id: user.id,
                  title: form.title || `${form.eventType} Event`,
                  type: form.eventType,
                  date: form.date,
                  guests: parseInt(form.guestCount) || 0,
                  budget: form.budget ? parseFloat(form.budget) : null,
                  status: 'planning',
                  description: form.requirements || null,
                  ai_plan: {
                    checklist: aiResult.checklist,
                    timeline: aiResult.timeline,
                    budgetAllocation: aiResult.budget,
                    vendors: aiResult.vendors,
                    venuePreference: form.venuePreference,
                    theme: form.theme,
                  } as Record<string, unknown>,
                });
                window.location.href = '/events';
              }}
              className="btn-glow btn-ripple w-full justify-center"
              style={{ opacity: saving ? 0.7 : 1 }}
            >
              {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : <><CheckCircle size={16} /> Save Event to My Events</>}
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
