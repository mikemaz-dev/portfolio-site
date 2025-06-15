import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { TECHS_DATA } from '@/data/techs/techs.data'

export function ProjectCardContent({
	title,
	description,
	excludeTechs
}: {
	title: string
	description: string
	excludeTechs: string[]
}) {
	const filteredTechs = TECHS_DATA.filter(tech => !excludeTechs.includes(tech.name))

	return (
		<div className='flex flex-col gap-5.5'>
			<div className='flex flex-col gap-0.5'>
				<h3 className='text-2xl font-semibold text-neutral-100 max-sm:text-xl'>{title}</h3>
				<p className='text-sm text-neutral-200/80 max-sm:text-xs max-sm:line-clamp-3'>
					{description}
				</p>
			</div>

			<div className='flex flex-wrap items-center gap-3 max-sm:gap-2 max-sm:overflow-x-auto max-sm:py-1'>
				{filteredTechs.map((tech, i) => (
					<Link
						href={tech.link ? tech.link : '/'}
						key={i}
						className={twMerge(
							'flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-700/30 hover:bg-neutral-700/50 transition-colors duration-300 max-sm:px-2 max-sm:py-1',
							!tech.link && 'opacity-90 pointer-events-none'
						)}
						target={tech.link ? '_blank' : undefined}
					>
						<Image
							src={tech.img || '/placeholder.svg'}
							alt={tech.name}
							width={20}
							height={20}
							className='max-sm:w-4 max-sm:h-4'
						/>
						<span className='text-sm font-medium text-neutral-100/80 max-sm:text-xs'>
							{tech.name}
						</span>
					</Link>
				))}
			</div>
		</div>
	)
}
