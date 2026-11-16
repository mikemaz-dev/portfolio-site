import { ArrowUpRight, FileText } from 'lucide-react'

import { DotField } from './DotField'
import { caption, pillGhostOnDark, pillWhite, shell } from './styles'
import { CONTENT, type Locale, PATRIOT_AWARD } from '@/data/site-content'

const RANK = 'III'

const corner = 'absolute text-xl leading-none font-light text-white'

export function AwardsSection({ locale }: { locale: Locale }) {
	const award = PATRIOT_AWARD
	const ru = locale === 'ru'
	// "Diploma III degree" / "Third place": the Roman numeral becomes a highlighted badge.
	const words = award.title[locale].split(' ').filter(word => word !== RANK)
	const left = words[0]
	const right = words.slice(1).join(' ')
	const split =
		'supports-[animation-timeline:view()]:motion-safe:[animation-range:entry_10%_cover_45%] supports-[animation-timeline:view()]:motion-safe:[animation-timeline:view()]'

	return (
		<div className={shell}>
			<section
				className='relative isolate overflow-hidden rounded-[20px] bg-ink px-[clamp(20px,3.4vw,48px)] py-[clamp(56px,8vw,120px)] text-white select-none'
				id='awards'
				aria-labelledby='awards-title'
				data-header-theme='dark'
			>
				<DotField
					tone='light'
					spacing={40}
					className='-z-10 opacity-70'
				/>
				<span
					aria-hidden='true'
					className={`${corner} top-4 left-4`}
				>
					+
				</span>
				<span
					aria-hidden='true'
					className={`${corner} top-4 right-4`}
				>
					+
				</span>
				<span
					aria-hidden='true'
					className={`${corner} bottom-4 left-4`}
				>
					+
				</span>
				<span
					aria-hidden='true'
					className={`${corner} right-4 bottom-4`}
				>
					+
				</span>

				<p
					className={`${caption} relative text-white/60`}
					data-field-clear
				>
					{CONTENT[locale].nav.awards} · <span lang='ru'>{award.competition}</span> · {award.year}
				</p>

				{/* The two words drift apart as the block scrolls in, revealing the rank between them. */}
				<h2
					id='awards-title'
					aria-label={award.title[locale]}
					className='relative mt-6 mb-0 grid grid-cols-[1fr_auto_1fr] items-center gap-x-[clamp(12px,2.4vw,40px)] text-[clamp(2.6rem,9vw,9.5rem)] leading-[0.95] font-normal tracking-[-0.045em] [--split:12vw]'
					data-field-clear
				>
					<span
						aria-hidden='true'
						className={`justify-self-start ${split} supports-[animation-timeline:view()]:motion-safe:animate-split-left`}
					>
						{left}
					</span>
					<span
						aria-hidden='true'
						className='relative isolate inline-grid place-items-center overflow-hidden rounded-[0.22em] bg-accent px-[0.22em] pt-[0.02em] pb-[0.08em] text-white shadow-[0_0_80px_-10px_rgb(47_60_255/70%)] supports-[animation-timeline:view()]:motion-safe:animate-badge-in supports-[animation-timeline:view()]:motion-safe:[animation-range:entry_20%_cover_45%] supports-[animation-timeline:view()]:motion-safe:[animation-timeline:view()]'
					>
						{RANK}
						<span className='pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/35 blur-md motion-safe:animate-sheen' />
					</span>
					<span
						aria-hidden='true'
						className={`justify-self-end text-right ${split} supports-[animation-timeline:view()]:motion-safe:animate-split-right`}
					>
						{right}
					</span>
				</h2>

				<div
					className='relative mt-[clamp(48px,8vw,120px)] grid gap-8 border-t border-white/25 pt-6 md:grid-cols-3'
					data-field-clear
				>
					<div>
						<p className={`${caption} text-white/55`}>{ru ? 'Этап' : 'Stage'}</p>
						<p className='mt-2 mb-0 text-[clamp(1.2rem,1.8vw,1.6rem)] leading-snug tracking-[-0.02em]'>
							{award.stage[locale]}
						</p>
					</div>
					<div>
						<p className={`${caption} text-white/55`}>{ru ? 'Номинация' : 'Category'}</p>
						<p className='mt-2 mb-0 text-[clamp(1.2rem,1.8vw,1.6rem)] leading-snug tracking-[-0.02em]'>
							{award.category[locale]}
						</p>
					</div>
					<div>
						<p className={`${caption} text-white/55`}>{award.projectTitle[locale]}</p>
						<p className='mt-2 mb-0 text-sm leading-relaxed text-white/70'>
							{award.projectDescription[locale]}
						</p>
						<div className='mt-5 flex flex-wrap gap-2'>
							<a
								className={pillWhite}
								href={award.projectUrl}
								target='_blank'
								rel='noreferrer'
							>
								{CONTENT[locale].work.open}
								<ArrowUpRight
									size={15}
									aria-hidden='true'
								/>
							</a>
							<a
								className={pillGhostOnDark}
								href={award.diplomaUrl}
								target='_blank'
								rel='noreferrer'
							>
								<FileText
									size={15}
									aria-hidden='true'
								/>
								{ru ? 'Диплом' : 'Diploma'}
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
