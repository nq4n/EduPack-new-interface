"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileUp } from "lucide-react"

export default function UploadPage() {
  const [pricing, setPricing] = useState<"free" | "paid">("free")

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Upload Your SCORM Package</h1>
          <p className="text-muted-foreground">Share your educational content with the EduPack community</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
              {/* Upload Area */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Upload your SCORM Package *</label>
                <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm font-medium text-foreground mb-2">
                    Drop your .zip SCORM package here or browse files
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Supports SCORM 1.2, SCORM 2004, and xAPI packages
                  </p>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Browse Files
                  </Button>
                </div>
              </div>

              {/* Package Title */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Package Title *</label>
                <Input placeholder="e.g., Introduction to Algebra - Grade 8" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Short Description *</label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm min-h-[100px]"
                  placeholder="Describe what learners will gain from this package..."
                />
              </div>

              {/* Pricing */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Pricing *</label>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={pricing === "free"}
                      onChange={() => setPricing("free")}
                      className="text-primary"
                    />
                    <span className="text-sm">Free</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={pricing === "paid"}
                      onChange={() => setPricing("paid")}
                      className="text-primary"
                    />
                    <span className="text-sm">Paid</span>
                  </label>
                </div>
                {pricing === "paid" && (
                  <div className="flex gap-2">
                    <select className="px-3 py-2 rounded-lg border border-input bg-background text-sm w-24">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                    <Input type="number" placeholder="9.99" className="flex-1" />
                  </div>
                )}
              </div>

              {/* Category Selectors */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Grade/Stage *</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm">
                    <option>Select grade</option>
                    <option>Elementary</option>
                    <option>Middle School</option>
                    <option>High School</option>
                    <option>University</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Subject *</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm">
                    <option>Select subject</option>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>Literature</option>
                    <option>History</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Language *</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm">
                    <option>English</option>
                    <option>Arabic</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label className="text-sm text-muted-foreground">
                  I confirm I own the rights to this content and agree to the EduPack seller terms and conditions
                </label>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button className="w-full" size="lg">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Package
                </Button>
              </div>
            </div>
          </div>

          {/* Tips Sidebar */}
          <div>
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Tips for Good Packages</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Use clear, descriptive titles</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Test your SCORM package before uploading</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Include learning objectives</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Add preview screenshots or videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Price competitively based on content depth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
