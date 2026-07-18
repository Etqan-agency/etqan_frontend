export interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Service {
  id: string
  title: string
  slug: string
  short_description: string
  long_description: string
  icon: string
  features: string[]
  order: number
  is_active: boolean
}

export type ProjectCategory = "web" | "mobile" | "uiux" | "enterprise"

export interface ProjectImage {
  id: string
  image: string
  caption: string
  order: number
}

export interface Project {
  id: string
  title: string
  slug: string
  category: ProjectCategory
  category_display: string
  summary: string
  description: string
  cover_image: string | null
  gallery: ProjectImage[]
  tech_stack: string[]
  client_name: string
  live_url: string
  is_featured: boolean
  published: boolean
  order: number
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface BlogAuthor {
  id: string
  name: string
  email: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  cover_image: string | null
  excerpt: string
  body: string
  tags: Tag[]
  author: BlogAuthor | null
  published: boolean
  published_at: string | null
}

export interface Opinion {
  id: string
  quote: string
  author_name: string
  author_role: string
  avatar: string | null
  order: number
  is_active: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string | null
  bio: string
  socials: Record<string, string>
  order: number
  is_active: boolean
}

export interface Client {
  id: string
  name: string
  logo: string | null
  website: string
  order: number
  is_active: boolean
}

export interface SiteSettingsStats {
  projects?: number
  clients?: number
  retention?: number
  awards?: number
  [key: string]: number | undefined
}

export interface SiteSettings {
  hero_title: string
  hero_subtitle: string
  announcement_text: string
  company_about: string
  mission: string
  vision: string
  values: { title: string; description: string }[]
  stats: SiteSettingsStats
  contact_email: string
  contact_phone: string
  address: string
  social_links: Record<string, string>
}

export interface ContactMessagePayload {
  name: string
  email: string
  subject?: string
  message: string
  company?: string
  project_type?: string
  budget_range?: string
}

export interface ContactMessageResponse extends ContactMessagePayload {
  id: string
  created_at: string
}

export type ApiFieldErrors = Record<string, string[]>
