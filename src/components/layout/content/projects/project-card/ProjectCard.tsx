'use client'

import * as m from 'motion/react-m'
import Image from 'next/image'
import React, { useRef } from 'react'

import { ProjectCardContent } from '@/components/layout/content/projects/project-card/ProjectCardContent'

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
	const cardRef = useRef<HTMLDivElement>(null)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return

		const rect = cardRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const centerX = rect.width / 2
		const centerY = rect.height / 2

		const rotateX = (y - centerY) / 10
		const rotateY = (centerX - x) / 10

		cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
	}

	const handleMouseLeave = () => {
		if (!cardRef.current) return
		cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
	}

	return (
		<m.div
			ref={cardRef}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			whileInView='visible'
			viewport={{ once: true, amount: 0.3 }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className='flex flex-col gap-3 h-full bg-neutral-700/30 rounded-2xl p-4 max-sm:p-2 cursor-pointer shadow-md backdrop-blur-md transition-transform duration-200 ease-out'
			style={{ transformStyle: 'preserve-3d' }}
		>
			<Image
				src={preview || '/placeholder.svg'}
				alt='Preview'
				width={1200}
				height={800}
				className='rounded-xl object-cover w-full h-48 max-sm:h-32'
			/>

			<div className='flex flex-col justify-between gap-5 h-full rounded-b-lg'>
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
		</m.div>
	)
}
