'use client'

import { useEffect, useState } from 'react'

import { BrandMark } from './BrandMark'
import type { Locale } from '@/data/site-content'

type LoaderPhase = 'pending' | 'loading' | 'leaving' | 'hidden'

// Fast navigations never flash an overlay; slow resources cannot hold up the page.
const SHOW_AFTER_MS = 150
const MAXIMUM_WAIT_MS = 900
const EXIT_DURATION_MS = 500

export function PageLoader({ locale }: { locale: Locale }) {
	const [phase, setPhase] = useState<LoaderPhase>('pending')

	useEffect(() => {
		let disposed = false
		let finished = false
		let shown = false
		let exitTimer = 0
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const showTimer = window.setTimeout(() => {
			if (finished || disposed) return
			shown = true
			setPhase('loading')
		}, SHOW_AFTER_MS)

		const finish = () => {
			if (finished || disposed) return
			finished = true
			window.clearTimeout(showTimer)
			window.clearTimeout(deadline)
			if (!shown || reducedMotion) {
				setPhase('hidden')
				return
			}
			setPhase('leaving')
			exitTimer = window.setTimeout(() => {
				if (!disposed) setPhase('hidden')
			}, EXIT_DURATION_MS)
		}

		const deadline = window.setTimeout(finish, MAXIMUM_WAIT_MS)
		let resolveDocument: () => void = () => {}
		const documentReady = new Promise<void>(resolve => {
			resolveDocument = resolve
			if (document.readyState === 'complete') resolve()
			else window.addEventListener('load', resolveDocument, { once: true })
		})
		void Promise.all([documentReady, document.fonts?.ready ?? Promise.resolve()]).then(
			finish,
			finish
		)

		return () => {
			disposed = true
			window.clearTimeout(showTimer)
			window.clearTimeout(deadline)
			window.clearTimeout(exitTimer)
			window.removeEventListener('load', resolveDocument)
		}
	}, [])

	if (phase === 'pending' || phase === 'hidden') return null

	return (
		<div
			className='pointer-events-none fixed inset-0 z-1000 grid place-items-center bg-paper text-ink transition-opacity duration-500 ease-out-expo data-[phase=leaving]:opacity-0'
			data-phase={phase}
			role='status'
			aria-label={locale === 'ru' ? 'Загрузка сайта' : 'Loading website'}
		>
			<div
				className='grid justify-items-center gap-5'
				aria-hidden='true'
			>
				<BrandMark className='size-14 motion-safe:animate-blink' />
				<span className='text-sm tracking-[-0.01em] text-muted'>mikemaz-dev</span>
			</div>
		</div>
	)
}
