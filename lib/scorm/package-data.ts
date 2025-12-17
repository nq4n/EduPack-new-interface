import { t } from "@/lib/translations"
import { type Locale } from "@/lib/i18n"
import { type EditorProject } from "./types"

export interface PackageRecord {
  id: string
  title: string
  description: string
  storage_path?: string
  created_at?: string
  grade: string
  subject: string
  language: string
  price: string
  thumbnail?: string
  content?: EditorProject
  visibility?: 'published' | 'draft' | 'hidden'
}

export function buildFallbackPackages(locale: Locale): PackageRecord[] {
  return [
    {
      id: "1",
      title: t(locale, "shop.packages.1.title"),
      grade: t(locale, "shop.packages.1.grade"),
      subject: t(locale, "shop.packages.1.subject"),
      language: t(locale, "shop.packages.1.language"),
      description: t(locale, "shop.packages.1.description"),
      price: t(locale, "shop.packages.1.price"),
      thumbnail: "/math-fractions-classroom.jpg",
    },
    {
      id: "2",
      title: t(locale, "shop.packages.2.title"),
      grade: t(locale, "shop.packages.2.grade"),
      subject: t(locale, "shop.packages.2.subject"),
      language: t(locale, "shop.packages.2.language"),
      description: t(locale, "shop.packages.2.description"),
      price: "$12.99",
      thumbnail: "/solar-system-space-planets.jpg",
    },
    {
      id: "3",
      title: t(locale, "shop.packages.3.title"),
      grade: t(locale, "shop.packages.3.grade"),
      subject: t(locale, "shop.packages.3.subject"),
      language: t(locale, "shop.packages.3.language"),
      description: t(locale, "shop.packages.3.description"),
      price: "$9.99",
      thumbnail: "/shakespeare-theatre-literature.jpg",
    },
    {
      id: "4",
      title: t(locale, "shop.packages.4.title"),
      grade: t(locale, "shop.packages.4.grade"),
      subject: t(locale, "shop.packages.4.subject"),
      language: t(locale, "shop.packages.4.language"),
      description: t(locale, "shop.packages.4.description"),
      price: "$14.99",
      thumbnail: "/chemistry-lab-science-education.jpg",
    },
    {
      id: "5",
      title: t(locale, "shop.packages.5.title"),
      grade: t(locale, "shop.packages.5.grade"),
      subject: t(locale, "shop.packages.5.subject"),
      language: t(locale, "shop.packages.5.language"),
      description: t(locale, "shop.packages.5.description"),
      price: t(locale, "shop.packages.5.price"),
      thumbnail: "/world-map-geography-education.jpg",
    },
    {
      id: "6",
      title: t(locale, "shop.packages.6.title"),
      grade: t(locale, "shop.packages.6.grade"),
      subject: t(locale, "shop.packages.6.subject"),
      language: t(locale, "shop.packages.6.language"),
      description: t(locale, "shop.packages.6.description"),
      price: "$19.99",
      thumbnail: "/coding-programming-computer-education.jpg",
    },
  ]
}

export function mapRemotePackages(locale: Locale, raw: any[]): PackageRecord[] {
  return (raw || []).map((pkg: any, index: number) => {
    const project = pkg.content as EditorProject | undefined
    const pageCount = project?.pages?.length || 0
    const blockCount =
      project?.pages?.reduce((total, page) => total + (page.blocks?.length || 0), 0) || 0

    return {
      id: pkg.package_id || pkg.id || `remote-${index}`,
      title: pkg.title || project?.title || t(locale, "shop.preview.placeholderTitle"),
      description: pkg.description || t(locale, "shop.preview.loadedDescription"),
      storage_path: pkg.storage_path,
      created_at: pkg.created_at,
      grade: t(locale, "shop.preview.pageCount", { pages: pageCount }),
      subject: t(locale, "shop.preview.blockCount", { blocks: blockCount }),
      language:
        project?.theme?.direction === "rtl"
          ? t(locale, "shop.preview.languageRtl")
          : t(locale, "shop.preview.languageLtr"),
      price: t(locale, "shop.preview.included"),
      content: project,
    }
  })
}

export async function fetchPackageList(
  locale: Locale,
  filters?: {
    grade?: string
    subject?: string
    sort?: string
    price?: string
  }
): Promise<{ packages: PackageRecord[]; error?: string }> {
  try {
    const params = new URLSearchParams()
    if (filters?.grade) params.append("grade", filters.grade)
    if (filters?.subject) params.append("subject", filters.subject)
    if (filters?.sort) params.append("sort", filters.sort)
    if (filters?.price) params.append("price", filters.price)

    const response = await fetch(`/api/scorm/package?${params.toString()}`)
    const contentType = response.headers.get("content-type") || ""
    const isJson = contentType.includes("application/json")
    const body = isJson ? await response.json().catch(() => ({})) : {}

    if (!response.ok) {
      throw new Error((body as { error?: string }).error || "Packages API unavailable")
    }

    const remote = mapRemotePackages(locale, (body as { data?: any[] }).data || [])
    if (remote.length === 0) {
      return { packages: buildFallbackPackages(locale) }
    }

    return { packages: remote }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { packages: buildFallbackPackages(locale), error: message }
  }
}
