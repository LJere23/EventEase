'use client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const bookings = [
  {
    id: 'BK001',
    vendor: 'Harare Catering Co.',
    service: 'Full-service catering (100 guests)',
    event: 'Chipo & Takudzwa Wedding',
    date: 'Jul 15, 2026',
    status: 'confirmed',
    amount: 'USD 850',
  },
  {
    id: 'BK002',
    vendor: 'Lens & Light Photography',
    service: 'Wedding photography (8 hrs)',
    event: 'Chipo & Takudzwa Wedding',
    date: 'Jul 15, 2026',
    status: 'pending',
    amount: 'USD 450',
  },
  {
    id: 'BK003',
    vendor: 'Bloom Decor',
    service: 'Floral arrangements & décor',
    event: 'Company Year-End Dinner',
    date: 'Dec 10, 2026',
    status: 'pending',
    amount: 'USD 320',
  },
  {
    id: 'BK004',
    vendor: 'SoundWave DJs',
    service: 'DJ set (4 hrs)',
    event: 'Graduation Party',
    date: 'May 3, 2026',
    status: 'completed',
    amount: 'USD 200',
  },
];

const statusConfig = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: '#1CB6BB' },
  pending: { label: 'Pending', icon: AlertCircle, color: '#8B920A' },
  completed: { label: 'Completed', icon: CheckCircle, color: '#024F5B' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: '#E9409B' },
};

export default function BookingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            My Bookings
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track all your vendor bookings and quote requests.</p>
        </div>

        <div className="flex flex-col gap-4">
          {bookings.map(booking => {
            const status = statusConfig[booking.status as keyof typeof statusConfig];
            const Icon = status.icon;
            return (
              <div key={booking.id} className="card p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-poppins font-semibold"
                        style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                        {booking.vendor}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                        style={{ background: `${status.color}15`, color: status.color }}>
                        <Icon size={10} /> {status.label}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{booking.service}</p>
                    <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {booking.event}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {booking.date}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-poppins font-bold text-lg"
                      style={{ color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>
                      {booking.amount}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Ref: {booking.id}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {bookings.length === 0 && (
          <div className="card p-12 text-center">
            <Calendar size={40} className="mx-auto mb-4" style={{ color: 'var(--teal)' }} />
            <h3 className="font-poppins font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              No bookings yet
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Browse vendors and request a quote to get started.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
