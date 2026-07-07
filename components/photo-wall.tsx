'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { WALL_PHOTOS } from '@/lib/data'
import { cn } from '@/lib/utils'

/** A wall of photos that parts open as the cursor moves across it. The
 * hovered photo expands while its neighbors slide aside. */
export function PhotoWall() {
  const [active, setActive] = useState<number | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % WALL_PHOTOS.length)
    }
  }

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + WALL_PHOTOS.length) % WALL_PHOTOS.length)
    }
  }

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
          Move your cursor to part the photography wall and highlight a moment. Click any photo to expand.
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
            onClick={() => setSelectedPhoto(i)}
            className={cn(
              'relative min-w-0 overflow-hidden rounded-2xl transition-[flex-grow] duration-500 ease-out cursor-pointer',
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
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:hidden">
        {WALL_PHOTOS.slice(0, 6).map((photo, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedPhoto(i)}
            className="relative h-64 w-[75%] shrink-0 snap-center overflow-hidden rounded-2xl text-left"
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              fill
              sizes="75vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox / Slide Window Overlay */}
      {selectedPhoto !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Close window"
          >
            <X className="size-6" />
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={showPrev}
            className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-8"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Image Container with design matching the purple-blush background aesthetic */}
          <div 
            className="relative max-h-[80vh] max-w-[85vw] w-[800px] aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 bg-plum/45 shadow-[0_0_50px_rgba(139,123,216,0.15)] transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={WALL_PHOTOS[selectedPhoto].src || "/placeholder.svg"}
              alt={WALL_PHOTOS[selectedPhoto].alt}
              fill
              priority
              className="object-contain p-2"
            />
            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
              <p className="text-sm font-medium tracking-wide md:text-base">
                {WALL_PHOTOS[selectedPhoto].alt}
              </p>
              <p className="mt-1 text-xs opacity-75">
                Photo {selectedPhoto + 1} of {WALL_PHOTOS.length}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-8"
            aria-label="Next photo"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </div>
  )
}
