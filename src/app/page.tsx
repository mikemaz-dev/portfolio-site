import { FileDown, PanelsTopLeft } from 'lucide-react'
import * as m from 'motion/react-m'
import Image from 'next/image'

import { Badges, Description, Greeting, Socials } from '@/components/layout/content/home'

import { Button } from '@/ui/index'

export default function Home() {
	return (
		<m.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.2 }}
			className='py-30 flex flex-col md:flex-row items-center justify-between gap-10'
		>
			<div className='max-w-2xl text-center md:text-left'>
				<Greeting />

				<Badges />
				<Description />
				<div className='mt-5 flex items-center gap-3'>
					<Button
						className='flex items-center gap-1.5 w-full sm:w-auto'
						variant='primary'
					>
						<FileDown className='w-5 h-5' />
						Download CV
					</Button>
					<Button
						className='flex items-center justify-center gap-1.5 w-full sm:w-auto'
						variant='secondary'
					>
						<PanelsTopLeft className='w-5 h-5' />
						View projects
					</Button>
				</div>
			</div>
			<div className='flex max-sm:flex-col items-end'>
				<Socials />
				<div className='flex items-center justify-end border-2 border-neutral-800 border-l-0 max-sm:border-none'>
					<Image
						src='/Me.jpg'
						alt='Me'
						width={1980}
						height={2539}
						className='md:w-80 rounded-lg max-sm:rounded-b-lg max-sm:rounded-t-none max-sm:border-2 max-sm:border-neutral-800'
					/>
				</div>
			</div>
		</m.section>
	)
}
