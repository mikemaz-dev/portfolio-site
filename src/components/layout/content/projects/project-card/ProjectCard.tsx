import * as m from 'motion/react-m'
import Image from 'next/image'

import { TechStack } from '@/ui/TechStack'

import {
	cardAnimation,
	descriptionAnimation,
	imageOverlayAnimation,
	titleAnimation
} from './ProjectCardAnimations'
import { ProjectCardFooter } from './ProjectCardFooter'
import type { IProject } from '@/data/projects/project.types'

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
		<m.div
			className='group flex flex-col relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition'
			{...cardAnimation}
		>
			<div className='relative h-64 w-full'>
				<Image
					src={preview || '/placeholder.svg'}
					alt={title}
					fill
					className='object-cover transition-transform duration-300 group-hover:scale-105'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10' />
				<m.div
					className='absolute bottom-0 z-20 p-5 text-white'
					{...imageOverlayAnimation}
				>
					<m.h3
						className='text-xl font-semibold'
						{...titleAnimation}
					>
						{title}
					</m.h3>
					<m.p
						className='mt-1 text-sm text-neutral-300 line-clamp-2'
						{...descriptionAnimation}
					>
						{description}
					</m.p>
				</m.div>
			</div>

			<m.div
				className='p-4 flex flex-col flex-1 gap-5'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, delay: 0.15 }}
			>
				<m.div
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2, delay: 0.25 }}
				>
					<TechStack exclude={excludeTechs} />
				</m.div>

				<m.hr
					className='mt-auto text-neutral-600/50'
					initial={{ width: '0%' }}
					animate={{ width: '100%' }}
					transition={{ duration: 0.3, delay: 0.3 }}
				/>

				<ProjectCardFooter
					livelink={livelink}
					githubLink={githubLink}
					difficult={difficult}
				/>
			</m.div>
		</m.div>
	)
}
