"use client"

import { useEffect, useRef, useState } from "react"

export default function SmoothFollower() {
    const mousePosition = useRef({ x: 0, y: 0 })
    const dotPosition = useRef({ x: 0, y: 0 })
    const borderDotPosition = useRef({ x: 0, y: 0 })

    // Direct DOM refs for performance (no React re-renders)
    const dotRef = useRef<HTMLDivElement>(null)
    const borderRef = useRef<HTMLDivElement>(null)

    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const DOT_SMOOTHNESS = 0.2
    const BORDER_DOT_SMOOTHNESS = 0.1

    useEffect(() => {
        let animationId: number

        const handleMouseMove = (e: MouseEvent) => {
            mousePosition.current = { x: e.clientX, y: e.clientY }
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseEnter = () => setIsHovering(true)
        const handleMouseLeave = () => setIsHovering(false)

        // Add event listeners
        window.addEventListener("mousemove", handleMouseMove)

        const interactiveElements = document.querySelectorAll("a, button, img, input, textarea, select")
        interactiveElements.forEach((element) => {
            element.addEventListener("mouseenter", handleMouseEnter)
            element.addEventListener("mouseleave", handleMouseLeave)
        })

        // Animation function - directly manipulates DOM, no setState
        const animate = () => {
            const lerp = (start: number, end: number, factor: number) => {
                return start + (end - start) * factor
            }

            dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, DOT_SMOOTHNESS)
            dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, DOT_SMOOTHNESS)

            borderDotPosition.current.x = lerp(borderDotPosition.current.x, mousePosition.current.x, BORDER_DOT_SMOOTHNESS)
            borderDotPosition.current.y = lerp(borderDotPosition.current.y, mousePosition.current.y, BORDER_DOT_SMOOTHNESS)

            // Direct DOM manipulation instead of setState (huge performance gain)
            if (dotRef.current) {
                dotRef.current.style.left = `${dotPosition.current.x}px`
                dotRef.current.style.top = `${dotPosition.current.y}px`
            }

            if (borderRef.current) {
                borderRef.current.style.left = `${borderDotPosition.current.x}px`
                borderRef.current.style.top = `${borderDotPosition.current.y}px`
            }

            animationId = requestAnimationFrame(animate)
        }

        // Start animation loop
        animationId = requestAnimationFrame(animate)

        // Clean up
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)

            interactiveElements.forEach((element) => {
                element.removeEventListener("mouseenter", handleMouseEnter)
                element.removeEventListener("mouseleave", handleMouseLeave)
            })

            cancelAnimationFrame(animationId)
        }
    }, [isVisible])

    // Handle SSR - only render after mounting on client
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            {/* Dot cursor */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed rounded-full bg-white"
                style={{
                    width: "8px",
                    height: "8px",
                    transform: "translate(-50%, -50%)",
                    left: 0,
                    top: 0,
                    zIndex: 9999,
                    mixBlendMode: "difference",
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.3s",
                }}
            />

            {/* Border ring cursor */}
            <div
                ref={borderRef}
                className="pointer-events-none fixed rounded-full border-2 border-white"
                style={{
                    width: isHovering ? "44px" : "28px",
                    height: isHovering ? "44px" : "28px",
                    transform: "translate(-50%, -50%)",
                    left: 0,
                    top: 0,
                    zIndex: 9999,
                    mixBlendMode: "difference",
                    opacity: isVisible ? 1 : 0,
                    transition: "width 0.3s, height 0.3s, opacity 0.3s",
                }}
            />
        </>
    )
}
