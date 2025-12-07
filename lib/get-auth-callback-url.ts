/**
 * Get the OAuth callback URL for auth redirects
 * Uses environment variable for consistency across all auth flows
 */
export function getAuthCallbackUrl(): string {
  // First, try to use environment variable if set
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL) {
    return process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL
  }

  // For client-side, use window.location.origin
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/auth/callback`
  }

  // Fallback (shouldn't happen in practice)
  return '/api/auth/callback'

3