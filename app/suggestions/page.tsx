import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { SuggestionForm } from "@/components/suggestion-form"

export const metadata: Metadata = {
  title: "Suggestions | Robotics Club UCE",
  description: "Pitch an event, workshop topic, or improvement idea to Robotics Club UCE.",
}

export default function SuggestionsPage() {
  return (
    <PageShell
      eyebrow="Suggestions"
      title="Shape what we build next"
      description="Have an idea for a workshop, tournament, or lab improvement? The club runs on member ideas — send yours in."
    >
      <SuggestionForm />
    </PageShell>
  )
}
