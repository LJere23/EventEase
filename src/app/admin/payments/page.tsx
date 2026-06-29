'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CheckCircle, XCircle, Eye, X, Upload, AlertCircle } from 'lucide-react';

type PayStatus = 'pending' | 'approved' | 'rejected';

interface Payment {
  id: string; user: string; email: string; plan: string; amount: string;
  method: string; reference: string; submitted: string; status: PayStatus;
  proofNote: string;
}

const initialPayments: Payment[] = [
  { id: 'PAY001', user: 'Chipo M.',       email: 'chipo@email.com',    plan: 'Premium',     amount: 'USD 15', method: 'EcoCash',      reference: '2648371920', submitted: '1 hr ago',    status: 'pending',  proofNote: 'Sent EcoCash to 0771234567' },
  { id: 'PAY002', user: 'TechZim Ltd',    email: 'admin@techzim.co.zw', plan: 'Pro Planner', amount: 'USD 35', method: 'Bank Transfer', reference: 'CBZ-2026-88312', submitted: '3 hrs ago',   status: 'pending',  proofNote: 'Transfer from CBZ business account' },
  { id: 'PAY003', user: 'Blessing T.',    email: 'blessing@mail.com',  plan: 'Premium',     amount: 'USD 15', method: 'InnBucks',     reference: 'INB928374', submitted: '6 hrs ago',   status: 'pending',  proofNote: 'Sent via InnBucks mobile' },
  { id: 'PAY004', user: 'Ruvimbo C.',     email: 'ruvimbo@email.com',  plan: 'Premium',     amount: 'USD 15', method: 'EcoCash',      reference: '1827364510', submitted: '9 hrs ago',   status: 'pending',  proofNote: 'EcoCash payment confirmed on my end' },
  { id: 'PAY005', user: 'Farai N.',       email: 'farai@corp.co.zw',   plan: 'Pro Planner', amount: 'USD 35', method: 'Bank Transfer', reference: 'STANCHART-91827', submitted: '12 hrs ago',  status: 'pending',  proofNote: 'Standard Chartered corporate transfer' },
  { id: 'PAY006', user: 'Tafadzwa N.',    email: 'taf@email.com',      plan: 'Premium',     amount: 'USD 15', method: 'EcoCash',      reference: '3748291056', submitted: '1 day ago',   status: 'pending',  proofNote: 'Paid via EcoCash merchant' },
  { id: 'PAY007', user: 'Shamiso M.',     email: 'shams@email.com',    plan: 'Premium',     amount: 'USD 15', method: 'InnBucks',     reference: 'INB773821', submitted: '1 day ago',   status: 'pending',  proofNote: 'InnBucks to EventEase wallet' },
  { id: 'PAY008', user: 'Sunflower Events', email: 'sun@events.co.zw', plan: 'Pro Planner', amount: 'USD 35', method: 'Bank Transfer', reference: 'NMB-2026-33892', submitted: '2 days ago',  status: 'approved', proofNote: 'NMB Bank deposit confirmed' },
  { id: 'PAY009', user: 'Tendai M.',      email: 'tendai@email.com',   plan: 'Premium',     amount: 'USD 15', method: 'EcoCash',      reference: '9182736450', submitted: '3 days ago',  status: 'approved', proofNote: '' },
  { id: 'PAY010', user: 'Fake Payer',     email: 'fake@email.com',     plan: 'Premium',     amount: 'USD 15', method: 'EcoCash',      reference: '0000000000', submitted: '4 days ago',  status: 'rejected', proofNote: 'Invalid reference number' },
];

const methodColor: Record<string, string> = { EcoCash: '#024F5B', InnBucks: '#741353', 'Bank Transfer': '#8B920A' };
const statusColor: Record<PayStatus, string> = { pending: '#8B920A', approved: '#1CB6BB', rejected: '#E9409B' };
const planColor: Record<string, string> = { Premium: '#1CB6BB', 'Pro Planner': '#741353' };

