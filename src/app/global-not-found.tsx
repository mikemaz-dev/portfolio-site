import type { Metadata } from 'next'

import { BrandMark } from '@/components/portfolio/BrandMark'

import './styles/not-found.css'
import { CONTACTS } from '@/data/site-content'

export const metadata: Metadata = {
	title: '404 / Page not found',
	description: 'The requested page does not exist. Return to the mikemaz-dev portfolio.'
}

export default function GlobalNotFound() {
	return (
		<html lang='en'>
			<body className='not-found-body'>
				<main className='not-found-page'>
					<header className='not-found-header'>
						<a
							className='not-found-brand'
							href='/'
							aria-label='mikemaz-dev homepage'
						>
							<BrandMark className='not-found-brand-icon' />
						</a>
						<span>404 / not found</span>
					</header>

					<section
						className='not-found-stage'
						aria-labelledby='not-found-title'
					>
						<p className='not-found-kicker'>Lost route / Потерянный маршрут</p>
						<h1
							className='not-found-code'
							id='not-found-title'
							aria-label='Error 404'
						>
							<span>4</span>
							<span className='not-found-zero'>0</span>
							<span>4</span>
						</h1>

						<div className='not-found-copy'>
							<h2>This page is not here</h2>
							<p lang='ru'>Такой страницы нет. Вернитесь в портфолио.</p>
							<nav aria-label='Return to the portfolio'>
								<a
									className='not-found-link not-found-link-primary'
									href='/'
								>
									English home
									<ArrowIcon />
								</a>
								<a
									className='not-found-link not-found-link-secondary'
									href='/ru'
									lang='ru'
								>
									На главную
									<ArrowIcon />
								</a>
							</nav>
						</div>
					</section>

					<footer className='not-found-footer'>
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
