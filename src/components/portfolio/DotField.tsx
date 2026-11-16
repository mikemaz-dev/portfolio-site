'use client'

import { useEffect, useRef } from 'react'

import { NOTE_EVENT, type NoteDetail, RIPPLE_EVENT, audioBus } from '@/lib/audio-bus'

type Rect = { left: number; top: number; right: number; bottom: number }
type Ripple = { x: number; y: number; born: number; strength: number }

// A field of soft dots on springs. The pointer (mouse or finger) pushes them aside like
// a hand through water, moving dots stretch into little comets along their velocity,
// and a click or tap sends a ripple through the field. Everything settles back with a
// gentle overshoot. Elements marked [data-field-clear] stay free of dots.
export function DotField({
	tone = 'dark',
	spacing = 34,
	className = ''
}: {
	tone?: 'dark' | 'light'
	spacing?: number
	className?: string
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const host = canvas?.parentElement
		const context = canvas?.getContext('2d')
		if (!canvas || !host || !context) return

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const base = tone === 'dark' ? [8, 8, 12] : [255, 255, 255]
		const glow = tone === 'dark' ? [47, 60, 255] : [150, 160, 255]
		const baseAlpha = tone === 'dark' ? 0.2 : 0.22

		// Particle state lives in flat typed arrays for speed.
		let count = 0
		let homeX = new Float32Array(0)
		let homeY = new Float32Array(0)
		let offsetX = new Float32Array(0)
		let offsetY = new Float32Array(0)
		let velocityX = new Float32Array(0)
		let velocityY = new Float32Array(0)
		let hidden = new Uint8Array(0)

		let width = 0
		let height = 0
		let radius = 150
		let pointerX = -1e4
		let pointerY = -1e4
		let pointerVX = 0
		let pointerVY = 0
		let lastPointerX = -1e4
		let lastPointerY = -1e4
		let pointerActive = false
		let releaseTimer = 0
		const ripples: Ripple[] = []
		let frame = 0
		let visible = true
		let lastActivity = performance.now()
		let tick = 0
		let started = performance.now()
		// The field starts once the browser is idle, so it never competes with the first render.
		let ready = false
		// Dots are drawn in batches: one path per (energy, fade-in) bucket instead of one
		// draw call per dot. That keeps a frame to a few dozen strokes even with 1500+ dots.
		const ENERGY_LEVELS = 8
		const APPEAR_LEVELS = 4
		const batches: (Path2D | undefined)[] = new Array((ENERGY_LEVELS + 1) * APPEAR_LEVELS)

		const build = () => {
			const box = host.getBoundingClientRect()
			width = box.width
			height = box.height
			// Phones get a lighter canvas; huge screens get a wider grid so the dot count stays bounded.
			const ratio = Math.min(window.devicePixelRatio || 1, width < 640 ? 1.5 : 2)
			const step = Math.max(
				width < 640 ? spacing * 0.85 : spacing,
				Math.sqrt((width * height) / 1700)
			)
			radius = width < 640 ? 110 : 160
			canvas.width = Math.round(width * ratio)
			canvas.height = Math.round(height * ratio)
			canvas.style.width = `${width}px`
			canvas.style.height = `${height}px`
			context.setTransform(ratio, 0, 0, ratio, 0, 0)

			const clear: Rect[] = Array.from(
				host.querySelectorAll<HTMLElement>('[data-field-clear]')
			).map(element => {
				const rect = element.getBoundingClientRect()
				const pad = step * 0.5
				return {
					left: rect.left - box.left - pad,
					top: rect.top - box.top - pad,
					right: rect.right - box.left + pad,
					bottom: rect.bottom - box.top + pad
				}
			})

			const columns = Math.ceil(width / step) + 1
			const rows = Math.ceil(height / step) + 1
			const startX = (width - (columns - 1) * step) / 2
			const startY = (height - (rows - 1) * step) / 2
			count = columns * rows
			homeX = new Float32Array(count)
			homeY = new Float32Array(count)
			offsetX = new Float32Array(count)
			offsetY = new Float32Array(count)
			velocityX = new Float32Array(count)
			velocityY = new Float32Array(count)
			hidden = new Uint8Array(count)
			for (let row = 0; row < rows; row += 1) {
				for (let column = 0; column < columns; column += 1) {
					const index = row * columns + column
					const x = startX + column * step
					const y = startY + row * step
					homeX[index] = x
					homeY[index] = y
					hidden[index] = clear.some(r => x > r.left && x < r.right && y > r.top && y < r.bottom)
						? 1
						: 0
				}
			}
		}

		const step = (now: number) => {
			if (reducedMotion || !visible || !ready) return
			frame = requestAnimationFrame(step)
			if (audioBus.level > 0.02) lastActivity = now
			// Nothing is touching the field: the gentle idle drift runs at half rate to save battery.
			tick += 1
			if (now - lastActivity > 3000 && tick % 2) return
			render(now)
		}

		const render = (now: number) => {
			const time = now - started
			context.clearRect(0, 0, width, height)
			batches.fill(undefined)

			// Pointer velocity decays smoothly so a flick keeps pushing for a moment.
			pointerVX *= 0.85
			pointerVY *= 0.85
			for (let r = ripples.length - 1; r >= 0; r -= 1) {
				if (now - ripples[r].born > 1600) ripples.splice(r, 1)
			}

			const centerX = width / 2
			const centerY = height / 2
			const reach = Math.hypot(centerX, centerY)

			for (let index = 0; index < count; index += 1) {
				if (hidden[index]) continue
				const x = homeX[index]
				const y = homeY[index]
				let forceX = 0
				let forceY = 0

				if (!reducedMotion) {
					// Ambient life: a slow, low-amplitude current across the field.
					// With music on, the current swells with the bass, so the field breathes in time.
					const current = 0.025 * (1 + audioBus.bass * 7)
					forceX += Math.sin(time * 0.0006 + y * 0.018) * current
					forceY += Math.cos(time * 0.0005 + x * 0.015) * current

					if (pointerActive) {
						const dx = x + offsetX[index] - pointerX
						const dy = y + offsetY[index] - pointerY
						const distance = Math.hypot(dx, dy)
						if (distance < radius && distance > 0.001) {
							const falloff = (1 - distance / radius) ** 2
							forceX += (dx / distance) * falloff * 2.2 + pointerVX * falloff * 0.12
							forceY += (dy / distance) * falloff * 2.2 + pointerVY * falloff * 0.12
						}
					}

					for (const ripple of ripples) {
						const age = now - ripple.born
						const front = age * 0.55
						const dx = x - ripple.x
						const dy = y - ripple.y
						const distance = Math.hypot(dx, dy) || 1
						const band = 1 - Math.abs(distance - front) / 46
						if (band > 0) {
							const strength = band * 3.2 * ripple.strength * (1 - age / 1600)
							forceX += (dx / distance) * strength
							forceY += (dy / distance) * strength
						}
					}

					// Underdamped spring back home: a soft, jelly-like overshoot.
					velocityX[index] = velocityX[index] * 0.86 + forceX - offsetX[index] * 0.06
					velocityY[index] = velocityY[index] * 0.86 + forceY - offsetY[index] * 0.06
					offsetX[index] += velocityX[index]
					offsetY[index] += velocityY[index]
				}

				// Intro: dots fade in as a wave from the centre.
				const fromCenter = Math.hypot(x - centerX, y - centerY) / reach
				const appear = reducedMotion ? 1 : Math.min(1, Math.max(0, (time - fromCenter * 700) / 600))
				if (appear <= 0) continue

				const vx = velocityX[index]
				const vy = velocityY[index]
				const speed = Math.hypot(vx, vy)
				const energy = Math.min(1, Math.hypot(offsetX[index], offsetY[index]) / 26 + speed / 6)
				const key =
					Math.round(energy * ENERGY_LEVELS) * APPEAR_LEVELS +
					(Math.ceil(appear * APPEAR_LEVELS) - 1)
				let path = batches[key]
				if (!path) {
					path = new Path2D()
					batches[key] = path
				}
				const px = x + offsetX[index]
				const py = y + offsetY[index]
				// Moving dots stretch into a short tail behind them.
				const tail = Math.min(speed * 2.4, 16)
				if (tail > 0.3) path.moveTo(px - (vx / speed) * tail, py - (vy / speed) * tail)
				else path.moveTo(px - 0.01, py)
				path.lineTo(px, py)
			}

			context.lineCap = 'round'
			for (let key = 0; key < batches.length; key += 1) {
				const path = batches[key]
				if (!path) continue
				const energy = Math.floor(key / APPEAR_LEVELS) / ENERGY_LEVELS
				const appear = ((key % APPEAR_LEVELS) + 1) / APPEAR_LEVELS
				const red = Math.round(base[0] + (glow[0] - base[0]) * energy)
				const green = Math.round(base[1] + (glow[1] - base[1]) * energy)
				const blue = Math.round(base[2] + (glow[2] - base[2]) * energy)
				const alpha = (baseAlpha + audioBus.level * 0.3 + energy * 0.7) * appear
				context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(3)})`
				context.lineWidth = (1.5 + audioBus.level * 1.1 + energy * 1.6) * 2
				context.stroke(path)
			}
		}

		const setPointer = (clientX: number, clientY: number) => {
			if (!visible) return
			const box = canvas.getBoundingClientRect()
			const x = clientX - box.left
			const y = clientY - box.top
			if (pointerActive && lastPointerX > -1e3) {
				pointerVX = pointerVX * 0.5 + (x - lastPointerX) * 0.5
				pointerVY = pointerVY * 0.5 + (y - lastPointerY) * 0.5
			}
			pointerX = x
			pointerY = y
			lastPointerX = x
			lastPointerY = y
			pointerActive = true
			lastActivity = performance.now()
		}
		const release = () => {
			pointerActive = false
			lastPointerX = -1e4
			pointerX = -1e4
			pointerY = -1e4
		}
		const pushRipple = (x: number, y: number, strength: number) => {
			lastActivity = performance.now()
			ripples.push({ x, y, born: lastActivity, strength })
			if (ripples.length > 6) ripples.shift()
		}
		const addRipple = (clientX: number, clientY: number) => {
			const box = canvas.getBoundingClientRect()
			const x = clientX - box.left
			const y = clientY - box.top
			if (x < 0 || y < 0 || x > width || y > height) return
			pushRipple(x, y, 1)
			window.dispatchEvent(
				new CustomEvent(RIPPLE_EVENT, { detail: { x: x / width, y: y / height } })
			)
		}
		// Notes from the soundtrack ripple the field softly where they are panned.
		const onNote = (event: Event) => {
			const { x, y, strength } = (event as CustomEvent<NoteDetail>).detail
			if (!reducedMotion && visible) pushRipple(x * width, y * height, strength)
		}

		const onPointerMove = (event: PointerEvent) => {
			if (event.pointerType === 'touch') return
			setPointer(event.clientX, event.clientY)
		}
		const onPointerDown = (event: PointerEvent) => {
			if (event.pointerType === 'touch') return
			addRipple(event.clientX, event.clientY)
		}
		// Touch: follow the finger even while the page scrolls, ripple on tap.
		const onTouchStart = (event: TouchEvent) => {
			const touch = event.touches[0]
			if (!touch) return
			window.clearTimeout(releaseTimer)
			setPointer(touch.clientX, touch.clientY)
			addRipple(touch.clientX, touch.clientY)
		}
		const onTouchMove = (event: TouchEvent) => {
			const touch = event.touches[0]
			if (touch) setPointer(touch.clientX, touch.clientY)
		}
		const onTouchEnd = () => {
			window.clearTimeout(releaseTimer)
			releaseTimer = window.setTimeout(release, 120)
		}

		build()
		const resize = new ResizeObserver(() => {
			build()
			if (reducedMotion) render(performance.now())
		})
		resize.observe(host)
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting
			cancelAnimationFrame(frame)
			if (visible) frame = requestAnimationFrame(step)
		})
		observer.observe(canvas)
		window.addEventListener('pointermove', onPointerMove, { passive: true })
		window.addEventListener('pointerdown', onPointerDown, { passive: true })
		window.addEventListener(NOTE_EVENT, onNote)
		window.addEventListener('touchstart', onTouchStart, { passive: true })
		window.addEventListener('touchmove', onTouchMove, { passive: true })
		window.addEventListener('touchend', onTouchEnd, { passive: true })
		window.addEventListener('touchcancel', onTouchEnd, { passive: true })
		document.documentElement.addEventListener('pointerleave', release)
		// Fonts change text boxes, so rebuild the clear zones once they load.
		void document.fonts?.ready.then(build)
		const begin = () => {
			ready = true
			started = performance.now()
			lastActivity = started
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(step)
		}
		// Safari has no requestIdleCallback; a short timeout is a fine stand-in there.
		const canIdle = typeof window.requestIdleCallback === 'function'
		const idle = canIdle
			? window.requestIdleCallback(begin, { timeout: 1200 })
			: window.setTimeout(begin, 300)

		return () => {
			if (canIdle) window.cancelIdleCallback(idle)
			else window.clearTimeout(idle)
			cancelAnimationFrame(frame)
			window.clearTimeout(releaseTimer)
			resize.disconnect()
			observer.disconnect()
			window.removeEventListener('pointermove', onPointerMove)
			window.removeEventListener('pointerdown', onPointerDown)
			window.removeEventListener(NOTE_EVENT, onNote)
			window.removeEventListener('touchstart', onTouchStart)
			window.removeEventListener('touchmove', onTouchMove)
			window.removeEventListener('touchend', onTouchEnd)
			window.removeEventListener('touchcancel', onTouchEnd)
			document.documentElement.removeEventListener('pointerleave', release)
		}
	}, [tone, spacing])

	return (
		<canvas
			ref={canvasRef}
			className={`pointer-events-none absolute inset-0 ${className}`}
		/>
	)
}
