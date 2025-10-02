
"use client"

import { useEffect } from "react"
import { useLenis } from "lenis/react"

export function LenisControl() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const apply = () => {
      const locked = document.documentElement.classList.contains("intro")
      if (locked) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }

    // initial sync and observe changes to the html classList
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [lenis])

  return null
}
