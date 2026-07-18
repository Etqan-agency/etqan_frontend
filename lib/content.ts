import { apiGet, unwrapList } from "@/lib/api"
import type {
  BlogPost,
  Client,
  Opinion,
  Paginated,
  Project,
  Service,
  SiteSettings,
  TeamMember,
} from "@/types/api"

export async function getSiteSettings(): Promise<SiteSettings> {
  return apiGet<SiteSettings>("/settings/", 300)
}

export async function getProjects(): Promise<Project[]> {
  const res = await apiGet<Paginated<Project>>("/projects/", 300)
  return unwrapList(res)
}

export async function getServices(): Promise<Service[]> {
  const res = await apiGet<Paginated<Service>>("/services/", 300)
  return unwrapList(res)
}

export async function getOpinions(): Promise<Opinion[]> {
  const res = await apiGet<Paginated<Opinion>>("/opinions/", 300)
  return unwrapList(res)
}

export async function getTeam(): Promise<TeamMember[]> {
  const res = await apiGet<Paginated<TeamMember>>("/team/", 300)
  return unwrapList(res)
}

export async function getClients(): Promise<Client[]> {
  const res = await apiGet<Paginated<Client>>("/clients/", 300)
  return unwrapList(res)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await apiGet<Paginated<BlogPost>>("/blog/", 300)
  return unwrapList(res)
}
