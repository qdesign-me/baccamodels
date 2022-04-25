import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const url = req.nextUrl.clone();
    const session = await getToken({
      req,
      secret: process.env.SECRET,
    });

    if (!session) {
      url.pathname = '/auth/signin';
      return NextResponse.redirect(url);
    }
    url.pathname = '/admin/401';
    if (session.user.role === 'Manager') {
      if (req.page?.name === '/admin/users/edit/[id]') {
        console.log('CHECK', req.page?.name, session.user.id);
        if (req.page.params.id !== session.user.id) {
          return NextResponse.redirect(url);
        }
      }

      if (['/admin/users', '/admin/homepage', '/admin/users/new'].includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(url);
      }
      if (req.page?.name?.includes('/admin/[country]')) {
        if (req.page.params.country !== session.user.region) {
          return NextResponse.redirect(url);
        }
      }

      if (['/admin/kazakhstan/models/new', '/admin/russia/models/new', '/admin/kids/models/new'].includes(req.nextUrl.pathname)) {
        if (!req.nextUrl.pathname.includes(`/admin/${session.user.region}`)) {
          return NextResponse.redirect(url);
        }
      }
    }
  }
  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    const url = req.nextUrl.clone();
    url.pathname = '/api/401';
    const session = await getToken({
      req,
      secret: process.env.SECRET,
    });

    if (!session) {
      return NextResponse.redirect(url);
    }
  }
}
