'use client';
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Camera, Heart, MessageCircle, Share2, Upload, X, MapPin, Sparkles } from 'lucide-react';

type Category = 'all' | 'wedding' | 'corporate' | 'birthday' | 'graduation' | 'festival';

interface GalleryPost {
  id: string;
  category: Category;
  title: string;
  caption: string;
  location: string;
  likes: number;
  comments: number;
  gradient: string;
  emoji: string;
  date: string;
}

const posts: GalleryPost[] = [
  {
    id: 'g1', category: 'wedding',
    title: 'Chipo & Takudzwa Garden Wedding',
    caption: 'A golden afternoon in the gardens — every detail whispered elegance.',
    location: 'Harare Gardens', likes: 84, comments: 12, date: 'Jun 2026',
    emoji: '💍', gradient: 'linear-gradient(135deg, #741353 0%, #E9409B 100%)',
  },
  {
    id: 'g2', category: 'corporate',
    title: 'TechZim Annual Awards Night',
    caption: 'Celebrating Zimbabwe\'s brightest tech minds under the stars.',
    location: 'Rainbow Towers, Harare', likes: 56, comments: 8, date: 'May 2026',
    emoji: '🏆', gradient: 'linear-gradient(135deg, #024F5B 0%, #1CB6BB 100%)',
  },
  {
    id: 'g3', category: 'birthday',
    title: 'Shamiso\'s Sweet 16',
    caption: 'Sweet sixteen and absolutely glowing — the night was pure magic.',
    location: 'Bulawayo', likes: 120, comments: 22, date: 'Apr 2026',
    emoji: '🎂', gradient: 'linear-gradient(135deg, #E9409B 0%, #C9A84C 100%)',
  },
  {
    id: 'g4', category: 'wedding',
    title: 'Floral Arch — Classic White Wedding',
    caption: 'Thousands of white blooms, one unforgettable moment.',
    location: 'Harare', likes: 203, comments: 45, date: 'Jun 2026',
    emoji: '💐', gradient: 'linear-gradient(135deg, #741353 0%, #C9A84C 100%)',
  },
  {
    id: 'g5', category: 'graduation',
    title: 'UZ Class of 2026 Celebration',
    caption: 'Four years of hard work — one glorious afternoon to remember it all.',
    location: 'University of Zimbabwe', likes: 67, comments: 9, date: 'May 2026',
    emoji: '🎓', gradient: 'linear-gradient(135deg, #1A1A2E 0%, #1CB6BB 100%)',
  },
  {
    id: 'g6', category: 'festival',
    title: 'Harare Food & Culture Festival',
    caption: 'Colour, flavour, music — the heart of Zimbabwe in one place.',
    location: 'Harare CBD', likes: 312, comments: 61, date: 'Jun 2026',
    emoji: '🎉', gradient: 'linear-gradient(135deg, #C9A84C 0%, #E9409B 100%)',
  },
  {
    id: 'g7', category: 'wedding',
    title: 'Candlelit Reception Setup',
    caption: 'Warm candlelight, rich florals — romance woven into every corner.',
    location: 'Meikles Hotel', likes: 178, comments: 33, date: 'Jun 2026',
    emoji: '🕯️', gradient: 'linear-gradient(135deg, #741353 0%, #1A1A2E 100%)',
  },
  {
    id: 'g8', category: 'corporate',
    title: 'Year-End Gala — 200 Pax',
    caption: 'An evening of gratitude, style and the finest Zimbabwean hospitality.',
    location: 'Harare', likes: 45, comments: 6, date: 'May 2026',
    emoji: '🍽️', gradient: 'linear-gradient(135deg, #024F5B 0%, #741353 100%)',
  },
  {
    id: 'g9', category: 'birthday',
    title: 'Baby Shower Balloon Wall',
    caption: 'Every pastel hue, every balloon — chosen with love for the little one.',
    location: 'Harare', likes: 94, comments: 17, date: 'Apr 2026',
    emoji: '🎀', gradient: 'linear-gradient(135deg, #E9409B 0%, #741353 100%)',
  },
];

const categories: { value: Category; label: string }[] = [
  { value: 'all',        label: 'All Events'  },
  { value: 'wedding',    label: 'Weddings'    },
  { value: 'corporate',  label: 'Corporate'   },
  { value: 'birthday',   label: 'Birthdays'   },
  { value: 'graduation', label: 'Graduation'  },
  { value: 'festival',   label: 'Festivals'   },
];

