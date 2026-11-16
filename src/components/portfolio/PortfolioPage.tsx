import { ArrowUp, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { AwardsSection } from './AwardsSection'
import { ExperienceSection } from './ExperienceSection'
import { HeroSection } from './HeroSection'
import { LearningSection } from './LearningSection'
import { PageLoader } from './PageLoader'
import { ProjectShowcase } from './ProjectShowcase'
import { ReviewsSlider } from './ReviewsSlider'
import { ScrollRail } from './ScrollRail'
import { ScrollRevealController } from './ScrollRevealController'
import { SectionNavigation } from './SectionNavigation'
import { SiteHeader } from './SiteHeader'
import { WeightWordmark } from './WeightWordmark'
import { caption, pillDark, pillDot, pillLight, sectionSpace, sectionTitle, shell } from './styles'
import {
	CERTIFICATES,
	CONTACTS,
	CONTENT,
	type Locale,
	PATRIOT_AWARD,
	PROJECTS,
	SITE_URL,
	SOCIAL_LINKS
} from '@/data/site-content'

export function PortfolioPage({ locale }: { locale: Locale }) {
	const copy = CONTENT[locale]
	const cvUrl = CONTACTS.cv[locale]
	const pageUrl = locale === 'en' ? SITE_URL : `${SITE_URL}/ru`
	const personId = `${SITE_URL}/#person`
	const websiteId = `${SITE_URL}/#website`
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': personId,
				name: 'Mikhail Mazurkevich',
				alternateName: 'mikemaz-dev',
				url: pageUrl,
				image: `${SITE_URL}/images/mikhail-hero-v2.webp`,
				jobTitle: 'Frontend Developer',
				award: `${PATRIOT_AWARD.projectBadge[locale]} (${PATRIOT_AWARD.stage[locale]}, ${PATRIOT_AWARD.year})`,
				email: `mailto:${CONTACTS.email}`,
				sameAs: [CONTACTS.github, CONTACTS.linkedin, CONTACTS.telegram],
				knowsAbout: [
					'React',
					'Next.js',
					'TypeScript',
					'JavaScript',
					'Responsive web design',
					'Frontend development'
				],
				hasOccupation: {
					'@type': 'Occupation',
					name: 'Frontend Developer',
					occupationLocation: { '@type': 'Country', name: 'Belarus' }
				},
				hasCredential: CERTIFICATES.map((_, index) => ({
					'@id': `${pageUrl}#credential-${index + 1}`
				}))
			},
			{
				'@type': 'ProfilePage',
				'@id': `${pageUrl}#profile`,
				url: pageUrl,
				name: locale === 'ru' ? 'Портфолио Михаила Мазуркевича' : 'Mikhail Mazurkevich portfolio',
				inLanguage: locale,
				isPartOf: { '@id': websiteId },
				mainEntity: { '@id': personId }
			},
			{
				'@type': 'WebSite',
				'@id': websiteId,
				url: SITE_URL,
				name: 'mikemaz-dev',
				inLanguage: ['en', 'ru'],
				publisher: { '@id': personId }
			},
			{
				'@type': 'ItemList',
				'@id': `${pageUrl}#selected-work`,
				name: locale === 'ru' ? 'Избранные frontend-проекты' : 'Selected frontend projects',
				itemListElement: PROJECTS.map((project, index) => ({
					'@type': 'ListItem',
					position: index + 1,
					item: {
						'@type': 'CreativeWork',
						name: project.title[locale],
						description: project.description[locale],
						url: project.liveUrl,
						image: `${SITE_URL}${project.image}`,
						creator: { '@id': personId }
					}
				}))
			},
			...CERTIFICATES.map((certificate, index) => ({
				'@type': 'EducationalOccupationalCredential',
				'@id': `${pageUrl}#credential-${index + 1}`,
				name: certificate.title[locale],
				url: certificate.certificateUrl,
				credentialCategory: 'Certificate',
				recognizedBy: { '@type': 'Organization', name: certificate.provider }
			}))
		]
	}

	const serializedJsonLd = JSON.stringify(jsonLd).replace(/</g, '\\u003c')

	return (
		<>
			<PageLoader locale={locale} />
			<ScrollRail locale={locale} />
			<ScrollRevealController />
			<SectionNavigation />
			<a
				className='fixed top-4 left-4 z-[200] -translate-y-[160%] rounded-full bg-ink px-5 py-3 text-white transition-transform duration-300 focus:translate-y-0'
				href='#main-content'
			>
				{locale === 'ru' ? 'Перейти к содержанию' : 'Skip to content'}
			</a>
			<SiteHeader locale={locale} />
			<HeroSection locale={locale} />

			<main id='main-content'>
				<section
					className={`${shell} ${sectionSpace}`}
					id='about'
					aria-labelledby='about-title'
					data-header-theme='light'
				>
					<div
						className='flex flex-wrap items-end justify-between gap-6'
						data-reveal='group'
					>
						<h2
							id='about-title'
							className={sectionTitle}
						>
							<MultilineText text={copy.about.title} />
						</h2>
						<p className={`${caption} max-w-[30ch] md:text-right`}>{copy.about.index}</p>
					</div>
					<div className='mt-[clamp(40px,6vw,88px)] grid gap-[clamp(24px,4vw,64px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]'>
						<div
							className='relative aspect-[4/5] overflow-hidden rounded-[20px] bg-chip'
							data-reveal='item'
						>
							<Image
								alt={copy.hero.portraitAlt}
								fill
								sizes='(min-width: 768px) 46vw, 100vw'
								src='/images/mikhail-hero-v2.webp'
								className='object-cover'
							/>
						</div>
						<div
							className='flex flex-col'
							data-reveal='group'
						>
							<div className='grid gap-5 text-[clamp(1.15rem,1.7vw,1.6rem)] leading-snug tracking-[-0.015em]'>
								{copy.about.paragraphs.map(paragraph => (
									<p
										className='m-0 text-pretty'
										key={paragraph}
									>
										{paragraph}
									</p>
								))}
							</div>
							<div className='mt-8 flex flex-wrap gap-2'>
								<a
									className={pillDark}
									href={cvUrl}
									target='_blank'
									rel='noreferrer'
								>
									{copy.about.cv}
									<span
										className={pillDot}
										aria-hidden='true'
									/>
								</a>
								<a
									className={pillLight}
									href={CONTACTS.linkedin}
									target='_blank'
									rel='noreferrer'
								>
									{copy.about.linkedin}
									<ArrowUpRight
										aria-hidden='true'
										size={15}
									/>
								</a>
							</div>
							<div
								className='mt-auto pt-12'
								aria-labelledby='stack-title'
								role='group'
							>
								<h3
									id='stack-title'
									className={`${caption} mb-4 font-normal text-muted`}
								>
									{copy.about.stackTitle}
								</h3>
								<ul className='m-0 flex list-none flex-wrap gap-2 p-0'>
									{copy.about.stack.map(item => (
										<li
											className='rounded-full border border-line px-4 py-2 text-sm transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white'
											key={item}
										>
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</section>

				<WorkSection locale={locale} />
				<ExperienceSection locale={locale} />
				<AwardsSection locale={locale} />
				<LearningSection locale={locale} />

				<section
					className={`${shell} ${sectionSpace} pt-0`}
					id='reviews'
					aria-labelledby='reviews-title'
					data-header-theme='light'
				>
					<div
						className='mb-[clamp(32px,5vw,64px)] flex flex-wrap items-end justify-between gap-6'
						data-reveal='group'
					>
						<h2
							id='reviews-title'
							className={sectionTitle}
						>
							<MultilineText text={copy.reviews.title} />
						</h2>
					</div>
					<ReviewsSlider locale={locale} />
				</section>
			</main>

			<footer
				className={`${shell} pb-[clamp(16px,2vw,24px)]`}
				id='contact'
				data-header-theme='light'
			>
				<div
					className='grid gap-6 border-t border-line pt-[clamp(48px,7vw,96px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]'
					data-reveal='group'
				>
					<h2
						id='contact-title'
						className={sectionTitle}
					>
						{copy.contact.title}
					</h2>
					<div>
						<p className='m-0 max-w-[44ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-snug text-ink/75'>
							{copy.contact.text}
						</p>
						<p className={`${caption} mt-8 text-muted`}>{copy.contact.emailLabel}</p>
						<a
							className='group/mail mt-2 inline-flex items-center gap-3 border-b border-ink pb-1 text-[clamp(1.3rem,2.6vw,2.4rem)] tracking-[-0.03em] break-all transition-colors duration-300 hover:border-accent hover:text-accent'
							href={`mailto:${CONTACTS.email}`}
						>
							{CONTACTS.email}
							<ArrowUpRight
								aria-hidden='true'
								className='shrink-0 transition-transform duration-500 ease-out-expo group-hover/mail:translate-x-1 group-hover/mail:-translate-y-1'
							/>
						</a>
						<div className='mt-8 flex flex-wrap gap-2'>
							{SOCIAL_LINKS.map(link => (
								<a
									className={pillLight}
									href={link.href}
									target='_blank'
									rel='noreferrer'
									key={link.label}
								>
									{link.label}
									<ArrowUpRight
										aria-hidden='true'
										size={14}
									/>
								</a>
							))}
						</div>
					</div>
				</div>

				<div
					className='relative isolate mt-[clamp(56px,8vw,120px)] overflow-hidden rounded-[20px] bg-ink px-[clamp(20px,3vw,40px)] pt-[clamp(28px,4vw,48px)] pb-5 text-white'
					data-header-theme='dark'
				>
					<p className={`${caption} flex items-center gap-2 text-white/45`}>
						<span
							aria-hidden='true'
							className='size-1.5 rounded-full bg-accent motion-safe:animate-blink'
						/>
						<span className='pointer-coarse:hidden'>
							{locale === 'ru'
								? 'Проведите курсором по буквам'
								: 'Run your cursor over the letters'}
						</span>
						<span className='hidden pointer-coarse:inline'>
							{locale === 'ru' ? 'Проведите пальцем по буквам' : 'Swipe across the letters'}
						</span>
					</p>
					<WeightWordmark
						text='mikemaz-dev'
						className='mt-[clamp(16px,3vw,40px)] cursor-default text-[clamp(3.4rem,14.6vw,14.5rem)] leading-[0.9] tracking-[-0.05em]'
					/>
					<div className='mt-[clamp(24px,4vw,48px)] flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5'>
						<p className={`${caption} text-white/55`}>
							© {new Date().getFullYear()} ·{' '}
							{locale === 'ru'
								? 'Сделано на Next.js, Tailwind и Web Audio'
								: 'Built with Next.js, Tailwind and Web Audio'}
						</p>
						<a
							className='group/top grid size-12 place-items-center rounded-full bg-white text-ink transition-[background-color,color,transform] duration-500 ease-out-expo hover:bg-accent hover:text-white active:scale-90'
							href='#top'
							aria-label={copy.contact.backToTop}
						>
							<ArrowUp
								aria-hidden='true'
								size={18}
								className='transition-transform duration-500 ease-out-expo group-hover/top:-translate-y-0.5'
							/>
						</a>
					</div>
				</div>
			</footer>

			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: serializedJsonLd }}
			/>
		</>
	)
}

function MultilineText({ text }: { text: string }) {
	return text.split('\n').map((line, index) => (
		<span key={line}>
			{line}
			{index < text.split('\n').length - 1 ? <br /> : null}
		</span>
	))
}

function WorkSection({ locale }: { locale: Locale }) {
	const copy = CONTENT[locale].work

	return (
		<section
			className={`${shell} ${sectionSpace} pt-0`}
			id='work'
			aria-labelledby='work-title'
			data-header-theme='light'
		>
			<div
				className='mb-[clamp(32px,5vw,64px)] flex flex-wrap items-end justify-between gap-6'
				data-reveal='group'
			>
				<h2
					id='work-title'
					className={sectionTitle}
				>
					{copy.title.replace('\n', ' ')}
				</h2>
				<p className={`${caption} max-w-[34ch] md:text-right`}>{copy.intro}</p>
			</div>
			<ProjectShowcase locale={locale} />
		</section>
	)
}