type Tab = 'all' | PayStatus;

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [tab, setTab] = useState<Tab>('pending');
  const [selected, setSelected] = useState<Payment | null>(null);
  const [note, setNote] = useState('');

  const filtered = payments.filter(p => tab === 'all' || p.status === tab);
  const counts = { all: payments.length, pending: payments.filter(p => p.status === 'pending').length, approved: payments.filter(p => p.status === 'approved').length, rejected: payments.filter(p => p.status === 'rejected').length };

  const approve = (id: string) => { setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' as PayStatus } : p)); setSelected(null); };
  const reject  = (id: string) => { setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' as PayStatus } : p)); setSelected(null); };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Payment Verification</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Review EcoCash, InnBucks, and bank transfer proofs. Approve to activate user plans.</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Pending Review', value: counts.pending, color: '#8B920A' },
            { label: 'Approved This Month', value: counts.approved, color: '#1CB6BB' },
            { label: 'Rejected', value: counts.rejected, color: '#E9409B' },
          ].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <div className="font-poppins font-bold text-2xl mb-0.5" style={{ color: s.color, fontFamily: "'Poppins', sans-serif" }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Alert */}
        {counts.pending > 0 && (
          <div className="flex items-center gap-3 p-4 rounded-xl mb-6"
            style={{ background: '#E9409B0d', border: '1px solid #E9409B25' }}>
            <AlertCircle size={16} style={{ color: '#E9409B', flexShrink: 0 }} />
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
              <span className="font-semibold">{counts.pending} payments</span> are waiting for verification. Review and approve to activate user accounts.
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ background: 'var(--bg-secondary)' }}>
          {(['pending', 'approved', 'rejected', 'all'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
              style={{ background: tab === t ? 'var(--bg-card)' : 'transparent', color: tab === t ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              {t} ({counts[t]})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                  {['User', 'Plan', 'Amount', 'Method', 'Reference', 'Submitted', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b hover:bg-[var(--bg-secondary)] transition-colors" style={{ borderColor: 'var(--border)' }}>
                    <td className="px-4 py-3">
                      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{p.user}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{p.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: `${planColor[p.plan] ?? '#024F5B'}15`, color: planColor[p.plan] ?? '#024F5B' }}>
                        {p.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-poppins font-bold" style={{ color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>{p.amount}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: `${methodColor[p.method] ?? '#024F5B'}15`, color: methodColor[p.method] ?? '#024F5B' }}>
                        {p.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>{p.reference}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{p.submitted}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                        style={{ background: `${statusColor[p.status]}15`, color: statusColor[p.status] }}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => { setSelected(p); setNote(''); }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: 'var(--primary-light)', color: 'var(--teal-deep)' }}>
                          <Eye size={12} />
                        </button>
                        {p.status === 'pending' && (
                          <>
                            <button onClick={() => approve(p.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{ background: '#1CB6BB15', color: '#1CB6BB' }}>
                              <CheckCircle size={12} />
                            </button>
                            <button onClick={() => reject(p.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{ background: '#E9409B15', color: '#E9409B' }}>
                              <XCircle size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="card w-full max-w-md p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-poppins font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Payment #{selected.id}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                  style={{ background: `${statusColor[selected.status]}15`, color: statusColor[selected.status] }}>
                  {selected.status}
                </span>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: 'var(--text-secondary)' }}><X size={18} /></button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              {[
                ['User', selected.user], ['Email', selected.email],
                ['Plan', selected.plan], ['Amount', selected.amount],
                ['Method', selected.method], ['Reference', selected.reference],
                ['Submitted', selected.submitted],
              ].map(([k, val]) => (
                <div key={k} className={k === 'Email' || k === 'Reference' ? 'col-span-2' : ''}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-secondary)' }}>{k}</p>
                  <p className={k === 'Reference' ? 'font-mono text-xs' : ''} style={{ color: 'var(--text-primary)' }}>{val}</p>
                </div>
              ))}
            </div>

            {selected.proofNote && (
              <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: 'var(--bg-secondary)' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>User Note</p>
                <p style={{ color: 'var(--text-primary)' }}>{selected.proofNote}</p>
              </div>
            )}

            {/* Simulated proof upload area */}
            <div className="mb-4 h-32 rounded-xl flex items-center justify-center border-2 border-dashed"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
              <div className="text-center">
                <Upload size={20} className="mx-auto mb-1" style={{ color: 'var(--text-secondary)' }} />
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Payment proof screenshot</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--teal)' }}>Will appear here when Supabase Storage is connected</p>
              </div>
            </div>

            {selected.status === 'pending' && (
              <>
                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Internal note (optional)</label>
                  <textarea className="input-field resize-none h-16 text-sm" placeholder="e.g. Verified via EcoCash statement..."
                    value={note} onChange={e => setNote(e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => approve(selected.id)} className="btn-glow btn-ripple flex-1 justify-center">
                    <CheckCircle size={14} /> Approve & Activate
                  </button>
                  <button onClick={() => reject(selected.id)}
                    className="flex-1 justify-center flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
                    style={{ background: '#E9409B15', color: '#E9409B', border: '1px solid #E9409B30' }}>
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