export default function GalleryPage() {
  const [active, setActive] = useState<Category>('all');
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [showUpload, setShowUpload] = useState(false);

  const filtered = active === 'all' ? posts : posts.filter(p => p.category === active);

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #741353 60%, #E9409B 100%)' }}>
        {/* decorative orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(233,64,155,0.25) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(28,182,187,0.2) 0%, transparent 70%)', transform: 'translate(20%, 20%)' }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-medium"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
            <Sparkles size={13} /> Zimbabwe's Event Showcase
          </div>
          <h1 className="font-poppins font-bold text-5xl sm:text-6xl text-white mb-5 leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif", textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Event Gallery
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.85)' }}>
            Real moments. Extraordinary memories. Discover the events that make Zimbabwe celebrate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setShowUpload(true)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{ background: 'white', color: '#741353', fontFamily: "'Poppins', sans-serif", boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
              <Camera size={16} /> Share Your Event
            </button>
            <Link href="/register"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)', fontFamily: "'Poppins', sans-serif" }}>
              Join Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section className="sticky top-16 z-30 py-4 px-4"
        style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button key={cat.value} onClick={() => setActive(cat.value)}
                className="px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0"
                style={{
                  background: active === cat.value
                    ? 'linear-gradient(135deg, #741353, #E9409B)'
                    : 'var(--bg-secondary)',
                  color: active === cat.value ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${active === cat.value ? 'transparent' : 'var(--border)'}`,
                  boxShadow: active === cat.value ? '0 2px 12px rgba(233,64,155,0.35)' : 'none',
                  fontFamily: "'Poppins', sans-serif",
                }}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest mb-8"
            style={{ color: 'var(--text-secondary)', letterSpacing: '0.12em' }}>
            {filtered.length} {active === 'all' ? 'moments' : categories.find(c => c.value === active)?.label.toLowerCase()}
          </p>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {filtered.map(post => (
              <div key={post.id}
                className="break-inside-avoid mb-6 overflow-hidden group"
                style={{
                  borderRadius: '20px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  background: 'var(--bg-card, var(--bg-secondary))',
                  border: '1px solid var(--border)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>

                {/* Photo area */}
                <div className="relative overflow-hidden"
                  style={{ background: post.gradient, height: '220px' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ fontSize: '5rem', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))' }}>
                      {post.emoji}
                    </span>
                  </div>
                  {/* hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: 'rgba(26,26,46,0.5)', backdropFilter: 'blur(2px)' }}>
                    <div className="text-center">
                      <Camera size={26} color="white" className="mx-auto mb-1" />
                      <p className="text-white text-xs font-medium">View photo</p>
                    </div>
                  </div>
                  {/* date pill */}
                  <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(26,26,46,0.65)', color: 'white', backdropFilter: 'blur(6px)' }}>
                    {post.date}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-poppins font-semibold text-sm mb-2 leading-snug"
                    style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                    {post.title}
                  </h3>
                  <p className="text-xs italic mb-3 leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}>
                    "{post.caption}"
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    <MapPin size={11} style={{ color: '#E9409B', flexShrink: 0 }} />
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{post.location}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-3"
                    style={{ borderTop: '1px solid var(--border)' }}>
                    <button onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1.5 text-xs font-medium transition-all"
                      style={{ color: liked.has(post.id) ? '#E9409B' : 'var(--text-secondary)' }}>
                      <Heart size={14} fill={liked.has(post.id) ? '#E9409B' : 'none'}
                        style={{ transition: 'transform 0.15s' }}
                        className={liked.has(post.id) ? 'scale-110' : ''} />
                      {post.likes + (liked.has(post.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium"
                      style={{ color: 'var(--text-secondary)' }}>
                      <MessageCircle size={14} /> {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium ml-auto"
                      style={{ color: 'var(--text-secondary)' }}>
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #741353 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(233,64,155,0.2) 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Ready to plan your next event?
          </h2>
          <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Join EventEase — Zimbabwe's leading event platform — and start creating memories worth sharing.
          </p>
          <Link href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
            style={{ background: 'white', color: '#741353', fontFamily: "'Poppins', sans-serif", boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />

      {/* ── Upload modal ── */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(26,26,46,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={e => e.target === e.currentTarget && setShowUpload(false)}>
          <div className="w-full max-w-sm rounded-2xl p-8 text-center relative"
            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <button onClick={() => setShowUpload(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              <X size={16} />
            </button>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #741353, #E9409B)' }}>
              <Upload size={24} color="white" />
            </div>
            <h2 className="font-poppins font-bold text-xl mb-2"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Share your event
            </h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Sign in to post photos and add your caption to the gallery.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setShowUpload(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #741353, #E9409B)', fontFamily: "'Poppins', sans-serif" }}>
                Sign In to Upload
              </Link>
              <Link href="/register" onClick={() => setShowUpload(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
