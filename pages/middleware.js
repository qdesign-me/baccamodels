import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    //   console.log(`CHECK ${req.nextUrl.pathname}`);
    //const session = await getToken({ req, secret: process.env.SECRET });
    //console.log('session', session);
    //   if (!session) return new Response(null, { status: 401 });
  }
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) return NextResponse.redirect('/auth/signin');
  }
}
