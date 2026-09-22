import { ArrowDown, ArrowUpRight } from 'lucide-react'

import { SiteHeader } from './SiteHeader'
import { TaskHubRelease } from './TaskHubRelease'
import { CONTACTS, CONTENT, type Locale, TASKHUB_URL } from '@/data/site-content'

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
					<a
						className='intro-release-mobile'
						href={TASKHUB_URL}
						target='_blank'
						rel='noreferrer'
					>
						<span>
							TaskHub <span>{locale === 'ru' ? 'Новая версия' : 'New release'}</span>
						</span>
						<ArrowUpRight
							size={18}
							aria-hidden='true'
						/>
					</a>
				</div>
				<a
					className='intro-project'
					href={TASKHUB_URL}
					target='_blank'
					rel='noreferrer'
					aria-label={
						locale === 'ru'
							? 'TaskHub — новая версия. Открыть приложение'
							: 'TaskHub — new release. Open the app'
					}
				>
					<TaskHubRelease locale={locale} />
					<div className='intro-project-caption'>
						<span>{locale === 'ru' ? 'Открыть новую версию' : 'Explore the new release'}</span>
						<ArrowUpRight
							size={18}
							aria-hidden='true'
						/>
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
