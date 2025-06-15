'use client'

import { ExternalLink, FileDown, Mouse } from 'lucide-react'
import * as m from 'motion/react-m'
import Image from 'next/image'

import { Description, Greeting, Socials } from '@/components/layout/content/home'

import { Button } from '@/ui/index'

export function Hero() {
	return (
		<m.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, delay: 0.2 }}
			className='relative flex flex-col sm:flex-row items-center sm:items-start justify-between leading-relaxed gap-8 sm:gap-4'
		>
			<div className='w-full sm:max-w-2xl h-auto text-center sm:text-left flex flex-col justify-between'>
				<div>
					<Greeting />
					<Description />
					<div className='max-sm:w-full max-sm:flex max-sm:items-center max-sm:justify-center flex items-center gap-3'>
						<Button
							className='flex items-center mt-5.5 gap-1.5 sm:w-auto'
							variant='primary'
							onClick={() => {
								window.open(
									'https://drive.google.com/file/d/11qNyJWInZzPoRYBVNZRHwMsS1AxiuXii/preview',
									'_blank'
								)
							}}
						>
							<ExternalLink className='w-5 h-5' />
							Open CV
						</Button>
						<Button
							className='flex items-center mt-5.5 gap-1.5 sm:w-auto'
							variant='outline'
							onClick={() => {
								window.open(
									'https://drive.google.com/uc?export=download&id=1jXw82_JAoVFLTd4pPj0pWPn_-5DUBixz',
									'_blank'
								)
							}}
						>
							<FileDown className='w-5 h-5' />
							Download CV
						</Button>
					</div>
				</div>

				<button
					onClick={() => {
						const about_el = document.getElementById('about-me')
						if (about_el) about_el.scrollIntoView({ behavior: 'smooth' })
					}}
					className='absolute bottom-0 w-max mx-auto flex items-center gap-2 cursor-pointer select-none group max-sm:hidden'
				>
					<m.div
						animate={{ opacity: [1, 0.3, 1] }}
						transition={{ duration: 4, repeat: Infinity }}
					>
						<Mouse className='size-5 text-neutral-100/80 group-hover:text-neutral-100 transition-colors duration-300' />
					</m.div>

					<m.span
						animate={{ opacity: [1, 0.3, 1] }}
						transition={{ duration: 4, repeat: Infinity }}
						className='font-medium text-neutral-100/80 group-hover:text-neutral-100 transition-colors duration-300'
					>
						Scroll Down
					</m.span>
				</button>
			</div>

			<div className='w-full sm:w-auto flex flex-col items-center sm:items-end'>
				<div className='w-full relative flex items-center justify-center rounded-t-lg sm:rounded-lg sm:rounded-b-none'>
					<Image
						src='/logos/logo_transparent.png'
						alt='Logo'
						width={85.3}
						height={85.3}
						className='absolute top-0 left-0'
					/>
					<Image
						src='/Me-edited.png'
						alt='Me'
						width={1980}
						height={2539}
						className='w-90 aspect-auto rounded-t-lg border border-neutral-700/40 border-b-none sm:rounded-lg sm:rounded-b-none'
						priority
					/>
				</div>
				<Socials />
			</div>
		</m.section>
	)
}
