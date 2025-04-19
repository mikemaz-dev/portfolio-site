'use client'

import cn from 'clsx'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/ui/Button'

import { SOCIALS_DATA } from '@/data/socials/socials.data'

export function Socials({ className }: { className?: string }) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		const copyEmail = 'mazurkevich.mikhail.14@gmail.com'
		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(copyEmail)
			} else {
				const input = document.createElement('input')
				input.value = copyEmail
				document.body.appendChild(input)
				input.select()
				document.execCommand('copy')
				document.body.removeChild(input)
			}
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
							'group p-1.5 transition-colors duration-400 ease-in-out rounded-lg max-sm:flex max-sm:items-center max-sm:justify-center max-sm:gap-2',
							alt === 'Linkedin' && 'hover:bg-blue-500/80',
							alt === 'Instagram' &&
								'bg-gradient-to-r from-transparent to-transparent hover:bg-gradient-to-tr hover:from-red-500 hover:to-purple-600',
							alt === 'GitHub' && 'hover:bg-white/10 max-sm:-ml-2'
						)}
					>
						<Image
							src={icon}
							alt={alt}
							width={24}
							height={24}
							className='transition-transform duration-300'
						/>
						<span className='text-sm hidden max-sm:inline'>{alt}</span>
					</Link>
				))}

				<Button
					variant='ghost'
					onClick={handleCopy}
					className='flex items-center gap-2 p-1.5 max-sm:ml-5.5'
					title='Copy email'
				>
					<Mail size={24} />
					<span className='text-sm select-none hidden max-sm:block'>
						{copied ? 'Copied!' : 'Copy email'}
					</span>
				</Button>
			</div>
		</div>
	)
}
