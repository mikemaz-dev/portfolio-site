'use client'

import { BookOpen, Code, Palette, Rocket } from 'lucide-react'
import * as m from 'motion/react-m'

const blocks = [
	{
		title: 'Developer',
		description: 'I craft sleek, responsive interfaces with React.js, Next.js, and TailwindCSS.',
		icon: Code
	},
	{
		title: 'UI/UX Focused',
		description: 'I value clarity, usability, and design precision in every interface.',
		icon: Palette
	},
	{
		title: 'Optimization Focused',
		description: 'I help websites rank with SEO, speed, and accessibility.',
		icon: Rocket
	},
	{
		title: 'Always Learning',
		description: 'I stay updated with new tools and push my craft forward.',
		icon: BookOpen
	}
]

export function AboutMeBlocks() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
			{blocks.map((block, index) => {
				const Icon = block.icon

				return (
					<m.div
						key={index}
						className='py-10 px-6 rounded-lg bg-neutral-800/30 border border-neutral-800/50 flex flex-col items-center text-center gap-8 hover:-translate-y-4 hover:bg-neutral-700/20 hover:border-neutral-700 transition-all duration-300'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						custom={1}
						transition={{ delay: index * 0.1, duration: 0.2, ease: 'easeInOut', damping: 300 }}
					>
						<div className='rounded-full bg-neutral-700/45 border border-neutral-700 p-4 size-18 flex items-center justify-center'>
							<Icon className='size-16 text-neutral-100/95' />
						</div>
						<div className='flex flex-col gap-1'>
							<b className='text-2xl font-bold text-white mb-2'>{block.title}</b>
							<p className='text-neutral-300 leading-relaxed'>{block.description}</p>
						</div>
					</m.div>
				)
			})}
		</div>
	)
}
