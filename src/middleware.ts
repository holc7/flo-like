import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

const publicPaths = ["/login", "/register", "/forgot-password", "/callback"];

function isPublicPath(pathname: string): boolean {
  return publicPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`) ||
      pathname === `/en${p}` || pathname.startsWith(`/en${p}/`)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Run Supabase session refresh
  const { user, supabaseResponse } = await updateSession(request);

  // Run next-intl middleware to get locale-aware response
  const intlResponse = intlMiddleware(request);

  // Copy Supabase cookies to the intl response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value, {
      ...cookie,
    });
  });

  // Auth routing logic
  const isPublic = isPublicPath(pathname);

  if (!user && !isPublic) {
    const loginUrl = new URL("/login", request.url);
    const redirectResponse = NextResponse.redirect(loginUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, {
        ...cookie,
      });
    });
    return redirectResponse;
  }

  if (user && isPublic && !pathname.includes("/callback")) {
    const dashUrl = new URL("/dashboard", request.url);
    const redirectResponse = NextResponse.redirect(dashUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, {
        ...cookie,
      });
    });
    return redirectResponse;
  }

  // Check onboarding status for authenticated users
  if (user && !isPublic && !pathname.includes("/onboarding")) {
    const onboardingCompleted = request.cookies.get("onboarding_completed")?.value;
    if (onboardingCompleted === "false") {
      const onboardingUrl = new URL("/onboarding", request.url);
      const redirectResponse = NextResponse.redirect(onboardingUrl);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, {
          ...cookie,
        });
      });
      return redirectResponse;
    }
  }

  return intlResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons|sw.js|workbox-.*).*)",
  ],
};
