import { CONTENT, EXPERIENCE, type Locale } from '@/data/site-content'
import { formatExperienceDuration, getTotalExperienceMonths } from '@/lib/experience-duration'

export function ExperienceSection({ locale }: { locale: Locale }) {
	const copy = CONTENT[locale].experience
	const duration = formatExperienceDuration(getTotalExperienceMonths(EXPERIENCE), locale)

	return (
		<section
			className='section section-experience'
			id='experience'
			aria-labelledby='experience-title'
			data-header-theme='light'
		>
			<div
				className='section-heading section-heading-wide experience-heading'
				data-reveal='group'
			>
				<p className='section-label'>{copy.index}</p>
				<h2 id='experience-title'>{copy.title}</h2>
				<div className='experience-overview'>
					<p className='section-intro'>{copy.intro}</p>
					<div className='experience-total'>
						<strong>{duration}</strong>
						<span>{copy.totalLabel}</span>
						<small>{copy.totalNote}</small>
					</div>
				</div>
			</div>
			<div className='experience-list'>
				{EXPERIENCE.map((item, index) => (
					<article
						className='experience-item'
						key={item.company}
						data-reveal='item'
						data-reveal-delay={((index % 3) + 1).toString()}
					>
						<div className='experience-number'>{String(index + 1).padStart(2, '0')}</div>
						<div className='experience-role'>
							<h3>{item.role[locale]}</h3>
							<p>{item.company}</p>
							<time>{item.period[locale]}</time>
						</div>
						<ul>
							{item.points[locale].map(point => (
								<li key={point}>{point}</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</section>
	)
}
