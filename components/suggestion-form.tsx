"use client"

import { useState } from "react"
import { Send, Lightbulb } from "lucide-react"
import { SEMESTERS, BRANCHES, SUGGESTION_CATEGORIES } from "@/lib/data"

export function SuggestionForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-3xl border border-border bg-card p-12 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Lightbulb className="size-8 text-primary" aria-hidden="true" />
        </div>
        <h2 className="font-serif text-2xl font-bold">Idea received</h2>
        <p className="max-w-sm leading-relaxed text-muted-foreground">
          Thanks for the suggestion — the crew reviews every submission when planning the next semester of events.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold transition-colors hover:bg-foreground/5"
        >
          Submit another idea
        </button>
      </div>
    )
  }

  return (
    <form
      className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 md:p-10"
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sug-name" className="text-sm font-medium">
              Full name
            </label>
            <input
              id="sug-name"
              name="name"
              required
              placeholder="Your name"
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-primary/40 focus:ring-2"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sug-email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="sug-email"
              name="email"
              type="email"
              required
              placeholder="you@college.edu"
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-primary/40 focus:ring-2"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="sug-semester" className="text-sm font-medium">
              Semester
            </label>
            <select
              id="sug-semester"
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
            <label htmlFor="sug-branch" className="text-sm font-medium">
              Branch
            </label>
            <select
              id="sug-branch"
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
          <label htmlFor="sug-category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="sug-category"
            name="category"
            required
            defaultValue=""
            className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-primary/40 focus:ring-2"
          >
            <option value="" disabled>
              What kind of idea is it?
            </option>
            {SUGGESTION_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sug-idea" className="text-sm font-medium">
            Your idea
          </label>
          <textarea
            id="sug-idea"
            name="idea"
            required
            rows={5}
            placeholder="Describe your event idea, workshop topic, or improvement..."
            className="resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm leading-relaxed outline-none ring-primary/40 focus:ring-2"
          />
        </div>

        <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Send className="size-4" aria-hidden="true" />
          Send suggestion
        </button>
      </div>
    </form>
  )
}
