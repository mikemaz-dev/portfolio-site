'use client'
import { SOCIALS_DATA } from '@/data/socials/socials.data'
import { Check, Copy, Mail } from 'lucide-react'
import * as m from 'motion/react-m'
import Image from 'next/image'
import { useState } from 'react'

export function Socials() {
	const [copied, setCopied] = useState(false)
	const email = 'mazurkevich.mikhail.14@gmail.com'
	
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(email)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Copy error:', err)
		}
	}
	
	return (
		<div className='flex flex-col gap-4'>
			<m.span
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className='flex gap-2 text-sm text-muted-foreground opacity-60'>
				Contact me
			</m.span>
			
			<div className='flex flex-wrap items-center gap-3'>
				<div className='flex items-center gap-2'>
					{SOCIALS_DATA.map(({ link, icon, alt }, index) => (
						<m.a
							key={alt}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
							href={link}
							target='_blank'
							title={`Visit my ${alt}`}
							aria-label={`Visit my ${alt}`}
							className='group relative flex items-center justify-center px-2.5 py-2 rounded-xl transition-all duration-300 bg-neutral-700/50 text-white border-neutral-700 hover:bg-neutral-700/65 hover:scale-110'
						>
							<Image
								src={icon || '/placeholder.svg'}
								alt={alt}
								width={25}
								height={25}
								className='relative z-10 transition-all duration-300 group-hover:scale-110'
							/>
							
							<div
								className='absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg border border-neutral-600'>
								{alt}
							</div>
						</m.a>
					))}
				</div>
				
				<m.button
					onClick={handleCopy}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.4, delay: 0.2 + SOCIALS_DATA.length * 0.1 }}
					className='group relative flex items-center cursor-pointer gap-2 h-10 px-4 rounded-xl backdrop-blur-sm transition-all duration-300 bg-neutral-700/50 text-white border-neutral-700 hover:bg-neutral-700/65 hover:scale-105 hover:shadow-lg'
				>
					<div className='relative z-10 flex items-center gap-2'>
						{copied ? (
							<m.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className='flex items-center gap-2'
							>
								<Check size={16} className='text-green-500' />
								<span
									className='text-sm font-medium text-green-500'>Copied!</span>
							</m.div>
						) : (
							<>
								<Mail size={16}
								      className='transition-transform duration-300 group-hover:scale-110' />
								<span className='text-sm font-medium'>Email me</span>
								<Copy size={14}
								      className='opacity-60 transition-all duration-300 group-hover:opacity-100' />
							</>
						)}
					</div>
					
					<div
						className='absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg border border-neutral-600'>
						{email}
					</div>
				</m.button>
			</div>
		</div>
	)
}
