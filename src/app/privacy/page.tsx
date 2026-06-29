import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <span className="badge badge-teal mb-4 inline-flex">Legal</span>
          <h1 className="font-poppins font-bold text-4xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Privacy Policy
          </h1>
          <p className="mb-8 text-sm" style={{ color: 'var(--text-secondary)' }}>Last updated: June 2026</p>

          {[
            { title: 'Information We Collect', body: 'We collect information you provide directly, including your name, email address, event details, and payment proof submissions. We also collect usage data to improve the platform.' },
            { title: 'How We Use Your Information', body: 'Your information is used to provide and improve EventEase services, process bookings and payments, send notifications, and personalise your experience. We do not sell your data to third parties.' },
            { title: 'Data Storage & Security', body: 'Data is stored securely using Supabase infrastructure. Payment proofs are stored encrypted. We use industry-standard security practices to protect your information.' },
            { title: 'Vendor Information', body: 'Vendor profiles (business name, services, photos, location) are publicly displayed on the marketplace. Contact details are shared only with authenticated users who have sent a quote request.' },
            { title: 'Cookies', body: 'We use essential cookies for authentication and session management. No advertising or tracking cookies are used.' },
            { title: 'Your Rights', body: 'You can request access to, correction of, or deletion of your data at any time by contacting hello@eventease.co.zw.' },
            { title: 'Contact', body: 'For privacy-related enquiries, email hello@eventease.co.zw. EventEase (Pvt) Ltd, Zimbabwe.' },
          ].map(section => (
            <div key={section.title} className="mb-8">
              <h2 className="font-poppins font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{section.title}</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>{section.body}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
