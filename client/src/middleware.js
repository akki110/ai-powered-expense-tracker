import { NextResponse } from 'next/server';

export function middleware(request) {
  // Read accessToken from cookies which is set securely by our backend
  const token = request.cookies.get('accessToken');
  const path = request.nextUrl.pathname;
  
  const isAuthPage = path.startsWith('/login') || path.startsWith('/register');
  const isDashboardPage = path.startsWith('/dashboard');

  // Protect dashboard and its sub-routes
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Prevent logged in users from seeing login/register
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
