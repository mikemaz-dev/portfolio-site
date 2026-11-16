'use client'

import cn from 'clsx'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { LanguageToggle } from '@/ui/LanguageToggle'

import { useLanguage } from '@/providers/LanguageProvider'

import { SITE_COPY } from '@/data/site-copy.data'
import { CONTACTS } from '@/data/site.data'

export function Header() {
	const [scrolled, setScrolled] = useState(false)
	const [open, setOpen] = useState(false)
	const pathname = usePathname()
	const isHome = pathname === '/'
	const useLightHeader = scrolled || !isHome
	const { language } = useLanguage()
	const copy = SITE_COPY[language]

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 12)

		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header
			className={cn(
				'fixed top-0 left-0 z-50 w-full transition duration-300',
				useLightHeader ? 'bg-white/85 shadow-sm backdrop-blur-xl' : 'bg-transparent'
			)}
		>
			<div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10'>
				<Link
					className={cn('text-lg font-semibold', useLightHeader ? 'text-slate-950' : 'text-white')}
					href='/'
				>
					Mike Mazur
				</Link>

				<nav className='hidden items-center gap-7 md:flex'>
					{copy.nav.map(item => (
						<a
							className={cn(
								'text-sm font-medium transition hover:text-blue-500',
								useLightHeader ? 'text-slate-600' : 'text-slate-300'
							)}
							href={item.href}
							key={item.name}
						>
							{item.name}
						</a>
					))}
				</nav>

				<div className='hidden items-center gap-3 md:flex'>
					<LanguageToggle light={useLightHeader} />
					<a
						className='rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500'
						href={CONTACTS.telegram}
						rel='noopener noreferrer'
						target='_blank'
					>
						{copy.cta}
					</a>
				</div>

				<div className='flex items-center gap-2 md:hidden'>
					<LanguageToggle
						light={useLightHeader}
						compact
					/>
					<button
						aria-expanded={open}
						aria-label='Toggle navigation'
						className={cn('rounded-full p-2', useLightHeader ? 'text-slate-950' : 'text-white')}
						onClick={() => setOpen(value => !value)}
						type='button'
					>
						{open ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>

			{open ? (
				<div className='mx-4 mb-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl md:hidden'>
					<nav className='grid gap-2'>
						{copy.nav.map(item => (
							<a
								className='rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100'
								href={item.href}
								key={item.name}
								onClick={() => setOpen(false)}
							>
								{item.name}
							</a>
						))}
						<a
							className='rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white'
							href={CONTACTS.telegram}
							onClick={() => setOpen(false)}
							rel='noopener noreferrer'
							target='_blank'
						>
							{copy.cta}
						</a>
					</nav>
				</div>
			) : null}
		</header>
	)
}
