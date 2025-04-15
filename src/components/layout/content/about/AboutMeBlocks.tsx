'use client'

import { BookOpen, Code, Palette, Rocket } from 'lucide-react'
import * as m from 'motion/react-m'

const blocks = [
	{
		title: 'Developer',
		description:
			'I build responsive, user-friendly interfaces with React, Next.js and TailwindCSS.',
		icon: Code
	},
	{
		title: 'UI/UX Focused',
		description: 'I love crafting clean, intuitive experiences and pixel-perfect layouts.',
		icon: Palette
	},
	{
		title: 'Performance',
		description: 'I care about speed, optimization, and accessibility across all devices.',
		icon: Rocket
	},
	{
		title: 'Always Learning',
		description: 'I keep up with new technologies and constantly strive to improve my skills.',
		icon: BookOpen
	}
]

export function AboutMeBlocks() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			{blocks.map((block, index) => {
				const Icon = block.icon

				return (
					<m.div
						key={index}
						className='p-4 sm:p-6 bg-neutral-700/14 rounded-lg transition-all duration-200'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						custom={1}
						transition={{ delay: index * 0.1, duration: 0.2, ease: 'easeInOut', damping: 300 }}
					>
						<div className='flex items-center gap-2 mb-2 sm:mb-3 text-base sm:text-lg font-medium text-white'>
							<Icon className='size-5 sm:size-6 text-neutral-100/95' />
							{block.title}
						</div>
						<p className='text-sm text-neutral-300 leading-relaxed'>{block.description}</p>
					</m.div>
				)
			})}
		</div>
	)
}
