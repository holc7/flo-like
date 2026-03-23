import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user already has active consents
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: consents } = await supabase
          .from("consents")
          .select("consent_type")
          .eq("user_id", user.id)
          .is("revoked_at", null);

        const activeTypes = (consents || []).map((c) => c.consent_type);
        const hasAllConsents =
          activeTypes.includes("health_data_processing") &&
          activeTypes.includes("cycle_predictions");

        if (hasAllConsents) {
          return NextResponse.redirect(`${origin}/dashboard`);
        }
      }

      return NextResponse.redirect(`${origin}/consent`);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
