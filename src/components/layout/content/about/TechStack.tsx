'use client'

import * as m from 'motion/react-m'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { fadeIn } from './fadeIn-animation'
import { TECHS_DATA } from '@/data/techs/techs.data'

export function TechStack() {
	return (
		<m.div
			variants={fadeIn}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			custom={1}
			className='px-4 sm:px-5 py-4 sm:py-6 rounded-2xl bg-neutral-800/30 shadow-xl shadow-neutral-900/35'
		>
			<h3 className='text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-5'>Tech Stack</h3>
			<div className='flex flex-wrap gap-2 sm:gap-3'>
				{TECHS_DATA.map((tech, i) => (
					<Link
						key={i}
						href={tech.link || '/'}
						target={tech.link ? '_blank' : undefined}
						className={twMerge(
							'flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-800/40 transition hover:bg-white/5[box-shadow:inset_0_0_8px_rgba(255,255,255,0.08)] hover:[box-shadow:inset_0_0_12px_rgba(255,255,255,0.15)] group',
							!tech.link && 'pointer-events-none cursor-default'
						)}
					>
						<Image
							src={tech.img}
							alt={tech.name}
							width={20}
							height={20}
							className='opacity-90 group-hover:opacity-100 transition sm:w-6 sm:h-6'
						/>
						<span className='text-white/80 group-hover:text-white transition-colors text-sm sm:text-base font-medium'>
							{tech.name}
						</span>
					</Link>
				))}
			</div>
		</m.div>
	)
}
