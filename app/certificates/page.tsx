import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { CertificateFinder } from "@/components/certificate-finder"

export const metadata: Metadata = {
  title: "Certificates | Robotics Club UCE",
  description: "Look up and download your participation certificates from Robotics Club UCE events.",
}

export default function CertificatesPage() {
  return (
    <PageShell
      eyebrow="Certificates"
      title="Claim your proof of work"
      description="Participated in one of our workshops or competitions? Look up your certificate using your registered details."
    >
      <CertificateFinder />
    </PageShell>
  )
}
