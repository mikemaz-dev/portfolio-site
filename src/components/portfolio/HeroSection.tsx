import { ArrowDown, ArrowUpRight, Star } from 'lucide-react'
import Image from 'next/image'

import { SiteHeader } from './SiteHeader'
import { CONTACTS, CONTENT, type Locale } from '@/data/site-content'

export function HeroSection({ locale }: { locale: Locale }) {
	const copy = CONTENT[locale].hero

	return (
		<section
			className='intro'
			id='top'
			aria-labelledby='hero-title'
			data-header-theme='dark'
		>
			<SiteHeader locale={locale} />
			<div className='intro-layout'>
				<div className='intro-copy'>
					<p className='intro-identity'>
						{locale === 'ru' ? 'Михаил Мазуркевич' : 'Mikhail Mazurkevich'}
						<span>{locale === 'ru' ? 'Frontend-разработчик' : 'Frontend developer'}</span>
					</p>
					<h1 id='hero-title'>
						{copy.title.split('\n').map(line => (
							<span key={line}>{line}</span>
						))}
					</h1>
					<p className='intro-lead'>{copy.lead}</p>
					<div className='intro-actions'>
						<a
							className='button button-solid'
							href='#work'
						>
							{copy.workCta}
							<ArrowDown
								size={17}
								aria-hidden='true'
							/>
						</a>
						<a
							className='button button-outline button-outline-dark'
							href={CONTACTS.cv[locale]}
							target='_blank'
							rel='noreferrer'
						>
							{copy.cvCta}
							<ArrowUpRight
								size={17}
								aria-hidden='true'
							/>
						</a>
					</div>
					<p className='intro-availability'>
						<span aria-hidden='true' />
						{copy.eyebrow}
					</p>
				</div>
				<a
					className='intro-project'
					href='#work'
					aria-label={
						locale === 'ru'
							? 'TaskHub — любимый проект, продолжаю развивать. Смотреть проекты'
							: 'TaskHub — my favourite project, actively in development. Explore projects'
					}
				>
					<span className='intro-project-favourite'>
						<Star
							size={14}
							aria-hidden='true'
						/>
						{locale === 'ru' ? 'Любимый проект' : 'My favourite project'}
					</span>
					<div className='intro-project-window'>
						<div
							className='intro-project-toolbar'
							aria-hidden='true'
						>
							<span className='intro-window-dots'>
								<i />
								<i />
								<i />
							</span>
							<span>TaskHub</span>
							<ArrowUpRight size={16} />
						</div>
						<div className='intro-project-image'>
							<Image
								src='/wip_screen/taskhub.png'
								alt={
									locale === 'ru'
										? 'TaskHub — приложение для управления задачами'
										: 'TaskHub task management application'
								}
								fill
								sizes='(min-width: 1600px) 660px, (min-width: 1024px) 44vw, 1px'
								quality={80}
							/>
						</div>
					</div>
					<div className='intro-project-caption'>
						<span>
							{locale === 'ru'
								? 'TaskHub — продолжаю развивать'
								: 'TaskHub — actively in development'}
						</span>
						<span>Next.js / TypeScript</span>
					</div>
				</a>
			</div>
			<a
				className='intro-scroll'
				href='#about'
			>
				<span>{locale === 'ru' ? 'Ближе к делу' : 'A little more about me'}</span>
				<ArrowDown
					size={16}
					aria-hidden='true'
				/>
			</a>
		</section>
	)
}
