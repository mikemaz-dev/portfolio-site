'use client'

import { useEffect, useRef } from 'react'

// An accent around the native pointer, never a replacement for its affordances.
export function CursorAccent() {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const media = window.matchMedia(
			'(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
		)
		const cursor = ref.current
		if (!cursor) return
		let frame = 0
		let x = 0
		let y = 0
		let interactive = false
		const hide = () => {
			cancelAnimationFrame(frame)
			frame = 0
			cursor.dataset.visible = 'false'
		}
		const move = (event: PointerEvent) => {
			if (
				!media.matches ||
				event.pointerType !== 'mouse' ||
				(event.target instanceof Element && !!event.target.closest('.site-header'))
			) {
				hide()
				return
			}
			x = event.clientX
			y = event.clientY
			interactive =
				event.target instanceof Element &&
				!!event.target.closest('a, button, summary, [role="scrollbar"]')
			if (frame) return
			frame = requestAnimationFrame(() => {
				cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
				cursor.dataset.visible = 'true'
				cursor.dataset.interactive = String(interactive)
				frame = 0
			})
		}
		const key = (event: KeyboardEvent) => {
			if (event.key === 'Tab') hide()
		}
		window.addEventListener('pointermove', move, { passive: true })
		document.documentElement.addEventListener('pointerleave', hide)
		window.addEventListener('blur', hide)
		window.addEventListener('keydown', key)
		media.addEventListener('change', hide)
		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener('pointermove', move)
			document.documentElement.removeEventListener('pointerleave', hide)
			window.removeEventListener('blur', hide)
			window.removeEventListener('keydown', key)
			media.removeEventListener('change', hide)
		}
	}, [])

	return (
		<div
			className='cursor-accent'
			ref={ref}
			aria-hidden='true'
		>
			<span />
		</div>
	)
}
