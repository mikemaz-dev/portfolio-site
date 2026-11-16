'use client'

import * as m from 'motion/react-m'
import Link from 'next/link'

import { Button } from '@/ui/Button'

import { CERTIFICATES_DATA } from '@/data/certificates/certificates.data'

export function Certificates() {
	return (
		<div className='grid grid-cols-3 gap-6 max-sm:grid-cols-1'>
			{CERTIFICATES_DATA.map((cert, i) => (
				<m.div
					key={i}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
					className='flex transform flex-col justify-between gap-4 rounded-2xl border border-neutral-700 bg-neutral-700/15 p-6 pb-4 transition-all duration-300 will-change-transform hover:scale-105 hover:border-neutral-600 hover:bg-neutral-700/20'
				>
					<div className='flex flex-col gap-1.5'>
						<h3 className='truncate text-lg font-semibold text-white'>{cert.name}</h3>
						<p className='text-sm text-neutral-300/80'>{cert.date}</p>
					</div>
					<Link
						href={cert.pdfLink}
						target='_blank'
						className='w-max'
					>
						<Button
							variant='outline'
							className='flex items-center gap-1'
						>
							<span className='text-sm font-medium'>Open</span>
						</Button>
					</Link>
				</m.div>
			))}
		</div>
	)
}
