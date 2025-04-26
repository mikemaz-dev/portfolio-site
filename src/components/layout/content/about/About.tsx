'use client'

import * as m from 'motion/react-m'

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
				className='w-full flex flex-col justify-between max-w-xl px-5 py-4 rounded-2xl shadow-xl shadow-neutral-900/35'
			>
				<div className='flex flex-col max-w-full'></div>
			</m.div>
		</>
	)
}
