'use client'

import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { type PointerEvent, useCallback, useEffect, useRef, useState } from 'react'

import { CONTENT, type Locale, REVIEWS, getReviewText } from '@/data/site-content'

const AUTOPLAY_DELAY = 3000

type DragState = {
	pointerId: number
	startX: number
	startScrollLeft: number
	startIndex: number
}

export function ReviewsSlider({ locale }: { locale: Locale }) {
	const sliderRef = useRef<HTMLDivElement>(null)
	const trackRef = useRef<HTMLDivElement>(null)
	const dragRef = useRef<DragState | null>(null)
	const wasAutoplayRunningRef = useRef(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const [autoplayDeadline, setAutoplayDeadline] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const [isFocused, setIsFocused] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const [isPageVisible, setIsPageVisible] = useState(true)
	const [isPointerActive, setIsPointerActive] = useState(false)
	const [isSectionVisible, setIsSectionVisible] = useState(false)
	const [isPlaying, setIsPlaying] = useState(true)
	const copy = CONTENT[locale].reviews

	const showReview = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
		const track = trackRef.current
		if (!track) return

		const nextIndex = (index + REVIEWS.length) % REVIEWS.length
		const safeBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			? 'auto'
			: behavior
		track.scrollTo({ left: track.clientWidth * nextIndex, behavior: safeBehavior })
		setActiveIndex(nextIndex)
	}, [])

	const restartAutoplay = () => setAutoplayDeadline(Date.now() + AUTOPLAY_DELAY)

	useEffect(() => {
		const track = trackRef.current
		if (!track) return

		const observer = new IntersectionObserver(
			entries => {
				const visibleSlide = entries
					.filter(entry => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

				if (!visibleSlide) return
				const index = Number((visibleSlide.target as HTMLElement).dataset.reviewIndex)
				if (Number.isInteger(index)) setActiveIndex(index)
			},
			{ root: track, threshold: [0.55, 0.75] }
		)

		track.querySelectorAll<HTMLElement>('[data-review-index]').forEach(slide => {
			observer.observe(slide)
		})
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		const slider = sliderRef.current
		if (!slider) return

		const observer = new IntersectionObserver(
			([entry]) => setIsSectionVisible(entry.isIntersecting),
			{ threshold: 0.35 }
		)

		observer.observe(slider)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)')
		const updatePreference = () => {
			if (media.matches) setIsPlaying(false)
		}

		updatePreference()
		media.addEventListener('change', updatePreference)
		return () => media.removeEventListener('change', updatePreference)
	}, [])

	useEffect(() => {
		const updateVisibility = () => setIsPageVisible(!document.hidden)
		updateVisibility()
		document.addEventListener('visibilitychange', updateVisibility)
		return () => document.removeEventListener('visibilitychange', updateVisibility)
	}, [])

	const isAutoplayRunning =
		isPlaying &&
		isSectionVisible &&
		isPageVisible &&
		!isHovered &&
		!isFocused &&
		!isDragging &&
		!isPointerActive

	useEffect(() => {
		if (isAutoplayRunning && !wasAutoplayRunningRef.current) {
			setAutoplayDeadline(Date.now() + AUTOPLAY_DELAY)
		}
		wasAutoplayRunningRef.current = isAutoplayRunning
	}, [isAutoplayRunning])

	useEffect(() => {
		if (!isAutoplayRunning || autoplayDeadline === 0) return

		const delay = Math.max(0, autoplayDeadline - Date.now())
		const timer = window.setTimeout(() => {
			setAutoplayDeadline(Date.now() + AUTOPLAY_DELAY)
			showReview(activeIndex + 1)
		}, delay)
		return () => window.clearTimeout(timer)
	}, [activeIndex, autoplayDeadline, isAutoplayRunning, showReview])

	const handleScroll = () => {
		const track = trackRef.current
		if (!track || track.clientWidth === 0) return

		const nextIndex = Math.round(track.scrollLeft / track.clientWidth)
		setActiveIndex(Math.min(REVIEWS.length - 1, Math.max(0, nextIndex)))
	}

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
		setIsPointerActive(true)
		restartAutoplay()

		if (event.pointerType !== 'mouse' || event.button !== 0) return
		const track = trackRef.current
		if (!track) return

		dragRef.current = {
			pointerId: event.pointerId,
			startX: event.clientX,
			startScrollLeft: track.scrollLeft,
			startIndex: Math.round(track.scrollLeft / track.clientWidth)
		}
		track.setPointerCapture(event.pointerId)
		setIsDragging(true)
	}

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		const track = trackRef.current
		const drag = dragRef.current
		if (!track || !drag || drag.pointerId !== event.pointerId) return

		track.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX) * 1.35
	}

	const finishPointer = (event: PointerEvent<HTMLDivElement>) => {
		const track = trackRef.current
		const drag = dragRef.current

		setIsPointerActive(false)
		restartAutoplay()

		if (!track || !drag || drag.pointerId !== event.pointerId) return
		if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)

		const distance = event.clientX - drag.startX
		const threshold = Math.min(96, track.clientWidth * 0.1)
		const nextIndex =
			Math.abs(distance) >= threshold ? drag.startIndex + (distance < 0 ? 1 : -1) : drag.startIndex

		dragRef.current = null
		setIsDragging(false)
		showReview(nextIndex)
	}

	const cancelPointer = (event: PointerEvent<HTMLDivElement>) => {
		const track = trackRef.current
		const drag = dragRef.current

		setIsPointerActive(false)
		restartAutoplay()

		if (!track || !drag || drag.pointerId !== event.pointerId) return
		if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)

		dragRef.current = null
		setIsDragging(false)
		showReview(drag.startIndex)
	}

	const handleManualNavigation = (index: number) => {
		showReview(index)
		restartAutoplay()
	}

	const toggleAutoplay = () => {
		setIsPlaying(current => !current)
		restartAutoplay()
	}

	return (
		<div
			className='reviews-slider'
			data-autoplay={isAutoplayRunning}
			data-reveal='group'
			ref={sliderRef}
			role='group'
			aria-label={copy.title}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onFocusCapture={() => setIsFocused(true)}
			onBlurCapture={event => {
				if (!event.currentTarget.contains(event.relatedTarget)) {
					setIsFocused(false)
					restartAutoplay()
				}
			}}
		>
			<div
				className='reviews-track'
				data-dragging={isDragging}
				ref={trackRef}
				role='region'
				aria-roledescription={locale === 'ru' ? 'карусель отзывов' : 'reviews carousel'}
				aria-label={copy.title}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={finishPointer}
				onPointerCancel={cancelPointer}
				onScroll={handleScroll}
			>
				{REVIEWS.map((review, index) => (
					<figure
						className='review-slide'
						data-review-index={index}
						key={review.original}
						aria-current={index === activeIndex ? 'true' : undefined}
					>
						<div className='review-slide-meta'>
							<span>
								{String(index + 1).padStart(2, '0')} / {String(REVIEWS.length).padStart(2, '0')}
							</span>
							<figcaption>{review.author}</figcaption>
						</div>
						<div className='review-slide-copy'>
							<blockquote>{getReviewText(review, locale)}</blockquote>
						</div>
					</figure>
				))}
			</div>

			<p
				className='sr-only'
				aria-live={isAutoplayRunning ? 'off' : 'polite'}
			>
				{locale === 'ru' ? 'Показан отзыв' : 'Showing review'} {activeIndex + 1}{' '}
				{locale === 'ru' ? 'из' : 'of'} {REVIEWS.length}
			</p>

			<div className='reviews-plaque'>
				<div className='reviews-plaque-title'>
					<strong>{copy.badge}</strong>
					<span>{copy.caption}</span>
				</div>
				<div
					className='reviews-dots'
					aria-label={locale === 'ru' ? 'Выбрать отзыв' : 'Choose a review'}
					role='group'
				>
					{REVIEWS.map((item, index) => (
						<button
							className='review-dot'
							data-active={index === activeIndex}
							key={item.original}
							onClick={() => handleManualNavigation(index)}
							type='button'
							aria-label={`${locale === 'ru' ? 'Отзыв' : 'Review'} ${index + 1}`}
							aria-current={index === activeIndex ? 'true' : undefined}
						/>
					))}
				</div>
				<div className='reviews-controls'>
					<button
						onClick={() => handleManualNavigation(activeIndex - 1)}
						type='button'
						aria-label={copy.previous}
					>
						<ArrowLeft
							aria-hidden='true'
							size={20}
						/>
					</button>
					<button
						className='reviews-autoplay'
						data-playing={isPlaying}
						onClick={toggleAutoplay}
						type='button'
						aria-label={isPlaying ? copy.pause : copy.play}
						aria-pressed={isPlaying}
					>
						{isPlaying ? (
							<Pause
								aria-hidden='true'
								size={18}
							/>
						) : (
							<Play
								aria-hidden='true'
								size={18}
							/>
						)}
					</button>
					<button
						onClick={() => handleManualNavigation(activeIndex + 1)}
						type='button'
						aria-label={copy.next}
					>
						<ArrowRight
							aria-hidden='true'
							size={20}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}
