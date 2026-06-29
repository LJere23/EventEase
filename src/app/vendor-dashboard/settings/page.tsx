'use client';
import { useState, useRef } from 'react';
import { VendorDashboardLayout } from '@/components/layout/VendorDashboardLayout';
import { Camera, Save, User, Building2, MapPin, Phone, Globe, Upload, Trash2 } from 'lucide-react';

const CATEGORIES = [
  'Catering', 'Photography', 'Videography', 'Décor & Flowers', 'DJ & Music',
  'MC & Entertainment', 'Venue', 'Cake & Pastry', 'Transport', 'Makeup & Beauty',
  'Printing & Stationery', 'Tent & Furniture Hire', 'Security', 'Other',
];

const CITIES = ['Harare', 'Bulawayo', 'Mutare', 'Gweru', 'Masvingo', 'Kwekwe', 'Bindura', 'Victoria Falls'];

export default function VendorSettingsPage() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    // Business
    businessName: '',
    category: '',
    city: '',
    description: '',
    priceRange: '',
    // Location
    address: '',
    suburb: '',
    // Contact
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    // Personal
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file) setter(URL.createObjectURL(file));
  };

  const field = (label: string, key: keyof typeof profile, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
        {label}
      </label>
      <input
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={profile[key]}
        onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
      />
    </div>
  );

  return (
    <VendorDashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Vendor Profile Settings
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Complete your profile so clients trust and choose you. Detailed profiles get 3× more enquiries.
          </p>
        </div>

        {/* Images Section */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-light)' }}>
              <Camera size={16} style={{ color: 'var(--teal-deep)' }} />
            </div>
            <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Images
            </h2>
          </div>

          {/* Cover photo */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Cover / Portfolio Photo
              <span className="font-normal ml-1" style={{ color: 'var(--text-secondary)' }}>(shown on your public listing)</span>
            </label>
            <div
              className="relative h-40 rounded-2xl flex items-center justify-center cursor-pointer group overflow-hidden"
              style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--border)' }}
              onClick={() => coverRef.current?.click()}
            >
              {coverPreview ? (
                <>
                  <img src={coverPreview} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload size={20} className="text-white" />
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Upload size={24} className="mx-auto mb-2" style={{ color: 'var(--text-secondary)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Click to upload cover photo</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>JPG, PNG up to 5MB</p>
                </div>
              )}
              <input ref={coverRef} type="file" accept="image/*" className="hidden"
                onChange={e => handleImageChange(e, setCoverPreview)} />
            </div>
          </div>

          {/* Logo + Avatar side by side */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Business Logo
              </label>
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden flex-shrink-0"
                  style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--border)' }}
                  onClick={() => logoRef.current?.click()}
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building2 size={24} style={{ color: 'var(--text-secondary)' }} />
                  )}
                  <input ref={logoRef} type="file" accept="image/*" className="hidden"
                    onChange={e => handleImageChange(e, setLogoPreview)} />
                </div>
                <div>
                  <button onClick={() => logoRef.current?.click()}
                    className="btn-ghost text-xs py-2 px-3 mb-2 w-full">
                    <Upload size={12} /> Upload Logo
                  </button>
                  {logoPreview && (
                    <button onClick={() => setLogoPreview(null)}
                      className="text-xs w-full text-center" style={{ color: '#ef4444' }}>
                      <Trash2 size={11} className="inline mr-1" /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Owner / Personal Photo
              </label>
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer overflow-hidden flex-shrink-0"
                  style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--border)' }}
                  onClick={() => avatarRef.current?.click()}
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={24} style={{ color: 'var(--text-secondary)' }} />
                  )}
                  <input ref={avatarRef} type="file" accept="image/*" className="hidden"
                    onChange={e => handleImageChange(e, setAvatarPreview)} />
                </div>
                <div>
                  <button onClick={() => avatarRef.current?.click()}
                    className="btn-ghost text-xs py-2 px-3 mb-2 w-full">
                    <Upload size={12} /> Upload Photo
                  </button>
                  {avatarPreview && (
                    <button onClick={() => setAvatarPreview(null)}
                      className="text-xs w-full text-center" style={{ color: '#ef4444' }}>
                      <Trash2 size={11} className="inline mr-1" /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#E9409B15' }}>
              <Building2 size={16} style={{ color: '#E9409B' }} />
            </div>
            <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Business Information
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {field('Business Name *', 'businessName', 'text', 'e.g. Harare Catering Co.')}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Category *</label>
              <select className="input-field" value={profile.category}
                onChange={e => setProfile(p => ({ ...p, category: e.target.value }))}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>City *</label>
              <select className="input-field" value={profile.city}
                onChange={e => setProfile(p => ({ ...p, city: e.target.value }))}>
                <option value="">Select city</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Price Range</label>
              <select className="input-field" value={profile.priceRange}
                onChange={e => setProfile(p => ({ ...p, priceRange: e.target.value }))}>
                <option value="">Select range</option>
                <option>Budget (USD 0–200)</option>
                <option>Mid-range (USD 200–800)</option>
                <option>Premium (USD 800+)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Business Description *
                <span className="font-normal ml-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Tell clients what makes you special (3–5 sentences)
                </span>
              </label>
              <textarea className="input-field resize-none h-28"
                placeholder="We are a professional catering company with 8 years of experience..."
                value={profile.description}
                onChange={e => setProfile(p => ({ ...p, description: e.target.value }))} />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#1CB6BB15' }}>
              <MapPin size={16} style={{ color: '#1CB6BB' }} />
            </div>
            <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Location & Address
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {field('Street Address', 'address', 'text', 'e.g. 12 Jason Moyo Ave')}
            {field('Suburb / Area', 'suburb', 'text', 'e.g. Avondale')}
          </div>
          <p className="text-xs mt-3" style={{ color: 'var(--text-secondary)' }}>
            Your exact address is only shared with confirmed clients. The city is shown publicly.
          </p>
        </div>

        {/* Contact Info */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#741353' + '15' }}>
              <Phone size={16} style={{ color: '#741353' }} />
            </div>
            <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Business Contact Details
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {field('Business Phone *', 'phone', 'tel', '+263 77 123 4567')}
            {field('WhatsApp Number', 'whatsapp', 'tel', '+263 77 123 4567')}
            {field('Business Email *', 'email', 'email', 'info@yourbusiness.co.zw')}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Website / Social Link
              </label>
              <div className="relative">
                <Globe size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input type="url" className="input-field" style={{ paddingLeft: '38px' }}
                  placeholder="www.yourbusiness.co.zw or Instagram link"
                  value={profile.website}
                  onChange={e => setProfile(p => ({ ...p, website: e.target.value }))} />
              </div>
            </div>
          </div>
        </div>

        {/* Personal / Owner Details */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#8B920A15' }}>
              <User size={16} style={{ color: '#8B920A' }} />
            </div>
            <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Owner / Personal Details
            </h2>
          </div>
          <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
            Shown on your profile to build trust with clients. Clients feel more confident when they know who they&apos;re working with.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {field('Your Full Name', 'ownerName', 'text', 'Tendai Moyo')}
            {field('Your Phone', 'ownerPhone', 'tel', '+263 77 123 4567')}
            {field('Your Email', 'ownerEmail', 'email', 'you@email.com')}
          </div>
        </div>

        <button
          className="btn-glow btn-ripple w-full justify-center py-4 text-base"
          onClick={() => alert('Profile saved! (Supabase will be wired up with your credentials.)')}
        >
          <Save size={16} /> Save All Changes
        </button>
      </div>
    </VendorDashboardLayout>
  );
}
