'use client'

import { useEffect, useRef } from 'react'

const LIGHT = 300
const HEAVY = 820

// A wordmark set in the variable Onest font. Letters near the pointer (or finger) swell
// to a heavier weight and settle back smoothly; when the block first scrolls into view,
// a wave of weight sweeps through the word on its own.
export function WeightWordmark({ text, className = '' }: { text: string; className?: string }) {
	const rootRef = useRef<HTMLParagraphElement>(null)

	useEffect(() => {
		const root = rootRef.current
		if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

		const letters = Array.from(root.querySelectorAll<HTMLSpanElement>('[data-letter]'))
		const weights = letters.map(() => LIGHT)
		let centers: number[] = []
		let pointerX: number | null = null
		let sweepStart = 0
		let frame = 0
		let visible = false

		const measure = () => {
			centers = letters.map(letter => {
				const box = letter.getBoundingClientRect()
				return box.left + box.width / 2
			})
		}

		const tick = (now: number) => {
			const width = root.getBoundingClientRect().width || 1
			const reach = Math.max(90, width * 0.12)
			// A one-off sweep from left to right while the block comes into view.
			const sweepX =
				sweepStart && now - sweepStart < 1800
					? root.getBoundingClientRect().left -
						reach +
						((now - sweepStart) / 1800) * (width + reach * 2)
					: null
			const focus = pointerX ?? sweepX

			let moving = false
			for (let index = 0; index < letters.length; index += 1) {
				const distance =
					focus === null ? Number.POSITIVE_INFINITY : Math.abs(centers[index] - focus)
				const near = Math.exp(-((distance / reach) ** 2))
				const target = LIGHT + (HEAVY - LIGHT) * near
				weights[index] += (target - weights[index]) * 0.14
				if (Math.abs(target - weights[index]) > 0.5) moving = true
				letters[index].style.fontVariationSettings = `'wght' ${weights[index].toFixed(0)}`
			}

			// Stop the loop once everything has settled; the next pointer move restarts it.
			frame = moving || sweepX !== null ? requestAnimationFrame(tick) : 0
		}
		const wake = () => {
			if (!frame && visible) frame = requestAnimationFrame(tick)
		}

		const onPointer = (clientX: number) => {
			if (!centers.length) measure()
			pointerX = clientX
			wake()
		}
		const onPointerMove = (event: PointerEvent) => onPointer(event.clientX)
		const onTouchMove = (event: TouchEvent) => {
			const touch = event.touches[0]
			if (touch) onPointer(touch.clientX)
		}
		const onLeave = () => {
			pointerX = null
			wake()
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting
				if (!visible) return
				measure()
				if (!sweepStart) sweepStart = performance.now()
				wake()
			},
			{ threshold: 0.4 }
		)
		observer.observe(root)
		const resize = new ResizeObserver(measure)
		resize.observe(root)
		root.addEventListener('pointermove', onPointerMove, { passive: true })
		root.addEventListener('pointerleave', onLeave)
		root.addEventListener('touchstart', onTouchMove, { passive: true })
		root.addEventListener('touchmove', onTouchMove, { passive: true })
		root.addEventListener('touchend', onLeave, { passive: true })
		window.addEventListener('scroll', measure, { passive: true })

		return () => {
			cancelAnimationFrame(frame)
			observer.disconnect()
			resize.disconnect()
			root.removeEventListener('pointermove', onPointerMove)
			root.removeEventListener('pointerleave', onLeave)
			root.removeEventListener('touchstart', onTouchMove)
			root.removeEventListener('touchmove', onTouchMove)
			root.removeEventListener('touchend', onLeave)
			window.removeEventListener('scroll', measure)
		}
	}, [])

	return (
		<p
			ref={rootRef}
			className={`relative m-0 flex justify-between whitespace-nowrap select-none ${className}`}
		>
			<span className='sr-only'>{text}</span>
			{Array.from(text).map((letter, index) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: letters of a fixed word never reorder
					key={index}
					aria-hidden='true'
					data-letter
					style={{ fontVariationSettings: `'wght' ${LIGHT}` }}
				>
					{letter}
				</span>
			))}
		</p>
	)
}
