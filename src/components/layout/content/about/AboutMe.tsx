'use client'

import { motion } from 'framer-motion'

import { TechStack } from '@/ui/techstack/TechStack'

export function AboutMe() {
	return (
		<section className='text-white'>
			<div className='mx-auto flex flex-col gap-4'>
				<motion.p
					className='max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-xl'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					I’m a <span className='text-purple-400'>Frontend Developer</span> with hands-on experience
					creating clean, modern, and engaging web applications. My work blends{' '}
					<span className='text-purple-400'>aesthetic design</span> with technical precision –
					transforming ideas into smooth, interactive experiences. Always learning, always refining
					my craft. <span className='font-medium text-neutral-100'>Here is my tech stack:</span>
				</motion.p>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className='space-y-6'
				>
					<TechStack />
				</motion.div>
			</div>
		</section>
	)
}
