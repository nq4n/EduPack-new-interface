"use client"

import { useMemo, useState, useRef } from "react"
import Link from "next/link"
import { EditorProject } from "@/lib/scorm/types"
import { useLocale } from "@/hooks/use-locale"
import { PackageViewer } from "@/components/scorm/package-viewer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Download, Eye, Loader2, X, AlertCircle, Upload, Globe, Lock, Settings } from "lucide-react"
import { getProfileStrings, ProfileLanguage } from "../strings"
import { OwnedPackage } from "./types"

interface OwnedPackagesClientProps {
  packages: OwnedPackage[]
  language: ProfileLanguage
}

export function OwnedPackagesClient({ packages, language }: OwnedPackagesClientProps) {
  const { locale } = useLocale()
  const [previewPackage, setPreviewPackage] = useState<OwnedPackage | null>(null)
  const [previewProject, setPreviewProject] = useState<EditorProject | null>(null)
  const [loadingPreview, setLoadingPreview] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [settingsOpen, setSettingsOpen] = useState<string | null>(null)
  const [savingSettings, setSavingSettings] = useState<string | null>(null)
  const [settingsError, setSettingsError] = useState<string | null>(null)
  const [localPackages, setLocalPackages] = useState<OwnedPackage[]>(packages)
  const fileInputRef = useRef<HTMLInputElement>(null)
  // Use global locale instead of server-passed language
  const strings = useMemo(() => getProfileStrings(locale as "en" | "ar"), [locale])
  const direction = locale === "ar" ? "rtl" : "ltr"

  const sortedPackages = useMemo(() => {
    return [...localPackages].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  }, [localPackages])

  const handleViewPackage = async (pkg: OwnedPackage) => {
    setPreviewPackage(pkg)
    setPreviewProject(null)
    setPreviewError(null)

    if (!pkg.storage_path) {
      setPreviewError(strings.packages.noPathError)
      return
    }

    try {
      setLoadingPreview(true)
      const response = await fetch("/api/scorm/load", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: pkg.storage_path }),
      })

      const body = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(body.error || strings.packages.loadErrorFallback)
      }

      setPreviewProject(body.project as EditorProject)
    } catch (err) {
      const message = err instanceof Error ? err.message : strings.packages.loadErrorFallback
      setPreviewError(message)
    } finally {
      setLoadingPreview(false)
    }
  }

  const closePreview = () => {
    setPreviewPackage(null)
    setPreviewProject(null)
    setPreviewError(null)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      setUploadError(null)

      const formData = new FormData()
      formData.append("file", file)
      formData.append("title", file.name.replace(/\.[^/.]+$/, ""))
      formData.append("description", "Uploaded package")
      formData.append("is_public", "false")

      const response = await fetch("/api/scorm/upload", {
        method: "POST",
        body: formData,
      })

      const body = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error((body as { error?: string }).error || "Upload failed")
      }

      // Reload page to show new package
      window.location.reload()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed"
      setUploadError(message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleTogglePublic = async (pkg: OwnedPackage) => {
    try {
      setSavingSettings(pkg.package_id)
      setSettingsError(null)

      const response = await fetch("/api/scorm/package/visibility", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          package_id: pkg.package_id,
          is_public: !pkg.is_public,
        }),
      })

      const body = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error((body as { error?: string }).error || "Failed to update visibility")
      }

      // Update local state
      setLocalPackages(
        localPackages.map((p) =>
          p.package_id === pkg.package_id ? { ...p, is_public: !pkg.is_public } : p
        )
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update visibility"
      setSettingsError(message)
    } finally {
      setSavingSettings(null)
    }
  }

  const handleUpdateSettings = async (pkg: OwnedPackage, updates: Partial<OwnedPackage>) => {
    try {
      setSavingSettings(pkg.package_id)
      setSettingsError(null)

      const response = await fetch("/api/scorm/package/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          package_id: pkg.package_id,
          ...updates,
        }),
      })

      const body = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error((body as { error?: string }).error || "Failed to update settings")
      }

      // Update local state
      setLocalPackages(
        localPackages.map((p) =>
          p.package_id === pkg.package_id ? { ...p, ...updates } : p
        )
      )

      setSettingsOpen(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update settings"
      setSettingsError(message)
    } finally {
      setSavingSettings(null)
    }
  }

  return (
    <div
      dir={direction}
      className={`space-y-6 ${locale === "ar" ? "text-right" : "text-left"}`}
    >
      {/* Upload Section */}
      <div className={`border-2 border-dashed border-border rounded-lg p-6 ${locale === "ar" ? "text-right" : "text-center"} bg-card/50 hover:bg-card transition-colors`}>
        <div
          className={`flex flex-col ${locale === "ar" ? "items-end" : "items-center"} justify-center gap-4 ${locale === "ar" ? "text-right" : ""}`}
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className={locale === "ar" ? "text-right" : "text-center"}>
            <h3 className={`font-semibold text-foreground mb-1 ${locale === "ar" ? "text-right" : "text-center"}`}>{strings.packages.uploadPackage}</h3>
            <p className={`text-sm text-muted-foreground ${locale === "ar" ? "text-right" : "text-center"}`}>{strings.packages.uploadPackageHint}</p>
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            variant="outline"
          >
            {uploading ? (
              <>
                <Loader2 className={`${locale === "ar" ? "ml-2" : "mr-2"} h-4 w-4 animate-spin`} />
                {strings.packages.uploading}
              </>
            ) : (
              <>
                <Upload className={`${locale === "ar" ? "ml-2" : "mr-2"} h-4 w-4`} />
                {strings.packages.selectFile}
              </>
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip,.scorm"
            onChange={handleFileSelect}
            className="hidden"
          />
          {uploadError && (
            <div className={`w-full ${locale === "ar" ? "text-right" : "text-left"} rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-destructive text-sm`}>
              <div className={`flex items-center gap-2 ${locale === "ar" ? "flex-row-reverse justify-end" : ""}`}>
                <AlertCircle className="h-4 w-4" />
                <span>{uploadError}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Packages List */}
      {sortedPackages && sortedPackages.length > 0 ? (
        <div className="space-y-4">
          <h3 className={`font-semibold text-foreground ${locale === "ar" ? "text-right" : "text-left"}`}>{strings.packages.yourPackages}</h3>
          {sortedPackages.map((pkg) => (
            <div key={pkg.package_id} className="space-y-2">
              <div className={`flex items-center justify-between p-4 border border-border rounded-lg ${locale === "ar" ? "flex-row-reverse" : ""}`}>
                <div className={`flex-1 ${locale === "ar" ? "text-right" : "text-left"}`}>
                  <div className={`flex items-center gap-2 mb-2 ${locale === "ar" ? "flex-row-reverse justify-end" : ""}`}>
                    <h3 className={`font-semibold text-foreground ${locale === "ar" ? "text-right" : "text-left"}`}>{pkg.title}</h3>
                    {pkg.is_public ? (
                      <Globe className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  {pkg.description && (
                    <p className={`text-sm text-muted-foreground mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}>{pkg.description}</p>
                  )}

                  <p className={`text-sm text-muted-foreground ${locale === "ar" ? "text-right" : "text-left"}`}>
                    {strings.packages.createdAt}{" "}
                    {new Intl.DateTimeFormat(
                      locale === "ar" ? "ar-EG" : undefined,
                      { dateStyle: "medium" },
                    ).format(new Date(pkg.created_at))}
                  </p>
                </div>

                <div className={`flex gap-2 ${locale === "ar" ? "flex-row-reverse" : ""}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublic(pkg)}
                    disabled={savingSettings === pkg.package_id}
                    title={pkg.is_public ? "Make private" : "Make public (visible in shop)"}
                  >
                    {savingSettings === pkg.package_id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : pkg.is_public ? (
                      <Globe className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </Button> 

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSettingsOpen(settingsOpen === pkg.package_id ? null : pkg.package_id)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>

                  <form action={`/api/scorm/download`} method="POST">
                    <input type="hidden" name="path" value={pkg.storage_path ?? ""} />
                    <Button variant="outline" size="sm" type="submit">
                      <Download className={`${locale === "ar" ? "ml-2" : "mr-2"} h-4 w-4`} />
                      {strings.packages.download}
                    </Button>
                  </form>

                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => handleViewPackage(pkg)}
                  >
                    <Eye className={`${locale === "ar" ? "ml-2" : "mr-2"} h-4 w-4`} />
                    {strings.packages.view}
                  </Button>
                </div>
              </div>

              {/* Settings Panel */}
              {settingsOpen === pkg.package_id && (
                <div className={`p-4 border border-border rounded-lg bg-card/50 space-y-4 ${locale === "ar" ? "text-right" : "text-left"}`}>
                  <div>
                    <label className={`text-sm font-semibold text-foreground block mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {strings.packages.description}
                    </label>
                    <textarea
                      value={pkg.description || ""}
                      onChange={(e) => {
                        setLocalPackages(
                          localPackages.map((p) =>
                            p.package_id === pkg.package_id
                              ? { ...p, description: e.target.value }
                              : p
                          )
                        )
                      }}
                      placeholder={strings.packages.descriptionPlaceholder}
                      className={`w-full px-3 py-2 rounded-lg border border-input bg-background text-sm h-20 resize-none ${locale === "ar" ? "text-right" : "text-left"}`}
                    />
                  </div>

                  <div>
                    <label className={`text-sm font-semibold text-foreground block mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {strings.packages.gradeLevel}
                    </label>
                    <select
                      value={pkg.grade || "all"}
                      onChange={(e) => {
                        setLocalPackages(
                          localPackages.map((p) =>
                            p.package_id === pkg.package_id
                              ? { ...p, grade: e.target.value }
                              : p
                          )
                        )
                      }}
                      className={`w-full px-3 py-2 rounded-lg border border-input bg-background text-sm ${locale === "ar" ? "text-right" : "text-left"}`}
                    >
                      <option value="all">All Grades</option>
                      <option value="elementary">Elementary</option>
                      <option value="middleSchool">Middle School</option>
                      <option value="highSchool">High School</option>
                      <option value="year1">University Year 1</option>
                      <option value="year2">University Year 2</option>
                      <option value="year3">University Year 3</option>
                      <option value="year4">University Year 4</option>
                      <option value="postgraduate">Postgraduate</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-sm font-semibold text-foreground block mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {strings.packages.subject}
                    </label>
                    <select
                      value={pkg.subject || "general"}
                      onChange={(e) => {
                        setLocalPackages(
                          localPackages.map((p) =>
                            p.package_id === pkg.package_id
                              ? { ...p, subject: e.target.value }
                              : p
                          )
                        )
                      }}
                      className={`w-full px-3 py-2 rounded-lg border border-input bg-background text-sm ${locale === "ar" ? "text-right" : "text-left"}`}
                    >
                      <option value="general">General</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="science">Science</option>
                      <option value="literature">Literature</option>
                      <option value="engineering">Engineering</option>
                      <option value="computerScience">Computer Science</option>
                      <option value="business">Business</option>
                      <option value="medicine">Medicine</option>
                      <option value="law">Law</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-sm font-semibold text-foreground block mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {strings.packages.visibility}
                    </label>
                    <select
                      value={pkg.visibility || 'draft'}
                      onChange={(e) => {
                        setLocalPackages(
                          localPackages.map((p) =>
                            p.package_id === pkg.package_id
                              ? { ...p, visibility: e.target.value as 'published' | 'draft' | 'hidden' }
                              : p
                          )
                        )
                      }}
                      className={`w-full px-3 py-2 rounded-lg border border-input bg-background text-sm ${locale === "ar" ? "text-right" : "text-left"}`}
                    >
                      <option value="draft">{strings.packages.draftNotListed}</option>
                      <option value="published">{strings.packages.publishedVisible}</option>
                      <option value="hidden">{strings.packages.hiddenPrivate}</option>
                    </select>
                    <p className={`text-xs text-muted-foreground mt-1 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {pkg.visibility === 'draft' && strings.packages.draftDescription}
                      {pkg.visibility === 'published' && strings.packages.publishedDescription}
                      {pkg.visibility === 'hidden' && strings.packages.hiddenDescription}
                    </p>
                  </div>

                  <div>
                    <label className={`text-sm font-semibold text-foreground block mb-2 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {strings.packages.price}
                    </label>
                    <div className={`flex items-center gap-2 ${locale === "ar" ? "flex-row-reverse" : ""}`}>
                      <Input
                        type="number"
                        value={pkg.price || 0}
                        onChange={(e) => {
                          setLocalPackages(
                            localPackages.map((p) =>
                              p.package_id === pkg.package_id
                                ? { ...p, price: parseInt(e.target.value) || 0 }
                                : p
                            )
                          )
                        }}
                        placeholder="0"
                        className={`w-full ${locale === "ar" ? "text-right" : "text-left"}`}
                      />
                      <span className={`text-sm text-muted-foreground whitespace-nowrap ${locale === "ar" ? "order-first" : ""}`}>
                        = ${(((pkg.price || 0) / 100).toFixed(2))}
                      </span>
                    </div>
                  </div>

                  {settingsError && (
                    <div className={`rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-destructive text-sm ${locale === "ar" ? "text-right" : "text-left"}`}>
                      <div className={`flex items-center gap-2 ${locale === "ar" ? "flex-row-reverse justify-end" : ""}`}>
                        <AlertCircle className="h-4 w-4" />
                        <span>{settingsError}</span>
                      </div>
                    </div>
                  )}

                  <div className={`flex gap-2 ${locale === "ar" ? "flex-row-reverse justify-start" : "justify-end"}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSettingsOpen(null)}
                      disabled={savingSettings === pkg.package_id}
                    >
                      {strings.packages.cancel}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        handleUpdateSettings(pkg, {
                          description: pkg.description,
                          grade: pkg.grade,
                          subject: pkg.subject,
                          price: pkg.price,
                          visibility: pkg.visibility,
                        })
                      }
                      disabled={savingSettings === pkg.package_id}
                    >
                      {savingSettings === pkg.package_id ? (
                        <>
                          <Loader2 className={`${locale === "ar" ? "ml-2" : "mr-2"} h-4 w-4 animate-spin`} />
                          {strings.packages.savingSettings}
                        </>
                      ) : (
                        strings.packages.saveSettings
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={`${locale === "ar" ? "text-right" : "text-center"} py-12`}>
          <Package className={`h-12 w-12 text-muted-foreground ${locale === "ar" ? "ml-auto mr-0" : "mx-auto"} mb-4`} />
          <h3 className={`text-lg font-semibold text-foreground mb-2 ${locale === "ar" ? "text-right" : "text-center"}`}>
            {strings.packages.noPackagesTitle}
          </h3>
          <p className={`text-muted-foreground mb-6 ${locale === "ar" ? "text-right" : "text-center"}`}>{strings.packages.noPackagesBody}</p>
          <Button asChild>
            <Link href="/editor">{strings.packages.createPackage}</Link>
          </Button>
        </div>
      )}

      {previewPackage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div
            dir={direction}
            className={`relative w-full h-full max-h-screen rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden ${locale === "ar" ? "text-right" : "text-left"}`}
          >
            {/* Header */}
            <div className={`flex items-center ${locale === "ar" ? "flex-row-reverse" : ""} justify-between p-6 border-b border-border`}>
              <div>
                <h3 className={`text-2xl font-semibold text-foreground ${locale === "ar" ? "text-right" : "text-left"}`}>{previewPackage.title}</h3>
                {previewPackage.description && (
                  <p className={`text-sm text-muted-foreground mt-1 ${locale === "ar" ? "text-right" : "text-left"}`}>{previewPackage.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={closePreview}
                className="text-muted-foreground hover:text-foreground"
                aria-label={strings.packages.close}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* 3-Column Layout (like editor) */}
            <div className={`flex-1 flex overflow-hidden ${locale === "ar" ? "flex-row-reverse" : ""}`}>
              {/* Left Sidebar - Package Info */}
              <div className={`w-80 ${locale === "ar" ? "border-l" : "border-r"} border-border bg-card/50 p-6 overflow-y-auto`}>
                <div className="space-y-6">
                  <div>
                    <h4 className={`text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {strings.packages.packageDetails}
                    </h4>
                    <div className="space-y-3 text-sm">
                      {previewPackage.grade && (
                        <div className={locale === "ar" ? "text-right" : "text-left"}>
                          <span className="text-xs text-muted-foreground">{strings.packages.gradeLabel}</span>
                          <p className="font-medium text-foreground">{previewPackage.grade}</p>
                        </div>
                      )}
                      {previewPackage.subject && (
                        <div className={locale === "ar" ? "text-right" : "text-left"}>
                          <span className="text-xs text-muted-foreground">{strings.packages.subjectLabel}</span>
                          <p className="font-medium text-foreground">{previewPackage.subject}</p>
                        </div>
                      )}
                      {previewPackage.visibility && (
                        <div className={locale === "ar" ? "text-right" : "text-left"}>
                          <span className="text-xs text-muted-foreground">{strings.packages.visibilityLabel}</span>
                          <p className="font-medium text-foreground capitalize">{previewPackage.visibility}</p>
                        </div>
                      )}
                      {previewPackage.price !== undefined && (
                        <div className={locale === "ar" ? "text-right" : "text-left"}>
                          <span className="text-xs text-muted-foreground">{strings.packages.priceLabel}</span>
                          <p className="font-medium text-primary">
                            {previewPackage.price ? `$${((previewPackage.price / 100).toFixed(2))}` : strings.packages.free}
                          </p>
                        </div>
                      )}
                      {previewPackage.created_at && (
                        <div className={locale === "ar" ? "text-right" : "text-left"}>
                          <span className="text-xs text-muted-foreground">{strings.packages.createdLabel}</span>
                          <p className="font-medium text-foreground">
                            {new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : 'en-US', { dateStyle: 'medium' }).format(
                              new Date(previewPackage.created_at)
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Center - Content Preview */}
              <div className={`flex-1 overflow-y-auto p-6 ${locale === "ar" ? "text-right" : "text-left"}`}>
                <div className={`bg-white rounded-xl p-6 space-y-4 ${locale === "ar" ? "text-right" : "text-left"}`}>
                  {loadingPreview ? (
                    <div className={`flex items-center gap-2 text-muted-foreground ${locale === "ar" ? "flex-row-reverse justify-end" : ""}`}>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{strings.packages.loading}</span>
                    </div>
                  ) : previewError ? (
                    <div className={`flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-destructive text-sm ${locale === "ar" ? "flex-row-reverse justify-end" : ""}`}>
                      <AlertCircle className="h-4 w-4" />
                      <span>{previewError}</span>
                    </div>
                  ) : previewProject ? (
                    <PackageViewer project={previewProject} />
                  ) : (
                    <div className={`rounded-lg border border-dashed border-border p-6 ${locale === "ar" ? "text-right" : "text-center"} text-muted-foreground`}>
                      {strings.packages.selectToPreview}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar - Actions */}
              <div className={`w-80 ${locale === "ar" ? "border-r" : "border-l"} border-border bg-card/50 p-6 overflow-y-auto`}>
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 ${locale === "ar" ? "text-right" : "text-left"}`}>
                      {strings.packages.actions}
                    </h4>
                    <div className={`space-y-2 flex flex-col ${locale === "ar" ? "text-right" : "text-left"}`}>
                      <Button onClick={closePreview} variant="outline" type="button">
                        {strings.packages.close}
                      </Button>
                      {previewPackage.storage_path ? (
                        <Button asChild>
                          <Link href={`/scorm-ai?path=${encodeURIComponent(previewPackage.storage_path)}`}>
                            {strings.packages.openInEditor}
                          </Link>
                        </Button>
                      ) : (
                        <Button disabled title={strings.packages.missingPath}>
                          {strings.packages.openInEditor}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
