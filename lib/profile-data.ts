import { createClient } from "./supabase/client"

/**
 * Get user's billing data
 */
export async function getUserBilling(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("billing")
    .select("*")
    .eq("user_id", userId)

  return { data, error }
}

/**
 * Get user's packages (created by them)
 */
export async function getUserPackages(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("created_by_user_id", userId)

  return { data, error }
}

/**
 * Get packages the user owns (including shared packages)
 */
export async function getUserOwnedPackages(userId: string) {
  const supabase = createClient()
  
  // Get packages created by user or where user is listed as an owner
  const { data, error } = await supabase
    .from("packages")
    .select(`
      *,
      package_owners (
        user_id,
        role,
        can_edit
      )
    `)
    .or(`created_by_user_id.eq.${userId},package_owners.user_id.eq.${userId}`)

  return { data, error }
}

/**
 * Get package owners for a specific package
 */
export async function getPackageOwners(packageId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("package_owners")
    .select(`
      *,
      users (
        user_id,
        full_name,
        email,
        avatar_url
      )
    `)
    .eq("package_id", packageId)

  return { data, error }
}

/**
 * Add a package owner
 */
export async function addPackageOwner(
  packageId: string,
  userId: string,
  role: string = "collaborator",
  canEdit: boolean = true
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("package_owners")
    .insert([
      {
        package_id: packageId,
        user_id: userId,
        role,
        can_edit: canEdit,
      },
    ])

  return { data, error }
}

/**
 * Remove a package owner
 */
export async function removePackageOwner(packageId: string, userId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from("package_owners")
    .delete()
    .eq("package_id", packageId)
    .eq("user_id", userId)

  return { error }
}

/**
 * Update package owner role
 */
export async function updatePackageOwner(
  packageId: string,
  userId: string,
  updates: { role?: string; can_edit?: boolean }
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("package_owners")
    .update(updates)
    .eq("package_id", packageId)
    .eq("user_id", userId)

  return { data, error }
}

/**
 * Get user's subscription status and credits
 */
export async function getUserSubscription(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("billing")
    .select("*")
    .eq("user_id", userId)
    .eq("billing_type", "subscription")
    .single()

  return { data, error }
}

/**
 * Get user's credit balance
 */
export async function getUserCredits(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("billing")
    .select("credit_value")
    .eq("user_id", userId)
    .eq("billing_type", "credit")

  if (error) return { balance: 0, error }

  const balance = (data || []).reduce((sum, item) => sum + (item.credit_value || 0), 0)
  return { balance, error: null }
}

/**
 * Create or update billing record
 */
export async function createBillingRecord(
  userId: string,
  billingType: "subscription" | "credit",
  amount: number,
  creditValue?: number,
  notes?: string
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("billing")
    .insert([
      {
        user_id: userId,
        billing_type: billingType,
        amount,
        credit_value: creditValue,
        notes,
      },
    ])

  return { data, error }
}
