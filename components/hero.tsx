'use client'

import { useRef } from 'react'
import Image from 'next/image'
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
        <motion.div style={{ scale: bgScale }} className="absolute inset-0">
          <Image
            src="/images/hero-sky.png"
            alt="Dreamy purple sky with a robotics laboratory on a distant hilltop"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <motion.div
            style={{ scale: titleScale, opacity: titleOpacity }}
            className="flex w-full max-w-6xl flex-col items-center text-center text-white"
          >
            <motion.p
              style={{ opacity: subOpacity, y: subY }}
              className="mb-2 text-lg font-medium drop-shadow md:mb-4 md:text-2xl"
            >
              Welcome to
            </motion.p>
            <h1 className="relative font-sans text-[15vw] font-extrabold leading-[0.9] tracking-tight drop-shadow-lg md:text-[11vw]">
              Robotics
              <span className="block text-xl font-sans font-semibold tracking-widest mt-2 uppercase text-white/95 md:text-3xl">
                Club
              </span>
            </h1>
            <motion.p
              style={{ opacity: subOpacity, y: subY }}
              className="mt-6 text-lg font-medium leading-snug drop-shadow md:text-2xl text-pretty"
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
