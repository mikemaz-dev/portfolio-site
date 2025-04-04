'use client'

import * as m from 'motion/react-m'

export function Greeting() {
	return (
		<div className='text-2xl md:text-4xl font-semibold flex flex-wrap items-center max-sm:flex-col'>
			<div className='flex items-center gap-0.5'>
				Hello
				<m.span
					className='text-4xl max-sm:text-2xl inline-block'
					animate={{ rotate: [0, 20, -10, 20, 0] }}
					transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
				>
					👋
				</m.span>
				<span className='hidden md:block mr-1'>.</span>
			</div>
			<span className='max-sm:mt-1'>I'm Mikhail Mazurkevich</span>
		</div>
	)
}
