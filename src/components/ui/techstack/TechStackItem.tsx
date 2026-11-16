import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import type { ITech } from '@/data/techs/techs.types'

interface TechStackItemProps {
	tech: ITech
}

export function TechStackItem({ tech }: TechStackItemProps) {
	return (
		<Link
			href={tech.link ?? '/'}
			target={tech.link ? '_blank' : undefined}
			className={twMerge(
				'group flex w-full items-center gap-4 p-4 transition-transform duration-300 ease-in-out will-change-transform hover:scale-105'
			)}
		>
			<div className='relative h-10 w-10 flex-shrink-0'>
				<Image
					src={tech.img ? tech.img : ''}
					alt={tech.name}
					fill
					className='object-contain opacity-75 grayscale transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0'
				/>
			</div>

			<span className='text-lg font-medium text-white/70 transition-all duration-300 group-hover:text-white'>
				{tech.name}
			</span>
		</Link>
	)
}
