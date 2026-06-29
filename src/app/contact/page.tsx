import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <section className="hero-gradient py-16 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="badge badge-teal mb-4 inline-flex">Get In Touch</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              We&apos;d Love to <span className="text-gradient">Hear From You</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Questions, feedback, or vendor enquiries — we respond within 24 hours.</p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-poppins font-semibold text-2xl mb-6" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Send a Message
            </h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Full name</label>
                <input type="text" placeholder="Tendai Moyo" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Email</label>
                <input type="email" placeholder="you@example.com" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Subject</label>
                <input type="text" placeholder="How can we help?" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>Message</label>
                <textarea placeholder="Tell us more..." className="input-field h-28 resize-none" />
              </div>
              <button type="submit" className="btn-glow btn-ripple w-full justify-center">
                <MessageSquare size={15} /> Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="font-poppins font-semibold text-2xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Contact Info
            </h2>
            {[
              { icon: Mail, label: 'Email', value: 'hello@eventease.co.zw', color: '#024F5B' },
              { icon: MessageSquare, label: 'WhatsApp', value: '+263 77 123 4567', color: '#1CB6BB' },
              { icon: Clock, label: 'Response Time', value: 'Within 24 hours (business days)', color: '#741353' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="font-semibold text-sm font-poppins" style={{ color: 'var(--text-primary)' }}>{label}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{value}</p>
                </div>
              </div>
            ))}

            <div className="card p-5" style={{ background: 'var(--primary-light)', borderColor: 'rgba(28,182,187,0.3)' }}>
              <p className="font-semibold text-sm font-poppins mb-1" style={{ color: 'var(--teal-deep)' }}>For Vendors</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Want to list your business? Head to our vendor registration page to get started for free.
              </p>
              <a href="/register?role=vendor" className="btn-ghost mt-3 inline-flex text-sm py-2 px-4">
                Register as Vendor
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
