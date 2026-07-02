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

  // Protect dashboard pages — requires any authenticated user
  const dashboardPaths = ['/dashboard', '/events', '/bookings', '/tickets', '/settings', '/upgrade'];
  if (dashboardPaths.some(p => pathname.startsWith(p))) {
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

  // Protect /admin/* — requires authenticated user with admin role
  if (pathname.startsWith('/admin')) {
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
  // Only redirect if the request doesn't have a 'logout' search param (hard-reload after signOut)
  if ((pathname === '/login' || pathname === '/register') && user) {
    const from = request.nextUrl.searchParams.get('from');
    if (from === 'vendors') {
      // Already handled above, keep going
    } else {
      const role = user.user_metadata?.role as string | undefined;
      if (role === 'vendor') return NextResponse.redirect(new URL('/vendor-dashboard', request.url));
      if (role === 'admin') return NextResponse.redirect(new URL('/admin', request.url));
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
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
    '/bookings/:path*',
    '/bookings',
    '/tickets/:path*',
    '/tickets',
    '/settings/:path*',
    '/settings',
    '/upgrade/:path*',
    '/upgrade',
    '/login',
    '/register',
  ],
};
