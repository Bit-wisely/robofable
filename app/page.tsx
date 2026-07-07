import { Hero } from "@/components/hero"
import { TextReveal } from "@/components/text-reveal"
import { Stats } from "@/components/stats"
import { PhotoWall } from "@/components/photo-wall"
import { MemberPass } from "@/components/member-pass"
import { PageFooter } from "@/components/page-footer"
import { SiteNav } from "@/components/site-nav"
import { MISSION_SENTENCE } from "@/lib/data"

export default function Page() {
  return (
    <main className="relative">
      <SiteNav lightHero />
      <Hero />
      <section id="about" className="bg-background px-4 py-28 md:py-40">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">About us</p>
          <TextReveal
            text={MISSION_SENTENCE}
            className="mt-6 font-serif text-2xl font-semibold leading-relaxed text-balance md:text-4xl md:leading-snug"
          />
        </div>
      </section>
      <Stats />
      <div className="h-8 md:h-12 bg-background" />
      <PhotoWall />
      <section id="member-pass" className="bg-background px-4 py-16 md:py-24">
        <MemberPass />
      </section>
      <PageFooter />
    </main>
  )
}
