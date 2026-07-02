-- EventEase Seed Data — Realistic Zimbabwe Vendors
-- Run AFTER schema.sql in Supabase SQL Editor
-- https://supabase.com/dashboard/project/wxmoinkgtmadcqmasypo/sql

-- ─── HELPER: Create vendor user accounts + profiles + vendor profiles ─────────
-- We insert into auth.users directly (only possible with service_role / SQL Editor)

DO $$
DECLARE
  v_user_id uuid;
BEGIN

-- ─── 1. Harare Grand Events (Venue) ──────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0001-0001-0001-000000000001',
  'info@harare-grand.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"Harare Grand Events","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0001-0001-0001-000000000001', 'Harare Grand Events', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0001-0001-0001-000000000001',
  'Harare Grand Events',
  'Venue',
  'Harare',
  'Harare''s premier indoor event venue for weddings, corporate galas, and private celebrations. Capacity for up to 400 guests across two halls with full catering kitchen, professional lighting rigs, climate control, and on-site parking for 120 vehicles. Our décor team transforms every space into something extraordinary.',
  'Sam Nujoma St, Avondale, Harare',
  '+263 77 123 4567',
  'info@harare-grand.co.zw',
  'Premium (USD 800+)',
  4.9,
  48,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 2. Royal Cuisine Catering ───────────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0002-0002-0002-000000000002',
  'orders@royalcuisine.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"Royal Cuisine Catering","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0002-0002-0002-000000000002', 'Royal Cuisine Catering', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0002-0002-0002-000000000002',
  'Royal Cuisine Catering',
  'Catering',
  'Harare',
  'Award-winning catering specialists serving Harare for over 12 years. We offer African fusion, continental, and traditional Zimbabwean menus. Buffet, plated, cocktail, and finger-food formats. Minimum 50 guests. Halal and vegetarian options always available. Our chefs trained in South Africa and the UK.',
  'Avenues, Harare',
  '+263 71 234 5678',
  'orders@royalcuisine.co.zw',
  'Mid-range (USD 200–800)',
  4.8,
  62,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 3. Lens & Light Photography ─────────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0003-0003-0003-000000000003',
  'hello@lensandlight.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"Lens & Light Photography","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0003-0003-0003-000000000003', 'Lens & Light Photography', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0003-0003-0003-000000000003',
  'Lens & Light Photography',
  'Photography',
  'Harare',
  'Professional wedding and event photographers capturing Zimbabwe''s most precious moments since 2018. Full-day wedding coverage, engagement shoots, corporate headshots, and graduation portraits. Digital gallery delivered within 2 weeks. Over 300 weddings documented across Harare, Bulawayo, and Victoria Falls.',
  'Borrowdale Road, Borrowdale, Harare',
  '+263 77 345 6789',
  'hello@lensandlight.co.zw',
  'Premium (USD 800+)',
  5.0,
  31,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 4. SoundWave DJ Services ────────────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0004-0004-0004-000000000004',
  'book@soundwave.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"SoundWave DJ Services","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0004-0004-0004-000000000004', 'SoundWave DJ Services', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0004-0004-0004-000000000004',
  'SoundWave DJ Services',
  'DJ & Entertainment',
  'Harare',
  'Harare''s most booked DJ collective. We specialise in weddings, corporate events, and birthday parties. Our sets blend Afrobeats, R&B, Sungura, Zimdancehall, and international hits to keep every dance floor moving. Full PA system, lighting rig, and MC services available. Over 500 events rocked.',
  'Eastlea, Harare',
  '+263 78 456 7890',
  'book@soundwave.co.zw',
  'Mid-range (USD 200–800)',
  4.7,
  89,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 5. Petal & Bloom Florist ────────────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0005-0005-0005-000000000005',
  'flowers@petalbloom.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"Petal & Bloom Florist","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0005-0005-0005-000000000005', 'Petal & Bloom Florist', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0005-0005-0005-000000000005',
  'Petal & Bloom Florist',
  'Florist',
  'Harare',
  'Bespoke floral arrangements for weddings, funerals, corporate events, and special occasions. We source the freshest blooms locally and from South Africa. Bridal bouquets, table centrepieces, church décor, arch arrangements, and floral ceilings are our speciality. Delivery across Harare.',
  'Greendale Avenue, Greendale, Harare',
  '+263 71 567 8901',
  'flowers@petalbloom.co.zw',
  'Mid-range (USD 200–800)',
  4.9,
  44,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 6. Glamour Studio (Hair & Makeup) ──────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0006-0006-0006-000000000006',
  'glam@glamourstudio.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"Glamour Studio","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0006-0006-0006-000000000006', 'Glamour Studio', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0006-0006-0006-000000000006',
  'Glamour Studio',
  'Hair & Makeup',
  'Harare',
  'Award-winning beauty studio specialising in bridal hair and makeup, event styling, and photoshoots. Our lead artist has trained at MAC and INGLOT Johannesburg. We offer on-location services anywhere in Harare and Mashonaland. Bridal party packages include trials. Natural, glam, and editorial looks.',
  'Newlands Shopping Centre, Harare',
  '+263 77 678 9012',
  'glam@glamourstudio.co.zw',
  'Mid-range (USD 200–800)',
  4.8,
  57,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 7. Chidhumo Events Décor ─────────────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0007-0007-0007-000000000007',
  'decor@chidhumo.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"Chidhumo Events Décor","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0007-0007-0007-000000000007', 'Chidhumo Events Décor', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0007-0007-0007-000000000007',
  'Chidhumo Events Décor',
  'Decoration',
  'Harare',
  'Zimbabwe''s most creative event décor company. We design and install complete event transformations — balloon sculptures, draping, fairy light canopies, themed centrepieces, welcome boards, and photo backdrops. We work with event organisers, hotels, and corporates. Available for events in Harare, Bulawayo, and Mutare.',
  'Highfield, Harare',
  '+263 73 789 0123',
  'decor@chidhumo.co.zw',
  'Mid-range (USD 200–800)',
  4.7,
  38,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 8. Voice of Excellence MC ───────────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0008-0008-0008-000000000008',
  'mc@voiceofexcellence.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"Voice of Excellence MC","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0008-0008-0008-000000000008', 'Voice of Excellence MC', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0008-0008-0008-000000000008',
  'Voice of Excellence MC',
  'MC',
  'Harare',
  'Professional bilingual MC (Shona & English) for weddings, corporate events, graduations, and galas. With over 8 years of experience hosting Zimbabwe''s biggest events, we bring energy, professionalism, and crowd connection to every occasion. Script writing, event timing, and guest coordination included.',
  'Mount Pleasant, Harare',
  '+263 77 890 1234',
  'mc@voiceofexcellence.co.zw',
  'Mid-range (USD 200–800)',
  4.9,
  29,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 9. AV Masters Equipment Hire ───────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0009-0009-0009-000000000009',
  'hire@avmasters.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"AV Masters Equipment Hire","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0009-0009-0009-000000000009', 'AV Masters Equipment Hire', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0009-0009-0009-000000000009',
  'AV Masters Equipment Hire',
  'Equipment Hire',
  'Harare',
  'Full AV and event equipment hire in Harare. PA systems, projectors, LED screens, wireless microphones, stage lighting, generators, and tent structures. We deliver, set up, and collect. Suitable for events from 50 to 2,000 guests. Technician on-site throughout your event.',
  'Workington, Harare',
  '+263 71 901 2345',
  'hire@avmasters.co.zw',
  'Mid-range (USD 200–800)',
  4.6,
  52,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 10. Bulawayo Events Centre (Venue - Bulawayo) ───────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0010-0010-0010-000000000010',
  'events@bulawayocentre.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"Bulawayo Events Centre","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0010-0010-0010-000000000010', 'Bulawayo Events Centre', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0010-0010-0010-000000000010',
  'Bulawayo Events Centre',
  'Venue',
  'Bulawayo',
  'Bulawayo''s most versatile events venue, accommodating up to 500 guests. Modern facilities with full catering, audio-visual support, bridal suite, and dedicated event coordination team. Perfect for weddings, conferences, award ceremonies, and product launches. Central location with ample parking.',
  'Joshua Nkomo Street, Bulawayo CBD',
  '+263 29 012 3456',
  'events@bulawayocentre.co.zw',
  'Premium (USD 800+)',
  4.8,
  33,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 11. Shutter & Story Videography ─────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0011-0011-0011-000000000011',
  'film@shutterstory.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"Shutter & Story Videography","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0011-0011-0011-000000000011', 'Shutter & Story Videography', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0011-0011-0011-000000000011',
  'Shutter & Story Videography',
  'Photography',
  'Harare',
  'Cinematic wedding films and event videography that tell your story beautifully. Sony FX3 and DJI drone footage combined for breathtaking edits. Wedding films delivered in 8–12 weeks in 4K. Highlight reels, same-day edits, and documentary-style full films. Also available for music videos and brand content.',
  'Msasa, Harare',
  '+263 77 012 3456',
  'film@shutterstory.co.zw',
  'Premium (USD 800+)',
  4.8,
  22,
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ─── 12. Sunrise Catering (Budget option) ────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  '11111111-0012-0012-0012-000000000012',
  'sunrise@catering.co.zw',
  crypt('VendorPass2026!', gen_salt('bf')),
  now(),
  '{"full_name":"Sunrise Catering","role":"vendor"}'::jsonb,
  now(), now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES ('11111111-0012-0012-0012-000000000012', 'Sunrise Catering', 'vendor')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.vendor_profiles (
  user_id, business_name, category, city, description, address,
  whatsapp, email, price_range, rating, review_count, verified
) VALUES (
  '11111111-0012-0012-0012-000000000012',
  'Sunrise Catering',
  'Catering',
  'Mutare',
  'Affordable, wholesome catering for community events, church gatherings, graduations, and birthday parties. Traditional Zimbabwean cuisine — sadza, nyama, muriwo — as well as rice dishes, stews, and salads. Servings from USD 3 per person. Available across Manicaland province.',
  'Sakubva, Mutare',
  '+263 20 123 4567',
  'sunrise@catering.co.zw',
  'Budget (USD 0–200)',
  4.5,
  41,
  false
) ON CONFLICT (user_id) DO NOTHING;

END $$;
