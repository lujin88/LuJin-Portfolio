'use client'

import { useLayoutEffect } from 'react'

type HtmlThemeProps = {
  className: 'dark' | 'light'
  colorScheme: 'dark' | 'light'
}

export function HtmlTheme({ className, colorScheme }: HtmlThemeProps) {
  useLayoutEffect(() => {
    const html = document.documentElement
    html.classList.remove('dark', 'light')
    html.classList.add(className)
    html.style.colorScheme = colorScheme
    return () => {
      html.classList.remove(className)
    }
  }, [className, colorScheme])

  return null
}
