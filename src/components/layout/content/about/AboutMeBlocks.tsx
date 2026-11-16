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
		<div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4'>
			{blocks.map((block, index) => {
				const Icon = block.icon

				return (
					<m.div
						key={index}
						className='flex flex-col items-center gap-8 rounded-lg border border-neutral-800/50 bg-neutral-800/30 px-6 py-10 text-center transition-all duration-300 hover:-translate-y-4 hover:border-neutral-700 hover:bg-neutral-700/20'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{
							delay: index * 0.1,
							duration: 0.5,
							ease: 'easeOut'
						}}
					>
						<div className='flex h-18 w-18 items-center justify-center rounded-full border border-neutral-700 bg-neutral-700/45 p-4'>
							<Icon className='h-16 w-16 text-neutral-100/95' />
						</div>
						<div className='flex flex-col gap-1'>
							<b className='mb-2 text-2xl font-bold text-white'>{block.title}</b>
							<p className='leading-relaxed text-neutral-300'>{block.description}</p>
						</div>
					</m.div>
				)
			})}
		</div>
	)
}
