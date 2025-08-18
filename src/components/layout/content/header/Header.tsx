'use client'

import { PAGE } from '@/config/sections.config'
import { HEADER_DATA } from '@/data/header/header.data'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DownloadCVButton } from './DownloadCVButton'
import { HeaderMobile } from './HeaderMobile'

export function Header() {
	const [scrolled, setScrolled] = useState(false)
	
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	
	return (
		<header
			className={cn(
				'w-full fixed top-0 left-0 z-50 transition-all duration-300',
				scrolled ? 'bg-neutral-900/95 py-2 backdrop-blur-xs' : 'bg-transparent py-6'
			)}
		>
			<div className='flex items-center justify-between container'>
				<Link href={PAGE.BASE} aria-label='Homepage'>
					<Image
						src='/logos/logo_transparent.png'
						alt='Logo'
						width={64}
						height={64}
						className='hover:scale-105 transition-all duration-300'
						priority
					/>
				</Link>
				
				<nav className='hidden md:block'>
					<ul className='flex items-center gap-8 md:gap-10'>
						{HEADER_DATA.map((data, i) => (
							<li key={i}>
								<a
									href={data.href}
									className='font-medium text-neutral-300 hover:text-neutral-100 pb-2.5 border-b border-transparent hover:border-white transition-all duration-300'
								>
									{data.name}
								</a>
							</li>
						))}
					</ul>
				</nav>
				
				<div className='hidden md:block'>
					<DownloadCVButton />
				</div>
				
				<HeaderMobile />
			</div>
		</header>
	)
}
