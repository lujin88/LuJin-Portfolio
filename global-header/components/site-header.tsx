'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'

const NAV_ITEMS = [
  { label: 'Client Advisory', href: '/client-advisory' },
  { label: 'Eon Solar', href: '/EON' },
  { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
] as const

const FOCUS_RING =
  'focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current'
const MOTION_SAFE = 'motion-reduce:transition-none motion-reduce:animate-none'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
] as const

type SiteHeaderProps = {
  activeHref?: string
}

export function SiteHeader({ activeHref }: SiteHeaderProps) {
  const pathname = usePathname()
  const currentHref = activeHref ?? pathname
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [glassActive, setGlassActive] = useState(false)
  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>(LANGUAGES[0])
  const langRootRef = useRef<HTMLDivElement>(null)
  const langTriggerRef = useRef<HTMLButtonElement>(null)
  const langOptionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const langMenuId = useId()

  useEffect(() => {
    const onScroll = () => setGlassActive(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!langOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!langRootRef.current?.contains(event.target as Node)) setLangOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangOpen(false)
        langTriggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    const selectedIndex = LANGUAGES.findIndex((lang) => lang.code === language.code)
    langOptionRefs.current[selectedIndex]?.focus()
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [langOpen, language.code])

  const selectLanguage = (lang: (typeof LANGUAGES)[number]) => {
    setLanguage(lang)
    setLangOpen(false)
    langTriggerRef.current?.focus()
  }

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setLangOpen(true)
    }
  }

  const onOptionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = LANGUAGES.length - 1
    let next: number | null = null
    if (event.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else if (event.key === 'Tab') {
      setLangOpen(false)
      return
    }
    if (next !== null) {
      event.preventDefault()
      langOptionRefs.current[next]?.focus()
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 font-sans text-header-foreground [font-family:var(--font-poppins),Poppins,ui-sans-serif,system-ui,sans-serif]">
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-[220%] bg-gradient-to-b from-header-scrim/70 via-header-scrim/35 to-transparent transition-opacity duration-500 ease-out',
          MOTION_SAFE,
          glassActive ? 'opacity-0' : 'opacity-100',
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-[160%] bg-header-glass/80 backdrop-blur-lg transition-opacity duration-500 ease-out md:backdrop-blur-xl',
          MOTION_SAFE,
          '[mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)]',
          glassActive ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div className="relative mx-auto flex h-20 max-w-[1800px] items-center justify-between px-6 md:h-24 md:px-12 lg:px-20 xl:px-28">
        <Link
          href="/index"
          className={cn(
            'rounded-sm text-[1.75rem] font-semibold leading-none tracking-tight text-header-foreground transition-opacity hover:opacity-80',
            FOCUS_RING,
            MOTION_SAFE,
          )}
        >
          Lu
        </Link>

        <nav aria-label="主导航" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="flex items-center gap-8 lg:gap-12">
            {NAV_ITEMS.map((item) => {
              const isActive = currentHref === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'rounded-sm text-[1.0625rem] leading-none transition-colors duration-200',
                      FOCUS_RING,
                      MOTION_SAFE,
                      isActive
                        ? 'text-header-foreground'
                        : 'text-header-foreground/72 hover:text-header-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-5 lg:gap-7">
          <div ref={langRootRef} className="relative hidden md:block">
            <button
              ref={langTriggerRef}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-controls={langOpen ? langMenuId : undefined}
              aria-label={`语言：${language.label}`}
              onClick={() => setLangOpen((open) => !open)}
              onKeyDown={onTriggerKeyDown}
              className={cn(
                'flex items-center gap-1.5 rounded-sm text-[1.0625rem] leading-none text-header-foreground/72 transition-colors duration-200 hover:text-header-foreground focus-visible:text-header-foreground',
                FOCUS_RING,
                MOTION_SAFE,
              )}
            >
              {language.label}
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  'size-3.5 transition-transform duration-300 ease-out',
                  MOTION_SAFE,
                  langOpen && 'rotate-180',
                )}
                strokeWidth={1.75}
              />
            </button>
            {langOpen && (
              <ul
                id={langMenuId}
                role="listbox"
                aria-label="选择语言"
                className={cn(
                  'absolute right-0 top-full z-10 mt-4 flex w-60 max-w-[calc(100vw-3rem)] origin-top-right flex-col gap-1 rounded-[22px] border border-header-line/40 bg-header-menu p-2 shadow-[0_18px_48px_-12px_rgba(0,0,0,0.65)]',
                  'animate-in fade-in-0 zoom-in-[0.98] slide-in-from-top-1 duration-150 ease-out',
                  MOTION_SAFE,
                )}
              >
                {LANGUAGES.map((lang, index) => {
                  const isSelected = lang.code === language.code
                  return (
                    <li key={lang.code}>
                      <button
                        ref={(node) => {
                          langOptionRefs.current[index] = node
                        }}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={isSelected ? 0 : -1}
                        onClick={() => selectLanguage(lang)}
                        onKeyDown={(event) => onOptionKeyDown(event, index)}
                        className={cn(
                          'group flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left text-[1.0625rem] leading-none transition-colors duration-150',
                          FOCUS_RING,
                          MOTION_SAFE,
                          'hover:bg-header-menu-item focus-visible:bg-header-menu-item',
                          isSelected
                            ? 'font-semibold text-header-foreground'
                            : 'text-header-foreground/80 hover:text-header-foreground focus-visible:text-header-foreground',
                        )}
                      >
                        {lang.label}
                        {isSelected && (
                          <Check
                            aria-hidden="true"
                            className={cn(
                              'size-[18px] shrink-0 text-header-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100',
                              MOTION_SAFE,
                            )}
                            strokeWidth={2.5}
                          />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <a
            href="mailto:lu.jin.ixd@gmail.com"
            className={cn(
              'rounded-full border border-header-line px-6 py-3 text-[1.0625rem] leading-none text-header-foreground transition-colors duration-200 hover:border-header-foreground/70 hover:bg-header-foreground/6 md:px-7 md:py-3.5',
              FOCUS_RING,
              MOTION_SAFE,
            )}
          >
            Contact me
          </a>

          <button
            type="button"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              '-mr-2 flex size-10 items-center justify-center rounded-sm text-header-foreground md:hidden',
              FOCUS_RING,
            )}
          >
            {menuOpen ? (
              <X className="size-6" strokeWidth={1.5} />
            ) : (
              <Menu className="size-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          'relative overflow-hidden bg-header-scrim/95 transition-[max-height,opacity] duration-300 motion-reduce:transition-none md:hidden',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav aria-label="移动端导航" className="flex flex-col gap-6 px-6 pb-8 pt-2">
          <ul className="flex flex-col gap-5">
            {NAV_ITEMS.map((item) => {
              const isActive = currentHref === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'rounded-sm text-lg transition-colors',
                      FOCUS_RING,
                      MOTION_SAFE,
                      isActive ? 'text-header-foreground' : 'text-header-foreground/72',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="flex items-center gap-2 border-t border-header-line pt-5 text-sm">
            {LANGUAGES.map((lang, index) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang)}
                className={cn(
                  'rounded-sm transition-colors',
                  FOCUS_RING,
                  MOTION_SAFE,
                  lang.code === language.code
                    ? 'text-header-foreground'
                    : 'text-header-foreground/60',
                  index > 0 && 'border-l border-header-line pl-2',
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
