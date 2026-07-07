import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events | Robotics Club UCE",
  description: "Workshops, competitions, and showcases hosted by Robotics Club UCE.",
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
