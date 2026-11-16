'use client'

import { type KeyboardEvent, type PointerEvent, useEffect, useRef } from 'react'

import type { Locale } from '@/data/site-content'

const KEYBOARD_STEP = 80

function setScrollPosition(top: number) {
	const root = document.documentElement
	const previousBehavior = root.style.scrollBehavior
	root.style.scrollBehavior = 'auto'
	if (document.scrollingElement) document.scrollingElement.scrollTop = top
	root.style.scrollBehavior = previousBehavior
}

export function ScrollRail({ locale }: { locale: Locale }) {
	const railRef = useRef<HTMLDivElement>(null)
	const trackRef = useRef<HTMLDivElement>(null)
	const thumbRef = useRef<HTMLDivElement>(null)
	const mobileRef = useRef<HTMLDivElement>(null)
	const mobileInputRef = useRef<HTMLInputElement>(null)
	const dragOffsetRef = useRef(0)
	const frameRef = useRef(0)
	const activityTimerRef = useRef(0)

	useEffect(() => {
		const rail = railRef.current
		const track = trackRef.current
		const thumb = thumbRef.current
		const mobile = mobileRef.current
		const mobileInput = mobileInputRef.current
		if (!rail || !track || !thumb || !mobile || !mobileInput) return
		document.documentElement.dataset.scrollRailReady = 'true'

		const update = () => {
			cancelAnimationFrame(frameRef.current)
			frameRef.current = requestAnimationFrame(() => {
				const documentHeight = document.documentElement.scrollHeight
				const viewportHeight = window.innerHeight
				const maximumScroll = Math.max(0, documentHeight - viewportHeight)
				const progress =
					maximumScroll === 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / maximumScroll))
				const trackHeight = track.clientHeight
				const thumbHeight = Math.max(
					58,
					Math.min(96, trackHeight * (viewportHeight / documentHeight))
				)
				const travel = Math.max(0, trackHeight - thumbHeight)
				// Read every layout value before writing styles, so the frame never forces a second layout.
				const sampleY = Math.min(window.innerHeight - 1, Math.round(window.innerHeight / 2))
				const section = Array.from(
					document.querySelectorAll<HTMLElement>('[data-header-theme]')
				).find(element => {
					const bounds = element.getBoundingClientRect()
					return bounds.top <= sampleY && bounds.bottom > sampleY
				})

				thumb.style.height = `${thumbHeight}px`
				thumb.style.transform = `translate3d(0, ${Math.min(1, Math.max(0, progress)) * travel}px, 0)`
				mobileInput.value = String(Math.round(progress * 1000))
				mobileInput.style.setProperty('--scroll-progress', `${progress * 100}%`)
				mobileInput.setAttribute('aria-valuetext', `${Math.round(progress * 100)}%`)
				mobile.dataset.scrollable = String(maximumScroll > 1)
				rail.dataset.scrollable = maximumScroll > 1 ? 'true' : 'false'
				rail.setAttribute('aria-valuenow', String(Math.round(progress * 100)))

				rail.dataset.theme = section?.dataset.headerTheme === 'dark' ? 'dark' : 'light'
			})
		}

		const showActivity = () => {
			rail.dataset.active = 'true'
			mobile.dataset.active = 'true'
			window.clearTimeout(activityTimerRef.current)
			activityTimerRef.current = window.setTimeout(() => {
				delete rail.dataset.active
				delete mobile.dataset.active
			}, 520)
			update()
		}

		const resizeObserver = new ResizeObserver(update)
		resizeObserver.observe(document.body)
		resizeObserver.observe(document.documentElement)
		window.addEventListener('scroll', showActivity, { passive: true })
		window.addEventListener('resize', update)
		window.visualViewport?.addEventListener('resize', update)
		update()

		return () => {
			delete document.documentElement.dataset.scrollRailReady
			cancelAnimationFrame(frameRef.current)
			window.clearTimeout(activityTimerRef.current)
			resizeObserver.disconnect()
			window.removeEventListener('scroll', showActivity)
			window.removeEventListener('resize', update)
			window.visualViewport?.removeEventListener('resize', update)
		}
	}, [])

	const scrollFromPointer = (clientY: number) => {
		const track = trackRef.current
		const thumb = thumbRef.current
		if (!track || !thumb) return

		const bounds = track.getBoundingClientRect()
		const thumbHeight = thumb.offsetHeight
		const travel = Math.max(1, bounds.height - thumbHeight)
		const thumbTop = Math.min(travel, Math.max(0, clientY - bounds.top - dragOffsetRef.current))
		const maximumScroll = document.documentElement.scrollHeight - window.innerHeight

		setScrollPosition((thumbTop / travel) * maximumScroll)
	}

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
		const rail = railRef.current
		const thumb = thumbRef.current
		if (!rail || !thumb || rail.dataset.scrollable !== 'true') return

		const thumbBounds = thumb.getBoundingClientRect()
		dragOffsetRef.current =
			event.clientY >= thumbBounds.top && event.clientY <= thumbBounds.bottom
				? event.clientY - thumbBounds.top
				: thumbBounds.height / 2
		rail.dataset.dragging = 'true'
		rail.setPointerCapture(event.pointerId)
		scrollFromPointer(event.clientY)
	}

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (railRef.current?.dataset.dragging !== 'true') return
		scrollFromPointer(event.clientY)
	}

	const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
		const rail = railRef.current
		if (!rail) return
		delete rail.dataset.dragging
		if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId)
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		const maximumScroll = document.documentElement.scrollHeight - window.innerHeight
		const keyActions: Partial<Record<string, number>> = {
			ArrowDown: window.scrollY + KEYBOARD_STEP,
			ArrowUp: window.scrollY - KEYBOARD_STEP,
			PageDown: window.scrollY + window.innerHeight * 0.85,
			PageUp: window.scrollY - window.innerHeight * 0.85,
			Home: 0,
			End: maximumScroll
		}
		const target = keyActions[event.key]
		if (target === undefined) return
		event.preventDefault()
		setScrollPosition(target)
	}

	return (
		<>
			<div
				aria-controls='main-content'
				aria-label={locale === 'ru' ? 'Положение на странице' : 'Page position'}
				aria-orientation='vertical'
				aria-valuemax={100}
				aria-valuemin={0}
				aria-valuenow={0}
				className='group/rail fixed top-1/2 right-0 z-90 hidden h-[clamp(176px,34vh,320px)] w-11 -translate-y-1/2 cursor-grab touch-none outline-offset-[-8px] focus-visible:outline-none data-[dragging=true]:cursor-grabbing data-[scrollable=false]:invisible pointer-fine:block'
				onKeyDown={handleKeyDown}
				onPointerCancel={handlePointerUp}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onLostPointerCapture={handlePointerUp}
				ref={railRef}
				role='scrollbar'
				tabIndex={0}
			>
				<div
					className='absolute top-0 right-1.5 bottom-0 w-1 rounded-full bg-ink/10 transition-colors duration-500 group-data-[theme=dark]/rail:bg-white/20'
					ref={trackRef}
				>
					<div
						className='absolute top-0 right-0 min-h-14 w-1 rounded-full bg-ink transition-[width] duration-500 ease-out-expo will-change-transform group-hover/rail:w-2 group-focus-visible/rail:w-2 group-data-[active=true]/rail:w-2 group-data-[dragging=true]/rail:w-2 group-data-[theme=dark]/rail:bg-accent'
						ref={thumbRef}
					/>
				</div>
			</div>
			<div
				className='fixed bottom-[calc(10px+env(safe-area-inset-bottom))] left-1/2 z-95 block h-11 w-44 -translate-x-1/2 rounded-full border border-line bg-white/90 px-4 shadow-[0_8px_30px_-12px_rgb(8_8_12/30%)] backdrop-blur-xl data-[scrollable=false]:invisible md:hidden pointer-fine:hidden [body:has(header[data-menu-open=true])_&]:invisible'
				ref={mobileRef}
			>
				<input
					className='block h-[42px] w-full cursor-ew-resize touch-none appearance-none bg-transparent focus-visible:rounded-md [&::-moz-range-progress]:h-1 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-ink [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-ink [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[#c9cbdb] [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-ink)_var(--scroll-progress,0%),#c9cbdb_var(--scroll-progress,0%))] [&::-webkit-slider-thumb]:-mt-[6px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-ink [&::-webkit-slider-thumb]:shadow-md'
					type='range'
					min={0}
					max={1000}
					step={1}
					defaultValue={0}
					aria-label={locale === 'ru' ? 'Прокрутка страницы' : 'Scroll the page'}
					aria-controls='main-content'
					aria-valuetext='0%'
					ref={mobileInputRef}
					onInput={event => {
						const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
						setScrollPosition((event.currentTarget.valueAsNumber / 1000) * maximum)
					}}
				/>
			</div>
		</>
	)
}
