'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { STATS } from '@/lib/data'

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h2 
        style={{
          fontFamily: '"DM Sans", "DM Sans Placeholder", sans-serif',
          fontStyle: 'normal',
          fontWeight: 700,
          letterSpacing: '-.05em',
          lineHeight: '120%',
          textAlign: 'center',
        }}
        className="text-4xl md:text-[64px] mb-12 text-foreground"
      >
        Only real numbers here
      </h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="font-serif text-6xl font-extrabold md:text-7xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
