import { Heading } from '@/ui/Heading'
import { ProjectCard } from './project-card/ProjectCard'
import { PROJECTS_DATA } from '@/data/projects/projects.data'

export function Projects() {
	return (
		<div className='flex flex-col gap-10'>
			<Heading title='Projects' />
			<div className='grid grid-cols-3 gap-4 max-sm:grid-cols-1'>
				{PROJECTS_DATA.map((project, i) => (
					<ProjectCard
						key={i}
						title={project.title}
						description={project.description}
						preview={project.preview}
						excludeTechs={project.excludeTechs}
						difficult={project.difficult}
						livelink={project.livelink}
						githubLink={project.githubLink}
					/>
				))}
			</div>
		</div>
	)
}
