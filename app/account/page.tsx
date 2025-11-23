"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { User, Package, CreditCard, Settings, Download, Eye, Trash2 } from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Account</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-4 sticky top-24">
              <nav className="space-y-2">
                <TabButton
                  icon={<User className="h-4 w-4" />}
                  label="Personal Information"
                  isActive={activeTab === "personal"}
                  onClick={() => setActiveTab("personal")}
                />
                <TabButton
                  icon={<Package className="h-4 w-4" />}
                  label="Owned Packages"
                  isActive={activeTab === "packages"}
                  onClick={() => setActiveTab("packages")}
                />
                <TabButton
                  icon={<CreditCard className="h-4 w-4" />}
                  label="Subscription / Billing"
                  isActive={activeTab === "billing"}
                  onClick={() => setActiveTab("billing")}
                />
                <TabButton
                  icon={<Settings className="h-4 w-4" />}
                  label="Account Settings"
                  isActive={activeTab === "settings"}
                  onClick={() => setActiveTab("settings")}
                />
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl border border-border p-8">
              {activeTab === "personal" && <PersonalInfoPanel />}
              {activeTab === "packages" && <OwnedPackagesPanel />}
              {activeTab === "billing" && <BillingPanel />}
              {activeTab === "settings" && <SettingsPanel />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TabButton({ icon, label, isActive, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {icon}
      <span className="text-left">{label}</span>
    </button>
  )
}

function PersonalInfoPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>

        {/* Avatar */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-foreground mb-2">Profile Picture</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <Button variant="outline" size="sm">
              Upload Photo
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
            <Input defaultValue="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <Input defaultValue="john.doe@example.com" type="email" disabled />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Role</label>
            <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm">
              <option>Teacher</option>
              <option>Student</option>
              <option>EdTech Professional</option>
              <option>Other</option>
            </select>
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
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-foreground mb-2">Preferred Language</label>
            <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm">
              <option>English</option>
              <option>Arabic</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>

        <div className="pt-6">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

function OwnedPackagesPanel() {
  const packages = [
    {
      id: 1,
      title: "Introduction to Fractions",
      grade: "Grade 5",
      subject: "Mathematics",
      purchaseDate: "2024-12-15",
    },
    {
      id: 2,
      title: "Solar System Explorer",
      grade: "Grade 7",
      subject: "Science",
      purchaseDate: "2024-12-10",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Owned Packages</h2>

      {packages.length > 0 ? (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{pkg.title}</h3>
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {pkg.grade}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {pkg.subject}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Purchased: {pkg.purchaseDate}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No packages yet</h3>
          <p className="text-muted-foreground mb-6">You haven't bought any packages yet. Browse the Package Shop.</p>
          <Button>Browse Package Shop</Button>
        </div>
      )}
    </div>
  )
}

function BillingPanel() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Subscription & Billing</h2>

        {/* Current Plan */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Free Plan</h3>
              <p className="text-sm text-muted-foreground">10 trial credits remaining</p>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
          <Button>Upgrade Plan</Button>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
          <p className="text-sm text-muted-foreground mb-4">No payment method on file</p>
          <Button variant="outline">Add Payment Method</Button>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Invoices</h3>
        <p className="text-sm text-muted-foreground">No invoices available</p>
      </div>
    </div>
  )
}

function SettingsPanel() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Account Settings</h2>

        {/* Notifications */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer">
              <div>
                <div className="font-medium text-foreground">Email notifications</div>
                <div className="text-sm text-muted-foreground">Receive updates about your account</div>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer">
              <div>
                <div className="font-medium text-foreground">Marketing emails</div>
                <div className="text-sm text-muted-foreground">Receive tips and promotional offers</div>
              </div>
              <input type="checkbox" className="h-4 w-4" />
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-destructive/30 rounded-xl p-6 bg-destructive/5">
          <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
