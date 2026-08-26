'use client'

import { ArrowUpRight, CodeXml } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { CONTENT, type Locale, PROJECTS } from '@/data/site-content'

export function ProjectShowcase({ locale }: { locale: Locale }) {
	const [activeProject, setActiveProject] = useState(0)
	const copy = CONTENT[locale].work
	const selectedProject = PROJECTS[activeProject]

	return (
		<div className='project-layout'>
			<div
				className='project-preview-shell'
				aria-hidden='true'
			>
				<div
					className='project-preview-media'
					key={selectedProject.title}
				>
					<Image
						alt=''
						fill
						sizes='(min-width: 1024px) 48vw, 100vw'
						src={selectedProject.image}
					/>
				</div>
				<span className='project-preview-index'>
					{String(activeProject + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
				</span>
			</div>

			<div className='project-list'>
				{PROJECTS.map((project, index) => (
					<article
						className='project-row'
						data-active={activeProject === index}
						key={project.title}
						onFocusCapture={() => setActiveProject(index)}
						onMouseEnter={() => setActiveProject(index)}
					>
						<div className='project-mobile-image'>
							<Image
								alt={`${project.title} ${locale === 'ru' ? '— превью интерфейса' : 'interface preview'}`}
								fill
								sizes='(max-width: 1023px) 100vw, 1px'
								src={project.image}
							/>
						</div>
						<div className='project-row-heading'>
							<span>{String(index + 1).padStart(2, '0')}</span>
							<p>{project.kind[locale]}</p>
						</div>
						<h3>{project.title}</h3>
						<p className='project-description'>{project.description[locale]}</p>
						<ul
							className='project-tech'
							aria-label={`${project.title} ${locale === 'ru' ? '— технологии' : 'technology stack'}`}
						>
							{project.tech.map(item => (
								<li key={item}>{item}</li>
							))}
						</ul>
						<div className='project-links'>
							<a
								href={project.liveUrl}
								target='_blank'
								rel='noreferrer'
							>
								{copy.open}
								<ArrowUpRight
									aria-hidden='true'
									size={17}
								/>
							</a>
							<a
								href={project.sourceUrl}
								target='_blank'
								rel='noreferrer'
							>
								<CodeXml
									aria-hidden='true'
									size={17}
								/>
								{copy.source}
							</a>
						</div>
					</article>
				))}
			</div>
		</div>
	)
}
