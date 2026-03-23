"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Check consent status first
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: consents } = await supabase
      .from("consents")
      .select("consent_type")
      .eq("user_id", user.id)
      .is("revoked_at", null);

    const activeTypes = (consents || []).map((c) => c.consent_type);
    if (!activeTypes.includes("health_data_processing") || !activeTypes.includes("cycle_predictions")) {
      redirect("/consent");
    }
  }

  // Check onboarding status
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .single();

  if (profile && !profile.onboarding_completed) {
    redirect("/onboarding");
  }

  redirect("/dashboard");
}

export async function register(formData: FormData) {
  const supabase = await createClient();
  const headerStore = await headers();
  const origin = headerStore.get("origin") || "";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient();
  const headerStore = await headers();
  const origin = headerStore.get("origin") || "";
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/callback`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
