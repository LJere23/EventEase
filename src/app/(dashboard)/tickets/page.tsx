'use client';
import { useState, useRef } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, MapPin, Download, Share2, X, ExternalLink, Ticket } from 'lucide-react';

interface TicketData {
  id: string;
  event: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  type: string;
  seat: string;
  price: string;
  status: 'active' | 'used';
  color: string;
  emoji: string;
  qrValue: string;
}

const tickets: TicketData[] = [
  {
    id: 'TK-2026-001',
    event: 'TechZim Annual Awards 2026',
    date: 'Saturday, 22 August 2026',
    time: '6:00 PM',
    venue: 'Harare International Conference Centre',
    city: 'Harare, Zimbabwe',
    type: 'General Admission',
    seat: 'Open Seating',
    price: 'USD 25.00',
    status: 'active',
    color: '#024F5B',
    emoji: '🏆',
    qrValue: 'EVENTEASE:TK-2026-001:VALID',
  },
  {
    id: 'TK-2026-002',
    event: 'Harare Food Festival',
    date: 'Thursday, 10 September 2026',
    time: '10:00 AM',
    venue: 'African Unity Square',
    city: 'Harare, Zimbabwe',
    type: 'VIP Access',
    seat: 'VIP Lounge',
    price: 'USD 45.00',
    status: 'active',
    color: '#E9409B',
    emoji: '🍽️',
    qrValue: 'EVENTEASE:TK-2026-002:VALID',
  },
  {
    id: 'TK-2026-003',
    event: 'Graduation Ceremony – UZ',
    date: 'Saturday, 3 May 2026',
    time: '9:00 AM',
    venue: 'Great Hall, University of Zimbabwe',
    city: 'Harare, Zimbabwe',
    type: 'Guest Ticket',
    seat: 'Row G, Seat 14',
    price: 'Complimentary',
    status: 'used',
    color: '#8B920A',
    emoji: '🎓',
    qrValue: 'EVENTEASE:TK-2026-003:USED',
  },
];

