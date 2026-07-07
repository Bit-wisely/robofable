import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { CREW } from "@/lib/data"

export const metadata: Metadata = {
  title: "Crew | Robotics Club UCE",
  description: "Meet the crew leading Robotics Club UCE.",
}

export default function CrewPage() {
  return (
    <PageShell
      eyebrow="The Crew"
      title="The people behind the machines"
      description="The command unit steering Robotics Club UCE — coordinating events, resources, and research direction."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CREW.map((member) => (
          <article
            key={member.name}
            className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-lg"
          >
            <div>
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 font-serif text-xl font-bold text-primary">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <h2 className="mt-6 font-serif text-2xl font-bold">{member.name}</h2>
              <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-primary">{member.role}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{member.desc}</p>
            </div>
            <p className="mt-6 border-t border-border pt-4 font-mono text-xs text-muted-foreground">{member.id}</p>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
