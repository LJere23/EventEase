'use client';
import { useState, useEffect, useRef } from 'react';
import { VendorDashboardLayout } from '@/components/layout/VendorDashboardLayout';
import { Plus, Edit2, Trash2, Save, X, Upload, Tag, DollarSign, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface CatalogueItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceType: 'fixed' | 'from' | 'per_person' | 'contact';
  category: string;
  available: boolean;
  imagePreview?: string;
}

const PRICE_TYPES = [
  { value: 'fixed',      label: 'Fixed price' },
  { value: 'from',       label: 'Starting from' },
  { value: 'per_person', label: 'Per person' },
  { value: 'contact',    label: 'Contact for quote' },
] as const;

const CATEGORIES = [
  'Full Package', 'Venue', 'Catering', 'Photography', 'Videography',
  'Décor', 'DJ & Music', 'MC', 'Cake', 'Transport', 'Makeup',
  'Equipment Hire', 'Other',
];

const STORAGE_KEY = 'vendor-catalogue';

function priceLabel(item: CatalogueItem) {
  if (item.priceType === 'contact') return 'Request quote';
  if (!item.price) return '—';
  const map = { fixed: `USD ${item.price}`, from: `From USD ${item.price}`, per_person: `USD ${item.price} / person` };
  return map[item.priceType] ?? `USD ${item.price}`;
}

