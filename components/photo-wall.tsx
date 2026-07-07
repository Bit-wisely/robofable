'use client'

import { useState } from 'react'
import Image from 'next/image'
import { WALL_PHOTOS } from '@/lib/data'
import { cn } from '@/lib/utils'

/** A wall of photos that parts open as the cursor moves across it. The
 * hovered photo expands while its neighbors slide aside. */
export function PhotoWall() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div>
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Moving cursor
        </p>
        <h3 className="mt-2 font-serif text-3xl font-bold md:text-4xl text-balance">
          Hover the photos wall
        </h3>
        <p className="mt-2 text-muted-foreground text-pretty">
          Move your cursor to part the photography wall and highlight a moment.
        </p>
      </div>

      {/* Desktop: expanding strip wall */}
      <div
        className="hidden h-[420px] gap-2 md:flex"
        onMouseLeave={() => setActive(null)}
      >
        {WALL_PHOTOS.map((photo, i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={cn(
              'relative min-w-0 overflow-hidden rounded-2xl transition-[flex-grow] duration-500 ease-out',
              active === i ? 'flex-[4]' : 'flex-1',
            )}
            aria-label={photo.alt}
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className={cn(
                'object-cover transition-all duration-500',
                active !== null && active !== i && 'brightness-[0.55] saturate-50',
              )}
            />
          </button>
        ))}
      </div>

      {/* Mobile: swipeable strip */}
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:hidden">
        {WALL_PHOTOS.slice(0, 6).map((photo, i) => (
          <div
            key={i}
            className="relative h-64 w-[75%] shrink-0 snap-center overflow-hidden rounded-2xl"
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              fill
              sizes="75vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
