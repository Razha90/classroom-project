import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const locales = ['id', 'en'];
const defaultLocale = 'id';

function getLocale(request) {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  if (languages.includes(defaultLocale)) {
    return 'id';
  }
  return match(languages, locales, defaultLocale);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/user')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if(pathname.startsWith('/api')) {
    const res = NextResponse.next();
    res.headers.set('Access-Control-Allow-Origin', 'public-key');
    return res;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user",
    '/((?!api|assets|.*\\..*|_next).*)',
  ],
};

