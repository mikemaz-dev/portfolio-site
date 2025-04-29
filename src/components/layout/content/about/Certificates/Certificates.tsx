'use client'

import { ExternalLink, FileText } from 'lucide-react'
import * as m from 'motion/react-m'
import Link from 'next/link'

import { Button } from '@/ui/Button'

import { CERTIFICATES_DATA } from '@/data/certificates/certificates.data'

export function Certificates() {
	return (
		<div className='grid grid-cols-3 gap-4 max-sm:grid-cols-1'>
			{CERTIFICATES_DATA.map((cert, i) => (
				<m.div
					key={i}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
					className='
            flex flex-col justify-between p-6
            bg-neutral-700/15 hover:bg-neutral-700/20 backdrop-blur-md rounded-2xl hover:scale-105 transform transition-all duration-300
          '
				>
					<div className='flex flex-col gap-1.5'>
						<h3 className='text-lg font-semibold text-white truncate'>{cert.name}</h3>
						<p className='text-sm text-neutral-300/80'>{cert.date}</p>
					</div>

					<hr className='text-neutral-700/80 mt-6' />
					<div className='mt-3 flex gap-3'>
						<Link
							href={cert.link}
							target='_blank'
						>
							<Button className='flex items-center gap-1'>
								<ExternalLink className='w-4 h-4' />
								<span className='text-sm font-medium'>Course</span>
							</Button>
						</Link>
						<Link
							href={cert.pdfLink}
							target='_blank'
						>
							<Button
								variant='outline'
								className='flex items-center gap-1'
							>
								<FileText className='w-4 h-4' />
								<span className='text-sm font-medium'>View PDF</span>
							</Button>
						</Link>
					</div>
				</m.div>
			))}
		</div>
	)
}
