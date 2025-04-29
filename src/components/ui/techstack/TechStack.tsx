'use client'

import * as m from 'motion/react-m'

import { TechStackItem } from './TechStackItem'
import { TECHS_DATA } from '@/data/techs/techs.data'

export function TechStack() {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8'>
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
				>
					<TechStackItem tech={tech} />
				</m.div>
			))}
		</div>
	)
}
