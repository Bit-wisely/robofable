'use client'

import { motion } from 'motion/react'
import { Check, Lock } from 'lucide-react'
import { PASS_FEATURES } from '@/lib/data'

export function MemberPass({ onJoinClick }: { onJoinClick?: () => void }) {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Register membership
        </p>
        <h2 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-5xl text-balance">
          Robotics Club Membership
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
          Membership registration is currently closed. Registration for all students will
          reopen when the new first-year student batch arrives.
        </p>
        <ul className="mt-8 flex flex-col gap-5">
          {PASS_FEATURES.map((feature) => (
            <li key={feature.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Check className="size-3.5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">{feature.title}</p>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-2xl"
      >
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Active
          </span>
          <span className="text-xs font-medium uppercase tracking-widest opacity-70">
            Robotics Club UCE
          </span>
        </div>
        <h3 className="mt-8 font-serif text-2xl font-bold uppercase tracking-wide">
          Member Pass
        </h3>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="font-serif text-5xl font-extrabold">{'₹150'}</span>
          <span className="text-sm opacity-70">/ 4 years</span>
        </p>
        <p className="mt-4 text-sm leading-relaxed opacity-80 text-pretty">
          Get a full membership pass to access the lab, participate in technical workshops,
          and collaborate on projects.
        </p>
        <button
          type="button"
          onClick={onJoinClick}
          className="mt-8 w-full rounded-full bg-white py-3.5 font-semibold text-foreground transition-transform hover:scale-[1.02]"
        >
          Get 4-Year Pass
        </button>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs opacity-70">
          <Lock className="size-3" aria-hidden="true" />
          Secure instant registration
        </p>
        <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-widest text-accent">
          Registration temporarily paused
        </p>
      </motion.div>
    </div>
  )
}
