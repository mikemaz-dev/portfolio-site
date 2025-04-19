import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import type { ITech } from '@/data/techs/techs.types'

export function TechStackItem({ tech, className }: { tech: ITech; className?: string }) {
	return (
		<Link
			href={tech.link || '/'}
			target={tech.link ? '_blank' : undefined}
			className={twMerge(
				'flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-800/50 transition-all duration-300 shadow-md hover:shadow-neutral-700/30 group',
				!tech.link && 'pointer-events-none cursor-default',
				className
			)}
		>
			<Image
				src={tech.img}
				alt={tech.name}
				width={24}
				height={24}
				className='opacity-80 group-hover:opacity-100 transition-opacity w-5 h-5 sm:w-6 sm:h-6 duration-300'
			/>
			<span className='text-sm sm:text-base font-medium text-white/75 group-hover:text-white transition-colors'>
				{tech.name}
			</span>
		</Link>
	)
}
