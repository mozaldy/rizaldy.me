
"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    // set initial
    setMatches(mql.matches)
    // modern event
    mql.addEventListener?.("change", onChange)
    // legacy fallback
    mql.addListener?.(onChange)
    return () => {
      mql.removeEventListener?.("change", onChange)
      mql.removeListener?.(onChange)
    }
  }, [query])

  return matches
}
