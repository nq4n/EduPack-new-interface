"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Lock } from "lucide-react"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Payment Information</h2>
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Lock className="h-4 w-4" />
                    <span>This is a frontend prototype. No actual payment will be processed.</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Card Number</label>
                <div className="relative">
                  <Input placeholder="1234 5678 9012 3456" />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Expiry Date</label>
                  <Input placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">CVC</label>
                  <Input placeholder="123" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Cardholder Name</label>
                <Input placeholder="John Doe" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Country</label>
                <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4" />
                <label className="text-sm text-muted-foreground">Save my card for future payments</label>
              </div>

              <Button className="w-full" size="lg">
                <Lock className="mr-2 h-4 w-4" />
                Pay Now
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Introduction to Fractions - Grade 5</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      Grade 5
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Mathematics
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Single purchase</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">$12.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">$1.30</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">$14.29</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                By completing this purchase, you agree to our Terms of Service and acknowledge our Privacy Policy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
