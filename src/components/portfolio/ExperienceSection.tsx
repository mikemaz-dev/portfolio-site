import type { ReactNode } from 'react'

import { StatCounters } from './StatCounters'
import { caption, sectionSpace, sectionTitle, shell } from './styles'
import { CERTIFICATES, CONTENT, EXPERIENCE, type Locale, PROJECTS } from '@/data/site-content'
import { formatExperienceDuration, getTotalExperienceMonths } from '@/lib/experience-duration'

export function ExperienceSection({ locale }: { locale: Locale }) {
	const copy = CONTENT[locale].experience
	const duration = formatExperienceDuration(getTotalExperienceMonths(EXPERIENCE), locale)

	return (
		<section
			className={`${shell} ${sectionSpace}`}
			id='experience'
			aria-labelledby='experience-title'
			data-header-theme='light'
		>
			<div
				className='flex flex-wrap items-end justify-between gap-6'
				data-reveal='group'
			>
				<h2
					id='experience-title'
					className={sectionTitle}
				>
					{copy.title}
				</h2>
				<p className={`${caption} max-w-[30ch] md:text-right`}>
					{copy.totalLabel}: {duration}
				</p>
			</div>

			<StatCounters
				stats={[
					{
						value: PROJECTS.length,
						label: locale === 'ru' ? 'Проекта в портфолио' : 'Selected projects'
					},
					{
						value: CERTIFICATES.length,
						label: locale === 'ru' ? 'Пройденных курсов' : 'Completed courses'
					},
					{ value: EXPERIENCE.length, label: locale === 'ru' ? 'Места работы' : 'Roles so far' }
				]}
			/>

			<div className='mt-[clamp(40px,6vw,88px)]'>
				{EXPERIENCE.map(item => (
					<ListRow
						key={item.company}
						title={item.role[locale]}
						meta={`${item.company} · ${item.period[locale]}`}
						points={item.points[locale]}
					/>
				))}
			</div>
		</section>
	)
}

// "+ Title → details" row; the plus lights up once the row has scrolled into view.
export function ListRow({
	title,
	meta,
	points,
	children
}: {
	title: string
	meta?: string
	points: string[]
	children?: ReactNode
}) {
	return (
		<article
			className='group/row grid gap-x-[clamp(24px,4vw,64px)] gap-y-4 border-t border-line py-[clamp(28px,3.4vw,48px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]'
			data-reveal='item'
		>
			<div className='flex gap-4'>
				<span
					aria-hidden='true'
					className='mt-[0.18em] shrink-0 self-start text-[clamp(1.4rem,2.2vw,2rem)] leading-none font-light text-line transition-[color,rotate] duration-700 ease-out-expo group-data-[reveal-visible=true]/row:rotate-90 group-data-[reveal-visible=true]/row:text-accent'
				>
					+
				</span>
				<div>
					<h3 className='m-0 text-[clamp(1.4rem,2.2vw,2rem)] leading-tight font-normal tracking-[-0.025em]'>
						{title}
					</h3>
					{meta ? <p className={`${caption} mt-3 text-muted`}>{meta}</p> : null}
				</div>
			</div>
			<div>
				<ul className='m-0 grid list-none gap-3 p-0 text-[clamp(15px,1.15vw,17px)] leading-snug'>
					{points.map(point => (
						<li
							className='text-ink/80'
							key={point}
						>
							{point}
						</li>
					))}
				</ul>
				{children}
			</div>
		</article>
	)
}
