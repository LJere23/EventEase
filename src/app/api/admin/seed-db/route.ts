import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Hit GET /api/admin/seed-db?key=eventease-setup-2026 to seed vendors.
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local.

const SETUP_SECRET = process.env.SETUP_SECRET ?? 'eventease-setup-2026';

interface VendorSeed {
  id: string;
  email: string;
  business_name: string;
  category: string;
  city: string;
  description: string;
  address: string;
  whatsapp: string;
  price_range: string;
  rating: number;
  review_count: number;
  verified: boolean;
}

const VENDORS: VendorSeed[] = [
  {
    id: '11111111-0001-0001-0001-000000000001',
    email: 'info@harare-grand.co.zw',
    business_name: 'Harare Grand Events',
    category: 'Venue',
    city: 'Harare',
    description: "Harare's premier indoor event venue for weddings, corporate galas, and private celebrations. Capacity for up to 400 guests across two halls with full catering kitchen, professional lighting rigs, climate control, and on-site parking for 120 vehicles.",
    address: 'Sam Nujoma St, Avondale, Harare',
    whatsapp: '+263 77 123 4567',
    price_range: 'Premium (USD 800+)',
    rating: 4.9,
    review_count: 48,
    verified: true,
  },
  {
    id: '11111111-0002-0002-0002-000000000002',
    email: 'orders@royalcuisine.co.zw',
    business_name: 'Royal Cuisine Catering',
    category: 'Catering',
    city: 'Harare',
    description: 'Award-winning catering specialists serving Harare for over 12 years. African fusion, continental, and traditional Zimbabwean menus. Buffet, plated, cocktail, and finger-food formats. Halal and vegetarian options always available.',
    address: 'Avenues, Harare',
    whatsapp: '+263 71 234 5678',
    price_range: 'Mid-range (USD 200–800)',
    rating: 4.8,
    review_count: 62,
    verified: true,
  },
  {
    id: '11111111-0003-0003-0003-000000000003',
    email: 'hello@lensandlight.co.zw',
    business_name: 'Lens & Light Photography',
    category: 'Photography',
    city: 'Harare',
    description: "Professional wedding and event photographers capturing Zimbabwe's most precious moments since 2018. Full-day wedding coverage, engagement shoots, corporate headshots. Digital gallery within 2 weeks. 300+ weddings documented.",
    address: 'Borrowdale Road, Borrowdale, Harare',
    whatsapp: '+263 77 345 6789',
    price_range: 'Premium (USD 800+)',
    rating: 5.0,
    review_count: 31,
    verified: true,
  },
  {
    id: '11111111-0004-0004-0004-000000000004',
    email: 'book@soundwave.co.zw',
    business_name: 'SoundWave DJ Services',
    category: 'DJ & Entertainment',
    city: 'Harare',
    description: "Harare's most booked DJ collective. Weddings, corporate events, and birthday parties. Sets blend Afrobeats, R&B, Sungura, Zimdancehall, and international hits. Full PA system, lighting rig, and MC services available. 500+ events.",
    address: 'Eastlea, Harare',
    whatsapp: '+263 78 456 7890',
    price_range: 'Mid-range (USD 200–800)',
    rating: 4.7,
    review_count: 89,
    verified: true,
  },
  {
    id: '11111111-0005-0005-0005-000000000005',
    email: 'flowers@petalbloom.co.zw',
    business_name: 'Petal & Bloom Florist',
    category: 'Florist',
    city: 'Harare',
    description: 'Bespoke floral arrangements for weddings, funerals, corporate events, and special occasions. Fresh blooms sourced locally and from South Africa. Bridal bouquets, centrepieces, church décor, arch arrangements, and floral ceilings.',
    address: 'Greendale Avenue, Greendale, Harare',
    whatsapp: '+263 71 567 8901',
    price_range: 'Mid-range (USD 200–800)',
    rating: 4.9,
    review_count: 44,
    verified: true,
  },
  {
    id: '11111111-0006-0006-0006-000000000006',
    email: 'glam@glamourstudio.co.zw',
    business_name: 'Glamour Studio',
    category: 'Hair & Makeup',
    city: 'Harare',
    description: 'Award-winning beauty studio specialising in bridal hair and makeup, event styling, and photoshoots. Lead artist trained at MAC and INGLOT Johannesburg. On-location services anywhere in Harare. Bridal party packages include trials.',
    address: 'Newlands Shopping Centre, Harare',
    whatsapp: '+263 77 678 9012',
    price_range: 'Mid-range (USD 200–800)',
    rating: 4.8,
    review_count: 57,
    verified: true,
  },
  {
    id: '11111111-0007-0007-0007-000000000007',
    email: 'decor@chidhumo.co.zw',
    business_name: 'Chidhumo Events Décor',
    category: 'Decoration',
    city: 'Harare',
    description: "Zimbabwe's most creative event décor company. Balloon sculptures, draping, fairy light canopies, themed centrepieces, welcome boards, and photo backdrops. Available in Harare, Bulawayo, and Mutare.",
    address: 'Highfield, Harare',
    whatsapp: '+263 73 789 0123',
    price_range: 'Mid-range (USD 200–800)',
    rating: 4.7,
    review_count: 38,
    verified: true,
  },
  {
    id: '11111111-0008-0008-0008-000000000008',
    email: 'mc@voiceofexcellence.co.zw',
    business_name: 'Voice of Excellence MC',
    category: 'MC',
    city: 'Harare',
    description: "Professional bilingual MC (Shona & English) for weddings, corporate events, graduations, and galas. 8+ years hosting Zimbabwe's biggest events. Script writing, event timing, and guest coordination included.",
    address: 'Mount Pleasant, Harare',
    whatsapp: '+263 77 890 1234',
    price_range: 'Mid-range (USD 200–800)',
    rating: 4.9,
    review_count: 29,
    verified: true,
  },
  {
    id: '11111111-0009-0009-0009-000000000009',
    email: 'hire@avmasters.co.zw',
    business_name: 'AV Masters Equipment Hire',
    category: 'Equipment Hire',
    city: 'Harare',
    description: 'Full AV and event equipment hire. PA systems, projectors, LED screens, wireless microphones, stage lighting, generators, and tent structures. Delivery, setup, and collection. 50–2,000 guests. Technician on-site throughout.',
    address: 'Workington, Harare',
    whatsapp: '+263 71 901 2345',
    price_range: 'Mid-range (USD 200–800)',
    rating: 4.6,
    review_count: 52,
    verified: true,
  },
  {
    id: '11111111-0010-0010-0010-000000000010',
    email: 'events@bulawayocentre.co.zw',
    business_name: 'Bulawayo Events Centre',
    category: 'Venue',
    city: 'Bulawayo',
    description: "Bulawayo's most versatile events venue, accommodating up to 500 guests. Modern facilities with full catering, AV support, bridal suite, and event coordination team. Weddings, conferences, award ceremonies, and product launches.",
    address: 'Joshua Nkomo Street, Bulawayo CBD',
    whatsapp: '+263 29 012 3456',
    price_range: 'Premium (USD 800+)',
    rating: 4.8,
    review_count: 33,
    verified: true,
  },
  {
    id: '11111111-0011-0011-0011-000000000011',
    email: 'film@shutterstory.co.zw',
    business_name: 'Shutter & Story Videography',
    category: 'Photography',
    city: 'Harare',
    description: 'Cinematic wedding films and event videography. Sony FX3 and DJI drone footage. Wedding films in 4K within 8–12 weeks. Highlight reels, same-day edits, and documentary-style full films. Also music videos and brand content.',
    address: 'Msasa, Harare',
    whatsapp: '+263 77 012 3456',
    price_range: 'Premium (USD 800+)',
    rating: 4.8,
    review_count: 22,
    verified: true,
  },
  {
    id: '11111111-0012-0012-0012-000000000012',
    email: 'sunrise@catering.co.zw',
    business_name: 'Sunrise Catering',
    category: 'Catering',
    city: 'Mutare',
    description: 'Affordable catering for community events, church gatherings, graduations, and birthday parties. Traditional Zimbabwean cuisine — sadza, nyama, muriwo — and rice dishes. From USD 3 per person. Available across Manicaland.',
    address: 'Sakubva, Mutare',
    whatsapp: '+263 20 123 4567',
    price_range: 'Budget (USD 0–200)',
    rating: 4.5,
    review_count: 41,
    verified: false,
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (key !== SETUP_SECRET) {
    return NextResponse.json({ error: 'Unauthorized — provide ?key=eventease-setup-2026' }, { status: 401 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || serviceKey === 'your_service_role_key_here') {
    return NextResponse.json({
      error: 'SUPABASE_SERVICE_ROLE_KEY not set in .env.local',
      action: 'Get it from Supabase Dashboard → Settings → API → service_role (secret) key',
    }, { status: 500 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const results = [];

  for (const v of VENDORS) {
    // Upsert into profiles first (bypass auth.users requirement via service role)
    const { error: profileErr } = await supabase
      .from('profiles')
      .upsert({ id: v.id, full_name: v.business_name, role: 'vendor' }, { onConflict: 'id' });

    if (profileErr) {
      results.push({ vendor: v.business_name, step: 'profile', ok: false, error: profileErr.message });
      continue;
    }

    // Upsert vendor_profile
    const { error: vpErr } = await supabase
      .from('vendor_profiles')
      .upsert({
        user_id: v.id,
        business_name: v.business_name,
        category: v.category,
        city: v.city,
        description: v.description,
        address: v.address,
        whatsapp: v.whatsapp,
        email: v.email,
        price_range: v.price_range,
        rating: v.rating,
        review_count: v.review_count,
        verified: v.verified,
      }, { onConflict: 'user_id' });

    results.push({ vendor: v.business_name, step: 'vendor_profile', ok: !vpErr, error: vpErr?.message });
  }

  const ok = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;

  return NextResponse.json({
    message: `Seeded ${ok} vendors, ${failed} failed`,
    results,
  });
}
