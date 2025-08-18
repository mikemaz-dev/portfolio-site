import type { ITech } from '@/data/techs/techs.types'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface TechStackItemProps {
	tech: ITech
}

export function TechStackItem({ tech }: TechStackItemProps) {
	return (
		<Link
			href={tech.link ?? '/'}
			target={tech.link ? '_blank' : undefined}
			className={twMerge(
				'flex items-center gap-4 group p-4 w-full transition-transform will-change-transform duration-300 hover:scale-105 ease-in-out'
			)}
		>
			<div className='flex-shrink-0 w-10 h-10 relative'>
				<Image
					src={tech.img ? tech.img : ''}
					alt={tech.name}
					fill
					className='object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300'
				/>
			</div>
			
			<span
				className='text-lg font-medium text-white/70 group-hover:text-white transition-all duration-300'>
				{tech.name}
			</span>
		</Link>
	)
}
