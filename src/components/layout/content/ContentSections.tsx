'use client'

import { ArrowUpRight, Check, Github, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useLanguage } from '@/providers/LanguageProvider'

import { SITE_COPY } from '@/data/site-copy.data'
import { CONTACTS, TECH_GROUPS } from '@/data/site.data'

export function ContentSections() {
	const { language } = useLanguage()
	const copy = SITE_COPY[language]
	const featuredProjects = copy.projects.items.slice(0, 5)
	const testimonial = copy.testimonial.item
	const contactCards = [
		{
			title: copy.contact.cards.telegram,
			text: copy.contact.cards.telegramText,
			href: CONTACTS.telegram,
			logo: '/logos/telegram-logo.png',
			icon: null,
			className: 'contact-card telegram',
			external: true
		},
		{
			title: copy.contact.cards.kwork,
			text: copy.contact.cards.kworkText,
			href: CONTACTS.kwork,
			logo: '/logos/kwork-logo.png',
			icon: null,
			className: 'contact-card kwork',
			external: true
		},
		{
			title: copy.contact.cards.email,
			text: copy.contact.cards.emailText,
			href: `mailto:${CONTACTS.email}`,
			logo: null,
			icon: Mail,
			className: 'contact-card email'
		},
		{
			title: copy.contact.cards.github,
			text: copy.contact.cards.githubText,
			href: CONTACTS.github,
			logo: null,
			icon: Github,
			className: 'contact-card github',
			external: true
		}
	]

	return (
		<div className='flex flex-col'>
			<section
				className='section scroll-mt-24'
				id='about'
			>
				<div className='grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center'>
					<div className='about-photo-card'>
						<div className='about-photo-glow' />
						<Image
							alt='Mike Mazur portrait'
							className='relative z-10 h-full max-h-[560px] w-full rounded-[1.75rem] object-cover object-top'
							height={1200}
							src='/Me-edited.png'
							width={960}
						/>
						<div className='about-floating-badge top'>
							<strong>2+</strong>
							<span>{copy.about.facts[0].label}</span>
						</div>
						<div className='about-floating-badge bottom'>
							<strong>20+</strong>
							<span>{copy.about.facts[1].label}</span>
						</div>
					</div>
					<div
						className='language-content space-y-7'
						key={`about-${language}`}
					>
						<div>
							<p className='eyebrow'>{copy.about.eyebrow}</p>
							<h2 className='section-title'>{copy.about.title}</h2>
						</div>
						<p className='text-lg leading-8 text-slate-600 md:text-xl'>{copy.about.text}</p>
						<div className='grid gap-3 sm:grid-cols-3'>
							{copy.about.facts.map(fact => (
								<div
									className='about-fact'
									key={fact.label}
								>
									<strong>{fact.value}</strong>
									<span>{fact.label}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section
				className='section scroll-mt-24'
				id='services'
			>
				<div className='mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
					<div>
						<p className='eyebrow'>{copy.services.eyebrow}</p>
						<h2 className='section-title'>{copy.services.title}</h2>
					</div>
					<a
						className='text-link'
						href='#contact'
					>
						{copy.services.link} <ArrowUpRight size={18} />
					</a>
				</div>
				<div className='grid gap-4 md:grid-cols-2'>
					{copy.services.items.map(service => (
						<article
							className='service-card'
							key={service.title}
						>
							<div>
								<h3>{service.title}</h3>
								<p>{service.description}</p>
							</div>
							<ul>
								{service.deliverables.map(item => (
									<li key={item}>
										<Check size={16} />
										{item}
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</section>

			<section
				className='section scroll-mt-24'
				id='projects'
			>
				<div className='mb-10 text-center'>
					<p className='eyebrow justify-center'>{copy.projects.eyebrow}</p>
					<h2 className='section-title mx-auto max-w-3xl'>{copy.projects.title}</h2>
				</div>
				<div className='grid gap-5 lg:grid-cols-2'>
					{featuredProjects.map(project => (
						<Link
							className='project-card group'
							href={`/projects/${project.slug}`}
							key={project.slug}
						>
							<div className='project-preview'>
								{project.isPrivate ? (
									<div className='private-preview'>
										<span>{copy.projects.privateLabel}</span>
									</div>
								) : (
									<Image
										src={project.preview}
										alt={`${project.title} preview`}
										width={1200}
										height={760}
										className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
									/>
								)}
							</div>
							<div className='space-y-4 p-5'>
								<div className='flex items-start justify-between gap-4'>
									<div>
										<p className='text-sm font-semibold text-blue-600'>{project.kind}</p>
										<h3 className='mt-2 text-2xl font-semibold text-slate-950'>{project.title}</h3>
									</div>
									<span className='rounded-full border border-slate-200 p-2 text-slate-950 transition group-hover:border-blue-500 group-hover:text-blue-600'>
										<ArrowUpRight size={18} />
									</span>
								</div>
								<p className='text-slate-600'>{project.summary}</p>
								<div className='flex flex-wrap gap-2'>
									{project.techs.slice(0, 4).map(tech => (
										<span
											className='chip'
											key={tech}
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			<section className='section'>
				<div className='tech-panel rounded-[2rem] bg-slate-950 p-6 text-white md:p-10'>
					<div className='mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
						<div>
							<p className='eyebrow text-blue-300'>{copy.tech.eyebrow}</p>
							<h2 className='section-title text-white'>{copy.tech.title}</h2>
						</div>
						<p className='max-w-md text-slate-300'>{copy.tech.text}</p>
					</div>
					<div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
						{TECH_GROUPS.map(group => (
							<div
								className='rounded-2xl border border-white/10 bg-white/[0.04] p-5'
								key={group.title}
							>
								<h3 className='mb-4 font-semibold'>{group.title}</h3>
								<div className='flex flex-wrap gap-2'>
									{group.items.map(item => (
										<span
											className='rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200'
											key={item}
										>
											{item}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='section'>
				<div className='grid gap-10 lg:grid-cols-[0.8fr_1.2fr]'>
					<div>
						<p className='eyebrow'>{copy.process.eyebrow}</p>
						<h2 className='section-title'>{copy.process.title}</h2>
					</div>
					<div className='grid gap-4'>
						{copy.process.steps.map((step, index) => (
							<article
								className='process-card'
								key={step.title}
							>
								<span>{String(index + 1).padStart(2, '0')}</span>
								<div>
									<h3>{step.title}</h3>
									<p>{step.text}</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className='section'>
				<div className='rounded-[2rem] bg-blue-600 p-6 text-white shadow-2xl shadow-blue-600/20 md:p-10'>
					<p className='eyebrow text-blue-100'>{copy.testimonial.eyebrow}</p>
					<blockquote className='max-w-4xl text-2xl leading-tight font-semibold md:text-4xl'>
						&ldquo;{testimonial.quote}&rdquo;
					</blockquote>
					<p className='mt-6 text-blue-100'>
						{testimonial.authorName}, {testimonial.authorRole}
						{testimonial.companyLabel ? ` - ${testimonial.companyLabel}` : ''}
					</p>
				</div>
			</section>

			<section
				className='section scroll-mt-24'
				id='faq'
			>
				<div className='mb-10 text-center'>
					<p className='eyebrow justify-center'>{copy.faq.eyebrow}</p>
					<h2 className='section-title'>{copy.faq.title}</h2>
				</div>
				<div className='mx-auto grid max-w-4xl gap-3'>
					{copy.faq.items.map(item => (
						<details
							className='faq-item'
							key={item.question}
						>
							<summary>{item.question}</summary>
							<p>{item.answer}</p>
						</details>
					))}
				</div>
			</section>

			<section
				className='section scroll-mt-24'
				id='contact'
			>
				<div className='contact-panel'>
					<div>
						<p className='eyebrow text-blue-200'>{copy.contact.eyebrow}</p>
						<h2>{copy.contact.title}</h2>
						<p>{copy.contact.text}</p>
					</div>
					<div className='contact-grid'>
						{contactCards.map(card => {
							const Icon = card.icon

							return (
								<a
									className={card.className}
									href={card.href}
									key={card.title}
									rel={card.external ? 'noopener noreferrer' : undefined}
									target={card.external ? '_blank' : undefined}
								>
									<span className='contact-card-icon'>
										{card.logo ? (
											<Image
												alt={`${card.title} logo`}
												className='h-7 w-7 object-contain'
												height={56}
												src={card.logo}
												width={56}
											/>
										) : Icon ? (
											<Icon size={22} />
										) : null}
									</span>
									<span>
										<strong>{card.title}</strong>
										<small>{card.text}</small>
									</span>
									<ArrowUpRight
										className='contact-card-arrow'
										size={20}
									/>
								</a>
							)
						})}
					</div>
				</div>
			</section>

			<section className='section pt-0'>
				<div className='grid gap-4 md:grid-cols-3'>
					{copy.stats.map(stat => (
						<div
							className='stat-card'
							key={stat.label}
						>
							<strong>{stat.value}</strong>
							<span>{stat.label}</span>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
