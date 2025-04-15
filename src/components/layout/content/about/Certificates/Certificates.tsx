'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import * as m from 'motion/react-m'
import Link from 'next/link'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/ui/index'

import { fadeIn } from '../fadeIn-animation'

import { CertificateModal } from './CertificateModal'
import { CERTIFICATES_DATA } from '@/data/certificates/certificates.data'

type Certificate = Pick<(typeof CERTIFICATES_DATA)[number], 'name' | 'pdfLink'>

export function Certificates() {
	const [selected, setSelected] = useState<Certificate | null>(null)

	return (
		<>
			<m.div
				variants={fadeIn}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				custom={2}
				className='px-5 py-4 sm:px-4.5 sm:py-3.5 rounded-2xl bg-neutral-800/30 shadow-xl shadow-neutral-900/35'
			>
				<h3 className='text-xl sm:text-2xl font-semibold text-white mb-4'>Certificates</h3>
				<ul className='w-full text-gray-300 flex flex-col gap-3'>
					{CERTIFICATES_DATA.map((cert, i) => (
						<li
							key={i}
							className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-4 border border-neutral-700 rounded-lg px-3.5 sm:px-4 py-3'
						>
							<div className='flex flex-col gap-1'>
								<Link
									href={cert.link}
									className={twMerge(
										'font-semibold text-white break-words border-b border-b-transparent transition-colors',
										cert.name ===
											'Complete course on Javascript + React - from scratch to results' &&
											'hover:border-b-[#892de1]',
										cert.name === 'Mastering Next.js 13 with TypeScript' &&
											'hover:border-b-[#b14be8]',
										cert.name === 'Advanced Front-end Intensive' && 'hover:border-b-green-800'
									)}
									target='_blank'
								>
									{cert.name}
								</Link>
								<span className='text-xs sm:text-sm'>{cert.date}</span>
							</div>
							<Button
								variant='outline'
								className='self-start sm:self-auto flex items-center justify-center gap-2 px-2.5'
								onClick={() => setSelected({ name: cert.name, pdfLink: cert.pdfLink })}
								title='Open certificate'
							>
								<SquareArrowOutUpRight
									size={17}
									className=''
								/>
								<span className='hidden max-sm:block text-sm'>Open</span>
							</Button>
						</li>
					))}
				</ul>
			</m.div>

			{selected && (
				<CertificateModal
					name={selected.name}
					pdfLink={selected.pdfLink}
					onClose={() => setSelected(null)}
				/>
			)}
		</>
	)
}
