'use client'

import { TECHS_DATA } from '@/data/techs/techs.data'
import * as m from 'motion/react-m'

import { TechStackItem } from './TechStackItem'

export function TechStack() {
	return (
		<div className='grid md:grid-cols-5 grid-cols-2'>
			{TECHS_DATA.map((tech, i) => (
				<m.div
					key={tech.name}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{
						delay: i * 0.05,
						duration: 0.5,
						ease: 'easeOut'
					}}
					className='flex items-center border border-neutral-800 hover:border-neutral-600 transition-colors duration-200 first:rounded-tl-lg last:rounded-br-lg nth-of-type-5:rounded-tr-lg nth-of-type-15:rounded-br-lg nth-of-type-16:rounded-bl-lg'
				>
					<TechStackItem tech={tech} />
				</m.div>
			))}
		</div>
	)
}
