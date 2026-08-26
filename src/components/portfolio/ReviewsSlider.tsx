'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { type PointerEvent, useEffect, useRef, useState } from 'react'

import { CONTENT, type Locale, REVIEWS, getReviewText } from '@/data/site-content'

type DragState = {
	pointerId: number
	startX: number
	startScrollLeft: number
	startIndex: number
}

export function ReviewsSlider({ locale }: { locale: Locale }) {
	const trackRef = useRef<HTMLDivElement>(null)
	const dragRef = useRef<DragState | null>(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const copy = CONTENT[locale].reviews

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

		track
			.querySelectorAll<HTMLElement>('[data-review-index]')
			.forEach(slide => observer.observe(slide))
		return () => observer.disconnect()
	}, [])

	const showReview = (index: number, behavior: ScrollBehavior = 'smooth') => {
		const track = trackRef.current
		if (!track) return

		const nextIndex = (index + REVIEWS.length) % REVIEWS.length
		track.scrollTo({ left: track.clientWidth * nextIndex, behavior })
		setActiveIndex(nextIndex)
	}

	const handleScroll = () => {
		const track = trackRef.current
		if (!track || track.clientWidth === 0) return

		const nextIndex = Math.round(track.scrollLeft / track.clientWidth)
		setActiveIndex(Math.min(REVIEWS.length - 1, Math.max(0, nextIndex)))
	}

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
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

	const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
		const track = trackRef.current
		const drag = dragRef.current
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

	const cancelDrag = (event: PointerEvent<HTMLDivElement>) => {
		const track = trackRef.current
		const drag = dragRef.current
		if (!track || !drag || drag.pointerId !== event.pointerId) return

		if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
		dragRef.current = null
		setIsDragging(false)
		showReview(drag.startIndex)
	}

	return (
		<div className='reviews-slider'>
			<div
				className='reviews-track'
				data-dragging={isDragging}
				ref={trackRef}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={finishDrag}
				onPointerCancel={cancelDrag}
				onScroll={handleScroll}
			>
				{REVIEWS.map((review, index) => (
					<figure
						className='review-slide'
						data-review-index={index}
						key={`${review.author}-${index}`}
					>
						<div className='review-slide-meta'>
							<span>
								{String(index + 1).padStart(2, '0')} / {String(REVIEWS.length).padStart(2, '0')}
							</span>
							<figcaption>{review.author}</figcaption>
						</div>
						<div className='review-slide-copy'>
							<blockquote>{getReviewText(review, locale)}</blockquote>
							{copy.note ? (
								<div className='review-slide-source'>
									<small>{copy.note}</small>
								</div>
							) : null}
						</div>
					</figure>
				))}
			</div>

			<p
				className='sr-only'
				aria-live='polite'
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
				>
					{REVIEWS.map((item, index) => (
						<button
							className='review-dot'
							data-active={index === activeIndex}
							key={`${item.author}-${index}`}
							onClick={() => showReview(index)}
							type='button'
							aria-label={`${locale === 'ru' ? 'Отзыв' : 'Review'} ${index + 1}`}
							aria-current={index === activeIndex ? 'true' : undefined}
						/>
					))}
				</div>
				<div className='reviews-controls'>
					<button
						onClick={() => showReview(activeIndex - 1)}
						type='button'
						aria-label={copy.previous}
					>
						<ArrowLeft
							aria-hidden='true'
							size={20}
						/>
					</button>
					<button
						onClick={() => showReview(activeIndex + 1)}
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
