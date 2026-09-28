'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown, Menu, X } from 'lucide-react'
import { headerCopy } from '../lib/header-copy'
import { LANGUAGES, useSiteLanguage } from '../lib/language'
import { cn } from '../lib/utils'

type NavLink = {
  label: string
  href: string
}

type NavGroup = {
  label: string
  /** Section root used for the active state when no child route matches. */
  sectionHref?: string
  children: readonly NavLink[]
}

type NavEntry = ({ kind: 'link' } & NavLink) | ({ kind: 'group' } & NavGroup)

const NAV: readonly NavEntry[] = [
  {
    kind: 'group',
    label: 'Project',
    children: [
      { label: 'Client Advisory', href: '/client-advisory' },
      { label: 'Eon', href: '/EON' },
    ],
  },
  {
    kind: 'group',
    label: 'Lab',
    sectionHref: '/lab',
    children: [
      { label: 'Way of Work', href: '/lab/way-of-work' },
      { label: 'Off We Go Workbench', href: '/lab/off-we-go' },
      { label: 'Party Planner', href: '/lab/party-planner' },
    ],
  },
  { kind: 'link', label: 'About', href: '/about' },
]

const FOCUS_RING =
  'focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current'
const MOTION_SAFE = 'motion-reduce:transition-none motion-reduce:animate-none'
const PLAIN_CONTROL =
  'appearance-none border-0 bg-transparent shadow-none outline-none focus:outline-none focus:ring-0'

const MENU_PANEL = cn(
  'm-0 flex list-none flex-col gap-1 rounded-[22px] border border-header-line/40 bg-header-menu p-2 shadow-[0_18px_48px_-12px_rgba(0,0,0,0.65)]',
)

type SiteHeaderProps = {
  activeHref?: string
}

function hrefMatches(href: string, currentHref: string, pathname: string) {
  const candidates = [currentHref, pathname]
  if (candidates.includes(href)) return true
  if (href === '/client-advisory' && candidates.includes('/client-advisor')) return true
  if (href === '/EON' && candidates.includes('/eon-solar')) return true
  return false
}

function groupIsActive(group: NavGroup, currentHref: string, pathname: string) {
  if (group.children.some((child) => hrefMatches(child.href, currentHref, pathname))) return true
  if (!group.sectionHref) return false
  if (currentHref === group.sectionHref || pathname === group.sectionHref) return true
  return pathname.startsWith(`${group.sectionHref}/`)
}

function navLabel(copy: (typeof headerCopy)[keyof typeof headerCopy], label: string) {
  return copy.nav[label as keyof typeof copy.nav] ?? label
}

