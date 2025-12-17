export type OwnedPackage = {
  package_id: string
  title: string
  description: string | null
  created_at: string
  storage_path: string | null
  is_public?: boolean
  grade?: string
  subject?: string
  price?: number
  visibility?: 'published' | 'draft' | 'hidden'
}
