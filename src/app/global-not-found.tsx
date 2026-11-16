import type { Metadata } from 'next'

import { BrandMark } from '@/components/portfolio/BrandMark'

import './globals.css'
import { CONTACTS } from '@/data/site-content'

export const metadata: Metadata = {
	title: '404 / Page not found',
	description: 'The requested page does not exist. Return to the mikemaz-dev portfolio.'
}

export default function GlobalNotFound() {
	return (
		<html lang='en'>
			<body className='min-w-80 bg-paper font-sans text-ink'>
				<main className='grid min-h-svh grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden px-[clamp(20px,4vw,64px)] py-[max(20px,env(safe-area-inset-top))]'>
					<header className='flex min-h-11 items-center justify-between gap-5 border-b border-line pb-4 text-xs'>
						<a
							className='inline-flex size-11 items-center justify-center rounded-full transition-transform duration-700 ease-out-expo hover:scale-110'
							href='/'
							aria-label='mikemaz-dev homepage'
						>
							<BrandMark className='block size-8' />
						</a>
						<span className='tracking-[0.16em] text-muted uppercase'>404 / not found</span>
					</header>

					<section
						className='grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-x-6 py-[clamp(28px,5vh,52px)] lg:grid-cols-12'
						aria-labelledby='not-found-title'
					>
						<p className='m-0 text-[11px] leading-7 tracking-[0.16em] text-muted uppercase lg:col-span-5'>
							Lost route / Потерянный маршрут
						</p>
						<h1
							className='m-0 -mb-[0.04em] self-end text-[clamp(10rem,28vw,30rem)] leading-[0.72] font-light tracking-[-0.085em] whitespace-nowrap lg:col-span-8 lg:row-start-2'
							id='not-found-title'
							aria-label='Error 404'
						>
							<span>4</span>
							<span className='motion-safe:animate-float bg-[linear-gradient(135deg,#b4b9ff,#f5a3d8)] bg-clip-text text-transparent'>
								0
							</span>
							<span>4</span>
						</h1>

						<div className='self-end pb-4 lg:col-span-4 lg:row-start-2'>
							<h2 className='m-0 max-w-[12ch] text-[clamp(2rem,3.4vw,4rem)] leading-[0.98] font-light tracking-[-0.04em] text-balance'>
								This page is not here
							</h2>
							<p
								className='mt-5 mb-0 max-w-[34ch] text-[clamp(14px,1vw,16px)] leading-relaxed text-ink/70'
								lang='ru'
							>
								Такой страницы нет. Вернитесь в портфолио.
							</p>
							<nav
								className='mt-8 flex flex-wrap gap-3'
								aria-label='Return to the portfolio'
							>
								<a
									className='inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-5 text-[13px] text-white uppercase transition-colors duration-500 hover:bg-accent'
									href='/'
								>
									English home
									<ArrowIcon />
								</a>
								<a
									className='inline-flex min-h-11 items-center gap-3 rounded-full bg-chip px-5 text-[13px] uppercase transition-colors duration-500 hover:bg-ink hover:text-white'
									href='/ru'
									lang='ru'
								>
									На главную
									<ArrowIcon />
								</a>
							</nav>
						</div>
					</section>

					<footer className='flex items-center justify-between gap-5 text-xs text-muted'>
						<a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
						<span>Frontend developer / Mikhail Mazurkevich</span>
					</footer>
				</main>
			</body>
		</html>
	)
}

function ArrowIcon() {
	return (
		<svg
			aria-hidden='true'
			fill='none'
			height='18'
			viewBox='0 0 18 18'
			width='18'
		>
			<path
				d='M4 14 14 4m0 0H6m8 0v8'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='1.5'
			/>
		</svg>
	)
}
