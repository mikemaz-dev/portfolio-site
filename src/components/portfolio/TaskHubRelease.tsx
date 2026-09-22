import type { CSSProperties } from 'react'

import type { Locale } from '@/data/site-content'

const rays = Array.from({ length: 20 }, (_, index) => ({
	angle: `${index * 18}deg`,
	distance: `${index % 2 ? 108 : 144}px`
}))

export function TaskHubRelease({ locale }: { locale: Locale }) {
	return (
		<div className='taskhub-release'>
			<div
				className='release-firework'
				aria-hidden='true'
			>
				{rays.map(ray => (
					<span
						key={ray.angle}
						style={
							{
								'--ray': ray.angle,
								'--distance': ray.distance
							} as CSSProperties
						}
					/>
				))}
			</div>
			<span className='release-edition'>
				{locale === 'ru' ? 'Новая версия уже здесь' : 'The new version is here'}
			</span>
			<div className='release-wordmark'>
				TaskHub<span aria-hidden='true'>↗</span>
			</div>
			<p className='release-message'>
				{locale === 'ru'
					? 'Любимый проект.\nНовая глава.'
					: 'My favourite project.\nA new chapter.'}
			</p>
			<span className='release-footnote'>
				{locale === 'ru' ? 'Управление задачами' : 'Task management'}
			</span>
		</div>
	)
}
