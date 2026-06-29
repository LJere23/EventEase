'use client';
import { VendorDashboardLayout } from '@/components/layout/VendorDashboardLayout';
import { Calendar, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const bookings = [
  { id: 'BK001', client: 'Chipo M.', event: 'Wedding – 350 guests', service: 'Full-Service Catering', date: 'Jul 15, 2026', amount: 'USD 850', status: 'confirmed' },
  { id: 'BK002', client: 'TechZim Ltd', event: 'Corporate Dinner – 120 guests', service: 'Cocktail Package', date: 'Aug 3, 2026', amount: 'USD 500', status: 'pending' },
  { id: 'BK003', client: 'Ruvimbo C.', event: 'Baby Shower – 45 guests', service: 'Full-Service Catering', date: 'Jul 28, 2026', amount: 'USD 360', status: 'pending' },
  { id: 'BK004', client: 'Tafadzwa N.', event: 'Graduation Party – 80 guests', service: 'Cocktail Package', date: 'May 3, 2026', amount: 'USD 500', status: 'completed' },
];

const statusConfig: Record<string, { label: string; icon: typeof CheckCircle; color: string }> = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: '#1CB6BB' },
  pending: { label: 'Awaiting Payment', icon: AlertCircle, color: '#8B920A' },
  completed: { label: 'Completed', icon: CheckCircle, color: '#024F5B' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: '#E9409B' },
};

export default function VendorBookingsPage() {
  return (
    <VendorDashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Bookings</h1>
          <p style={{ color: 'var(--text-secondary)' }}>All confirmed and pending bookings for your services.</p>
        </div>

        <div className="flex flex-col gap-4">
          {bookings.map(booking => {
            const cfg = statusConfig[booking.status];
            const Icon = cfg.icon;
            return (
              <div key={booking.id} className="card p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-poppins font-semibold"
                        style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                        {booking.client}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                        style={{ background: `${cfg.color}15`, color: cfg.color }}>
                        <Icon size={10} /> {cfg.label}
                      </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>{booking.service}</p>
                    <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex items-center gap-1"><Calendar size={11} /> {booking.event}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {booking.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-poppins font-bold" style={{ color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>
                        {booking.amount}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Ref: {booking.id}</p>
                    </div>
                    {booking.status === 'pending' && (
                      <button className="btn-glow text-xs py-2 px-3">Confirm</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
