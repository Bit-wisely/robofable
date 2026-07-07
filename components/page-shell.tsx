import type { ReactNode } from "react"
import { SiteNav } from "@/components/site-nav"
import { PageFooter } from "@/components/page-footer"

type PageShellProps = {
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
}

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <main className="relative bg-background">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-32 md:px-8 md:pt-40">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-balance md:text-6xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">{description}</p>
        ) : null}
        <div className="mt-12">{children}</div>
      </section>
      <PageFooter />
    </main>
  )
}
