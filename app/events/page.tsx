import type { Metadata } from "next"
import Image from "next/image"
import { PageShell } from "@/components/page-shell"
import { PAST_EVENTS } from "@/lib/data"

export const metadata: Metadata = {
  title: "Events | Robotics Club UCE",
  description: "Workshops, competitions, and showcases hosted by Robotics Club UCE.",
}

export default function EventsPage() {
  return (
    <PageShell
      eyebrow="Events"
      title="What we've been up to"
      description="From hands-on hardware workshops to esports tournaments — a look back at the events the club has run."
    >
      <div className="flex flex-col gap-16 md:gap-24">
        {PAST_EVENTS.map((event, i) => (
          <article
            key={event.id}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${i % 2 === 1 ? "md:order-2" : ""}`}
            >
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">{event.category}</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-balance md:text-4xl">{event.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">{event.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
