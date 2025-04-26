import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import type { ITech } from '@/data/techs/techs.types'

interface TechStackItemProps {
	tech: ITech
	variant?: 'big' | 'small'
	className?: string
}

export function TechStackItem({ tech, variant = 'big', className = '' }: TechStackItemProps) {
	const isBig = variant === 'big'

	const containerStyles = twMerge(
		'group transition-all',
		isBig
			? [
					'flex flex-col items-center justify-center',
					'p-6 rounded-2xl',
					'border border-neutral-700',
					'bg-neutral-800/30 hover:bg-neutral-700/20',
					'transform hover:scale-105',
					'duration-300 shadow-lg'
				]
			: [
					'flex items-center gap-2',
					'px-3 py-1 rounded-lg',
					'border border-neutral-700',
					'bg-neutral-800/50 hover:bg-neutral-700/70',
					'duration-200 shadow-sm',
					'min-w-0'
				],
		!tech.link && 'pointer-events-none cursor-default',
		className
	)

	const imgSize = isBig ? 48 : 20
	const imgWrapperClass = isBig ? 'mb-4' : ''
	const imgClass = 'opacity-80 group-hover:opacity-100 transition-opacity duration-300'

	const textStyles = twMerge(
		'block truncate text-base font-semibold text-neutral-200 group-hover:text-white transition-colors',
		isBig
			? 'text-base font-semibold text-white/75 group-hover:text-white'
			: 'text-sm font-medium text-white/75 group-hover:text-white'
	)

	return (
		<Link
			href={tech.link ?? '/'}
			target={tech.link ? '_blank' : undefined}
			title={tech.name}
			className={containerStyles}
		>
			<div className={imgWrapperClass}>
				<Image
					src={tech.img ? tech.img : ''}
					alt={tech.name}
					width={imgSize}
					height={imgSize}
					className={imgClass}
				/>
			</div>
			<span className={textStyles}>{tech.name}</span>
		</Link>
	)
}
