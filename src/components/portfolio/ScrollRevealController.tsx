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
					delete (entry.target as HTMLElement).dataset.revealPending
					;(entry.target as HTMLElement).dataset.revealVisible = 'true'
					observer.unobserve(entry.target)
				})
			},
			{ rootMargin: '0px 0px 24px 0px', threshold: 0 }
		)

		targets.forEach(target => {
			if (target.getBoundingClientRect().top < window.innerHeight) {
				target.dataset.revealVisible = 'true'
				return
			}
			target.dataset.revealPending = 'true'
			observer.observe(target)
		})

		return () => {
			observer.disconnect()
			targets.forEach(target => {
				delete target.dataset.revealPending
			})
			delete root.dataset.revealReady
		}
	}, [])

	return null
}
