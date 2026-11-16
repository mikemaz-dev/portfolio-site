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
			// Start revealing a bit before the element enters, so fast scrolling never shows blank gaps.
			{ rootMargin: '0px 0px 18% 0px', threshold: 0 }
		)

		targets.forEach(target => {
			if (target.getBoundingClientRect().top < window.innerHeight) {
				target.dataset.revealVisible = 'true'
				return
			}
			target.dataset.revealPending = 'true'
			observer.observe(target)
		})

		// Jumps (anchor links, fast flicks) can skip elements without an intersection event.
		// Anything already above the fold must never stay hidden.
		let frame = 0
		const flushSkipped = () => {
			frame = 0
			// Once everything has been revealed there is nothing left to watch.
			if (!targets.some(target => target.dataset.revealPending === 'true')) {
				window.removeEventListener('scroll', onScroll)
				return
			}
			targets.forEach(target => {
				if (target.dataset.revealPending !== 'true') return
				if (target.getBoundingClientRect().bottom < 0) {
					delete target.dataset.revealPending
					target.dataset.revealVisible = 'true'
					observer.unobserve(target)
				}
			})
		}
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(flushSkipped)
		}
		window.addEventListener('scroll', onScroll, { passive: true })

		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener('scroll', onScroll)
			observer.disconnect()
			targets.forEach(target => {
				delete target.dataset.revealPending
			})
			delete root.dataset.revealReady
		}
	}, [])

	return null
}
