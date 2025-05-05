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
				'flex flex-col items-center justify-center group p-6 rounded-2xl  border border-neutral-700 bg-neutral-800/30 hover:bg-neutral-700/20 transform hover:scale-105 duration-300 shadow-lg',
				!tech.link && 'pointer-events-none opacity-95'
			)}
		>
			<div className='mb-4'>
				<Image
					src={tech.img ? tech.img : ''}
					alt=''
					aria-hidden='true'
					role='presentation'
					width={48}
					height={48}
					className='opacity-80 group-hover:opacity-100 transition-opacity duration-300'
				/>
			</div>
			<span className='block truncate text-base font-semibold text-white/75 group-hover:text-white transition-colors duration-300'>
				{tech.name}
			</span>
		</Link>
	)
}