function TicketCard({ ticket, onExpand }: { ticket: TicketData; onExpand: () => void }) {
  return (
    <div
      className="card overflow-hidden cursor-pointer hover:scale-[1.01] transition-all group"
      onClick={onExpand}
      style={ticket.status === 'used' ? { opacity: 0.7 } : {}}
    >
      <div className="flex">
        {/* Left color bar */}
        <div className="w-2 flex-shrink-0" style={{ background: ticket.color }} />

        {/* Main content */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{ticket.emoji}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: ticket.status === 'active' ? `${ticket.color}15` : 'var(--bg-secondary)',
                    color: ticket.status === 'active' ? ticket.color : 'var(--text-secondary)',
                  }}>
                  {ticket.status === 'active' ? ticket.type : 'Used'}
                </span>
              </div>
              <h3 className="font-poppins font-bold text-base leading-tight"
                style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                {ticket.event}
              </h3>
            </div>
            <QRCodeSVG
              value={ticket.qrValue}
              size={52}
              fgColor={ticket.status === 'used' ? '#999' : ticket.color}
              bgColor="transparent"
              level="M"
            />
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="flex items-center gap-1">
              <Calendar size={10} style={{ color: ticket.color }} />
              {ticket.date} · {ticket.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={10} style={{ color: ticket.color }} />
              {ticket.venue}
            </span>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px dashed var(--border)' }}>
            <span className="text-xs font-mono font-bold" style={{ color: 'var(--text-secondary)' }}>{ticket.id}</span>
            <span className="font-poppins font-bold text-sm" style={{ color: ticket.color, fontFamily: "'Poppins', sans-serif" }}>
              {ticket.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketModal({ ticket, onClose }: { ticket: TicketData; onClose: () => void }) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = ticketRef.current?.innerHTML;
    if (!printContent) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>${ticket.event} - EventEase Ticket</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f4fbfc; }
        .ticket-print { width: 600px; border-radius: 24px; overflow: hidden; border: 2px solid ${ticket.color}40; background: white; box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
      </style></head><body>
      <div class="ticket-print">${printContent}</div>
      </body></html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); win.close(); }, 500);
  };

  const handleShare = async () => {
    const shareData = {
      title: ticket.event,
      text: `Join me at ${ticket.event} on ${ticket.date} at ${ticket.venue}!`,
      url: `${window.location.origin}/events/public/${ticket.id}`,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert('Event link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md">
        {/* Close button */}
        <div className="flex justify-end mb-3">
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white">
            <X size={18} />
          </button>
        </div>

        {/* The ticket itself */}
        <div ref={ticketRef} className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: 'var(--bg-card)' }}>
          {/* Hero */}
          <div className="relative h-28 flex items-center justify-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${ticket.color} 0%, ${ticket.color}cc 100%)` }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: `radial-gradient(circle at 30% 50%, white 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
            <div className="text-center relative z-10">
              <div className="text-4xl mb-1">{ticket.emoji}</div>
              <p className="text-white text-xs font-semibold opacity-80 tracking-widest uppercase">EventEase</p>
            </div>
            {/* Notches */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
              style={{ background: 'var(--bg-primary)' }} />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
              style={{ background: 'var(--bg-primary)' }} />
          </div>

          {/* Ticket body */}
          <div className="px-6 pt-5 pb-6">
            <h2 className="font-poppins font-bold text-xl mb-1 leading-tight"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              {ticket.event}
            </h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4"
              style={{ background: `${ticket.color}15`, color: ticket.color }}>
              {ticket.type}
            </span>

            <div className="grid grid-cols-2 gap-4 mb-5">
              {[
                { label: 'DATE', value: ticket.date },
                { label: 'TIME', value: ticket.time },
                { label: 'VENUE', value: ticket.venue },
                { label: 'SEAT', value: ticket.seat },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs font-bold tracking-widest mb-0.5"
                    style={{ color: ticket.color, fontFamily: "'Poppins', sans-serif" }}>
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Dashed separator */}
            <div className="relative my-4">
              <div className="border-t border-dashed" style={{ borderColor: 'var(--border)' }} />
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                style={{ background: 'var(--bg-secondary)' }} />
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                style={{ background: 'var(--bg-secondary)' }} />
            </div>

            {/* QR + price */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold tracking-widest mb-0.5"
                  style={{ color: ticket.color, fontFamily: "'Poppins', sans-serif" }}>TICKET ID</p>
                <p className="font-mono text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{ticket.id}</p>
                <p className="font-poppins font-bold text-xl mt-1"
                  style={{ color: ticket.color, fontFamily: "'Poppins', sans-serif" }}>{ticket.price}</p>
              </div>
              <div className="text-center">
                <QRCodeSVG
                  value={ticket.qrValue}
                  size={90}
                  fgColor={ticket.status === 'used' ? '#999' : ticket.color}
                  bgColor="transparent"
                  level="H"
                  includeMargin={false}
                />
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Scan at entry</p>
              </div>
            </div>

            {ticket.status === 'used' && (
              <div className="mt-4 py-2 text-center rounded-xl text-sm font-bold"
                style={{ background: '#8B920A15', color: '#8B920A' }}>
                ✓ Ticket Used
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        {ticket.status === 'active' && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={handlePrint}
              className="btn-glow btn-ripple flex-1 justify-center"
            >
              <Download size={14} /> Download / Print
            </button>
            <button
              onClick={handleShare}
              className="btn-ghost flex-1 justify-center"
            >
              <Share2 size={14} /> Share Event
            </button>
          </div>
        )}

        {/* Shareable link */}
        {ticket.status === 'active' && (
          <div className="mt-3 p-3 rounded-xl flex items-center gap-2"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <ExternalLink size={12} className="text-white/60 flex-shrink-0" />
            <span className="text-xs text-white/60 font-mono truncate">
              eventease.co.zw/events/public/{ticket.id}
            </span>
            <button
              className="text-xs font-semibold flex-shrink-0 text-white/80"
              onClick={() => navigator.clipboard.writeText(`https://eventease.co.zw/events/public/${ticket.id}`).then(() => alert('Link copied!'))}
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TicketsPage() {
  const [selected, setSelected] = useState<TicketData | null>(null);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            My Tickets
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Tap any ticket to view the full ticket, QR code, and sharing options.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {tickets.map(t => (
            <TicketCard key={t.id} ticket={t} onExpand={() => setSelected(t)} />
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="card p-12 text-center">
            <Ticket size={40} className="mx-auto mb-4" style={{ color: 'var(--teal)', opacity: 0.5 }} />
            <h3 className="font-poppins font-semibold mb-2"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              No tickets yet
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Tickets you purchase will appear here.</p>
          </div>
        )}
      </div>

      {selected && <TicketModal ticket={selected} onClose={() => setSelected(null)} />}
    </DashboardLayout>
  );
}
