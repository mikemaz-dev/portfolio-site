import { ArrowUpRight } from 'lucide-react'

import { CERTIFICATES, CONTENT, EDUCATION, type Locale } from '@/data/site-content'

export function LearningSection({ locale }: { locale: Locale }) {
	const copy = CONTENT[locale].learning

	return (
		<section
			className='section section-learning'
			id='learning'
			aria-labelledby='learning-title'
			data-header-theme='light'
		>
			<div
				className='section-heading section-heading-wide'
				data-reveal='group'
			>
				<p className='section-label'>{copy.index}</p>
				<h2 id='learning-title'>
					<MultilineText text={copy.title} />
				</h2>
				<p className='section-intro'>{copy.intro}</p>
			</div>

			<div
				className='current-education'
				data-reveal='group'
			>
				<p>{copy.currentLabel}</p>
				<h3>{EDUCATION.institution[locale]}</h3>
				<span>{EDUCATION.status[locale]}</span>
			</div>

			<div className='certificate-list'>
				{CERTIFICATES.map((certificate, index) => (
					<article
						className='certificate-item'
						key={certificate.certificateUrl}
						data-reveal='item'
						data-reveal-delay={((index % 3) + 1).toString()}
					>
						<div className='certificate-index'>{String(index + 1).padStart(2, '0')}</div>
						<div className='certificate-meta'>
							<p>{certificate.provider}</p>
							<time>{certificate.period[locale]}</time>
						</div>
						<div className='certificate-content'>
							<h3>{certificate.title[locale]}</h3>
							<ul>
								{certificate.learning[locale].map(item => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
						<div className='certificate-actions'>
							<a
								href={certificate.certificateUrl}
								target='_blank'
								rel='noreferrer'
							>
								{copy.certificateLabel}
								<ArrowUpRight
									aria-hidden='true'
									size={16}
								/>
							</a>
							{certificate.courseUrl ? (
								<a
									href={certificate.courseUrl}
									target='_blank'
									rel='noreferrer'
								>
									{copy.courseLabel}
									<ArrowUpRight
										aria-hidden='true'
										size={16}
									/>
								</a>
							) : null}
						</div>
					</article>
				))}
			</div>
		</section>
	)
}

function MultilineText({ text }: { text: string }) {
	const lines = text.split('\n')

	return lines.map((line, index) => (
		<span key={line}>
			{line}
			{index < lines.length - 1 ? <br /> : null}
		</span>
	))
}
