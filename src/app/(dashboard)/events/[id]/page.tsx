'use client';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import {
  Calendar, Users, DollarSign, MapPin, CheckCircle, Clock,
  ArrowLeft, Edit2, Trash2, ChevronRight, Package,
} from 'lucide-react';

const mockEvents: Record<string, {
  id: string; title: string; type: string; date: string; guests: number;
  budget: number; spent: number; venue: string; city: string; status: string;
  description: string; emoji: string; color: string;
  checklist: { task: string; done: boolean }[];
  vendors: { name: string; service: string; amount: number; status: string }[];
}> = {
  '1': {
    id: '1', title: 'Tendai & Rudo Wedding', type: 'Wedding', date: 'Jul 15, 2026',
    guests: 150, budget: 5000, spent: 2800, venue: 'Harare Gardens', city: 'Harare',
    status: 'planning', description: 'A beautiful garden wedding celebration.', emoji: '💍', color: '#E9409B',
    checklist: [
      { task: 'Book venue', done: true }, { task: 'Confirm caterer', done: true },
      { task: 'Send invitations', done: false }, { task: 'Book photographer', done: true },
      { task: 'Arrange transport', done: false }, { task: 'Finalise menu', done: false },
    ],
    vendors: [
      { name: 'Harare Catering Co.', service: 'Full catering (150 guests)', amount: 1200, status: 'confirmed' },
      { name: 'Lens & Light Photography', service: 'Wedding photography 8hrs', amount: 450, status: 'confirmed' },
      { name: 'Bloom Decor', service: 'Floral arrangements', amount: 320, status: 'pending' },
    ],
  },
  '2': {
    id: '2', title: 'Q4 Corporate Dinner', type: 'Corporate', date: 'Dec 5, 2026',
    guests: 80, budget: 3000, spent: 900, venue: 'Rainbow Towers', city: 'Harare',
    status: 'planning', description: 'Annual year-end dinner for staff and stakeholders.', emoji: '🏢', color: '#024F5B',
    checklist: [
      { task: 'Book venue', done: true }, { task: 'Confirm caterer', done: false },
      { task: 'Send invitations', done: false }, { task: 'Arrange AV equipment', done: false },
    ],
    vendors: [
      { name: 'Rainbow Towers Events', service: 'Venue hire (full day)', amount: 900, status: 'confirmed' },
    ],
  },
};

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const event = mockEvents[id];

  if (!event) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-20">
          <h2 className="font-poppins font-bold text-2xl mb-3"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Event not found
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            This event doesn&apos;t exist or was deleted.
          </p>
          <Link href="/events" className="btn-glow btn-ripple inline-flex">
            <ArrowLeft size={14} /> Back to My Events
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const budgetPercent = Math.round((event.spent / event.budget) * 100);
  const doneCount = event.checklist.filter(c => c.done).length;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link href="/events" className="flex items-center gap-1 text-sm mb-6 hover:underline"
          style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={14} /> Back to My Events
        </Link>

        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{event.emoji}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-poppins font-bold text-2xl"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    {event.title}
                  </h1>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="badge badge-teal text-xs">{event.type}</span>
                  <span className="badge text-xs"
                    style={{ background: `${event.color}15`, color: event.color, border: `1px solid ${event.color}30` }}>
                    {event.status}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-ghost text-sm py-2 px-3"><Edit2 size={13} /> Edit</button>
              <button className="btn-ghost text-sm py-2 px-3" style={{ color: '#ef4444', borderColor: '#ef444430' }}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {/* Key details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
            {[
              { icon: Calendar, label: 'Date', value: event.date, color: '#024F5B' },
              { icon: Users, label: 'Guests', value: `${event.guests} people`, color: '#E9409B' },
              { icon: MapPin, label: 'Venue', value: `${event.venue}, ${event.city}`, color: '#1CB6BB' },
              { icon: DollarSign, label: 'Budget', value: `USD ${event.budget.toLocaleString()}`, color: '#8B920A' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={13} style={{ color }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Budget tracker */}
          <div className="card p-5">
            <h2 className="font-poppins font-semibold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Budget Tracker
            </h2>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold font-poppins" style={{ color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>
                USD {event.spent.toLocaleString()}
              </span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                of USD {event.budget.toLocaleString()} budget
              </span>
            </div>
            <div className="h-3 rounded-full mb-3" style={{ background: 'var(--bg-secondary)' }}>
              <div className="h-full rounded-full transition-all"
                style={{
                  width: `${budgetPercent}%`,
                  background: budgetPercent > 80 ? '#E9409B' : 'var(--teal-deep)',
                }} />
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: budgetPercent > 80 ? '#E9409B' : 'var(--teal)' }}>{budgetPercent}% spent</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                USD {(event.budget - event.spent).toLocaleString()} remaining
              </span>
            </div>
          </div>

          {/* Planning checklist */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-poppins font-semibold"
                style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Planning Checklist
              </h2>
              <span className="text-xs" style={{ color: 'var(--teal)' }}>
                {doneCount}/{event.checklist.length} done
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {event.checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? '' : 'border-2'}`}
                    style={{
                      background: item.done ? 'var(--teal-deep)' : 'transparent',
                      borderColor: item.done ? 'transparent' : 'var(--border)',
                    }}>
                    {item.done && <CheckCircle size={14} className="text-white" />}
                  </div>
                  <span className="text-sm" style={{
                    color: item.done ? 'var(--text-secondary)' : 'var(--text-primary)',
                    textDecoration: item.done ? 'line-through' : 'none',
                  }}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vendors booked */}
          <div className="card p-5 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-poppins font-semibold"
                style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Vendors Booked
              </h2>
              <Link href="/vendors" className="text-xs flex items-center gap-0.5" style={{ color: 'var(--teal)' }}>
                Find more <ChevronRight size={12} />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {event.vendors.map((v, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'var(--bg-secondary)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'var(--primary-light)' }}>
                      <Package size={14} style={{ color: 'var(--teal-deep)' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{v.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{v.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold font-poppins" style={{ color: 'var(--teal-deep)' }}>
                      USD {v.amount.toLocaleString()}
                    </p>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: v.status === 'confirmed' ? '#1CB6BB15' : '#8B920A15',
                        color: v.status === 'confirmed' ? '#1CB6BB' : '#8B920A',
                      }}>
                      {v.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
