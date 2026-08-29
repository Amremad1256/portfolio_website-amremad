import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Coming-soon gate.
 *
 * When NEXT_PUBLIC_COMING_SOON is exactly "true", every visitor is redirected
 * to /coming-soon. Any other value (or no value at all) leaves the real site
 * working normally.
 *
 * This file used to be called `middleware.ts`. Next.js 16 renamed the
 * convention to `proxy.ts` — same behaviour, new name.
 */
const COMING_SOON_PATH = "/coming-soon";

function isComingSoonEnabled() {
  return process.env.NEXT_PUBLIC_COMING_SOON === "true";
}

export function proxy(request: NextRequest) {
  if (!isComingSoonEnabled()) {
    return NextResponse.next();
  }

  // Never redirect the coming-soon page to itself. The matcher below already
  // excludes it; this is a second guard so a matcher edit can't cause a loop.
  if (request.nextUrl.pathname.startsWith(COMING_SOON_PATH)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(COMING_SOON_PATH, request.url));
}

export const config = {
  matcher: [
    /*
     * Run on every path EXCEPT:
     * - coming-soon           the placeholder page itself
     * - _next/static          the built CSS and JavaScript
     * - _next/image           optimised images
     * - icon.svg, apple-icon.png, favicon.ico   the site icons
     * - any file with an extension (.pdf, .png, .svg, …) served from public/
     */
    "/((?!coming-soon|_next/static|_next/image|icon\\.svg|apple-icon\\.png|favicon\\.ico|.*\\.[\\w]+$).*)",
  ],
};
