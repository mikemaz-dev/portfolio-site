import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { DotField } from './DotField'
import { caption, pillDark, pillDot, pillLight, shell } from './styles'
import { CONTACTS, CONTENT, type Locale, PATRIOT_AWARD, TASKHUB_URL } from '@/data/site-content'

export function HeroSection({ locale }: { locale: Locale }) {
	const copy = CONTENT[locale].hero
	const ru = locale === 'ru'
	const mask = 'block overflow-hidden pb-[0.08em] -mb-[0.08em] whitespace-nowrap'
	const rise = 'block motion-safe:animate-mask-up'

	return (
		<section
			className='relative isolate flex min-h-[max(620px,100svh)] flex-col select-none'
			id='top'
			aria-labelledby='hero-title'
			data-header-theme='light'
		>
			<DotField className='-z-10' />

			<div
				className={`${shell} flex flex-1 flex-col items-center justify-center pt-28 pb-10 text-center`}
			>
				<p
					className={`${caption} mb-7 flex items-center gap-2.5 motion-safe:animate-fade-in`}
					data-field-clear
				>
					<span
						aria-hidden='true'
						className='size-2 rounded-full bg-[#1fc16b] motion-safe:animate-blink'
					/>
					{copy.eyebrow}
				</p>
				<h1
					id='hero-title'
					className='relative isolate m-0 text-[clamp(1.85rem,8.4vw,8.6rem)] leading-[0.98] font-medium tracking-[-0.045em]'
					data-field-clear
				>
					<span className={mask}>
						<span className={`${rise} motion-safe:[animation-delay:100ms]`}>
							{ru ? 'Привет, я' : "Hi, I'm"}{' '}
							<span className='relative mx-[0.04em] inline-block h-[0.78em] w-[1.25em] -translate-y-[0.04em] overflow-hidden rounded-full align-baseline transition-[width] duration-700 ease-out-expo hover:w-[1.6em]'>
								<Image
									src='/images/mikhail-hero-v2.webp'
									alt=''
									fill
									priority
									sizes='160px'
									className='object-cover object-[50%_30%]'
								/>
							</span>{' '}
							{ru ? 'Михаил' : 'Mikhail'}
						</span>
					</span>
					{/* The role line gets "selected" on load: a highlight sweeps in, then iOS-style handles appear. */}
					{/* Visible from the first paint (it is the LCP element); only the highlight animates. */}
					<span className='mt-[0.12em] block whitespace-nowrap'>
						<span className='relative inline-block px-[0.14em] pb-[0.06em] text-white motion-safe:animate-text-select'>
							<span
								aria-hidden='true'
								className='absolute inset-0 -z-10 origin-left rounded-[0.12em] bg-accent motion-safe:animate-highlight-sweep'
							/>
							{ru ? 'frontend-разработчик' : 'frontend developer'}
							<span
								aria-hidden='true'
								className='absolute top-0 -left-[0.02em] h-full w-[0.035em] min-w-[2px] rounded-full bg-accent motion-safe:animate-handle-in'
							>
								<span className='absolute -top-[0.16em] left-1/2 size-[0.16em] min-h-2 min-w-2 -translate-x-1/2 rounded-full bg-accent' />
							</span>
							<span
								aria-hidden='true'
								className='absolute top-0 -right-[0.02em] h-full w-[0.035em] min-w-[2px] rounded-full bg-accent motion-safe:animate-handle-in'
							>
								<span className='absolute -bottom-[0.16em] left-1/2 size-[0.16em] min-h-2 min-w-2 -translate-x-1/2 rounded-full bg-accent' />
							</span>
						</span>
					</span>
				</h1>
				<p
					className='mt-7 max-w-[46ch] text-[clamp(15px,1.25vw,18px)] leading-relaxed text-pretty text-ink/75 motion-safe:animate-fade-in motion-safe:[animation-delay:450ms]'
					data-field-clear
				>
					{copy.lead}
				</p>
				<div
					className='mt-8 flex flex-wrap justify-center gap-2 motion-safe:animate-fade-in motion-safe:[animation-delay:600ms]'
					data-field-clear
				>
					<a
						className={pillDark}
						href='#work'
					>
						{copy.workCta}
						<span
							className={pillDot}
							aria-hidden='true'
						/>
					</a>
					<a
						className={pillLight}
						href={CONTACTS.cv[locale]}
						target='_blank'
						rel='noreferrer'
					>
						{copy.cvCta}
						<ArrowUpRight
							size={15}
							aria-hidden='true'
						/>
					</a>
				</div>
			</div>

			<div
				className={`${shell} flex flex-wrap items-end justify-between gap-4 pb-[clamp(20px,3vw,36px)] motion-safe:animate-fade-in motion-safe:[animation-delay:800ms] max-md:pb-20`}
			>
				<div className='flex flex-wrap gap-2'>
					<a
						className='group/release inline-flex min-h-11 items-center gap-3 rounded-full bg-white py-1.5 pr-5 pl-1.5 text-sm shadow-[0_10px_30px_-18px_rgb(8_8_12/50%)] transition-transform duration-500 ease-out-expo hover:-translate-y-0.5'
						href={TASKHUB_URL}
						target='_blank'
						rel='noreferrer'
						data-field-clear
					>
						<span className={`${caption} rounded-full bg-accent px-3 py-2 text-white`}>
							{ru ? 'Новое' : 'New'}
						</span>
						{ru ? 'Вышла новая версия TaskHub' : 'TaskHub — a new release is out'}
						<ArrowUpRight
							size={16}
							aria-hidden='true'
							className='transition-transform duration-500 ease-out-expo group-hover/release:translate-x-0.5 group-hover/release:-translate-y-0.5'
						/>
					</a>
					<a
						className='group/award inline-flex min-h-11 items-center gap-3 rounded-full bg-white py-1.5 pr-5 pl-1.5 text-sm shadow-[0_10px_30px_-18px_rgb(8_8_12/50%)] transition-transform duration-500 ease-out-expo hover:-translate-y-0.5'
						href='#awards'
						data-field-clear
					>
						<span className='grid h-[34px] min-w-[34px] place-items-center rounded-full bg-ink px-2.5 text-[13px] font-medium tracking-[0.04em] text-white'>
							III
						</span>
						{ru
							? `3 место в конкурсе ${PATRIOT_AWARD.competition}`
							: `3rd place in the ${PATRIOT_AWARD.competition} contest`}
						<ArrowDown
							size={16}
							aria-hidden='true'
							className='transition-transform duration-500 ease-out-expo group-hover/award:translate-y-0.5'
						/>
					</a>
				</div>
				<a
					className={`${caption} hidden min-h-11 items-center gap-2 text-muted transition-colors hover:text-ink md:inline-flex`}
					href='#about'
					data-field-clear
				>
					{ru ? 'Листайте' : 'Scroll'}
					<ArrowDown
						size={14}
						aria-hidden='true'
					/>
				</a>
			</div>
		</section>
	)
}
