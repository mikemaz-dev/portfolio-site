'use client'

import cn from 'clsx'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { SOCIALS_DATA } from '@/data/socials/socials.data'

export function Socials({ className }: { className?: string }) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText('mazurkevich.mikhail.14@gmail.com')
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Copy error:', err)
		}
	}

	return (
		<div className={cn('w-full flex justify-center md:justify-start', className)}>
			<div className='flex w-full max-sm:grid max-sm:grid-cols-2 justify-between md:justify-between items-center gap-3 px-4 py-2 bg-neutral-900/30 border border-t-0 border-neutral-700/30 rounded-b-lg'>
				{SOCIALS_DATA.map(({ link, icon, alt }) => (
					<Link
						key={alt}
						href={link}
						target='_blank'
						title={alt}
						className={twMerge(
							'group p-1.5 transition-colors duration-400 ease-in-out rounded-lg max-sm:flex max-sm:items-center max-sm:justify-center max-sm:gap-1',
							alt === 'Linkedin' && 'hover:bg-blue-500/80',
							alt === 'Instagram' &&
								'bg-gradient-to-r from-transparent to-transparent hover:bg-gradient-to-tr hover:from-red-500 hover:to-purple-600',
							alt === 'GitHub' && 'p-1 py-0.5 hover:bg-white/10'
						)}
					>
						<Image
							src={icon}
							alt={alt}
							width={alt === 'GitHub' ? 35 : 24}
							height={24}
							className='transition-transform duration-300'
						/>
						<span className='text-sm text-white/90 font-medium sm:hidden'>{alt}</span>
					</Link>
				))}

				<button
					onClick={handleCopy}
					className={twMerge(
						'flex items-center justify-center gap-2 p-2 text-white text-xs rounded-lg cursor-pointer transition-colors',
						copied ? 'bg-green-500' : 'hover:bg-white/10'
					)}
					title='Copy email address'
				>
					<Mail size={24} />
					<span className='sm:hidden font-medium'>Copy email</span>
				</button>
			</div>
		</div>
	)
}
