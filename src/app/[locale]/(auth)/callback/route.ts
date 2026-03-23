import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // After email verification, redirect to consent page first
      // The middleware will handle further routing if consents are already granted
      return NextResponse.redirect(`${origin}/consent`);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
