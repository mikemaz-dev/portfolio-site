'use client'

import { FileDown, Mouse } from 'lucide-react'
import * as m from 'motion/react-m'
import Image from 'next/image'
import { useRef } from 'react'

import { About } from '@/components/layout/content/about/About'
import { Badges, Description, Greeting, Socials } from '@/components/layout/content/home'

import { Button } from '@/ui/index'

export default function Home() {
	const aboutRef = useRef<HTMLDivElement>(null)

	const handleScrollDown = () => {
		if (aboutRef.current) {
			aboutRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<m.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='relative flex flex-col sm:flex-row items-center sm:items-start justify-between leading-relaxed gap-8 sm:gap-4'
			>
				<div className='w-full sm:max-w-2xl h-auto text-center sm:text-left flex flex-col justify-between'>
					<div>
						<Greeting />
						<Badges />
						<Description />
						<div className='max-sm:w-full max-sm:flex max-sm:items-center max-sm:justify-center'>
							<Button
								className='flex items-center mt-5.5 gap-1.5 sm:w-auto'
								variant='primary'
							>
								<FileDown className='w-5 h-5' />
								Download CV
							</Button>
						</div>
					</div>

					<button
						onClick={handleScrollDown}
						className='absolute bottom-0 w-max mx-auto flex items-center gap-2 cursor-pointer select-none group max-sm:hidden'
					>
						<Mouse className='size-5 text-neutral-100/80 group-hover:text-neutral-100 transition-colors duration-300' />
						<span className='font-medium text-neutral-100/80 group-hover:text-neutral-100 transition-colors duration-300'>
							Scroll Down
						</span>
					</button>
				</div>

				<div className='w-full sm:w-auto flex flex-col items-center sm:items-end'>
					<div className='w-full flex items-center justify-center rounded-t-lg sm:rounded-lg sm:rounded-b-none'>
						<Image
							src='/Me.jpg'
							alt='Me'
							width={1980}
							height={2539}
							className='w-90 aspect-auto rounded-t-lg sm:rounded-lg sm:rounded-b-none'
							priority
						/>
					</div>
					<Socials />
				</div>
			</m.section>
			<section
				className='flex items-start max-sm:flex-col gap-10 pb-4 mt-30 max-sm:mt-20'
				ref={aboutRef}
			>
				<About />
			</section>
		</div>
	)
}
