import type { CSSProperties } from 'react'

import type { Locale } from '@/data/site-content'

const rays = Array.from({ length: 20 }, (_, index) => ({
	angle: `${index * 18}deg`,
	distance: `${index % 2 ? 108 : 144}px`
}))

// A release poster, deliberately not a mock screenshot of the new product.
// `compact` is the smaller variant used inside the project grid.
export function TaskHubRelease({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
	return (
		<div
			className={`relative isolate flex h-full flex-col justify-end overflow-hidden bg-accent text-white ${
				compact ? 'min-h-0 p-[clamp(20px,3.2vw,44px)]' : 'min-h-[460px] p-[clamp(24px,4vw,56px)]'
			}`}
		>
			<div
				className={`absolute top-[31%] left-[76%] -z-10 size-0 transition-transform duration-1000 ease-out-expo group-hover/project:rotate-6 group-focus-visible/project:rotate-6 ${
					compact ? 'scale-75 -rotate-12 max-md:scale-[0.55]' : '-rotate-12'
				}`}
				aria-hidden='true'
			>
				{rays.map(ray => (
					<span
						key={ray.angle}
						className='motion-safe:animate-burst absolute h-6 w-[3px] [transform:rotate(var(--ray))_translateY(calc(-1*var(--distance)))] rounded-full bg-white/40'
						style={{ '--ray': ray.angle, '--distance': ray.distance } as CSSProperties}
					/>
				))}
			</div>
			<span
				className={`absolute text-sm leading-normal text-white/90 ${
					compact
						? 'top-[clamp(20px,3.2vw,44px)] left-[clamp(20px,3.2vw,44px)]'
						: 'top-7 left-[clamp(24px,4vw,56px)]'
				}`}
			>
				{locale === 'ru' ? 'Новая версия уже здесь' : 'The new version is here'}
			</span>
			<div
				className={`relative z-10 flex items-baseline justify-between gap-2 leading-[1.1] tracking-[-0.06em] ${
					compact ? 'text-[clamp(2.6rem,6vw,5.5rem)]' : 'text-[clamp(40px,5.5vw,88px)]'
				}`}
			>
				TaskHub
				{compact ? null : (
					<span
						aria-hidden='true'
						className='text-[0.65em] transition-transform duration-700 ease-out-expo group-hover/project:translate-x-1 group-hover/project:-translate-y-1'
					>
						↗
					</span>
				)}
			</div>
			{compact ? null : (
				<p className='relative z-10 mt-5 mb-8 text-[clamp(18px,2vw,28px)] leading-snug tracking-[-0.02em] whitespace-pre-line'>
					{locale === 'ru'
						? 'Любимый проект.\nНовая глава.'
						: 'My favourite project.\nA new chapter.'}
				</p>
			)}
			<span className={`relative border-t border-white/35 pt-4 text-xs ${compact ? 'mt-3.5' : ''}`}>
				{locale === 'ru' ? 'Управление задачами' : 'Task management'}
			</span>
		</div>
	)
}
