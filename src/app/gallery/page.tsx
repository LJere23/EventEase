'use client';
import { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Heart, MessageCircle, Share2, Upload, X, MapPin, Sparkles, Send, Check } from 'lucide-react';

type Category = 'all' | 'wedding' | 'corporate' | 'birthday' | 'graduation' | 'festival';

interface Comment { id: string; author: string; text: string; time: string; }
interface GalleryPost {
  id: string; category: Category; title: string; caption: string;
  location: string; likes: number; imageUrl: string; date: string;
  seedComments: Comment[];
}

const posts: GalleryPost[] = [
  {
    id: 'g1', category: 'wedding',
    title: 'Chipo & Takudzwa Garden Wedding',
    caption: 'A golden afternoon in the gardens — every detail whispered elegance.',
    location: 'Harare Gardens', likes: 84, date: 'Jun 2026',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-4b5cfe1e3e0c?auto=format&fit=crop&w=600&q=80',
    seedComments: [
      { id: 'c1', author: 'Rudo M.', text: 'This is absolutely stunning! 😍', time: '2h ago' },
      { id: 'c2', author: 'Tatenda K.', text: 'The garden setting was perfect for them.', time: '1h ago' },
    ],
  },
  {
    id: 'g2', category: 'corporate',
    title: 'TechZim Annual Awards Night',
    caption: "Celebrating Zimbabwe's brightest tech minds under the stars.",
    location: 'Rainbow Towers, Harare', likes: 56, date: 'May 2026',
    imageUrl: 'https://images.unsplash.com/photo-1540575467537-a54f2cd1a94b?auto=format&fit=crop&w=600&q=80',
    seedComments: [
      { id: 'c1', author: 'Farai N.', text: 'What a night to celebrate Zim tech! 🇿🇼', time: '3h ago' },
    ],
  },
  {
    id: 'g3', category: 'birthday',
    title: "Shamiso's Sweet 16",
    caption: 'Sweet sixteen and absolutely glowing — the night was pure magic.',
    location: 'Bulawayo', likes: 120, date: 'Apr 2026',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    seedComments: [
      { id: 'c1', author: 'Nyasha T.', text: 'Happy belated Shamiso!! 🎉🎂', time: '5h ago' },
      { id: 'c2', author: 'Chido P.', text: 'The décor was everything!', time: '4h ago' },
      { id: 'c3', author: 'Mazvita R.', text: 'Goals for my 18th 🙏', time: '2h ago' },
    ],
  },
  {
    id: 'g4', category: 'wedding',
    title: 'Floral Arch — Classic White Wedding',
    caption: 'Thousands of white blooms, one unforgettable moment.',
    location: 'Harare', likes: 203, date: 'Jun 2026',
    imageUrl: 'https://images.unsplash.com/photo-1519167758451-a45d8b03ab0c?auto=format&fit=crop&w=600&q=80',
    seedComments: [
      { id: 'c1', author: 'Tendai V.', text: 'That arch!! Who did the florals?? 💐', time: '1h ago' },
    ],
  },
  {
    id: 'g5', category: 'graduation',
    title: 'UZ Class of 2026 Celebration',
    caption: 'Four years of hard work — one glorious afternoon to remember it all.',
    location: 'University of Zimbabwe', likes: 67, date: 'May 2026',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    seedComments: [
      { id: 'c1', author: 'Simba C.', text: 'Congratulations class of 2026! 🎓🙌', time: '6h ago' },
    ],
  },
  {
    id: 'g6', category: 'festival',
    title: 'Harare Food & Culture Festival',
    caption: 'Colour, flavour, music — the heart of Zimbabwe in one place.',
    location: 'Harare CBD', likes: 312, date: 'Jun 2026',
    imageUrl: 'https://images.unsplash.com/photo-1506157786-8a16b51b7168?auto=format&fit=crop&w=600&q=80',
    seedComments: [
      { id: 'c1', author: 'Plaxedes M.', text: 'This festival was ELECTRIC! 🔥', time: '2h ago' },
      { id: 'c2', author: 'Kudzi N.', text: 'The food stalls were incredible.', time: '1h ago' },
    ],
  },
  {
    id: 'g7', category: 'wedding',
    title: 'Candlelit Reception Setup',
    caption: 'Warm candlelight, rich florals — romance woven into every corner.',
    location: 'Meikles Hotel', likes: 178, date: 'Jun 2026',
    imageUrl: 'https://images.unsplash.com/photo-1478146059778-26b8b3b73e7f?auto=format&fit=crop&w=600&q=80',
    seedComments: [
      { id: 'c1', author: 'Rumbi T.', text: 'So romantic! This is a dream ✨', time: '3h ago' },
    ],
  },
  {
    id: 'g8', category: 'corporate',
    title: 'Year-End Gala — 200 Pax',
    caption: 'An evening of gratitude, style and the finest Zimbabwean hospitality.',
    location: 'Harare', likes: 45, date: 'May 2026',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80',
    seedComments: [],
  },
  {
    id: 'g9', category: 'birthday',
    title: 'Baby Shower Balloon Wall',
    caption: 'Every pastel hue, every balloon — chosen with love for the little one.',
    location: 'Harare', likes: 94, date: 'Apr 2026',
    imageUrl: 'https://images.unsplash.com/photo-1464349153174-aea91f7b7e55?auto=format&fit=crop&w=600&q=80',
    seedComments: [
      { id: 'c1', author: 'Abigail F.', text: 'The balloon wall is EVERYTHING 🎀💕', time: '4h ago' },
      { id: 'c2', author: 'Tsitsi M.', text: 'Who set this up? I need them!', time: '3h ago' },
    ],
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
  const [commentPost, setCommentPost] = useState<GalleryPost | null>(null);
  const [allComments, setAllComments] = useState<Record<string, Comment[]>>(
    Object.fromEntries(posts.map(p => [p.id, p.seedComments]))
  );
  const [commentInput, setCommentInput] = useState('');
  const [toast, setToast] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const commentEndRef = useRef<HTMLDivElement>(null);

  // Load persisted likes and comments from localStorage after hydration
  useEffect(() => {
    try {
      const savedLiked = JSON.parse(localStorage.getItem('gallery-liked') || '[]');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedLiked.length) setLiked(new Set(savedLiked as string[]));
    } catch { /* ignore */ }
    try {
      const savedComments = JSON.parse(localStorage.getItem('gallery-comments') || 'null');
      if (savedComments) {
        // Merge: keep seed comments as base, overlay saved ones
        const merged: Record<string, Comment[]> = Object.fromEntries(posts.map(p => [p.id, p.seedComments]));
        for (const [id, comments] of Object.entries(savedComments as Record<string, Comment[]>)) {
          merged[id] = comments;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAllComments(merged);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  // Persist likes
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('gallery-liked', JSON.stringify([...liked]));
  }, [liked, hydrated]);

  // Persist comments
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('gallery-comments', JSON.stringify(allComments));
  }, [allComments, hydrated]);

  const filtered = active === 'all' ? posts : posts.filter(p => p.category === active);

  const toggleLike = (id: string) => {
    setLiked(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };

  const openComments = (post: GalleryPost) => {
    setCommentPost(post);
    setCommentInput('');
  };

  const submitComment = () => {
    if (!commentInput.trim() || !commentPost) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      text: commentInput.trim(),
      time: 'just now',
    };
    setAllComments(prev => ({ ...prev, [commentPost.id]: [...(prev[commentPost.id] ?? []), newComment] }));
    setCommentInput('');
  };

  const handleShare = async (post: GalleryPost) => {
    const url = `${window.location.origin}/gallery#${post.id}`;
    const shareData = { title: post.title, text: post.caption, url };
    if (navigator.share && navigator.canShare?.(shareData)) {
      try { await navigator.share(shareData); return; } catch { /* cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard!');
    } catch {
      showToast('Copy this link: ' + url);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  useEffect(() => {
    commentEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allComments, commentPost]);

  useEffect(() => {
    if (!commentPost) return;
    const close = (e: KeyboardEvent) => e.key === 'Escape' && setCommentPost(null);
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [commentPost]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #741353 60%, #E9409B 100%)' }}>
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(233,64,155,0.25) 0%, transparent 70%)', transform: 'translate(-30%,-30%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(28,182,187,0.2) 0%, transparent 70%)', transform: 'translate(20%,20%)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-medium"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
            <Sparkles size={13} /> Zimbabwe&apos;s Event Showcase
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
                  background: active === cat.value ? 'linear-gradient(135deg, #741353, #E9409B)' : 'var(--bg-secondary)',
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
            {filtered.map(post => {
              const comments = allComments[post.id] ?? [];
              return (
                <div key={post.id} id={post.id}
                  className="break-inside-avoid mb-6 overflow-hidden group"
                  style={{ borderRadius: '20px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', background: 'var(--bg-secondary)', border: '1px solid var(--border)', transition: 'transform 0.2s, box-shadow 0.2s' }}>

                  {/* Photo area */}
                  <div className="relative overflow-hidden" style={{ height: '220px', background: '#1A1A2E' }}>
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ background: 'rgba(26,26,46,0.45)', backdropFilter: 'blur(2px)' }}>
                      <div className="text-center">
                        <Camera size={26} color="white" className="mx-auto mb-1" />
                        <p className="text-white text-xs font-medium">View photo</p>
                      </div>
                    </div>
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
                    <p className="text-xs italic mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      &quot;{post.caption}&quot;
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <MapPin size={11} style={{ color: '#E9409B', flexShrink: 0 }} />
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{post.location}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                      <button onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-1.5 text-xs font-medium transition-all"
                        style={{ color: liked.has(post.id) ? '#E9409B' : 'var(--text-secondary)' }}>
                        <Heart size={14} fill={liked.has(post.id) ? '#E9409B' : 'none'} />
                        {post.likes + (liked.has(post.id) ? 1 : 0)}
                      </button>

                      <button onClick={() => openComments(post)}
                        className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
                        style={{ color: 'var(--text-secondary)' }}>
                        <MessageCircle size={14} />
                        {comments.length}
                      </button>

                      <button onClick={() => handleShare(post)}
                        className="flex items-center gap-1.5 text-xs font-medium ml-auto transition-colors hover:opacity-80"
                        style={{ color: 'var(--text-secondary)' }}>
                        <Share2 size={14} /> Share
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
            Join EventEase — Zimbabwe&apos;s leading event platform — and start creating memories worth sharing.
          </p>
          <Link href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
            style={{ background: 'white', color: '#741353', fontFamily: "'Poppins', sans-serif", boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />

      {/* ── Comment drawer ── */}
      {commentPost && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          style={{ background: 'rgba(26,26,46,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={e => e.target === e.currentTarget && setCommentPost(null)}>
          <div className="w-full sm:max-w-md flex flex-col"
            style={{ maxHeight: '85vh', background: 'var(--bg-primary)', borderRadius: '24px 24px 0 0', boxShadow: '0 -8px 40px rgba(0,0,0,0.3)' }}
            onClick={e => e.stopPropagation()}>

            {/* Drawer handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border)' }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <p className="font-poppins font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                  Comments
                </p>
                <p className="text-xs mt-0.5 truncate max-w-[220px]" style={{ color: 'var(--text-secondary)' }}>
                  {commentPost.title}
                </p>
              </div>
              <button onClick={() => setCommentPost(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                <X size={15} />
              </button>
            </div>

            {/* Comment list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {(allComments[commentPost.id] ?? []).length === 0 && (
                <div className="text-center py-10">
                  <MessageCircle size={32} className="mx-auto mb-3" style={{ color: 'var(--border)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No comments yet — be the first!</p>
                </div>
              )}
              {(allComments[commentPost.id] ?? []).map(c => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #741353, #E9409B)' }}>
                    {c.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{c.author}</span>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{c.time}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{c.text}</p>
                  </div>
                </div>
              ))}
              <div ref={commentEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 px-4 py-3 flex-shrink-0" style={{ borderTop: '1px solid var(--border)' }}>
              <input
                className="input-field flex-1 text-sm py-2.5 pl-3"
                placeholder="Add a comment…"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitComment()}
                autoFocus
              />
              <button onClick={submitComment}
                disabled={!commentInput.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: commentInput.trim() ? 'linear-gradient(135deg, #741353, #E9409B)' : 'var(--bg-secondary)',
                  color: commentInput.trim() ? 'white' : 'var(--text-secondary)',
                }}>
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Upload modal ── */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(26,26,46,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={e => e.target === e.currentTarget && setShowUpload(false)}>
          <div className="w-full max-w-sm rounded-2xl p-8 text-center relative"
            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <button onClick={() => setShowUpload(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
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
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #741353, #E9409B)', fontFamily: "'Poppins', sans-serif" }}>
                Sign In to Upload
              </Link>
              <Link href="/register" onClick={() => setShowUpload(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
                style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}>
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium shadow-xl"
          style={{ background: '#1A1A2E', color: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
          <Check size={14} style={{ color: '#1CB6BB' }} />
          {toast}
        </div>
      )}
    </div>
  );
}
