'use client'

import * as m from 'motion/react-m'

export function Greeting() {
	return (
		<div className='text-2xl md:text-5xl leading-tight flex flex-wrap items-center max-sm:flex-col max-sm:items-center'>
			<div className='flex items-center gap-0.5 font-normal'>
				Hello
				<m.span
					className='max-sm:text-2xl'
					animate={{ rotate: [0, 20, -10, 20, 0] }}
					transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
				>
					👋
				</m.span>
			</div>
			<div className='max-sm:mt-1 flex items-center gap-1'>
				<span>I&apos;m</span>
				<span className='font-semibold'>Mikhail Mazurkevich</span>
			</div>
		</div>
	)
}
