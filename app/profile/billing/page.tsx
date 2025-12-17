// app/profile/billing/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getProfileStrings, normalizeLanguage } from "../strings";
import { BillingClient } from "./billing-client";

export default async function BillingPage() {
  const supabase = await createClient();

  // 1. Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Get subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // 3. Get credits
  const { data: creditsRow } = await supabase
    .from("credits")
    .select("balance")
    .eq("user_id", user.id)
    .maybeSingle();

  const credits = creditsRow?.balance ?? 0;

  const { data: profile } = await supabase
    .from("users")
    .select("preferred_language")
    .eq("user_id", user.id)
    .maybeSingle();

  const language = normalizeLanguage(profile?.preferred_language ?? "en");
  const strings = getProfileStrings(language);

  const planStatus = subscription ? strings.billing.planStatus.active : strings.billing.planStatus.free;
  const planName = subscription?.notes || strings.billing.planNameFallback;

  return (
    <BillingClient
      subscription={subscription}
      credits={credits}
      planName={planName}
      planStatus={planStatus}
    />
  );
}