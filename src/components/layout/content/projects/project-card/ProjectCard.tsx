'use client'

import Image from 'next/image'

import { ProjectCardContent } from '@/components/layout/content/projects/project-card/ProjectCardContent'

import { ProjectCardFooter } from './ProjectCardFooter'
import type { IProject } from '@/types/project.types'

export function ProjectCard({
	title,
	description,
	preview,
	excludeTechs = [],
	difficult,
	livelink,
	githubLink
}: IProject) {
	return (
		<div className='flex h-full cursor-pointer flex-col gap-3 rounded-2xl bg-neutral-700/30 p-4 shadow-md backdrop-blur-md max-sm:p-2'>
			<Image
				src={preview || '/placeholder.svg'}
				alt='Preview'
				width={1200}
				height={800}
				className='h-48 w-full rounded-xl object-cover max-sm:h-32'
			/>

			<div className='flex h-full flex-col justify-between gap-5 rounded-b-lg'>
				<ProjectCardContent
					title={title}
					description={description}
					excludeTechs={excludeTechs}
				/>

				<ProjectCardFooter
					livelink={livelink}
					githubLink={githubLink}
					difficult={difficult}
				/>
			</div>
		</div>
	)
}