export default function CataloguePage() {
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [editing, setEditing] = useState<CatalogueItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setItems(saved);
    } catch { /* ignore */ }
  }, []);

  const persist = (updated: CatalogueItem[]) => {
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const blank = (): CatalogueItem => ({
    id: `cat_${Date.now()}`,
    name: '', description: '', price: '',
    priceType: 'fixed', category: '', available: true,
  });

  const openNew = () => { setEditing(blank()); setShowForm(true); };

  const openEdit = (item: CatalogueItem) => { setEditing({ ...item }); setShowForm(true); };

  const closeForm = () => { setEditing(null); setShowForm(false); };

  const saveItem = () => {
    if (!editing) return;
    const existing = items.find(i => i.id === editing.id);
    if (existing) {
      persist(items.map(i => i.id === editing.id ? editing : i));
    } else {
      persist([...items, editing]);
    }
    closeForm();
  };

  const deleteItem = (id: string) => {
    if (!confirm('Delete this catalogue item?')) return;
    persist(items.filter(i => i.id !== id));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    const url = URL.createObjectURL(file);
    setEditing(prev => prev ? { ...prev, imagePreview: url } : prev);
  };

  return (
    <VendorDashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-poppins font-bold text-2xl mb-1"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              My Service Catalogue
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              List your services with prices — clients can request a quote directly from each item.
            </p>
          </div>
          <button onClick={openNew} className="btn-glow btn-ripple flex-shrink-0">
            <Plus size={15} /> Add Service
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="card p-16 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'var(--primary-light)' }}>
              <BookOpen size={28} style={{ color: 'var(--teal-deep)' }} />
            </div>
            <h3 className="font-poppins font-semibold text-lg mb-2"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Your catalogue is empty
            </h3>
            <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Add services with pricing — clients will see them on your public profile and can request quotes.
            </p>
            <button onClick={openNew} className="btn-glow btn-ripple inline-flex">
              <Plus size={14} /> Add Your First Service
            </button>
          </div>
        )}

        {/* Catalogue items */}
        {items.length > 0 && (
          <div className="flex flex-col gap-4 mb-8">
            {items.map(item => (
              <div key={item.id} className="card overflow-hidden"
                style={{ opacity: item.available ? 1 : 0.6 }}>
                {/* Item image */}
                {item.imagePreview && (
                  <div className="h-40 overflow-hidden">
                    <img src={item.imagePreview} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-poppins font-semibold"
                          style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                          {item.name}
                        </h3>
                        {item.category && (
                          <span className="badge badge-teal text-xs">{item.category}</span>
                        )}
                        {!item.available && (
                          <span className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: '#ef444420', color: '#ef4444' }}>
                            Unavailable
                          </span>
                        )}
                      </div>
                      <p className="font-poppins font-bold text-lg mb-2"
                        style={{ color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>
                        {priceLabel(item)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => openEdit(item)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--bg-secondary)]"
                        style={{ color: 'var(--text-secondary)' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => deleteItem(item.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50"
                        style={{ color: '#ef4444' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Expandable description */}
                  {item.description && (
                    <div>
                      <p className={`text-sm leading-relaxed ${expanded === item.id ? '' : 'line-clamp-2'}`}
                        style={{ color: 'var(--text-secondary)' }}>
                        {item.description}
                      </p>
                      {item.description.length > 120 && (
                        <button onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                          className="flex items-center gap-1 text-xs mt-1"
                          style={{ color: 'var(--teal)' }}>
                          {expanded === item.id ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Read more</>}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tip */}
        <div className="card p-4 flex gap-3"
          style={{ background: 'rgba(28,182,187,0.06)', borderColor: 'rgba(28,182,187,0.3)' }}>
          <BookOpen size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--teal)' }} />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Clients can view your catalogue on your public profile and send quote requests that reference the specific service — just like WhatsApp Business.
          </p>
        </div>
      </div>

      {/* Add / Edit form modal */}
      {showForm && editing && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(26,26,46,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={e => e.target === e.currentTarget && closeForm()}>
          <div className="w-full max-w-md flex flex-col rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', maxHeight: '92vh' }}>

            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
              style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-poppins font-semibold"
                style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                {items.find(i => i.id === editing.id) ? 'Edit Service' : 'New Service'}
              </h2>
              <button onClick={closeForm}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                <X size={15} />
              </button>
            </div>

            {/* Form body */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Photo (optional)
                </label>
                <div
                  className="h-32 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden relative group"
                  style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--border)' }}
                  onClick={() => imageRef.current?.click()}>
                  {editing.imagePreview ? (
                    <>
                      <img src={editing.imagePreview} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Upload size={20} color="white" />
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <Upload size={20} className="mx-auto mb-1" style={{ color: 'var(--text-secondary)' }} />
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Upload photo</p>
                    </div>
                  )}
                  <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Service Name *
                </label>
                <input className="input-field" placeholder="e.g. Full Wedding Catering Package"
                  value={editing.name}
                  onChange={e => setEditing(p => p ? { ...p, name: e.target.value } : p)} />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Category
                </label>
                <div className="relative">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                  <select className="input-field" style={{ paddingLeft: '34px' }}
                    value={editing.category}
                    onChange={e => setEditing(p => p ? { ...p, category: e.target.value } : p)}>
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    Price (USD)
                  </label>
                  <div className="relative">
                    <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                    <input className="input-field" style={{ paddingLeft: '30px' }}
                      placeholder="0"
                      type="number"
                      min="0"
                      disabled={editing.priceType === 'contact'}
                      value={editing.price}
                      onChange={e => setEditing(p => p ? { ...p, price: e.target.value } : p)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    Price Type
                  </label>
                  <select className="input-field"
                    value={editing.priceType}
                    onChange={e => setEditing(p => p ? { ...p, priceType: e.target.value as CatalogueItem['priceType'] } : p)}>
                    {PRICE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Description
                </label>
                <textarea
                  className="input-field resize-none h-24"
                  placeholder="Describe what's included in this service..."
                  value={editing.description}
                  onChange={e => setEditing(p => p ? { ...p, description: e.target.value } : p)}
                />
              </div>

              {/* Availability toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: 'var(--bg-secondary)' }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Currently available
                </span>
                <button
                  onClick={() => setEditing(p => p ? { ...p, available: !p.available } : p)}
                  className="relative w-10 h-6 rounded-full transition-colors flex-shrink-0"
                  style={{ background: editing.available ? 'var(--teal-deep)' : 'var(--border)' }}>
                  <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                    style={{ left: editing.available ? '18px' : '2px' }} />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-5 border-t flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
              <button onClick={closeForm} className="btn-ghost flex-1 justify-center text-sm">
                Cancel
              </button>
              <button
                onClick={saveItem}
                disabled={!editing.name.trim()}
                className="btn-glow btn-ripple flex-1 justify-center text-sm"
                style={{ opacity: !editing.name.trim() ? 0.6 : 1 }}>
                <Save size={14} /> Save Service
              </button>
            </div>
          </div>
        </div>
      )}
    </VendorDashboardLayout>
  );
}
