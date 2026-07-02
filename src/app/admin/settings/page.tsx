'use client';
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Save, AlertTriangle, Globe, DollarSign, Bell, Shield } from 'lucide-react';

interface ToggleProps { label: string; description: string; checked: boolean; onChange: (v: boolean) => void; }
function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid var(--border)' }}>
      <div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>
      <button onClick={() => onChange(!checked)}
        className="relative w-10 h-5 rounded-full transition-all flex-shrink-0"
        style={{ background: checked ? 'var(--teal)' : 'var(--border)' }}>
        <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
          style={{ left: checked ? '22px' : '2px' }} />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  // Platform settings state
  const [platformName, setPlatformName] = useState('EventEase');
  const [supportEmail, setSupportEmail] = useState('support@eventease.co.zw');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistrations, setAllowRegistrations] = useState(true);
  const [requireEmailVerify, setRequireEmailVerify] = useState(true);
  const [autoApproveVendors, setAutoApproveVendors] = useState(false);

  // Commission rates
  const [premiumPrice, setPremiumPrice] = useState('15');
  const [proPrice, setProPrice] = useState('35');
  const [vendorCommission, setVendorCommission] = useState('8');

  // Notifications
  const [notifyNewVendor, setNotifyNewVendor] = useState(true);
  const [notifyNewPayment, setNotifyNewPayment] = useState(true);
  const [notifyNewUser, setNotifyNewUser] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@eventease.co.zw');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-poppins font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Platform Settings</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Global configuration for EventEase. Changes apply platform-wide.</p>
          </div>
          <button onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: saved ? '#1CB6BB' : 'var(--teal-deep)', color: '#fff' }}>
            <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Maintenance warning */}
        {maintenanceMode && (
          <div className="flex items-center gap-3 p-4 rounded-xl mb-6"
            style={{ background: '#E9409B0d', border: '1px solid #E9409B30' }}>
            <AlertTriangle size={16} style={{ color: '#E9409B', flexShrink: 0 }} />
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
              <span className="font-semibold">Maintenance mode is ON.</span> Public users will see a &quot;coming back soon&quot; page.
            </p>
          </div>
        )}

        {/* General */}
        <div className="card p-6 mb-5">
          <div className="flex items-center gap-2 mb-5">
            <Globe size={16} style={{ color: 'var(--teal)' }} />
            <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>General</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Platform Name</label>
              <input className="input-field text-sm" value={platformName} onChange={e => setPlatformName(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Support Email</label>
              <input className="input-field text-sm" type="email" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} />
            </div>
          </div>
          <Toggle label="Maintenance Mode" description="Temporarily take the platform offline for updates."
            checked={maintenanceMode} onChange={setMaintenanceMode} />
          <Toggle label="Allow New Registrations" description="Enable or disable new user sign-ups."
            checked={allowRegistrations} onChange={setAllowRegistrations} />
          <Toggle label="Require Email Verification" description="Users must verify their email before accessing the platform."
            checked={requireEmailVerify} onChange={setRequireEmailVerify} />
          <div className="pt-4">
            <Toggle label="Auto-approve Vendors" description="Skip admin review — vendors go live immediately after registration."
              checked={autoApproveVendors} onChange={setAutoApproveVendors} />
          </div>
        </div>

        {/* Pricing */}
        <div className="card p-6 mb-5">
          <div className="flex items-center gap-2 mb-5">
            <DollarSign size={16} style={{ color: 'var(--teal)' }} />
            <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Pricing & Commission</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Premium Plan (USD/mo)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-secondary)' }}>$</span>
                <input className="input-field text-sm" style={{ paddingLeft: '24px' }} type="number" min="0"
                  value={premiumPrice} onChange={e => setPremiumPrice(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Pro Planner (USD/mo)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-secondary)' }}>$</span>
                <input className="input-field text-sm" style={{ paddingLeft: '24px' }} type="number" min="0"
                  value={proPrice} onChange={e => setProPrice(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Vendor Commission (%)</label>
              <div className="relative">
                <input className="input-field text-sm" style={{ paddingRight: '32px' }} type="number" min="0" max="100"
                  value={vendorCommission} onChange={e => setVendorCommission(e.target.value)} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-secondary)' }}>%</span>
              </div>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: 'var(--text-secondary)' }}>
            Commission is applied to bookings processed through the platform. Payment methods: EcoCash · InnBucks · Bank Transfer.
          </p>
        </div>

        {/* Notifications */}
        <div className="card p-6 mb-5">
          <div className="flex items-center gap-2 mb-5">
            <Bell size={16} style={{ color: 'var(--teal)' }} />
            <h2 className="font-poppins font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Admin Notifications</h2>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Notification Email</label>
            <input className="input-field text-sm max-w-sm" type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />
          </div>
          <Toggle label="New Vendor Application" description="Email alert when a new vendor submits an application."
            checked={notifyNewVendor} onChange={setNotifyNewVendor} />
          <Toggle label="New Payment Submitted" description="Email alert when a user uploads payment proof."
            checked={notifyNewPayment} onChange={setNotifyNewPayment} />
          <div className="pt-4">
            <Toggle label="New User Registration" description="Email alert for every new account created."
              checked={notifyNewUser} onChange={setNotifyNewUser} />
          </div>
        </div>

        {/* Danger zone */}
        <div className="card p-6" style={{ borderColor: '#E9409B40', borderWidth: '1px' }}>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} style={{ color: '#E9409B' }} />
            <h2 className="font-poppins font-semibold" style={{ color: '#E9409B', fontFamily: "'Poppins', sans-serif" }}>Danger Zone</h2>
          </div>
          <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Clear Demo Data</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Remove all mock/demo events, vendors, and users from the database.</p>
            </div>
            <button className="text-xs px-4 py-2 rounded-xl font-semibold"
              style={{ background: '#E9409B15', color: '#E9409B', border: '1px solid #E9409B30' }}>
              Clear Data
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Reset Platform Settings</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Restore all settings above to their defaults.</p>
            </div>
            <button className="text-xs px-4 py-2 rounded-xl font-semibold"
              style={{ background: '#E9409B15', color: '#E9409B', border: '1px solid #E9409B30' }}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
