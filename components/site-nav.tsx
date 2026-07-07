'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { InstagramIcon } from '@/components/instagram-icon'
import { NAV_LINKS, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/lib/data'
import { cn } from '@/lib/utils'

type SiteNavProps = {
  /** When true, the nav starts with light (white) text over a dark hero and
   * switches to dark text after scrolling past the hero. */
  lightHero?: boolean
  onJoinClick?: () => void
}

export function SiteNav({ lightHero = false, onJoinClick }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Switch once the viewport has left the hero (roughly 85% of viewport height)
      setScrolled(window.scrollY > window.innerHeight * 0.85)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLight = lightHero && !scrolled && !menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled && !menuOpen ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4 transition-colors duration-300',
          isLight ? 'text-white' : 'text-foreground',
        )}
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Robotics Club UCE logo"
            width={140}
            height={52}
            priority
            className={cn('h-10 w-auto md:h-12 transition-all duration-300', !isLight && 'invert')}
          />
          <span className="sr-only">Robotics Club UCE home</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium opacity-90 transition-opacity hover:opacity-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              isLight
                ? 'border-white/40 hover:bg-white/10'
                : 'border-foreground/20 hover:bg-foreground/5',
            )}
          >
            <InstagramIcon className="size-4" />
            {INSTAGRAM_HANDLE}
          </a>
          <JoinButton isLight={isLight} onJoinClick={onJoinClick} closeMenu={() => setMenuOpen(false)} />
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background px-4 pb-8 pt-4 text-foreground lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-lg font-serif font-semibold hover:bg-foreground/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-4 py-3 text-sm font-medium"
            >
              <InstagramIcon className="size-4" />
              {INSTAGRAM_HANDLE}
            </a>
            <JoinButton isLight={false} onJoinClick={onJoinClick} closeMenu={() => setMenuOpen(false)} full />
          </div>
        </div>
      )}
    </header>
  )
}

function JoinButton({
  isLight,
  onJoinClick,
  closeMenu,
  full = false,
}: {
  isLight: boolean
  onJoinClick?: () => void
  closeMenu: () => void
  full?: boolean
}) {
  const className = cn(
    'rounded-full px-5 py-2.5 text-sm font-semibold transition-colors text-center',
    isLight
      ? 'bg-white text-foreground hover:bg-white/90'
      : 'bg-primary text-primary-foreground hover:bg-primary/90',
    full && 'w-full py-3',
  )

  if (onJoinClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          closeMenu()
          onJoinClick()
        }}
      >
        Join club
      </button>
    )
  }

  return (
    <Link href="/#membership" className={className} onClick={closeMenu}>
      Join club
    </Link>
  )
}
