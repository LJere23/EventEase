import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <span className="badge badge-teal mb-4 inline-flex">Legal</span>
          <h1 className="font-poppins font-bold text-4xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Terms of Service
          </h1>
          <p className="mb-8 text-sm" style={{ color: 'var(--text-secondary)' }}>Last updated: June 2026</p>

          {[
            { title: '1. Acceptance of Terms', body: 'By creating an account or using EventEase, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.' },
            { title: '2. User Accounts', body: 'You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information during registration. EventEase reserves the right to suspend accounts in violation of these terms.' },
            { title: '3. Vendor Listings', body: 'Vendors are responsible for the accuracy of their profiles, pricing, and service descriptions. EventEase reserves the right to remove listings that contain false information or violate community standards.' },
            { title: '4. Payments & Commissions', body: 'Payments for Premium subscriptions and bookings follow the manual verification process described in our payment instructions. Commission rates are set by EventEase and communicated clearly before transactions.' },
            { title: '5. No Guarantee of Services', body: 'EventEase is a marketplace connecting event organisers with vendors. We do not guarantee the quality, availability, or suitability of any vendor services. Users engage vendors at their own discretion.' },
            { title: '6. Limitation of Liability', body: 'EventEase (Pvt) Ltd is not liable for disputes between users and vendors, loss of data, or service interruptions beyond our reasonable control.' },
            { title: '7. Changes to Terms', body: 'We may update these terms at any time. Continued use of EventEase after changes constitutes acceptance of the new terms.' },
            { title: '8. Contact', body: 'For terms-related enquiries, contact hello@eventease.co.zw.' },
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
