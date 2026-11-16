'use client'

import { useEffect } from 'react'

const SCROLL_KEYS = new Set([
	'ArrowUp',
	'ArrowDown',
	'PageUp',
	'PageDown',
	'Home',
	'End',
	' ',
	'Escape'
])

export function SectionNavigation() {
	useEffect(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
		let frame = 0

		const cancelScroll = () => {
			window.cancelAnimationFrame(frame)
			frame = 0
		}

		const cancelOnKey = (event: KeyboardEvent) => {
			if (SCROLL_KEYS.has(event.key)) cancelScroll()
		}

		const navigate = (event: MouseEvent) => {
			if (
				event.defaultPrevented ||
				event.button !== 0 ||
				event.altKey ||
				event.ctrlKey ||
				event.metaKey ||
				event.shiftKey
			)
				return
			if (!(event.target instanceof Element)) return

			const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]')
			if (!link || link.target || link.hasAttribute('download')) return

			const hash = link.getAttribute('href') ?? ''
			const section = document.getElementById(hash.slice(1))
			if (!section?.hasAttribute('data-header-theme')) return

			cancelScroll()
			if (motion.matches) return

			const root = document.documentElement
			const offset = Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 0
			const start = window.scrollY
			const end = Math.max(
				0,
				Math.min(
					section.getBoundingClientRect().top + start - offset,
					root.scrollHeight - window.innerHeight
				)
			)
			const distance = end - start
			if (Math.abs(distance) < 4) return

			event.preventDefault()
			if (window.location.hash !== hash) window.history.pushState(null, '', hash)

			const heading = section.querySelector<HTMLElement>('h1, h2') ?? section
			if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1
			heading.focus({ preventScroll: true })

			const duration = Math.min(1900, 800 + Math.abs(distance) * 0.27)
			const started = performance.now()
			const step = (now: number) => {
				const progress = Math.min(1, (now - started) / duration)
				// Smootherstep keeps acceleration gentle at both ends of the jump.
				const eased = progress ** 3 * (progress * (progress * 6 - 15) + 10)
				window.scrollTo({ top: start + distance * eased, behavior: 'instant' })
				frame = progress < 1 ? window.requestAnimationFrame(step) : 0
			}

			frame = window.requestAnimationFrame(step)
		}

		document.addEventListener('click', navigate)
		document.addEventListener('keydown', cancelOnKey)
		window.addEventListener('wheel', cancelScroll, { passive: true })
		window.addEventListener('touchstart', cancelScroll, { passive: true })
		window.addEventListener('pointerdown', cancelScroll, { passive: true })
		window.addEventListener('popstate', cancelScroll)
		window.addEventListener('resize', cancelScroll)
		motion.addEventListener('change', cancelScroll)

		return () => {
			cancelScroll()
			document.removeEventListener('click', navigate)
			document.removeEventListener('keydown', cancelOnKey)
			window.removeEventListener('wheel', cancelScroll)
			window.removeEventListener('touchstart', cancelScroll)
			window.removeEventListener('pointerdown', cancelScroll)
			window.removeEventListener('popstate', cancelScroll)
			window.removeEventListener('resize', cancelScroll)
			motion.removeEventListener('change', cancelScroll)
		}
	}, [])

	return null
}
