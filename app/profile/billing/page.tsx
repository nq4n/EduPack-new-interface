// app/profile/billing/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProfileStrings, normalizeLanguage } from "../strings";

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
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">{strings.billing.heading}</h2>

      {/* Current Plan */}
      <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{planName}</h3>
            <p className="text-sm text-muted-foreground">
              {strings.billing.creditsLabel(credits)}
            </p>
          </div>

          <Badge variant={subscription ? "default" : "secondary"}>
            {planStatus}
          </Badge>
        </div>

        <Button>{strings.billing.upgradePlan}</Button>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {strings.billing.paymentMethod}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {strings.billing.noPaymentMethod}
        </p>
        <Button variant="outline">{strings.billing.addPaymentMethod}</Button>
      </div>

      {/* Invoices */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">{strings.billing.invoices}</h3>
        <p className="text-sm text-muted-foreground">
          {subscription ? strings.billing.loadingInvoices : strings.billing.noInvoices}
        </p>
      </div>
    </div>
  );
}