import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminJwt } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_session')?.value;
    let isValid = false;

    if (token) {
      const payload = await verifyAdminJwt(token);
      isValid = !!payload && payload.role === 'admin';
    }

    if (pathname === '/admin') {
      // If already logged in, skip the login page and go straight to dashboard
      if (isValid) {
        return NextResponse.redirect(new URL('/admin/stream', request.url));
      }
      return NextResponse.next();
    }

    if (!isValid) {
      const response = NextResponse.redirect(new URL('/admin', request.url));
      if (token) {
        response.cookies.delete('admin_session'); // Clear invalid token
      }
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
