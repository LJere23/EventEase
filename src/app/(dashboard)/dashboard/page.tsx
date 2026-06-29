'use client';
import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CalendarPlus, Calendar, Users, CheckCircle, Clock, Star, TrendingUp, ArrowRight, Sparkles, MessageSquare, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const quickActions = [
  { label: 'Create an Event',  href: '/events/new', icon: CalendarPlus, desc: 'Start planning something new' },
  { label: 'Browse Vendors',   href: '/vendors',    icon: Users,        desc: 'Find the right services' },
  { label: 'Go Premium',       href: '/upgrade',    icon: TrendingUp,   desc: 'Unlock RSVP & ticket tools' },
];

const SUGGESTIONS = [
  'What should I book first for a wedding?',
  'How many waiters do I need for 150 guests?',
  'What\'s a realistic budget for a Harare wedding?',
];

interface ChatMessage { role: 'user' | 'assistant'; text: string; }
interface LocalEvent { id: string; title: string; type: string; date: string; status: string; checklist?: { tasks: { done: boolean }[] }[]; }

export default function DashboardPage() {
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('Good morning');
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Greeting based on time
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');

    // Real user name from Supabase
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const name: string = user.user_metadata?.full_name || user.email?.split('@')[0] || 'there';
      setUserName(name.split(' ')[0]); // first name only
    });

    // Events from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('ee-events') || '[]');
      setEvents(saved);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const sendChat = async (message: string) => {
    const text = message.trim();
    if (!text || chatLoading) return;
    setChatInput('');
    setChat(prev => [...prev, { role: 'user', text }]);
    setChatLoading(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, context: events.slice(0, 3) }),
      });
      const data = await res.json();
      setChat(prev => [...prev, { role: 'assistant', text: data.reply || data.error || 'Sorry, I couldn\'t respond right now.' }]);
    } catch {
      setChat(prev => [...prev, { role: 'assistant', text: 'Connection error — please try again.' }]);
    }
    setChatLoading(false);
  };

  const totalTasks = events.flatMap(e => e.checklist?.flatMap(c => c.tasks) ?? []).length;
  const doneTasks  = events.flatMap(e => e.checklist?.flatMap(c => c.tasks) ?? []).filter(t => t.done).length;

  const quickStats = [
    { label: 'Active Events',   value: events.length.toString(), icon: Calendar,     color: 'var(--teal-deep)',  lightBg: 'rgba(28,182,187,0.1)' },
    { label: 'Tasks Completed', value: `${doneTasks}/${totalTasks || 0}`, icon: CheckCircle, color: '#16a34a', lightBg: 'rgba(22,163,74,0.1)' },
    { label: 'Vendor Bookings', value: '0',                       icon: Users,        color: 'var(--pink)',       lightBg: 'rgba(233,64,155,0.1)' },
    { label: 'Upcoming',        value: events.filter(e => e.status === 'planning').length.toString(), icon: Clock, color: 'var(--plum)', lightBg: 'rgba(116,19,83,0.1)' },
  ];

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-2xl sm:text-3xl mb-1"
          style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
          {greeting}{userName ? `, ${userName}` : ''} 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {events.length > 0
            ? `You have ${events.length} event${events.length !== 1 ? 's' : ''} in planning.`
            : 'Ready to plan your next event? Start below.'}
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
            <Link href="/events" className="text-sm flex items-center gap-1 font-medium" style={{ color: 'var(--teal-deep)' }}>
              See all <ArrowRight size={14} />
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="card p-8 text-center mb-4">
              <CalendarPlus size={32} className="mx-auto mb-3" style={{ color: 'var(--border)' }} />
              <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>No events yet</p>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Create your first event and let AI build your plan.</p>
              <Link href="/events/new" className="btn-glow btn-ripple inline-flex text-sm"><CalendarPlus size={14} /> Plan an Event</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mb-4">
              {events.slice(0, 3).map(event => {
                const tasks = event.checklist?.flatMap(c => c.tasks) ?? [];
                const done = tasks.filter(t => t.done).length;
                const typeEmoji: Record<string, string> = { wedding: '💍', birthday: '🎂', corporate: '🏢', graduation: '🎓', 'baby-shower': '🎀', church: '⛪', other: '🎉' };
                return (
                  <div key={event.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-semibold font-poppins flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                          <span>{typeEmoji[event.type] ?? '🎉'}</span> {event.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="badge badge-teal text-xs capitalize">{event.type}</span>
                          {event.date && <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{event.date}</span>}
                        </div>
                      </div>
                      <span className="badge badge-green text-xs flex-shrink-0 capitalize">{event.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {done}/{tasks.length} tasks done
                      </div>
                      <Link href={`/events/${event.id}`} className="text-sm font-medium flex items-center gap-1" style={{ color: 'var(--teal-deep)' }}>
                        View <ArrowRight size={13} />
                      </Link>
                    </div>
                    {tasks.length > 0 && (
                      <div className="mt-3 h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${Math.round((done / tasks.length) * 100)}%`, background: 'var(--teal-deep)' }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

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
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--primary-light)' }}>
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

          {/* AI assistant */}
          <div>
            <h2 className="font-poppins font-semibold text-lg mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Planning Assistant
            </h2>
            <div className="card p-4 flex flex-col gap-3">
              {/* Chat messages */}
              <div className="flex flex-col gap-3 max-h-56 overflow-y-auto">
                {chat.length === 0 && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--teal-deep)' }}>
                      <Sparkles size={13} color="white" />
                    </div>
                    <div className="text-sm p-3 rounded-xl rounded-tl-none flex-1" style={{ background: 'var(--primary-light)', color: 'var(--text-primary)' }}>
                      Hi{userName ? ` ${userName}` : ''}! I'm your EventEase planning assistant. Ask me anything about your events or vendors.
                    </div>
                  </div>
                )}
                {chat.map((m, i) => (
                  <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {m.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--teal-deep)' }}>
                        <Sparkles size={13} color="white" />
                      </div>
                    )}
                    <div className="text-sm p-3 rounded-xl max-w-[85%]"
                      style={{
                        background: m.role === 'user' ? 'var(--teal-deep)' : 'var(--primary-light)',
                        color: m.role === 'user' ? 'white' : 'var(--text-primary)',
                        borderRadius: m.role === 'user' ? '12px 12px 0 12px' : '0 12px 12px 12px',
                      }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--teal-deep)' }}>
                      <Sparkles size={13} color="white" />
                    </div>
                    <div className="text-sm p-3 rounded-xl rounded-tl-none" style={{ background: 'var(--primary-light)', color: 'var(--text-secondary)' }}>
                      <Loader2 size={14} className="animate-spin inline mr-1" />Thinking…
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestion chips — only when no chat history */}
              {chat.length === 0 && (
                <div className="flex flex-col gap-1.5">
                  {SUGGESTIONS.map(q => (
                    <button key={q} onClick={() => sendChat(q)}
                      className="text-left text-xs px-3 py-2 rounded-lg border transition-colors hover:border-[var(--teal)]"
                      style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <input
                  className="input-field flex-1 text-sm py-2 pl-3"
                  placeholder="Ask a question…"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat(chatInput)}
                  disabled={chatLoading}
                />
                <button onClick={() => sendChat(chatInput)} disabled={chatLoading || !chatInput.trim()}
                  className="btn-glow py-2 px-3 text-sm flex-shrink-0"
                  style={{ opacity: chatLoading || !chatInput.trim() ? 0.6 : 1 }}>
                  {chatLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
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
