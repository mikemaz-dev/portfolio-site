import { ArrowDown, ArrowUp, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { CodeReveal } from './CodeReveal'
import { ExperienceSection } from './ExperienceSection'
import { LearningSection } from './LearningSection'
import { ProjectShowcase } from './ProjectShowcase'
import { ReviewsSlider } from './ReviewsSlider'
import { ScrollRevealController } from './ScrollRevealController'
import { SiteHeader } from './SiteHeader'
import {
	CERTIFICATES,
	CONTACTS,
	CONTENT,
	type Locale,
	PROJECTS,
	SITE_URL,
	SOCIAL_LINKS
} from '@/data/site-content'

export function PortfolioPage({ locale }: { locale: Locale }) {
	const copy = CONTENT[locale]
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
						name: project.title,
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
			<ScrollRevealController />
			<a
				className='skip-link'
				href='#main-content'
			>
				{locale === 'ru' ? 'Перейти к содержанию' : 'Skip to content'}
			</a>
			<section
				className='hero'
				id='top'
				aria-labelledby='hero-title'
				data-locale={locale}
				data-header-theme='dark'
			>
				<SiteHeader locale={locale} />
				<div className='hero-editorial'>
					<p className='hero-eyebrow'>{copy.hero.eyebrow}</p>
					<CodeReveal />
					<div className='hero-main'>
						<h1
							id='hero-title'
							className='hero-title'
						>
							<HeroTitle text={copy.hero.title} />
						</h1>
						<p className='hero-lead'>{copy.hero.lead}</p>
					</div>
					<div className='hero-bottom'>
						<div className='hero-actions'>
							<a
								className='button button-solid'
								href='#work'
							>
								{copy.hero.workCta}
								<ArrowDown
									aria-hidden='true'
									size={18}
								/>
							</a>
							<a
								className='button button-outline button-outline-dark'
								href={CONTACTS.cv}
								target='_blank'
								rel='noreferrer'
							>
								{copy.hero.cvCta}
								<ArrowUpRight
									aria-hidden='true'
									size={18}
								/>
							</a>
						</div>
					</div>
					<div
						className='hero-accent'
						aria-hidden='true'
					/>
				</div>
			</section>

			<main id='main-content'>
				<section
					className='section section-about'
					id='about'
					aria-labelledby='about-title'
					data-header-theme='light'
				>
					<div className='about-layout'>
						<div
							className='about-heading'
							data-reveal='group'
						>
							<p className='section-label'>{copy.about.index}</p>
							<h2 id='about-title'>
								<MultilineText text={copy.about.title} />
							</h2>
						</div>
						<div
							className='about-portrait-column'
							data-reveal='portrait'
						>
							<div className='about-portrait'>
								<div className='about-portrait-frame'>
									<Image
										alt={copy.hero.portraitAlt}
										fill
										sizes='(min-width: 1024px) 42vw, (min-width: 768px) 48vw, 100vw'
										src='/images/mikhail-hero-v2.webp'
									/>
								</div>
							</div>
						</div>
						<div
							className='about-body'
							data-reveal='group'
						>
							<div className='about-copy'>
								{copy.about.paragraphs.map(paragraph => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
							<div className='about-links'>
								<a
									className='text-action'
									href={CONTACTS.cv}
									target='_blank'
									rel='noreferrer'
								>
									{copy.about.cv}
									<ArrowUpRight
										aria-hidden='true'
										size={17}
									/>
								</a>
								<a
									className='text-action'
									href={CONTACTS.linkedin}
									target='_blank'
									rel='noreferrer'
								>
									{copy.about.linkedin}
									<ArrowUpRight
										aria-hidden='true'
										size={17}
									/>
								</a>
							</div>
						</div>
					</div>
					<div
						className='stack-list'
						aria-labelledby='stack-title'
						role='group'
						data-reveal='group'
					>
						<h3 id='stack-title'>{copy.about.stackTitle}</h3>
						<ul>
							{copy.about.stack.map((item, index) => (
								<li key={item}>
									<span>{String(index + 1).padStart(2, '0')}</span>
									{item}
								</li>
							))}
						</ul>
					</div>
				</section>

				<ExperienceSection locale={locale} />
				<LearningSection locale={locale} />
				<WorkSection locale={locale} />

				<section
					className='section section-reviews'
					id='reviews'
					aria-labelledby='reviews-title'
					data-header-theme='light'
				>
					<div
						className='section-heading section-heading-wide'
						data-reveal='group'
					>
						<p className='section-label'>{copy.reviews.index}</p>
						<h2 id='reviews-title'>
							<MultilineText text={copy.reviews.title} />
						</h2>
					</div>
					<ReviewsSlider locale={locale} />
				</section>
			</main>

			<footer
				className='contact-section'
				id='contact'
				data-header-theme='dark'
			>
				<div
					className='contact-top'
					data-reveal='group'
				>
					<p className='section-label section-label-light'>{copy.contact.index}</p>
					<div>
						<h2 id='contact-title'>{copy.contact.title}</h2>
						<p>{copy.contact.text}</p>
					</div>
				</div>
				<a
					className='contact-email'
					href={`mailto:${CONTACTS.email}`}
					data-reveal='group'
				>
					<span>{copy.contact.emailLabel}</span>
					<strong>{CONTACTS.email}</strong>
					<ArrowUpRight
						aria-hidden='true'
						size={32}
					/>
				</a>
				<div className='contact-links'>
					{SOCIAL_LINKS.map((link, index) => (
						<a
							href={link.href}
							target='_blank'
							rel='noreferrer'
							key={link.label}
							data-reveal='item'
							data-reveal-delay={(index + 1).toString()}
						>
							{link.label}
							<ArrowUpRight
								aria-hidden='true'
								size={16}
							/>
						</a>
					))}
				</div>
				<div className='footer-line'>
					<p>
						© {new Date().getFullYear()} mikemaz-dev <span>{copy.contact.copyright}</span>
					</p>
					<a href='#top'>
						{copy.contact.backToTop}
						<ArrowUp
							aria-hidden='true'
							size={16}
						/>
					</a>
				</div>
			</footer>

			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: serializedJsonLd }}
			/>
		</>
	)
}

function HeroTitle({ text }: { text: string }) {
	return text.split('\n').map((line, index) => (
		<span
			className='hero-title-line'
			key={line}
		>
			<span>{line}</span>
			{index < text.split('\n').length - 1 ? <br /> : null}
		</span>
	))
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
			className='section section-work'
			id='work'
			aria-labelledby='work-title'
			data-header-theme='light'
		>
			<div
				className='section-heading section-heading-wide'
				data-reveal='group'
			>
				<p className='section-label'>{copy.index}</p>
				<h2 id='work-title'>
					<MultilineText text={copy.title} />
				</h2>
				<p className='section-intro'>{copy.intro}</p>
			</div>
			<ProjectShowcase locale={locale} />
		</section>
	)
}
