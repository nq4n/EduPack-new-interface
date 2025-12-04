"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"

export default function ProfilePage() {
  return <PersonalInfoPanel />
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
