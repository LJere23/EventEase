'use client';
import { useState } from 'react';
import { VendorDashboardLayout } from '@/components/layout/VendorDashboardLayout';
import { MessageSquare, Calendar, Users, DollarSign, ChevronDown, ChevronUp, Send, Check, X } from 'lucide-react';

interface Message {
  from: 'client' | 'vendor';
  text: string;
  price?: number;
  time: string;
}

interface Quote {
  id: string;
  client: string;
  event: string;
  date: string;
  guests: number;
  budget: string;
  message: string;
  status: 'new' | 'replied' | 'accepted' | 'declined';
  received: string;
  messages: Message[];
}

const initialQuotes: Quote[] = [
  {
    id: 'q1',
    client: 'Chipo M.',
    event: 'Wedding',
    date: 'Jul 15, 2026',
    guests: 350,
    budget: 'USD 1,200',
    message: 'Hi, I am planning a wedding for 350 guests on July 15th. Can you provide full catering including a 3-course meal, dessert table, and bar? Please include your pricing.',
    status: 'new',
    received: '2 hours ago',
    messages: [],
  },
  {
    id: 'q2',
    client: 'TechZim Ltd',
    event: 'Corporate Dinner',
    date: 'Aug 3, 2026',
    guests: 120,
    budget: 'USD 900',
    message: 'We need full catering for our annual corporate dinner. Formal sit-down dinner, 120 guests, 3 courses. What is your availability and pricing?',
    status: 'replied',
    received: '1 day ago',
    messages: [
      { from: 'vendor', text: 'Thank you for reaching out! We are available on August 3rd. For 120 guests, a 3-course formal dinner would be USD 960 (USD 8/person). This includes setup, serving staff, and cleanup. Shall I send a full quote?', price: 960, time: '1 day ago' },
      { from: 'client', text: 'That sounds great, please send the full quote. Can you also confirm if you can accommodate vegetarian options?', time: '20 hours ago' },
    ],
  },
  {
    id: 'q3',
    client: 'Ruvimbo C.',
    event: 'Baby Shower',
    date: 'Jul 28, 2026',
    guests: 45,
    budget: 'USD 400',
    message: 'Planning a baby shower for 45 ladies. Would love finger foods, light lunch, and a dessert spread. Any packages in this range?',
    status: 'accepted',
    received: '3 days ago',
    messages: [
      { from: 'vendor', text: 'Perfect! For a baby shower of 45, I recommend our finger food + dessert package at USD 360 total. Includes canapés, mini sandwiches, a dessert table, and non-alcoholic drinks.', price: 360, time: '3 days ago' },
      { from: 'client', text: 'Sounds perfect! Let\'s go with that.', time: '3 days ago' },
    ],
  },
];

