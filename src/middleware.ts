/**
 * @file src/middleware.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Mon, May 04 2026
 * @updated Mon, May 04 2026
 *
 * @description
 * Mirrors the request pathname into an x-pathname header so the root layout
 * can render route-specific JSON-LD into <head> at SSR time. React 19 + Next 16
 * App Router does not hoist inline <script type="application/ld+json"> tags
 * rendered in page components into the SSR HTML — they end up in the RSC payload
 * only, which search engines won't see. Layout-level injection sidesteps that.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
};

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
