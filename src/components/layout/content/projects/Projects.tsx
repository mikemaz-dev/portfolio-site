'use client'

import * as m from 'motion/react-m'

import { ProjectCard } from './project-card/ProjectCard'
import { PROJECTS_DATA } from '@/data/projects/projects.data'

export function Projects() {
	return (
		<div className='grid grid-cols-3 gap-8 max-sm:grid-cols-1'>
			{PROJECTS_DATA.map((project, i) => (
				<m.div
					key={project.title}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{
						delay: i * 0.1,
						duration: 0.5,
						ease: 'easeOut'
					}}
				>
					<ProjectCard
						title={project.title}
						description={project.description}
						preview={project.preview}
						excludeTechs={project.excludeTechs}
						difficult={project.difficult}
						livelink={project.livelink}
						githubLink={project.githubLink}
					/>
				</m.div>
			))}
		</div>
	)
}
