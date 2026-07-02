import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key || key === 'your_service_role_key_here') return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function GET() {
  const supabase = serviceClient();
  if (!supabase) return NextResponse.json({ error: 'service_role_key_missing' }, { status: 503 });

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, role, city, created_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ users: data ?? [] });
}

export async function PATCH(req: Request) {
  const supabase = serviceClient();
  if (!supabase) return NextResponse.json({ error: 'service_role_key_missing' }, { status: 503 });

  const { id, role } = await req.json();
  const { error } = await supabase.from('profiles').update({ role }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
