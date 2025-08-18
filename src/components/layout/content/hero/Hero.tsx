'use client'

import { Description, Greeting } from '@/components/layout/content/home'
import * as m from 'motion/react-m'
import Image from 'next/image'

export function Hero() {
	return (
		<div
			className='relative grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 section items-center'>
			<m.div
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className='text-center flex flex-col gap-10'
			>
				<div className='flex flex-col md:gap-2 gap-8'>
					<Greeting />
					<Description />
				</div>
			</m.div>
			
			<m.div
				initial={{ opacity: 0, x: 50, scale: 0.9 }}
				animate={{ opacity: 1, x: 0, scale: 1 }}
				transition={{ duration: 0.8, delay: 0.4 }}
				className='relative flex justify-center lg:justify-end'
			>
				<div
					className='relative'>
					<Image
						src='/Me.jpg'
						alt='Portfolio photo'
						width={1980}
						height={2539}
						className='w-80 lg:w-96 aspect-auto rounded-xl shadow-md transition duration-300 ease-in-out brightness-90 contrast-100 hover:brightness-100 hover:contrast-105'
						priority
					/>
					<m.span
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 1.2,
							repeat: Infinity,
							repeatType: 'reverse',
							repeatDelay: 2
						}}
						className='absolute -top-6 right-4 rounded-full text-sm font-medium text-green-500'
					>
						Available for work
					</m.span>
					<m.span
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.6,
							delay: 1.4,
							repeat: Infinity,
							repeatType: 'reverse',
							repeatDelay: 3
						}}
						className='absolute -bottom-6 left-4 bg-accent text-accent-foreground rounded-full text-sm font-medium shadow-lg'
					>
						Let's connect!
					</m.span>
				</div>
			</m.div>
		</div>
	)
}
