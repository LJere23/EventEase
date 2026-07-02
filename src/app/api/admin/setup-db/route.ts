import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Hit GET /api/admin/setup-db?key=SETUP_SECRET to apply the schema.
// Requires SUPABASE_SERVICE_ROLE_KEY + SETUP_SECRET in .env.local.

const SETUP_SECRET = process.env.SETUP_SECRET ?? 'eventease-setup-2026';

const SCHEMA_SQL = `
-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  phone text,
  city text,
  role text not null default 'organiser' check (role in ('organiser', 'vendor', 'admin')),
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy if not exists "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy if not exists "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy if not exists "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Vendor Profiles
create table if not exists public.vendor_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique,
  business_name text not null,
  category text not null,
  city text not null,
  description text,
  address text,
  website text,
  whatsapp text,
  email text,
  logo_url text,
  cover_url text,
  price_range text,
  rating numeric(3,2) default 0,
  review_count int default 0,
  verified boolean default false,
  created_at timestamptz default now()
);
alter table public.vendor_profiles enable row level security;
create policy if not exists "Anyone can view vendor profiles" on public.vendor_profiles for select using (true);
create policy if not exists "Vendors can update own profile" on public.vendor_profiles for update using (auth.uid() = user_id);
create policy if not exists "Vendors can insert own profile" on public.vendor_profiles for insert with check (auth.uid() = user_id);

-- Events
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  type text not null,
  date date not null,
  guests int not null default 0,
  budget numeric(12,2),
  venue text,
  city text,
  description text,
  status text default 'planning' check (status in ('planning','confirmed','completed','cancelled')),
  cover_url text,
  ai_plan jsonb,
  created_at timestamptz default now()
);
alter table public.events enable row level security;
create policy if not exists "Users can manage own events" on public.events for all using (auth.uid() = user_id);

-- Quote Requests
create table if not exists public.quote_requests (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references public.events(id) on delete cascade,
  vendor_id uuid references public.vendor_profiles(id) on delete cascade,
  requester_id uuid references public.profiles(id) on delete cascade,
  message text not null,
  event_date date,
  guest_count int,
  budget numeric(12,2),
  status text default 'pending' check (status in ('pending','replied','accepted','declined')),
  created_at timestamptz default now()
);
alter table public.quote_requests enable row level security;
create policy if not exists "Requesters can manage own quotes" on public.quote_requests for all using (auth.uid() = requester_id);
create policy if not exists "Vendors can view quotes for their profile" on public.quote_requests for select using (
  exists (select 1 from public.vendor_profiles vp where vp.id = vendor_id and vp.user_id = auth.uid())
);
create policy if not exists "Vendors can update status" on public.quote_requests for update using (
  exists (select 1 from public.vendor_profiles vp where vp.id = vendor_id and vp.user_id = auth.uid())
);

-- Quote Responses
create table if not exists public.quote_responses (
  id uuid default gen_random_uuid() primary key,
  quote_request_id uuid references public.quote_requests(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete cascade,
  message text not null,
  price numeric(12,2),
  created_at timestamptz default now()
);
alter table public.quote_responses enable row level security;
create policy if not exists "Participants can view responses" on public.quote_responses for select using (
  exists (
    select 1 from public.quote_requests qr
    where qr.id = quote_request_id
    and (qr.requester_id = auth.uid() or exists (
      select 1 from public.vendor_profiles vp where vp.id = qr.vendor_id and vp.user_id = auth.uid()
    ))
  )
);
create policy if not exists "Participants can insert responses" on public.quote_responses for insert with check (auth.uid() = sender_id);

-- Bookings
create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references public.events(id) on delete cascade,
  vendor_id uuid references public.vendor_profiles(id) on delete set null,
  quote_request_id uuid references public.quote_requests(id) on delete set null,
  user_id uuid references public.profiles(id) on delete cascade,
  service text not null,
  amount numeric(12,2) not null,
  status text default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  payment_proof_url text,
  created_at timestamptz default now()
);
alter table public.bookings enable row level security;
create policy if not exists "Users can manage own bookings" on public.bookings for all using (auth.uid() = user_id);
create policy if not exists "Vendors can view their bookings" on public.bookings for select using (
  exists (select 1 from public.vendor_profiles vp where vp.id = vendor_id and vp.user_id = auth.uid())
);

-- Tickets
create table if not exists public.tickets (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  ticket_type text not null default 'General Admission',
  price numeric(12,2) not null default 0,
  qr_data text not null,
  status text default 'active' check (status in ('active','used','cancelled')),
  created_at timestamptz default now()
);
alter table public.tickets enable row level security;
create policy if not exists "Users can manage own tickets" on public.tickets for all using (auth.uid() = user_id);

-- Storage buckets
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('vendor-assets', 'vendor-assets', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('event-covers', 'event-covers', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('payment-proofs', 'payment-proofs', false) on conflict do nothing;

-- Auto-create profile on signup trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'organiser')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create profile for Vimbai (existing auth user, no profile yet)
insert into public.profiles (id, full_name, role)
select id, 'Vimbai Chari', 'admin'
from auth.users where email = 'sandravee03@gmail.com'
on conflict (id) do update set role = 'admin', full_name = 'Vimbai Chari';
`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (key !== SETUP_SECRET) {
    return NextResponse.json({ error: 'Unauthorized — provide ?key=SETUP_SECRET' }, { status: 401 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || serviceKey === 'your_service_role_key_here') {
    return NextResponse.json({
      error: 'SUPABASE_SERVICE_ROLE_KEY not set',
      action: 'Add it to .env.local — get it from Supabase Dashboard → Settings → API → service_role key',
    }, { status: 500 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Execute schema statements one by one
  const statements = SCHEMA_SQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 5);

  const results: { sql: string; ok: boolean; error?: string }[] = [];

  for (const stmt of statements) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: stmt + ';' }).single();
      results.push({ sql: stmt.slice(0, 60), ok: !error, error: error?.message });
    } catch {
      results.push({ sql: stmt.slice(0, 60), ok: false, error: 'exec_sql RPC not available' });
    }
  }

  return NextResponse.json({
    message: 'Schema application attempted. If exec_sql RPC is not available, run supabase/schema.sql manually in Supabase SQL Editor.',
    hint: 'https://supabase.com/dashboard/project/wxmoinkgtmadcqmasypo/sql',
    results: results.slice(0, 10),
  });
}
