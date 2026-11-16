'use client'

import { useEffect, useRef } from 'react'

type Stat = { value: number; label: string }

function Counter({ value }: { value: number }) {
	const ref = useRef<HTMLElement>(null)

	useEffect(() => {
		const node = ref.current
		if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

		let frame = 0
		node.textContent = '0'
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return
			observer.disconnect()
			const start = performance.now()
			const duration = 1600
			const step = (now: number) => {
				const t = Math.min((now - start) / duration, 1)
				const eased = t === 1 ? 1 : 1 - 2 ** (-10 * t)
				node.textContent = String(Math.round(value * eased))
				if (t < 1) frame = requestAnimationFrame(step)
			}
			frame = requestAnimationFrame(step)
		})
		observer.observe(node)

		return () => {
			observer.disconnect()
			cancelAnimationFrame(frame)
			node.textContent = String(value)
		}
	}, [value])

	// Server and no-JS render show the final number.
	return (
		<strong
			ref={ref}
			className='text-[clamp(3rem,7vw,6.5rem)] leading-none font-normal tracking-[-0.05em] tabular-nums'
		>
			{value}
		</strong>
	)
}

export function StatCounters({ stats }: { stats: Stat[] }) {
	return (
		<dl className='m-0 mt-[clamp(32px,5vw,64px)] grid grid-cols-3 gap-[clamp(12px,2vw,24px)]'>
			{stats.map(stat => (
				<div
					key={stat.label}
					className='flex min-w-0 flex-col-reverse gap-3 border-t border-ink pt-4'
				>
					<dt className='m-0 text-[11px] leading-snug text-muted uppercase sm:text-[13px]'>
						{stat.label}
					</dt>
					<dd className='m-0'>
						<Counter value={stat.value} />
					</dd>
				</div>
			))}
		</dl>
	)
}
