// app/profile/billing/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  const planStatus = subscription ? "Active" : "Free";
  const planName = subscription?.notes || "Free Plan";

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Subscription & Billing
      </h2>

      {/* Current Plan */}
      <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{planName}</h3>
            <p className="text-sm text-muted-foreground">
              {credits} credits available
            </p>
          </div>

          <Badge variant={planStatus === "Active" ? "default" : "secondary"}>
            {planStatus}
          </Badge>
        </div>

        <Button>Upgrade Plan</Button>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Payment Method
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          No payment method on file
        </p>
        <Button variant="outline">Add Payment Method</Button>
      </div>

      {/* Invoices */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Invoices</h3>
        <p className="text-sm text-muted-foreground">
          {subscription ? "Loading invoices..." : "No invoices available"}
        </p>
      </div>
    </div>
  );
}