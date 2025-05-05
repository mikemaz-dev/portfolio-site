'use client'

import * as m from 'motion/react-m'

import { TechStack } from '@/ui/techstack/TechStack'

import { fadeIn } from './fadeIn-animation'

export function TechStackBlock() {
	return (
		<m.div
			variants={fadeIn}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			custom={1}
			className='px-4 sm:px-5 pt-4 rounded-2xl bg-neutral-800/30 shadow-xl shadow-neutral-900/35'
		>
			<h3 className='text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-5'>Tech Stack</h3>
			<TechStack />
			<span className='block text-neutral-200/80 mt-4 mb-4'>...and many more!</span>
		</m.div>
	)
}
