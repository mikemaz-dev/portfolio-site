'use client'

import { useEffect, useRef } from 'react'

const COLUMNS = 16
const ROWS = 10
const CELL_COUNT = COLUMNS * ROWS
const CELL_IDS = Array.from({ length: CELL_COUNT }, (_, index) => `code-cell-${index}`)
const STATIC_REVEALED = new Set([
	10, 11, 12, 26, 27, 28, 42, 43, 44, 58, 59, 60, 75, 76, 77, 91, 92, 108
])

export function CodeReveal() {
	const rootRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const root = rootRef.current
		if (!root) return

		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (!finePointer || reducedMotion) return

		const cells = Array.from(root.querySelectorAll<HTMLElement>('[data-code-cell]'))
		let animationFrame = 0
		let resetTimer = 0
		let introTimer = 0

		const revealAt = (column: number, row: number, radius = 1) => {
			for (let y = row - radius; y <= row + radius; y += 1) {
				for (let x = column - radius; x <= column + radius; x += 1) {
					if (x < 0 || x >= COLUMNS || y < 0 || y >= ROWS) continue
					cells[y * COLUMNS + x]?.setAttribute('data-revealed', 'true')
				}
			}
		}

		const clearReveal = () => {
			for (const cell of cells) cell.removeAttribute('data-revealed')
		}

		const scheduleReset = (delay = 850) => {
			window.clearTimeout(resetTimer)
			resetTimer = window.setTimeout(clearReveal, delay)
		}

		const handlePointerMove = (event: PointerEvent) => {
			window.clearTimeout(resetTimer)
			cancelAnimationFrame(animationFrame)
			animationFrame = requestAnimationFrame(() => {
				const bounds = root.getBoundingClientRect()
				const column = Math.floor(((event.clientX - bounds.left) / bounds.width) * COLUMNS)
				const row = Math.floor(((event.clientY - bounds.top) / bounds.height) * ROWS)
				revealAt(column, row)
			})
		}

		const handlePointerLeave = () => scheduleReset()

		introTimer = window.setTimeout(() => {
			revealAt(12, 2, 1)
			scheduleReset(1100)
		}, 520)

		root.addEventListener('pointermove', handlePointerMove)
		root.addEventListener('pointerleave', handlePointerLeave)

		return () => {
			cancelAnimationFrame(animationFrame)
			window.clearTimeout(resetTimer)
			window.clearTimeout(introTimer)
			root.removeEventListener('pointermove', handlePointerMove)
			root.removeEventListener('pointerleave', handlePointerLeave)
		}
	}, [])

	return (
		<div
			aria-hidden='true'
			className='code-reveal'
			ref={rootRef}
		>
			<pre className='code-reveal-source'>
				<code>
					<span>
						<i>01</i>
						<b>const</b> build = (idea: Idea) =&gt; ({'{'}
					</span>
					<span>
						<i>02</i> stack: [<b>'React'</b>, <b>'Next.js'</b>,
					</span>
					<span>
						<i>03</i> <b>'TypeScript'</b>],
					</span>
					<span>
						<i>04</i> priorities: [<b>'clarity'</b>, <b>'speed'</b>,
					</span>
					<span>
						<i>05</i> <b>'reliability'</b>],
					</span>
					<span>
						<i>06</i> {'}'})
					</span>
				</code>
			</pre>
			<div className='code-reveal-grid'>
				{CELL_IDS.map((cellId, index) => (
					<span
						data-code-cell='true'
						data-static={STATIC_REVEALED.has(index) ? 'true' : undefined}
						key={cellId}
					/>
				))}
			</div>
		</div>
	)
}
