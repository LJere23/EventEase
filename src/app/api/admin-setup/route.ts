import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// ONE-TIME USE — delete this file after running it.

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.auth.signUp({
    email: 'sandravee03@gmail.com',
    password: 'CVSTHIRTY',
    options: {
      data: {
        full_name: 'Vimbai Sandra Chari',
        role: 'admin',
      },
    },
  });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: 'Superadmin account created for Vimbai Sandra Chari. Check sandravee03@gmail.com to confirm the email, then log in at /login.',
    user_id: data.user?.id,
    sql: `INSERT INTO profiles (id, full_name, email, role, created_at, updated_at)
VALUES ('${data.user?.id}', 'Vimbai Sandra Chari', 'sandravee03@gmail.com', 'admin', now(), now())
ON CONFLICT (id) DO UPDATE SET role = 'admin', full_name = 'Vimbai Sandra Chari';`,
  });
}
