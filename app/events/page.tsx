'use client'

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { PAST_EVENTS } from "@/lib/data"

export default function EventsPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % PAST_EVENTS.length)
    }
  }

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + PAST_EVENTS.length) % PAST_EVENTS.length)
    }
  }

  return (
    <PageShell
      eyebrow="Events"
      title="What we've been up to"
      description="From hands-on hardware workshops to esports tournaments — a look back at the events the club has run."
    >
      <div className="flex flex-col gap-12">
        {/* Upcoming Events Section */}
        <section className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Upcoming Events</p>
          <div className="p-8 md:p-12 bg-muted/20 border-2 border-dashed border-border rounded-3xl text-center">
            <h3 className="text-lg font-bold md:text-xl mb-2">No Upcoming Events Scheduled</h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              We are currently planning our agenda for the next academic semester. Check back soon for announcements on upcoming technical workshops and coding competitions!
            </p>
          </div>
        </section>

        {/* Past Events Section */}
        <section className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">Past Achievements</p>
          <div className="flex flex-col gap-16 md:gap-24">
            {PAST_EVENTS.map((event, i) => (
              <article
                key={event.id}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(i)}
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent ${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </button>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">{event.category}</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-balance md:text-4xl">{event.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">{event.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox / Slide Window Overlay */}
      {selectedPhoto !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Close window"
          >
            <X className="size-6" />
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={showPrev}
            className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-8"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Image Container matching project design */}
          <div 
            className="relative max-h-[80vh] max-w-[85vw] w-[800px] aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 bg-plum/45 shadow-[0_0_50px_rgba(139,123,216,0.15)] transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PAST_EVENTS[selectedPhoto].image || "/placeholder.svg"}
              alt={PAST_EVENTS[selectedPhoto].title}
              fill
              priority
              className="object-contain p-2"
            />
            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
              <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">
                {PAST_EVENTS[selectedPhoto].category}
              </span>
              <h4 className="mt-2 text-sm font-bold tracking-wide md:text-lg">
                {PAST_EVENTS[selectedPhoto].title}
              </h4>
              <p className="mt-1 text-xs opacity-75 md:text-sm line-clamp-2 text-pretty">
                {PAST_EVENTS[selectedPhoto].desc}
              </p>
              <p className="mt-3 text-xs opacity-50">
                Event {selectedPhoto + 1} of {PAST_EVENTS.length}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-8"
            aria-label="Next photo"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </PageShell>
  )
}