export function SiteHeader({ activeHref }: SiteHeaderProps) {
  const pathname = usePathname()
  const currentHref = activeHref ?? pathname
  const cinematicHeader =
    pathname.startsWith('/lab/way-of-work') ||
    pathname.startsWith('/lab/off-we-go') ||
    pathname.startsWith('/lab/party-planner')
  const partyHeader = pathname.startsWith('/lab/party-planner')
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [langOpen, setLangOpen] = useState(false)
  const [glassActive, setGlassActive] = useState(false)
  const { language, setLanguage } = useSiteLanguage()
  const copy = headerCopy[language.code]
  const [pinnedMenu, setPinnedMenu] = useState<string | null>(null)
  const [hoverMenu, setHoverMenu] = useState<string | null>(null)
  const openMenu = pinnedMenu ?? hoverMenu
  const langRootRef = useRef<HTMLDivElement>(null)
  const langTriggerRef = useRef<HTMLButtonElement>(null)
  const langOptionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const desktopNavRef = useRef<HTMLElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const closeTimer = useRef<number | null>(null)
  const suppressHover = useRef<string | null>(null)
  const langMenuId = useId()

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const dismissMenus = () => {
    clearCloseTimer()
    setPinnedMenu(null)
    setHoverMenu(null)
  }

  useEffect(() => {
    const onScroll = () => setGlassActive(cinematicHeader || window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [cinematicHeader])

  useEffect(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setPinnedMenu(null)
    setHoverMenu(null)
    setMenuOpen(false)
    setMobileSection(null)
  }, [pathname])

  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    }
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

  useEffect(() => {
    if (!openMenu) return
    const onPointerDown = (event: PointerEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) dismissMenus()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const trigger = triggerRefs.current[openMenu]
      dismissMenus()
      trigger?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openMenu])

  const selectLanguage = (lang: (typeof LANGUAGES)[number]) => {
    setLanguage(lang)
    setLangOpen(false)
    langTriggerRef.current?.focus()
  }

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      dismissMenus()
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

  const pinMenu = (id: string) => {
    clearCloseTimer()
    setLangOpen(false)
    suppressHover.current = null
    setHoverMenu(null)
    setPinnedMenu(id)
  }

  const hoverOpen = (id: string) => {
    if (suppressHover.current === id) return
    clearCloseTimer()
    setLangOpen(false)
    setPinnedMenu((current) => (current !== null && current !== id ? null : current))
    setHoverMenu(id)
  }

  const hoverLeave = (id: string) => {
    if (suppressHover.current === id) suppressHover.current = null
    clearCloseTimer()
    closeTimer.current = window.setTimeout(() => {
      setHoverMenu((current) => (current === id ? null : current))
    }, 120)
  }

  const togglePinned = (id: string) => {
    clearCloseTimer()
    setLangOpen(false)
    setPinnedMenu((current) => {
      if (current === id) {
        suppressHover.current = id
        setHoverMenu((hover) => (hover === id ? null : hover))
        return null
      }
      suppressHover.current = null
      return id
    })
  }

  const openMobile = () => {
    setMenuOpen((open) => {
      const next = !open
      if (next) {
        const activeGroup = NAV.find(
          (item): item is { kind: 'group' } & NavGroup =>
            item.kind === 'group' && groupIsActive(item, currentHref, pathname),
        )
        setMobileSection(activeGroup?.label ?? null)
      }
      return next
    })
  }

  return (
    <header
      data-site-header=""
      data-header-tone={partyHeader ? 'party' : undefined}
      className="fixed top-0 right-0 left-0 z-[100] isolate font-sans text-header-foreground [font-family:var(--font-poppins),Poppins,ui-sans-serif,system-ui,sans-serif] [&_a]:no-underline [&_li]:list-none [&_ul]:list-none"
    >
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
          'pointer-events-none absolute inset-x-0 top-0 h-[160%] border-b border-white/5 bg-header-glass/80 backdrop-blur-lg transition-opacity duration-500 ease-out md:backdrop-blur-xl',
          MOTION_SAFE,
          '[mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)]',
          glassActive ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div className="relative mx-auto flex h-20 max-w-[1800px] items-center justify-between px-6 md:h-24 md:px-12 lg:px-20 xl:px-28">
        <Link
          href="/index"
          className={cn(
            'inline-flex items-center rounded-sm no-underline transition-opacity hover:opacity-80',
            FOCUS_RING,
            MOTION_SAFE,
          )}
        >
          <img
            src="/assets/images/brand/lu-logo.png"
            alt="Lu"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
        </Link>

        <nav
          ref={desktopNavRef}
          aria-label={copy.mainNav}
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <ul className="m-0 flex list-none items-center gap-8 p-0 lg:gap-12">
            {NAV.map((item) => {
              if (item.kind === 'link') {
                const isActive = hrefMatches(item.href, currentHref, pathname)
                return (
                  <li key={item.href} className="list-none">
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={dismissMenus}
                      className={cn(
                        'rounded-sm text-[1.0625rem] leading-none no-underline transition-colors duration-200',
                        FOCUS_RING,
                        MOTION_SAFE,
                        isActive
                          ? 'text-header-foreground'
                          : 'text-header-foreground/72 hover:text-header-foreground',
                      )}
                    >
                      {navLabel(copy, item.label)}
                    </Link>
                  </li>
                )
              }

              const isOpen = openMenu === item.label
              const isActive = groupIsActive(item, currentHref, pathname)
              return (
                <NavDropdown
                  key={item.label}
                  group={item}
                  copy={copy}
                  open={isOpen}
                  active={isActive}
                  currentHref={currentHref}
                  pathname={pathname}
                  triggerRef={(node) => {
                    triggerRefs.current[item.label] = node
                  }}
                  onHoverOpen={() => hoverOpen(item.label)}
                  onHoverLeave={() => hoverLeave(item.label)}
                  onToggle={() => togglePinned(item.label)}
                  onPin={() => pinMenu(item.label)}
                  onDismiss={dismissMenus}
                />
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
              aria-label={copy.languageAria(language.label)}
              suppressHydrationWarning
              onClick={() => {
                dismissMenus()
                setLangOpen((open) => !open)
              }}
              onKeyDown={onTriggerKeyDown}
              className={cn(
                'flex items-center gap-1.5 rounded-sm text-[1.0625rem] leading-none text-header-foreground/72 transition-colors duration-200 hover:text-header-foreground focus-visible:text-header-foreground',
                PLAIN_CONTROL,
                FOCUS_RING,
                MOTION_SAFE,
              )}
            >
              <span suppressHydrationWarning>{language.label}</span>
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
                aria-label={copy.selectLanguage}
                className={cn(
                  MENU_PANEL,
                  'absolute right-0 top-full z-10 mt-4 w-60 max-w-[calc(100vw-3rem)] origin-top-right',
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
                          PLAIN_CONTROL,
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
              'rounded-full border border-header-line px-6 py-3 text-[1.0625rem] leading-none text-header-foreground no-underline transition-colors duration-200 hover:border-header-foreground/70 hover:bg-header-foreground/6 md:px-7 md:py-3.5',
              FOCUS_RING,
              MOTION_SAFE,
            )}
          >
            {copy.contactMe}
          </a>

          <button
            type="button"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={openMobile}
            className={cn(
              '-mr-2 flex size-10 items-center justify-center rounded-sm text-header-foreground lg:hidden',
              PLAIN_CONTROL,
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
        inert={!menuOpen ? true : undefined}
        aria-hidden={!menuOpen}
        className={cn(
          'relative overflow-hidden bg-header-scrim transition-[max-height,opacity] duration-300 motion-reduce:transition-none lg:hidden',
          menuOpen
            ? 'max-h-[calc(100dvh-5rem)] overflow-y-auto opacity-100 md:max-h-[calc(100dvh-6rem)]'
            : 'max-h-0 opacity-0',
        )}
      >
        <nav aria-label={copy.mobileNav} className="flex flex-col gap-6 px-6 pb-8 pt-2">
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {NAV.map((item) => {
              if (item.kind === 'link') {
                const isActive = hrefMatches(item.href, currentHref, pathname)
                return (
                  <li key={item.href} className="list-none">
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'rounded-sm text-lg no-underline transition-colors',
                        FOCUS_RING,
                        MOTION_SAFE,
                        isActive ? 'text-header-foreground' : 'text-header-foreground/72',
                      )}
                    >
                      {navLabel(copy, item.label)}
                    </Link>
                  </li>
                )
              }

              const expanded = mobileSection === item.label
              const isActive = groupIsActive(item, currentHref, pathname)
              const panelId = `mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() =>
                      setMobileSection((current) => (current === item.label ? null : item.label))
                    }
                    className={cn(
                      'flex w-full items-center justify-between rounded-sm text-lg transition-colors',
                      PLAIN_CONTROL,
                      FOCUS_RING,
                      MOTION_SAFE,
                      isActive || expanded ? 'text-header-foreground' : 'text-header-foreground/72',
                    )}
                  >
                    {navLabel(copy, item.label)}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        'size-4 transition-transform duration-300 ease-out',
                        MOTION_SAFE,
                        expanded && 'rotate-180',
                      )}
                      strokeWidth={1.75}
                    />
                  </button>
                  <div
                    id={panelId}
                    className={cn(
                      'grid transition-[grid-template-rows] duration-300 ease-out',
                      MOTION_SAFE,
                      expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className={cn(MENU_PANEL, 'mt-3')} role="list">
                        {item.children.map((child) => {
                          const uniqueHref =
                            item.children.filter((entry) => entry.href === child.href).length === 1
                          const childActive =
                            uniqueHref && hrefMatches(child.href, currentHref, pathname)
                          return (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                aria-current={childActive ? 'page' : undefined}
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                  'flex w-full items-center rounded-2xl px-5 py-4 text-left text-[1.0625rem] leading-none no-underline transition-colors duration-150',
                                  FOCUS_RING,
                                  MOTION_SAFE,
                                  'hover:bg-header-menu-item focus-visible:bg-header-menu-item',
                                  childActive
                                    ? 'font-semibold text-header-foreground'
                                    : 'text-header-foreground/80 hover:text-header-foreground focus-visible:text-header-foreground',
                                )}
                              >
                                {navLabel(copy, child.label)}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
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
                  'appearance-none bg-transparent shadow-none outline-none transition-colors focus:outline-none focus:ring-0',
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

function NavDropdown({
  group,
  copy,
  open,
  active,
  currentHref,
  pathname,
  triggerRef,
  onHoverOpen,
  onHoverLeave,
  onToggle,
  onPin,
  onDismiss,
}: {
  group: NavGroup
  copy: (typeof headerCopy)[keyof typeof headerCopy]
  open: boolean
  active: boolean
  currentHref: string
  pathname: string
  triggerRef: (node: HTMLButtonElement | null) => void
  onHoverOpen: () => void
  onHoverLeave: () => void
  onToggle: () => void
  onPin: () => void
  onDismiss: () => void
}) {
  const menuId = useId()
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const pendingFocus = useRef<number | null>(null)

  useEffect(() => {
    if (!open || pendingFocus.current === null) return
    const index = pendingFocus.current
    pendingFocus.current = null
    itemRefs.current[index]?.focus()
  }, [open])

  const onButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const index = event.key === 'ArrowUp' ? group.children.length - 1 : 0
    if (!open) pendingFocus.current = index
    onPin()
    if (open) itemRefs.current[index]?.focus()
  }

  const onItemKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const last = group.children.length - 1
    let next: number | null = null
    if (event.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else if (event.key === 'Tab') {
      onDismiss()
      return
    }
    if (next !== null) {
      event.preventDefault()
      itemRefs.current[next]?.focus()
    }
  }

  return (
    <li
      className="relative list-none"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') onHoverOpen()
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') onHoverLeave()
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-current={active ? 'true' : undefined}
        onClick={(event) => {
          if (event.detail === 0 && !open) pendingFocus.current = 0
          onToggle()
        }}
        onKeyDown={onButtonKeyDown}
        className={cn(
          'flex items-center gap-1.5 rounded-sm text-[1.0625rem] leading-none transition-colors duration-200',
          PLAIN_CONTROL,
          FOCUS_RING,
          MOTION_SAFE,
          active || open
            ? 'text-header-foreground'
            : 'text-header-foreground/72 hover:text-header-foreground',
        )}
      >
        {navLabel(copy, group.label)}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-3.5 transition-transform duration-300 ease-out',
            MOTION_SAFE,
            open && 'rotate-180',
          )}
          strokeWidth={1.75}
        />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3">
          <ul
            id={menuId}
            role="menu"
            aria-label={navLabel(copy, group.label)}
            className={cn(
              MENU_PANEL,
              'w-max min-w-56 max-w-[calc(100vw-3rem)] origin-top',
              'animate-in fade-in-0 zoom-in-[0.98] slide-in-from-top-1 duration-150 ease-out',
              MOTION_SAFE,
            )}
          >
            {group.children.map((child, index) => {
              const uniqueHref =
                group.children.filter((entry) => entry.href === child.href).length === 1
              const childActive =
                uniqueHref && hrefMatches(child.href, currentHref, pathname)
              return (
                <li key={child.label} role="none">
                  <Link
                    ref={(node) => {
                      itemRefs.current[index] = node
                    }}
                    href={child.href}
                    role="menuitem"
                    aria-current={childActive ? 'page' : undefined}
                    onClick={() => {
                      // Do not unmount this Link before Next.js handles the click.
                      // Closing the menu here removes the <a> and the navigation never starts.
                      if (hrefMatches(child.href, currentHref, pathname)) onDismiss()
                    }}
                    onKeyDown={(event) => onItemKeyDown(event, index)}
                    className={cn(
                      'flex w-full items-center whitespace-nowrap rounded-2xl px-5 py-4 text-left text-[1.0625rem] leading-none no-underline transition-colors duration-150',
                      FOCUS_RING,
                      MOTION_SAFE,
                      'hover:bg-header-menu-item focus-visible:bg-header-menu-item',
                      childActive
                        ? 'font-semibold text-header-foreground'
                        : 'text-header-foreground/80 hover:text-header-foreground focus-visible:text-header-foreground',
                    )}
                  >
                    {navLabel(copy, child.label)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </li>
  )
}
