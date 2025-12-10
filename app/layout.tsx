import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import AuthProvider from "@/components/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "EduPack",
  description: "Create SCORM packages with ease.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
