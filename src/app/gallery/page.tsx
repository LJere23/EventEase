'use client';
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Camera, Heart, MessageCircle, Share2, Upload, X } from 'lucide-react';

type Category = 'all' | 'wedding' | 'corporate' | 'birthday' | 'graduation' | 'festival';

interface GalleryPost {
  id: string; category: Category; title: string; author: string;
  role: 'organiser' | 'vendor'; location: string; likes: number;
  comments: number; color: string; emoji: string; date: string;
}

const posts: GalleryPost[] = [
  { id: 'g1',  category: 'wedding',    title: 'Chipo & Takudzwa Garden Wedding',  author: 'Chipo M.',      role: 'organiser', location: 'Harare Gardens',         likes: 84,  comments: 12, color: '#f0e6ff', emoji: '💍', date: 'Jun 2026' },
  { id: 'g2',  category: 'corporate',  title: 'TechZim Annual Awards Night',      author: 'Royal Venue',   role: 'vendor',    location: 'Rainbow Towers, Harare', likes: 56,  comments: 8,  color: '#e6f8f9', emoji: '🏆', date: 'May 2026' },
  { id: 'g3',  category: 'birthday',   title: 'Shamiso\'s Sweet 16 Party',        author: 'Shamiso M.',    role: 'organiser', location: 'Bulawayo',               likes: 120, comments: 22, color: '#fff0e6', emoji: '🎂', date: 'Apr 2026' },
  { id: 'g4',  category: 'wedding',    title: 'Floral Arch — Classic White Wedding', author: 'GlowUp Décor',role: 'vendor',   location: 'Harare',                 likes: 203, comments: 45, color: '#ffeef5', emoji: '💐', date: 'Jun 2026' },
  { id: 'g5',  category: 'graduation', title: 'UZ Class of 2026 Celebration',    author: 'Tafadzwa N.',   role: 'organiser', location: 'University of Zimbabwe',  likes: 67,  comments: 9,  color: '#e6ffe6', emoji: '🎓', date: 'May 2026' },
  { id: 'g6',  category: 'festival',   title: 'Harare Food & Culture Festival',  author: 'Admin',         role: 'organiser', location: 'Harare CBD',             likes: 312, comments: 61, color: '#fff9e6', emoji: '🎉', date: 'Jun 2026' },
  { id: 'g7',  category: 'wedding',    title: 'Candlelit Reception Setup',        author: 'Pixel Studios', role: 'vendor',    location: 'Meikles Hotel',          likes: 178, comments: 33, color: '#f9e6ff', emoji: '🕯️', date: 'Jun 2026' },
  { id: 'g8',  category: 'corporate',  title: 'Year-End Gala — 200 Pax Setup',  author: 'Sunshine Caterers', role: 'vendor', location: 'Harare',               likes: 45,  comments: 6,  color: '#e6f0ff', emoji: '🍽️', date: 'May 2026' },
  { id: 'g9',  category: 'birthday',   title: 'Baby Shower Balloon Wall',        author: 'GlowUp Décor',  role: 'vendor',    location: 'Harare',                 likes: 94,  comments: 17, color: '#ffeef5', emoji: '🎀', date: 'Apr 2026' },
];

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: 'all',        label: 'All Events',  emoji: '✨' },
  { value: 'wedding',    label: 'Weddings',    emoji: '💍' },
  { value: 'corporate',  label: 'Corporate',   emoji: '🏢' },
  { value: 'birthday',   label: 'Birthdays',   emoji: '🎂' },
  { value: 'graduation', label: 'Graduation',  emoji: '🎓' },
  { value: 'festival',   label: 'Festivals',   emoji: '🎉' },
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

      {/* Hero */}
      <section className="pt-28 pb-12 px-4" style={{ background: 'linear-gradient(135deg, #f0e6ff 0%, #e6f8f9 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-4xl mb-4 block">📸</span>
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
            Event Gallery
          </h1>
          <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
            Real events. Real memories. See what Zimbabwe's organisers and vendors create on EventEase — and share your own.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setShowUpload(true)}
              className="btn-glow btn-ripple inline-flex">
              <Camera size={16} /> Share Your Event
            </button>
            <Link href="/register" className="btn-ghost inline-flex">
              Join EventEase Free
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 py-3 px-4 border-b" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(cat => (
              <button key={cat.value} onClick={() => setActive(cat.value)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0"
                style={{
                  background: active === cat.value ? 'var(--teal-deep)' : 'var(--bg-secondary)',
                  color: active === cat.value ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${active === cat.value ? 'transparent' : 'var(--border)'}`,
                }}>
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            {filtered.length} {active === 'all' ? 'posts' : categories.find(c => c.value === active)?.label.toLowerCase() + ' posts'}
          </p>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {filtered.map(post => (
              <div key={post.id} className="break-inside-avoid mb-5 card overflow-hidden group">
                {/* Photo placeholder */}
                <div className="relative h-48 sm:h-56 flex items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${post.color}, ${post.color}99)` }}>
                  <span className="text-6xl">{post.emoji}</span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <Camera size={28} color="white" />
                  </div>
                </div>

                {/* Card content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{post.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{post.location} · {post.date}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 capitalize font-medium"
                      style={{ background: post.role === 'vendor' ? 'rgba(233,64,155,0.1)' : 'rgba(28,182,187,0.1)', color: post.role === 'vendor' ? 'var(--pink)' : 'var(--teal)' }}>
                      {post.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: 'var(--teal-deep)', fontSize: '9px' }}>
                      {post.author[0]}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{post.author}</span>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                    <button onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1.5 text-xs transition-colors"
                      style={{ color: liked.has(post.id) ? '#E9409B' : 'var(--text-secondary)' }}>
                      <Heart size={14} fill={liked.has(post.id) ? '#E9409B' : 'none'} />
                      {post.likes + (liked.has(post.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <MessageCircle size={14} /> {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs ml-auto" style={{ color: 'var(--text-secondary)' }}>
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, var(--teal-deep), #741353)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-3xl text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Ready to plan your event?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)' }} className="mb-6">
            Join EventEase to access Zimbabwe's best vendors, AI planning tools, and post your own event photos.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ background: 'white', color: 'var(--teal-deep)', fontFamily: "'Poppins', sans-serif" }}>
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />

      {/* Upload modal — prompts login if not signed in */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && setShowUpload(false)}>
          <div className="card w-full max-w-sm p-8 text-center">
            <button onClick={() => setShowUpload(false)} className="absolute top-4 right-4" style={{ color: 'var(--text-secondary)' }}>
              <X size={18} />
            </button>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, #024F5B, #741353)' }}>
              <Upload size={24} color="white" />
            </div>
            <h2 className="font-poppins font-bold text-xl mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
              Share your event
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Sign in or create a free account to post photos and showcase your events on the gallery.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setShowUpload(false)} className="btn-glow btn-ripple justify-center w-full">
                Sign In to Upload
              </Link>
              <Link href="/register" onClick={() => setShowUpload(false)} className="btn-ghost justify-center w-full">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
