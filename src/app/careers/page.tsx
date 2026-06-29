import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const openings = [
  { title: 'Frontend Developer', dept: 'Engineering', type: 'Full-time', location: 'Harare / Remote', color: '#024F5B' },
  { title: 'Vendor Partnerships Manager', dept: 'Business Development', type: 'Full-time', location: 'Harare', color: '#E9409B' },
  { title: 'UI/UX Designer', dept: 'Design', type: 'Contract', location: 'Remote', color: '#1CB6BB' },
  { title: 'Customer Support Specialist', dept: 'Operations', type: 'Part-time', location: 'Harare', color: '#741353' },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <section className="hero-gradient py-16 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="badge badge-teal mb-4 inline-flex">Careers</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Help Us Build <span className="text-gradient">Zimbabwe&apos;s Event Platform</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              We&apos;re a small team with big ambitions. Join us and help shape the future of events in Zimbabwe.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-poppins font-semibold text-2xl mb-8"
            style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Open Positions
          </h2>
          <div className="flex flex-col gap-4">
            {openings.map(job => (
              <div key={job.title} className="card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${job.color}15` }}>
                    <Briefcase size={18} style={{ color: job.color }} />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-base"
                      style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>{job.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{job.dept}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex items-center gap-1"><MapPin size={10} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {job.type}</span>
                    </div>
                  </div>
                </div>
                <a href="mailto:hello@eventease.co.zw?subject=Application: Careers"
                  className="btn-ghost text-sm py-2 px-4 whitespace-nowrap">
                  Apply Now
                </a>
              </div>
            ))}
          </div>

          <div className="card p-8 mt-12 text-center" style={{ background: 'var(--primary-light)', borderColor: 'rgba(28,182,187,0.3)' }}>
            <h3 className="font-poppins font-semibold text-xl mb-2"
              style={{ color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>
              Don&apos;t see a fit?
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Send us your CV anyway — we&apos;re always looking for great people.
            </p>
            <a href="mailto:hello@eventease.co.zw?subject=General Application"
              className="btn-glow btn-ripple inline-flex">
              Send Open Application
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
