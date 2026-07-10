'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Background slowly zooms while pinned
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  // Wordmark grows and fades as the next section slides over
  const titleScale = useTransform(scrollYProgress, [0, 0.9], [1, 1.6])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 1, 0])
  const subOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const subY = useTransform(scrollYProgress, [0, 0.4], [0, -40])

  return (
    <div ref={ref} className="relative h-[180svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 bg-black">
          <video
            src="/bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-80"
          />
        </motion.div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <motion.div
            style={{ scale: titleScale, opacity: titleOpacity }}
            className="flex w-full max-w-6xl flex-col text-white px-2"
          >
            <div className="w-full">
              <div className="flex items-end justify-between mb-1 md:mb-3">
                <motion.p
                  style={{ opacity: subOpacity, y: subY }}
                  className="text-base font-sans font-semibold tracking-widest text-white/90 md:text-2xl"
                >
                  welcome to
                </motion.p>
                <motion.span
                  style={{ opacity: subOpacity, y: subY }}
                  className="text-base font-sans font-semibold tracking-widest text-white/90 md:text-2xl"
                >
                  club
                </motion.span>
              </div>
              <h1 className="font-black-ops-one text-[23.4vw] font-bold leading-[0.85] tracking-tight drop-shadow-lg md:text-[17.2vw] text-center w-full">
                Robotics
              </h1>
            </div>
            <motion.p
              style={{ opacity: subOpacity, y: subY }}
              className="mt-6 text-center text-sm font-medium leading-snug drop-shadow md:text-right md:text-2xl text-pretty md:self-end md:pr-1"
            >
              We build the engineers
              <br />
              behind tomorrow&apos;s machines.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: subOpacity }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/90"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        </motion.div>
      </div>
    </div>
  )
}
