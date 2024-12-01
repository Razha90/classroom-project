import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createTokenAPI, verifyTokenAPI } from "./lib/tokenAPI";

const locales = ["id", "en"];
const defaultLocale = process.env.DEFAULT_LOCALE || "en";

function getRequestLocale(request) {
  // Get accept-language header from request
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };

  // Get languages from accept-language header
  const languages = new Negotiator({ headers }).languages();
  if (languages.includes(defaultLocale)) {
    // If default locale is in languages, return default locale
    return defaultLocale;
  }
  // If default locale is not in languages, return the first language
  return match(languages, locales, defaultLocale);
}

async function handleUiPath(request, pathname) {
  // Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  // Make Toke API for Identification endpoint API
  const tokenAPI = await createTokenAPI();

  // Define response
  let res;

  if (!pathnameHasLocale) {
    // If pathname doesn't have locale, redirect to the same path with locale
    const locale = getRequestLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    res = NextResponse.redirect(request.nextUrl);
  } else {
    // If pathname has locale, continue to next handler
    res = NextResponse.next();
  }
  // Set cookie token for API
  res.headers.set('X-Token-API', tokenAPI);
  return res;
}

async function handleAPIPath(request) {
  // Get token from header
  const tokenAPI = request.headers.get("X-Token-API");
  // Verify token
  const verifiedTokenAPI = await verifyTokenAPI(tokenAPI);
  if (!verifiedTokenAPI) {
    // If token is not verified, return unauthorized access
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }
  // If token is verified, continue to next handler
  return NextResponse.next();
}

export async function middleware(request) {
  // Get pathname from nextUrl for checking path
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/user")) {
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

  if (pathname.startsWith("/api")) {
    // Handle API path
    return await handleAPIPath(request);
  }

  // Handle UI path
  return handleUiPath(request, pathname);
}

export const config = {
  matcher: ["/user", "/((?!assets|.*\\..*|_next).*)"],
};
