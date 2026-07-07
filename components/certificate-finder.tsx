"use client"

import { useState } from "react"
import { Search, FileCheck2 } from "lucide-react"
import { PAST_EVENTS, SEMESTERS, BRANCHES } from "@/lib/data"

export function CertificateFinder() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form
        className="rounded-3xl border border-border bg-card p-8"
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
      >
        <h2 className="font-serif text-2xl font-bold">Certificate lookup</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Enter the details you registered with for the event.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cert-name" className="text-sm font-medium">
              Full name
            </label>
            <input
              id="cert-name"
              name="name"
              required
              placeholder="Your registered name"
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-primary/40 focus:ring-2"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cert-semester" className="text-sm font-medium">
                Semester
              </label>
              <select
                id="cert-semester"
                name="semester"
                required
                defaultValue=""
                className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-primary/40 focus:ring-2"
              >
                <option value="" disabled>
                  Select semester
                </option>
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cert-branch" className="text-sm font-medium">
                Branch
              </label>
              <select
                id="cert-branch"
                name="branch"
                required
                defaultValue=""
                className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-primary/40 focus:ring-2"
              >
                <option value="" disabled>
                  Select branch
                </option>
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="cert-event" className="text-sm font-medium">
              Event
            </label>
            <select
              id="cert-event"
              name="event"
              required
              defaultValue=""
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-primary/40 focus:ring-2"
            >
              <option value="" disabled>
                Select the event you attended
              </option>
              {PAST_EVENTS.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Search className="size-4" aria-hidden="true" />
            Find my certificate
          </button>
        </div>
      </form>

      <div className="flex flex-col justify-center rounded-3xl border border-dashed border-border p-8 text-center">
        {submitted ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <FileCheck2 className="size-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-xl font-bold">Request received</h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              If a certificate matching your details exists, it will be issued to your registered email shortly. For
              queries, reach out to us on Instagram.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <FileCheck2 className="size-8 text-muted-foreground" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-xl font-bold">Your certificate appears here</h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Certificates are issued for all workshops, competitions, and showcase events run by the club.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
