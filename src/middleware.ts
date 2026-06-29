import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // TEMP: admin auth bypassed for testing — restore before going live

  // Protect /dashboard/* and /events/* — requires any authenticated user
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/events')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect /vendor-dashboard/* — requires authenticated user
  if (pathname.startsWith('/vendor-dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect /vendors/* — require login to browse marketplace or see contacts
  if (pathname.startsWith('/vendors')) {
    if (!user) {
      return NextResponse.redirect(new URL(`/login?from=vendors`, request.url));
    }
  }

  // Redirect already-logged-in users away from auth pages
  if ((pathname === '/login' || pathname === '/register') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/events/:path*',
    '/vendor-dashboard/:path*',
    '/vendors/:path*',
    '/login',
    '/register',
  ],
};
