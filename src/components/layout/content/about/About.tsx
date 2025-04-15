'use client'

import * as m from 'motion/react-m'

import { AboutMeBlocks } from './AboutMeBlocks'
import { Certificates } from './Certificates/Certificates'
import { TechStack } from './TechStack'
import { fadeIn } from './fadeIn-animation'

export function About() {
	return (
		<>
			<m.div
				variants={fadeIn}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				custom={0}
				className='flex flex-col justify-between max-w-xl px-5 py-4 rounded-2xl bg-neutral-800/20 shadow-xl shadow-neutral-900/35'
			>
				<div>
					<h2 className='text-2xl font-semibold text-white mb-4'>About Me</h2>
					<AboutMeBlocks />
				</div>
			</m.div>
			<div className='flex flex-col gap-4'>
				<TechStack />
				<Certificates />
			</div>
		</>
	)
}
