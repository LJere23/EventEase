'use client';
import { useState } from 'react';
import { VendorDashboardLayout } from '@/components/layout/VendorDashboardLayout';
import { Plus, Edit2, Trash2, Package, Check, X } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  active: boolean;
}

const initialServices: Service[] = [
  { id: '1', name: 'Full-Service Catering', description: 'Complete catering for events including setup, serving, and cleanup.', price: '8', unit: 'per person', active: true },
  { id: '2', name: 'Cocktail Package', description: 'Bar setup with mocktails and premium cocktails for 3 hours.', price: '500', unit: 'flat fee', active: true },
  { id: '3', name: 'Cake & Dessert Table', description: 'Custom wedding/event cake plus dessert spread.', price: '350', unit: 'flat fee', active: false },
];

export default function VendorServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', unit: 'per person' });

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    setServices(prev => [...prev, { id: Date.now().toString(), ...form, active: true }]);
    setForm({ name: '', description: '', price: '', unit: 'per person' });
    setAdding(false);
  };

  const handleDelete = (id: string) => setServices(prev => prev.filter(s => s.id !== id));
  const toggleActive = (id: string) => setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));

  return (
    <VendorDashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-poppins font-bold text-2xl mb-1"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>My Services</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage what you offer and your pricing.</p>
          </div>
          <button onClick={() => setAdding(true)} className="btn-glow btn-ripple">
            <Plus size={15} /> Add Service
          </button>
        </div>

        {/* Add form */}
        {adding && (
          <div className="card p-6 mb-6 border-2" style={{ borderColor: 'var(--teal)' }}>
            <h3 className="font-poppins font-semibold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>New Service</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Service Name *</label>
                <input className="input-field" placeholder="e.g. Full-Service Catering"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Price (USD) *</label>
                  <input className="input-field" placeholder="e.g. 8" type="number"
                    value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Unit</label>
                  <select className="input-field" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}>
                    <option>per person</option>
                    <option>flat fee</option>
                    <option>per hour</option>
                    <option>per day</option>
                    <option>per item</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Description</label>
                <textarea className="input-field resize-none h-20" placeholder="Describe this service..."
                  value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleAdd} className="btn-glow btn-ripple">
                <Check size={14} /> Save Service
              </button>
              <button onClick={() => setAdding(false)} className="btn-ghost">
                <X size={14} /> Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {services.map(service => (
            <div key={service.id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: service.active ? 'var(--primary-light)' : 'var(--bg-secondary)' }}>
                    <Package size={16} style={{ color: service.active ? 'var(--teal-deep)' : 'var(--text-secondary)' }} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-poppins font-semibold"
                        style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                        {service.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: service.active ? '#024F5B15' : 'var(--bg-secondary)',
                          color: service.active ? '#024F5B' : 'var(--text-secondary)',
                        }}>
                        {service.active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
                    <p className="font-semibold text-sm" style={{ color: 'var(--teal-deep)' }}>
                      USD {service.price} <span className="font-normal text-xs" style={{ color: 'var(--text-secondary)' }}>{service.unit}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(service.id)}
                    className="text-xs px-3 py-1.5 rounded-lg border transition-all"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    {service.active ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => handleDelete(service.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50"
                    style={{ color: '#ef4444' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VendorDashboardLayout>
  );
}
