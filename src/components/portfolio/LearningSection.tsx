import { ArrowUpRight } from 'lucide-react'

import { ListRow } from './ExperienceSection'
import { caption, sectionSpace, sectionTitle, shell, textLink } from './styles'
import { CERTIFICATES, CONTENT, EDUCATION, type Locale } from '@/data/site-content'

export function LearningSection({ locale }: { locale: Locale }) {
	const copy = CONTENT[locale].learning

	return (
		<section
			className={`${shell} ${sectionSpace}`}
			id='learning'
			aria-labelledby='learning-title'
			data-header-theme='light'
		>
			<div
				className='flex flex-wrap items-end justify-between gap-6'
				data-reveal='group'
			>
				<h2
					id='learning-title'
					className={sectionTitle}
				>
					{copy.title.replace('\n', ' ')}
				</h2>
				<p className={`${caption} max-w-[34ch] md:text-right`}>{copy.intro}</p>
			</div>

			<div
				className='mt-[clamp(32px,5vw,64px)] flex flex-wrap items-center gap-x-6 gap-y-2 rounded-[20px] bg-ink px-[clamp(20px,3vw,36px)] py-6 text-white'
				data-reveal='group'
			>
				<p className={`${caption} text-white/55`}>{copy.currentLabel}</p>
				<h3 className='m-0 text-[clamp(1.2rem,1.8vw,1.6rem)] leading-tight font-normal tracking-[-0.02em]'>
					{EDUCATION.institution[locale]}
				</h3>
				<span className={`${caption} ml-auto text-white/55`}>{EDUCATION.status[locale]}</span>
			</div>

			<div className='mt-[clamp(32px,5vw,64px)]'>
				{CERTIFICATES.map(certificate => (
					<ListRow
						key={certificate.certificateUrl}
						title={certificate.title[locale]}
						meta={`${certificate.provider} · ${certificate.period[locale]}`}
						points={certificate.learning[locale]}
					>
						<div className='mt-3 flex flex-wrap gap-x-6'>
							<a
								className={textLink}
								href={certificate.certificateUrl}
								target='_blank'
								rel='noreferrer'
							>
								{copy.certificateLabel}
								<ArrowUpRight
									size={14}
									aria-hidden='true'
								/>
							</a>
							{certificate.courseUrl ? (
								<a
									className={textLink}
									href={certificate.courseUrl}
									target='_blank'
									rel='noreferrer'
								>
									{copy.courseLabel}
									<ArrowUpRight
										size={14}
										aria-hidden='true'
									/>
								</a>
							) : null}
						</div>
					</ListRow>
				))}
			</div>
		</section>
	)
}
