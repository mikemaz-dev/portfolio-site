'use client'

import * as m from 'motion/react-m'

export function Heading({ title }: { title: string }) {
	return (
		<m.h3
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			className='text-3xl max-sm:text-2xl font-bold tracking-tight'
		>
			{title}
		</m.h3>
	)
}
