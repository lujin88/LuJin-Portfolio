'use client'

import { useLayoutEffect } from 'react'

type HtmlThemeProps = {
  className: 'dark' | 'light'
  colorScheme: 'dark' | 'light'
  backgroundColor?: string
}

export function HtmlTheme({ className, colorScheme, backgroundColor }: HtmlThemeProps) {
  useLayoutEffect(() => {
    const html = document.documentElement
    const previousBackground = html.style.backgroundColor
    const previousScheme = html.style.colorScheme
    html.classList.remove('dark', 'light')
    html.classList.add(className)
    html.style.colorScheme = colorScheme
    if (backgroundColor) html.style.backgroundColor = backgroundColor
    return () => {
      html.classList.remove(className)
      html.style.colorScheme = previousScheme
      html.style.backgroundColor = previousBackground
    }
  }, [className, colorScheme, backgroundColor])

  return null
}
