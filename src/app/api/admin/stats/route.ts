import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { Database } from '@/lib/supabase/types';

export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || serviceKey === 'your_service_role_key_here') {
    return NextResponse.json({ error: 'service_role_key_missing' }, { status: 503 });
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const [
    { count: totalUsers },
    { count: totalVendors },
    { count: pendingVendors },
    { count: totalEvents },
    { data: recentVendors },
    { data: recentProfiles },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('vendor_profiles').select('*', { count: 'exact', head: true }),
    supabase.from('vendor_profiles').select('*', { count: 'exact', head: true }).eq('verified', false),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('vendor_profiles')
      .select('id, business_name, category, city, verified, created_at')
      .eq('verified', false)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('profiles')
      .select('id, full_name, role, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  return NextResponse.json({
    totalUsers: totalUsers ?? 0,
    totalVendors: totalVendors ?? 0,
    pendingVendors: pendingVendors ?? 0,
    totalEvents: totalEvents ?? 0,
    recentVendors: recentVendors ?? [],
    recentProfiles: recentProfiles ?? [],
  });
}
