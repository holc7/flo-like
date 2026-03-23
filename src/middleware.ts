import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

const intlMiddleware = createMiddleware(routing);

const publicPaths = ["/login", "/register", "/forgot-password", "/callback"];

function isPublicPath(pathname: string): boolean {
  return publicPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`) ||
      pathname === `/en${p}` || pathname.startsWith(`/en${p}/`)
  );
}

function isConsentPath(pathname: string): boolean {
  return pathname === "/consent" || pathname.startsWith("/consent/") ||
    pathname === "/en/consent" || pathname.startsWith("/en/consent/");
}

function isOnboardingPath(pathname: string): boolean {
  return pathname.includes("/onboarding");
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
  const isConsent = isConsentPath(pathname);

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

  // Check consent status for authenticated users (before onboarding check)
  if (user && !isPublic && !isConsent) {
    // Create a Supabase client that can read from the request cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {},
        },
      }
    );

    const { data: consents } = await supabase
      .from("consents")
      .select("consent_type")
      .eq("user_id", user.id)
      .is("revoked_at", null)
      .not("granted_at", "is", null);

    const activeTypes = (consents || []).map((c) => c.consent_type);
    const hasHealthConsent = activeTypes.includes("health_data_processing");
    const hasCycleConsent = activeTypes.includes("cycle_predictions");

    if (!hasHealthConsent || !hasCycleConsent) {
      const consentUrl = new URL("/consent", request.url);
      const redirectResponse = NextResponse.redirect(consentUrl);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, {
          ...cookie,
        });
      });
      return redirectResponse;
    }
  }

  // Check onboarding status for authenticated users
  if (user && !isPublic && !isConsent && !isOnboardingPath(pathname)) {
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
