import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

const posts = [
  { id: '1', title: 'How to Plan a Wedding in Harare on Any Budget', category: 'Weddings', date: 'Jun 15, 2026', read: '6 min', color: '#E9409B', emoji: '💍' },
  { id: '2', title: 'Top 10 Event Venues in Zimbabwe for 2026', category: 'Venues', date: 'Jun 10, 2026', read: '5 min', color: '#024F5B', emoji: '🏛️' },
  { id: '3', title: 'Corporate Event Planning: A Complete Checklist', category: 'Corporate', date: 'Jun 5, 2026', read: '8 min', color: '#1CB6BB', emoji: '🏢' },
  { id: '4', title: 'How to Find the Best Caterer for Your Event', category: 'Catering', date: 'May 28, 2026', read: '4 min', color: '#741353', emoji: '🍽️' },
  { id: '5', title: 'RSVP Best Practices That Actually Work', category: 'Planning Tips', date: 'May 20, 2026', read: '5 min', color: '#8B920A', emoji: '📋' },
  { id: '6', title: 'Graduation Party Ideas for Zimbabwean Families', category: 'Graduations', date: 'May 12, 2026', read: '6 min', color: '#024F5B', emoji: '🎓' },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--bg-primary)' }}>
        <section className="hero-gradient py-16 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="badge badge-teal mb-4 inline-flex">EventEase Blog</span>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Event Planning <span className="text-gradient">Guides & Tips</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Expert advice for planning events in Zimbabwe — from weddings to corporate dinners.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <article key={post.id} className="card overflow-hidden group hover:border-[var(--teal)] transition-all">
                <div className="h-40 flex items-center justify-center text-5xl"
                  style={{ background: `${post.color}12` }}>
                  {post.emoji}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge text-xs"
                      style={{ background: `${post.color}15`, color: post.color, border: `1px solid ${post.color}33` }}>
                      {post.category}
                    </span>
                  </div>
                  <h2 className="font-poppins font-semibold text-base mb-3 leading-snug"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    {post.title}
                  </h2>
                  <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                    <span>{post.read} read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
