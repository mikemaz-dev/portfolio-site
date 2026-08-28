'use client'

import { useEffect } from 'react'

export function ScrollRevealController() {
	useEffect(() => {
		const root = document.documentElement
		const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

		root.dataset.revealReady = 'true'

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			targets.forEach(target => {
				target.dataset.revealVisible = 'true'
			})
			return () => {
				delete root.dataset.revealReady
			}
		}

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (!entry.isIntersecting) return
					;(entry.target as HTMLElement).dataset.revealVisible = 'true'
					observer.unobserve(entry.target)
				})
			},
			{ rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
		)

		targets.forEach(target => {
			observer.observe(target)
		})

		return () => {
			observer.disconnect()
			delete root.dataset.revealReady
		}
	}, [])

	return null
}
