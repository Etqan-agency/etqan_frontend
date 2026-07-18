import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AppShowcaseSection } from "@/components/app-showcase-section"
import { WorkShowcaseSection } from "@/components/work-showcase-section"
import { ClientsSection } from "@/components/clients-section"
import { IndexSection } from "@/components/index-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ExpansionSection } from "@/components/expansion-section"
import { TeamSection } from "@/components/team-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"
import {
  getBlogPosts,
  getClients,
  getOpinions,
  getProjects,
  getServices,
  getSiteSettings,
  getTeam,
} from "@/lib/content"

export default async function Page() {
  const [settings, projects, services, clients, opinions, team, posts] =
    await Promise.all([
      getSiteSettings().catch(() => undefined),
      getProjects().catch(() => []),
      getServices().catch(() => []),
      getClients().catch(() => []),
      getOpinions().catch(() => []),
      getTeam().catch(() => []),
      getBlogPosts().catch(() => []),
    ])

  return (
    <main className="relative">
      <SiteHeader />
      <HeroSection stats={settings?.stats} />
      <AppShowcaseSection />
      <WorkShowcaseSection projects={projects} />
      <ClientsSection clients={clients} />
      <IndexSection services={services} stats={settings?.stats} />
      <TestimonialsSection opinions={opinions} />
      <ExpansionSection />
      <TeamSection team={team} />
      <BlogSection posts={posts} />
      <ContactSection settings={settings} />
      <SiteFooter />
    </main>
  )
}
