import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { TaskHubRelease } from './TaskHubRelease'
import { caption, textLink } from './styles'
import { CONTENT, type Locale, PATRIOT_AWARD, PROJECTS, TASKHUB_URL } from '@/data/site-content'

export function ProjectShowcase({ locale }: { locale: Locale }) {
	const copy = CONTENT[locale].work

	return (
		<div className='grid gap-x-[clamp(12px,1.6vw,24px)] gap-y-[clamp(40px,5vw,72px)] md:grid-cols-2'>
			{PROJECTS.map((project, index) => {
				const title = project.title[locale]

				return (
					<article
						className='min-w-0'
						key={project.liveUrl}
						data-reveal='item'
						data-reveal-delay={((index % 2) + 1).toString()}
					>
						<a
							className='group/project block'
							href={project.liveUrl}
							target='_blank'
							rel='noreferrer'
						>
							<div
								className='relative aspect-[4/3] overflow-hidden rounded-[20px] bg-chip'
								aria-hidden='true'
							>
								{project.liveUrl === TASKHUB_URL ? (
									<div className='absolute inset-0 transition-transform duration-[1.2s] ease-out-expo group-hover/project:scale-[1.03]'>
										<TaskHubRelease
											locale={locale}
											compact
										/>
									</div>
								) : (
									<Image
										alt=''
										fill
										sizes='(min-width: 1440px) 700px, (min-width: 768px) 48vw, 92vw'
										src={project.image}
										className='object-cover object-top transition-[scale] duration-[1.2s] ease-out-expo group-hover/project:scale-[1.04]'
									/>
								)}
								<span className='absolute top-4 right-4 grid size-11 scale-75 place-items-center rounded-full bg-white text-ink opacity-0 transition-[opacity,scale] duration-500 ease-out-expo group-hover/project:scale-100 group-hover/project:opacity-100'>
									<ArrowUpRight size={18} />
								</span>
							</div>
							<p className={`${caption} mt-5 text-ink/70`}>{project.kind[locale]}</p>
							<h3 className='mt-2 mb-0 text-[clamp(1.6rem,2.4vw,2.25rem)] leading-tight font-normal tracking-[-0.03em]'>
								{title}
							</h3>
						</a>
						<p className='mt-3 mb-0 max-w-[54ch] leading-relaxed text-pretty text-ink/65'>
							{project.description[locale]}
						</p>
						<p className='mt-3 mb-0 text-[13px] text-muted'>{project.tech.join(' · ')}</p>
						<div className='mt-1 flex flex-wrap gap-x-6'>
							{project.liveUrl === PATRIOT_AWARD.projectUrl ? (
								<a
									className={textLink}
									href='#awards'
								>
									{PATRIOT_AWARD.projectBadge[locale]}
								</a>
							) : null}
							{project.sourceUrl ? (
								<a
									className={textLink}
									href={project.sourceUrl}
									target='_blank'
									rel='noreferrer'
									aria-label={`${copy.source}: ${title}`}
								>
									{copy.source}
								</a>
							) : null}
						</div>
					</article>
				)
			})}
		</div>
	)
}
