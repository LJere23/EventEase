import Link from 'next/link';
import { Mail, Globe, Share2, Rss } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Event Planner', href: '/planner' },
    { label: 'Vendor Marketplace', href: '/vendors' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  'For Vendors': [
    { label: 'List Your Business', href: '/register?role=vendor' },
    { label: 'Vendor Dashboard', href: '/vendor-dashboard' },
    { label: 'Vendor Resources', href: '/vendor-resources' },
    { label: 'Success Stories', href: '/success-stories' },
  ],
};

export function Footer() {
  return (
    <footer
      className="border-t mt-16"
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-poppins font-bold text-2xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <span style={{ color: 'var(--plum)' }}>Event</span>
                <span style={{ color: 'var(--pink)' }}>Ease</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              Zimbabwe&apos;s all-in-one event planning and vendor marketplace. Find vetted vendors, plan your event, and celebrate — all in one place.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:hello@eventease.co.zw" className="flex items-center gap-2 text-sm hover:text-[var(--teal)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <Mail size={14} />
                hello@eventease.co.zw
              </a>
            </div>
            <div className="flex items-center gap-3 mt-4">
              {[Globe, Share2, Rss].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:border-[var(--teal)] hover:text-[var(--teal)]"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-[var(--teal)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            © 2026 EventEase (Pvt) Ltd. All rights reserved. Built with ❤️ in Zimbabwe.
          </p>
          <div className="flex items-center gap-2">
            <span className="badge badge-teal text-xs">All-In-One Platform</span>
            <span className="badge badge-gold text-xs">Zimbabwe's #1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
