import { NextResponse } from 'next/server';

export function middleware(request) {
  // Read accessToken from cookies which is set securely by our backend
  const token = request.cookies.get('accessToken');
  const path = request.nextUrl.pathname;

  const isAuthPage = path.startsWith('/login') || path.startsWith('/register');
  const isDashboardPage = path.startsWith('/dashboard');

  // In cross-domain production deployments (Vercel frontend + Render backend), 
  // HttpOnly cookies are stored on the backend domain, so Next.js server middleware 
  // cannot read them directly. We allow client-side AuthContext and Axios interceptors 
  // to manage session validation.

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