export default function VendorQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [openId, setOpenId] = useState<string | null>('q1');
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyPrice, setReplyPrice] = useState<Record<string, string>>({});

  const sendReply = (qid: string) => {
    const text = replyText[qid]?.trim();
    if (!text) return;
    setQuotes(prev => prev.map(q => {
      if (q.id !== qid) return q;
      return {
        ...q,
        status: 'replied' as const,
        messages: [...q.messages, {
          from: 'vendor' as const,
          text,
          price: replyPrice[qid] ? parseFloat(replyPrice[qid]) : undefined,
          time: 'Just now',
        }],
      };
    }));
    setReplyText(r => ({ ...r, [qid]: '' }));
    setReplyPrice(r => ({ ...r, [qid]: '' }));
  };

  const statusStyle: Record<string, { label: string; color: string }> = {
    new: { label: 'New', color: '#E9409B' },
    replied: { label: 'Replied', color: '#1CB6BB' },
    accepted: { label: 'Accepted', color: '#024F5B' },
    declined: { label: 'Declined', color: '#741353' },
  };

  return (
    <VendorDashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Quote Requests
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Click any request to read the full message and respond directly.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {quotes.map(q => {
            const s = statusStyle[q.status];
            const isOpen = openId === q.id;
            return (
              <div key={q.id} className="card overflow-hidden transition-all"
                style={isOpen ? { borderColor: 'var(--teal)', boxShadow: '0 0 0 1px var(--teal)' } : {}}>
                {/* Header — click to expand */}
                <button
                  className="w-full flex items-start justify-between p-5 text-left"
                  onClick={() => setOpenId(isOpen ? null : q.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-poppins font-semibold"
                        style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                        {q.client}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${s.color}15`, color: s.color }}>
                        {s.label}
                      </span>
                      {q.status === 'new' && (
                        <span className="w-2 h-2 rounded-full bg-[#E9409B] animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {q.event} · {q.date} · {q.guests} guests
                    </p>
                    {!isOpen && (
                      <p className="text-xs mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>
                        {q.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{q.received}</span>
                    {isOpen ? <ChevronUp size={16} style={{ color: 'var(--teal)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-secondary)' }} />}
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid var(--border)' }}>
                    {/* Request details */}
                    <div className="p-5 pb-0">
                      <div className="flex flex-wrap gap-4 text-xs mb-4">
                        <span className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                          <Calendar size={11} style={{ color: 'var(--teal)' }} /> {q.date}
                        </span>
                        <span className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                          <Users size={11} style={{ color: 'var(--teal)' }} /> {q.guests} guests
                        </span>
                        <span className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                          <DollarSign size={11} style={{ color: 'var(--teal)' }} /> Budget: {q.budget}
                        </span>
                      </div>

                      {/* Client's original message */}
                      <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--bg-secondary)' }}>
                        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--teal)' }}>Client's Request</p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{q.message}</p>
                      </div>

                      {/* Message thread */}
                      {q.messages.length > 0 && (
                        <div className="flex flex-col gap-3 mb-4">
                          {q.messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                              <div
                                className="max-w-[85%] rounded-2xl px-4 py-3"
                                style={{
                                  background: msg.from === 'vendor' ? 'var(--teal-deep)' : 'var(--bg-secondary)',
                                  color: msg.from === 'vendor' ? 'white' : 'var(--text-primary)',
                                }}
                              >
                                {msg.price && (
                                  <p className="text-xs font-bold mb-1 opacity-80">
                                    Quoted price: USD {msg.price.toLocaleString()}
                                  </p>
                                )}
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <p className="text-xs mt-1 opacity-60">{msg.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Reply box */}
                    {q.status !== 'declined' && (
                      <div className="p-5 pt-3">
                        <div className="rounded-xl p-4" style={{ background: 'var(--primary-light)', border: '1px solid rgba(28,182,187,0.2)' }}>
                          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--teal-deep)' }}>
                            <MessageSquare size={11} className="inline mr-1" />
                            Reply to {q.client}
                          </p>
                          <textarea
                            className="input-field resize-none h-24 mb-3 text-sm"
                            placeholder="Type your response, include your price, availability, and any questions..."
                            value={replyText[q.id] || ''}
                            onChange={e => setReplyText(r => ({ ...r, [q.id]: e.target.value }))}
                          />
                          <div className="flex items-center gap-3">
                            <div className="relative flex-shrink-0">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold"
                                style={{ color: 'var(--text-secondary)' }}>USD</span>
                              <input
                                type="number"
                                className="input-field w-36"
                                placeholder="Quote price"
                                style={{ paddingLeft: '46px' }}
                                value={replyPrice[q.id] || ''}
                                onChange={e => setReplyPrice(r => ({ ...r, [q.id]: e.target.value }))}
                              />
                            </div>
                            <button
                              onClick={() => sendReply(q.id)}
                              className="btn-glow btn-ripple flex-1 justify-center"
                            >
                              <Send size={14} /> Send Reply
                            </button>
                            {q.status === 'new' && (
                              <button
                                onClick={() => setQuotes(prev => prev.map(x => x.id === q.id ? { ...x, status: 'declined' as const } : x))}
                                className="btn-ghost text-sm py-2 px-3"
                                style={{ color: '#ef4444', borderColor: '#ef444430' }}
                              >
                                <X size={13} /> Decline
                              </button>
                            )}
                            {q.status === 'replied' && (
                              <button
                                onClick={() => setQuotes(prev => prev.map(x => x.id === q.id ? { ...x, status: 'accepted' as const } : x))}
                                className="btn-ghost text-sm py-2 px-3"
                                style={{ color: '#024F5B', borderColor: '#024F5B30' }}
                              >
                                <Check size={13} /> Mark Accepted
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
