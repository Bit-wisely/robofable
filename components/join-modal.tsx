'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { SEMESTERS, BRANCHES } from '@/lib/data'

export function JoinModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        aria-label="Close enrollment dialog"
        onClick={onClose}
      />
      <div className="relative max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full hover:bg-foreground/5"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>

        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Secure cadet intake
        </p>
        <h3 id="join-modal-title" className="mt-2 font-serif text-2xl font-bold md:text-3xl">
          Initiate Pilot Enrollment
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Calibrate your bio-metrics for the 4-year autonomous term.
        </p>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <Field label="Pilot Identifier (Full Name)">
            <input type="text" required placeholder="e.g. Neo Prime" className={inputCls} />
          </Field>
          <Field label="Comm Link (10-Digit Mobile)">
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              placeholder="e.g. 9876543210"
              className={inputCls}
            />
          </Field>
          <Field label="Neural Address (Email)">
            <input type="email" required placeholder="e.g. link@mainframe.org" className={inputCls} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Operational Cycle (Semester)">
              <select required defaultValue="" className={inputCls}>
                <option value="" disabled>
                  Select Level
                </option>
                {SEMESTERS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Core Division (Branch)">
              <select required defaultValue="" className={inputCls}>
                <option value="" disabled>
                  Select Division
                </option>
                {BRANCHES.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Cadet Serial Code (KTU ID)">
            <input type="text" required placeholder="e.g. UCE24CS001" className={inputCls} />
          </Field>

          <p className="rounded-xl bg-accent/10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-accent">
            Registration temporarily paused
          </p>

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-foreground/20 py-3 text-sm font-semibold hover:bg-foreground/5"
            >
              Abort Mission
            </button>
            <button
              type="submit"
              disabled
              className="flex-1 cursor-not-allowed rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground opacity-60"
            >
              Engage Core
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-accent'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
