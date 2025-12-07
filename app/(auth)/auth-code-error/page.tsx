import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-destructive mb-4">Authentication Error</h1>
        <p className="text-muted-foreground mb-6">
          There was an error during the authentication process. This can happen if the link has expired or has already been used.
        </p>
        <p className="text-muted-foreground mb-8">
          Please try signing in again.
        </p>
        <Button asChild>
          <Link href="/login">Return to Login</Link>
        </Button>
      </div>
    </div>
  )
}
